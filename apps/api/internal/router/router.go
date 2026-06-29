package router

import (
	"github.com/gawstxn/makoto/api/internal/handler"
	"github.com/gawstxn/makoto/api/internal/middleware"
	"github.com/gawstxn/makoto/api/internal/service"
	"github.com/gin-gonic/gin"
)

// Setup configures all routes for the application.
func Setup(
	engine *gin.Engine,
	authHandler *handler.AuthHandler,
	userHandler *handler.UserHandler,
	authService service.AuthService,
) {
	// API v1 group
	v1 := engine.Group("/api/v1")

	// Health check
	v1.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})

	// Public routes — no authentication required
	auth := v1.Group("/auth")
	{
		auth.POST("/register", authHandler.Register)
		auth.POST("/login", authHandler.Login)
		auth.POST("/refresh", authHandler.Refresh)
	}

	// Protected routes — JWT authentication required
	protected := v1.Group("")
	protected.Use(middleware.Auth(authService))
	{
		users := protected.Group("/users")
		{
			users.GET("/me", userHandler.GetMe)
			users.GET("", userHandler.GetAll)
			users.GET("/:id", userHandler.GetByID)
			users.PUT("/:id", userHandler.Update)
			users.DELETE("/:id", userHandler.Delete)
		}
	}
}
