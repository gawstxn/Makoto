package handler

import (
	"errors"
	"strconv"

	"github.com/gawstxn/makoto/api/internal/dto"
	"github.com/gawstxn/makoto/api/internal/service"
	"github.com/gawstxn/makoto/api/pkg/response"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// UserHandler handles user-related HTTP requests.
type UserHandler struct {
	userService service.UserService
}

// NewUserHandler creates a new UserHandler instance.
func NewUserHandler(userService service.UserService) *UserHandler {
	return &UserHandler{userService: userService}
}

// GetMe returns the currently authenticated user's profile.
//
//	@Summary		Get current user
//	@Description	Get the profile of the currently authenticated user
//	@Tags			Users
//	@Produce		json
//	@Security		BearerAuth
//	@Success		200	{object}	response.Response{data=dto.UserResponse}
//	@Failure		401	{object}	response.Response
//	@Failure		404	{object}	response.Response
//	@Failure		500	{object}	response.Response
//	@Router			/users/me [get]
func (h *UserHandler) GetMe(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		response.Unauthorized(c, "User not authenticated")
		return
	}

	user, err := h.userService.GetByID(userID.(uuid.UUID))
	if err != nil {
		if errors.Is(err, service.ErrUserNotFound) {
			response.NotFound(c, "User not found")
			return
		}
		response.InternalServerError(c, "Failed to get user")
		return
	}

	response.Success(c, "User retrieved successfully", user)
}

// GetByID returns a user by their ID.
//
//	@Summary		Get user by ID
//	@Description	Retrieve a user's profile by their UUID
//	@Tags			Users
//	@Produce		json
//	@Security		BearerAuth
//	@Param			id	path		string	true	"User UUID"
//	@Success		200	{object}	response.Response{data=dto.UserResponse}
//	@Failure		400	{object}	response.Response
//	@Failure		401	{object}	response.Response
//	@Failure		404	{object}	response.Response
//	@Failure		500	{object}	response.Response
//	@Router			/users/{id} [get]
func (h *UserHandler) GetByID(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		response.BadRequest(c, "Invalid user ID", nil)
		return
	}

	user, err := h.userService.GetByID(id)
	if err != nil {
		if errors.Is(err, service.ErrUserNotFound) {
			response.NotFound(c, "User not found")
			return
		}
		response.InternalServerError(c, "Failed to get user")
		return
	}

	response.Success(c, "User retrieved successfully", user)
}

// GetAll returns a paginated list of users.
//
//	@Summary		List users
//	@Description	Get a paginated list of all users
//	@Tags			Users
//	@Produce		json
//	@Security		BearerAuth
//	@Param			page	query		int	false	"Page number"	default(1)
//	@Param			limit	query		int	false	"Items per page"	default(10)
//	@Success		200		{object}	response.Response
//	@Failure		401		{object}	response.Response
//	@Failure		500		{object}	response.Response
//	@Router			/users [get]
func (h *UserHandler) GetAll(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))

	if page < 1 {
		page = 1
	}
	if limit < 1 || limit > 100 {
		limit = 10
	}

	users, total, err := h.userService.GetAll(page, limit)
	if err != nil {
		response.InternalServerError(c, "Failed to get users")
		return
	}

	response.Success(c, "Users retrieved successfully", gin.H{
		"users": users,
		"total": total,
		"page":  page,
		"limit": limit,
	})
}

// Update modifies an existing user's data.
//
//	@Summary		Update user
//	@Description	Update an existing user's name or email
//	@Tags			Users
//	@Accept			json
//	@Produce		json
//	@Security		BearerAuth
//	@Param			id		path		string					true	"User UUID"
//	@Param			body	body		dto.UpdateUserRequest	true	"Update request"
//	@Success		200		{object}	response.Response{data=dto.UserResponse}
//	@Failure		400		{object}	response.Response
//	@Failure		401		{object}	response.Response
//	@Failure		404		{object}	response.Response
//	@Failure		409		{object}	response.Response
//	@Failure		500		{object}	response.Response
//	@Router			/users/{id} [put]
func (h *UserHandler) Update(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		response.BadRequest(c, "Invalid user ID", nil)
		return
	}

	var req dto.UpdateUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, "Invalid request body", err.Error())
		return
	}

	user, err := h.userService.Update(id, &req)
	if err != nil {
		if errors.Is(err, service.ErrUserNotFound) {
			response.NotFound(c, "User not found")
			return
		}
		if errors.Is(err, service.ErrEmailAlreadyExists) {
			response.Conflict(c, "Email already exists")
			return
		}
		response.InternalServerError(c, "Failed to update user")
		return
	}

	response.Success(c, "User updated successfully", user)
}

// Delete removes a user by their ID.
//
//	@Summary		Delete user
//	@Description	Soft-delete a user by their UUID
//	@Tags			Users
//	@Produce		json
//	@Security		BearerAuth
//	@Param			id	path		string	true	"User UUID"
//	@Success		200	{object}	response.Response
//	@Failure		400	{object}	response.Response
//	@Failure		401	{object}	response.Response
//	@Failure		404	{object}	response.Response
//	@Failure		500	{object}	response.Response
//	@Router			/users/{id} [delete]
func (h *UserHandler) Delete(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		response.BadRequest(c, "Invalid user ID", nil)
		return
	}

	if err := h.userService.Delete(id); err != nil {
		if errors.Is(err, service.ErrUserNotFound) {
			response.NotFound(c, "User not found")
			return
		}
		response.InternalServerError(c, "Failed to delete user")
		return
	}

	response.Success(c, "User deleted successfully", nil)
}
