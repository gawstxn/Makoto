package handler

import (
	"errors"

	"github.com/gawstxn/makoto/api/internal/dto/request"
	"github.com/gawstxn/makoto/api/internal/service"
	"github.com/gawstxn/makoto/api/pkg/response"
	"github.com/gin-gonic/gin"
)

// AuthHandler handles authentication-related HTTP requests.
type AuthHandler struct {
	userService service.UserService
}

// NewAuthHandler creates a new AuthHandler instance.
func NewAuthHandler(userService service.UserService) *AuthHandler {
	return &AuthHandler{userService: userService}
}

// Register handles user registration.
// POST /api/v1/auth/register
func (h *AuthHandler) Register(c *gin.Context) {
	var req request.RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, "Invalid request body", err.Error())
		return
	}

	authResp, err := h.userService.Register(&req)
	if err != nil {
		if errors.Is(err, service.ErrEmailAlreadyExists) {
			response.Conflict(c, "Email already exists")
			return
		}
		response.InternalServerError(c, "Failed to register user")
		return
	}

	response.Created(c, "User registered successfully", authResp)
}

// Login handles user authentication.
// POST /api/v1/auth/login
func (h *AuthHandler) Login(c *gin.Context) {
	var req request.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, "Invalid request body", err.Error())
		return
	}

	authResp, err := h.userService.Login(&req)
	if err != nil {
		if errors.Is(err, service.ErrInvalidCredentials) {
			response.Unauthorized(c, "Invalid email or password")
			return
		}
		response.InternalServerError(c, "Failed to login")
		return
	}

	response.Success(c, "Login successful", authResp)
}

// Refresh handles token refresh.
// POST /api/v1/auth/refresh
func (h *AuthHandler) Refresh(c *gin.Context) {
	var req request.RefreshRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, "Invalid request body", err.Error())
		return
	}

	authResp, err := h.userService.RefreshToken(req.RefreshToken)
	if err != nil {
		response.Unauthorized(c, "Invalid or expired refresh token")
		return
	}

	response.Success(c, "Token refreshed successfully", authResp)
}
