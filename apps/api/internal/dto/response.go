package dto

import (
	"time"

	"github.com/gawstxn/makoto/api/internal/model"
	"github.com/google/uuid"
)

// AuthResponse represents the authentication response with tokens.
type AuthResponse struct {
	AccessToken  string    `json:"access_token" example:"eyJhbGciOiJIUzI1NiIs..."`
	RefreshToken string    `json:"refresh_token" example:"eyJhbGciOiJIUzI1NiIs..."`
	ExpiresAt    time.Time `json:"expires_at"`
}

// UserResponse represents the public user data returned in API responses.
// It deliberately excludes sensitive fields like password.
type UserResponse struct {
	ID        uuid.UUID `json:"id" example:"550e8400-e29b-41d4-a716-446655440000"`
	Email     string    `json:"email" example:"user@example.com"`
	Name      string    `json:"name" example:"John Doe"`
	CreatedAt time.Time `json:"created_at"`
}

// FromUser converts a User model to a UserResponse DTO.
func FromUser(user *model.User) UserResponse {
	return UserResponse{
		ID:        user.ID,
		Email:     user.Email,
		Name:      user.Name,
		CreatedAt: user.CreatedAt,
	}
}

// FromUsers converts a slice of User models to a slice of UserResponse DTOs.
func FromUsers(users []model.User) []UserResponse {
	responses := make([]UserResponse, len(users))
	for i, user := range users {
		responses[i] = FromUser(&user)
	}
	return responses
}
