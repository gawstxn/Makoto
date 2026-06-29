package middleware

import (
	"strings"

	"github.com/gawstxn/makoto/api/internal/service"
	"github.com/gawstxn/makoto/api/pkg/response"
	"github.com/gin-gonic/gin"
)

// Auth returns a middleware that validates JWT tokens from the Authorization header.
// It extracts the Bearer token, validates it via AuthService, and sets userID and email
// into the Gin context for downstream handlers.
func Auth(authService service.AuthService) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			response.Unauthorized(c, "Authorization header is required")
			c.Abort()
			return
		}

		// Expect "Bearer <token>"
		parts := strings.SplitN(authHeader, " ", 2)
		if len(parts) != 2 || !strings.EqualFold(parts[0], "Bearer") {
			response.Unauthorized(c, "Invalid authorization format, expected: Bearer <token>")
			c.Abort()
			return
		}

		tokenString := parts[1]
		claims, err := authService.ValidateToken(tokenString)
		if err != nil {
			response.Unauthorized(c, "Invalid or expired token")
			c.Abort()
			return
		}

		// Set user info in context for downstream handlers
		c.Set("userID", claims.UserID)
		c.Set("email", claims.Email)

		c.Next()
	}
}
