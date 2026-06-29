package service

import (
	"errors"
	"time"

	"github.com/gawstxn/makoto/api/internal/config"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

// Custom errors for auth service.
var (
	ErrInvalidToken = errors.New("invalid or expired token")
)

// TokenClaims represents the custom JWT claims.
type TokenClaims struct {
	UserID uuid.UUID `json:"user_id"`
	Email  string    `json:"email"`
	jwt.RegisteredClaims
}

// AuthService defines the interface for authentication operations.
type AuthService interface {
	GenerateAccessToken(userID uuid.UUID, email string) (string, time.Time, error)
	GenerateRefreshToken(userID uuid.UUID, email string) (string, time.Time, error)
	ValidateToken(tokenString string) (*TokenClaims, error)
}

// authService implements AuthService using golang-jwt.
type authService struct {
	cfg *config.JWTConfig
}

// NewAuthService creates a new AuthService instance.
func NewAuthService(cfg *config.JWTConfig) AuthService {
	return &authService{cfg: cfg}
}

// GenerateAccessToken creates a short-lived JWT access token.
func (s *authService) GenerateAccessToken(userID uuid.UUID, email string) (string, time.Time, error) {
	expiresAt := time.Now().Add(s.cfg.AccessExpiry)
	return s.generateToken(userID, email, expiresAt)
}

// GenerateRefreshToken creates a long-lived JWT refresh token.
func (s *authService) GenerateRefreshToken(userID uuid.UUID, email string) (string, time.Time, error) {
	expiresAt := time.Now().Add(s.cfg.RefreshExpiry)
	return s.generateToken(userID, email, expiresAt)
}

// ValidateToken parses and validates a JWT token string, returning the claims.
func (s *authService) ValidateToken(tokenString string) (*TokenClaims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &TokenClaims{}, func(token *jwt.Token) (interface{}, error) {
		// Ensure the signing method is HMAC
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, ErrInvalidToken
		}
		return []byte(s.cfg.Secret), nil
	})
	if err != nil {
		return nil, ErrInvalidToken
	}

	claims, ok := token.Claims.(*TokenClaims)
	if !ok || !token.Valid {
		return nil, ErrInvalidToken
	}

	return claims, nil
}

// generateToken creates a JWT token with the given claims and expiry.
func (s *authService) generateToken(userID uuid.UUID, email string, expiresAt time.Time) (string, time.Time, error) {
	claims := TokenClaims{
		UserID: userID,
		Email:  email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expiresAt),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			Subject:   userID.String(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(s.cfg.Secret))
	if err != nil {
		return "", time.Time{}, err
	}

	return tokenString, expiresAt, nil
}
