package service

import (
	"errors"

	"github.com/gawstxn/makoto/api/internal/dto"
	"github.com/gawstxn/makoto/api/internal/model"
	"github.com/gawstxn/makoto/api/internal/repository"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// Custom errors for user service.
var (
	ErrEmailAlreadyExists = errors.New("email already exists")
	ErrInvalidCredentials = errors.New("invalid email or password")
	ErrUserNotFound       = errors.New("user not found")
)

// UserService defines the interface for user business logic.
type UserService interface {
	Register(req *dto.RegisterRequest) (*dto.AuthResponse, error)
	Login(req *dto.LoginRequest) (*dto.AuthResponse, error)
	RefreshToken(refreshToken string) (*dto.AuthResponse, error)
	GetByID(id uuid.UUID) (*dto.UserResponse, error)
	GetAll(page, limit int) ([]dto.UserResponse, int64, error)
	Update(id uuid.UUID, req *dto.UpdateUserRequest) (*dto.UserResponse, error)
	Delete(id uuid.UUID) error
}

// userService implements UserService.
type userService struct {
	userRepo    repository.UserRepository
	authService AuthService
}

// NewUserService creates a new UserService instance.
func NewUserService(userRepo repository.UserRepository, authService AuthService) UserService {
	return &userService{
		userRepo:    userRepo,
		authService: authService,
	}
}

// Register creates a new user account and returns authentication tokens.
func (s *userService) Register(req *dto.RegisterRequest) (*dto.AuthResponse, error) {
	// Check if email already exists
	_, err := s.userRepo.FindByEmail(req.Email)
	if err == nil {
		return nil, ErrEmailAlreadyExists
	}
	if !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	// Create user
	user := &model.User{
		Email:    req.Email,
		Password: string(hashedPassword),
		Name:     req.Name,
	}

	if err := s.userRepo.Create(user); err != nil {
		return nil, err
	}

	// Generate tokens
	return s.generateTokenPair(user)
}

// Login authenticates a user and returns tokens.
func (s *userService) Login(req *dto.LoginRequest) (*dto.AuthResponse, error) {
	// Find user by email
	user, err := s.userRepo.FindByEmail(req.Email)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, ErrInvalidCredentials
		}
		return nil, err
	}

	// Compare password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		return nil, ErrInvalidCredentials
	}

	// Generate tokens
	return s.generateTokenPair(user)
}

// RefreshToken validates a refresh token and returns a new token pair.
func (s *userService) RefreshToken(refreshToken string) (*dto.AuthResponse, error) {
	claims, err := s.authService.ValidateToken(refreshToken)
	if err != nil {
		return nil, ErrInvalidToken
	}

	// Verify user still exists
	user, err := s.userRepo.FindByID(claims.UserID)
	if err != nil {
		return nil, ErrUserNotFound
	}

	return s.generateTokenPair(user)
}

// GetByID retrieves a user by their UUID.
func (s *userService) GetByID(id uuid.UUID) (*dto.UserResponse, error) {
	user, err := s.userRepo.FindByID(id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, ErrUserNotFound
		}
		return nil, err
	}

	resp := dto.FromUser(user)
	return &resp, nil
}

// GetAll retrieves a paginated list of users.
func (s *userService) GetAll(page, limit int) ([]dto.UserResponse, int64, error) {
	users, total, err := s.userRepo.FindAll(page, limit)
	if err != nil {
		return nil, 0, err
	}

	return dto.FromUsers(users), total, nil
}

// Update modifies an existing user's data.
func (s *userService) Update(id uuid.UUID, req *dto.UpdateUserRequest) (*dto.UserResponse, error) {
	user, err := s.userRepo.FindByID(id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, ErrUserNotFound
		}
		return nil, err
	}

	// Check if email is being changed and already exists
	if req.Email != "" && req.Email != user.Email {
		existing, err := s.userRepo.FindByEmail(req.Email)
		if err == nil && existing.ID != user.ID {
			return nil, ErrEmailAlreadyExists
		}
		user.Email = req.Email
	}

	if req.Name != "" {
		user.Name = req.Name
	}

	if err := s.userRepo.Update(user); err != nil {
		return nil, err
	}

	resp := dto.FromUser(user)
	return &resp, nil
}

// Delete removes a user by their UUID.
func (s *userService) Delete(id uuid.UUID) error {
	_, err := s.userRepo.FindByID(id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return ErrUserNotFound
		}
		return err
	}
	return s.userRepo.Delete(id)
}

// generateTokenPair creates both access and refresh tokens for a user.
func (s *userService) generateTokenPair(user *model.User) (*dto.AuthResponse, error) {
	accessToken, expiresAt, err := s.authService.GenerateAccessToken(user.ID, user.Email)
	if err != nil {
		return nil, err
	}

	refreshToken, _, err := s.authService.GenerateRefreshToken(user.ID, user.Email)
	if err != nil {
		return nil, err
	}

	return &dto.AuthResponse{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
		ExpiresAt:    expiresAt,
	}, nil
}
