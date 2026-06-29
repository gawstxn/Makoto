package middleware

import (
	"fmt"
	"net/http"

	"github.com/gawstxn/makoto/api/pkg/response"
	"github.com/gin-gonic/gin"
)

// ErrorHandler returns a middleware that recovers from panics and returns
// a standardized error response instead of crashing the server.
func ErrorHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if err := recover(); err != nil {
				fmt.Printf("[PANIC RECOVERED] %v\n", err)
				response.Error(c, http.StatusInternalServerError, "Internal server error", nil)
				c.Abort()
			}
		}()
		c.Next()
	}
}
