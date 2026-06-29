package response

import (
	"time"

	"github.com/gawstxn/makoto/api/internal/model"
	"github.com/google/uuid"
)

// UserResponse represents the public user data returned in API responses.
// It deliberately excludes sensitive fields like password.
type UserResponse struct {
	ID        uuid.UUID `json:"id"`
	Email     string    `json:"email"`
	Name      string    `json:"name"`
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
