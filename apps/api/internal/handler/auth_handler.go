package handler

import (
	"errors"

	"github.com/gawstxn/makoto/api/internal/dto"
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
//
//	@Summary		Register a new user
//	@Description	Create a new user account and return JWT tokens
//	@Tags			Auth
//	@Accept			json
//	@Produce		json
//	@Param			body	body		dto.RegisterRequest	true	"Register request"
//	@Success		201		{object}	response.Response{data=dto.AuthResponse}
//	@Failure		400		{object}	response.Response
//	@Failure		409		{object}	response.Response
//	@Failure		500		{object}	response.Response
//	@Router			/auth/register [post]
func (h *AuthHandler) Register(c *gin.Context) {
	var req dto.RegisterRequest
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
//
//	@Summary		Login
//	@Description	Authenticate a user and return JWT tokens
//	@Tags			Auth
//	@Accept			json
//	@Produce		json
//	@Param			body	body		dto.LoginRequest	true	"Login request"
//	@Success		200		{object}	response.Response{data=dto.AuthResponse}
//	@Failure		400		{object}	response.Response
//	@Failure		401		{object}	response.Response
//	@Failure		500		{object}	response.Response
//	@Router			/auth/login [post]
func (h *AuthHandler) Login(c *gin.Context) {
	var req dto.LoginRequest
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
//
//	@Summary		Refresh token
//	@Description	Get a new token pair using a valid refresh token
//	@Tags			Auth
//	@Accept			json
//	@Produce		json
//	@Param			body	body		dto.RefreshRequest	true	"Refresh request"
//	@Success		200		{object}	response.Response{data=dto.AuthResponse}
//	@Failure		400		{object}	response.Response
//	@Failure		401		{object}	response.Response
//	@Router			/auth/refresh [post]
func (h *AuthHandler) Refresh(c *gin.Context) {
	var req dto.RefreshRequest
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
