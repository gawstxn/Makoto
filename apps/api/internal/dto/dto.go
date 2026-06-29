package dto

// RegisterRequest represents the request body for user registration.
type RegisterRequest struct {
	Email    string `json:"email" binding:"required,email" example:"user@example.com"`
	Password string `json:"password" binding:"required,min=8" example:"password123"`
	Name     string `json:"name" binding:"required,min=2,max=100" example:"John Doe"`
}

// LoginRequest represents the request body for user login.
type LoginRequest struct {
	Email    string `json:"email" binding:"required,email" example:"user@example.com"`
	Password string `json:"password" binding:"required" example:"password123"`
}

// RefreshRequest represents the request body for token refresh.
type RefreshRequest struct {
	RefreshToken string `json:"refresh_token" binding:"required" example:"eyJhbGciOiJIUzI1NiIs..."`
}

// UpdateUserRequest represents the request body for updating a user.
type UpdateUserRequest struct {
	Name  string `json:"name" binding:"omitempty,min=2,max=100" example:"Jane Doe"`
	Email string `json:"email" binding:"omitempty,email" example:"new@example.com"`
}
