package response

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// Response represents a standardized API response.
type Response struct {
	Success bool        `json:"success"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
	Errors  interface{} `json:"errors,omitempty"`
}

// Success sends a 200 OK response with data.
func Success(c *gin.Context, message string, data interface{}) {
	c.JSON(http.StatusOK, Response{
		Success: true,
		Message: message,
		Data:    data,
	})
}

// Created sends a 201 Created response with data.
func Created(c *gin.Context, message string, data interface{}) {
	c.JSON(http.StatusCreated, Response{
		Success: true,
		Message: message,
		Data:    data,
	})
}

// Error sends an error response with the given status code.
func Error(c *gin.Context, statusCode int, message string, errs interface{}) {
	c.JSON(statusCode, Response{
		Success: false,
		Message: message,
		Errors:  errs,
	})
}

// BadRequest sends a 400 Bad Request response.
func BadRequest(c *gin.Context, message string, errs interface{}) {
	Error(c, http.StatusBadRequest, message, errs)
}

// Unauthorized sends a 401 Unauthorized response.
func Unauthorized(c *gin.Context, message string) {
	Error(c, http.StatusUnauthorized, message, nil)
}

// Forbidden sends a 403 Forbidden response.
func Forbidden(c *gin.Context, message string) {
	Error(c, http.StatusForbidden, message, nil)
}

// NotFound sends a 404 Not Found response.
func NotFound(c *gin.Context, message string) {
	Error(c, http.StatusNotFound, message, nil)
}

// Conflict sends a 409 Conflict response.
func Conflict(c *gin.Context, message string) {
	Error(c, http.StatusConflict, message, nil)
}

// InternalServerError sends a 500 Internal Server Error response.
func InternalServerError(c *gin.Context, message string) {
	Error(c, http.StatusInternalServerError, message, nil)
}

// ValidationError sends a 422 Unprocessable Entity response with validation errors.
func ValidationError(c *gin.Context, errs interface{}) {
	Error(c, http.StatusUnprocessableEntity, "Validation failed", errs)
}
