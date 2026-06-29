package main

import (
	"fmt"
	"log"

	"github.com/gawstxn/makoto/api/internal/config"
	"github.com/gawstxn/makoto/api/internal/database"
	"github.com/gawstxn/makoto/api/internal/handler"
	"github.com/gawstxn/makoto/api/internal/middleware"
	"github.com/gawstxn/makoto/api/internal/model"
	"github.com/gawstxn/makoto/api/internal/repository"
	"github.com/gawstxn/makoto/api/internal/router"
	"github.com/gawstxn/makoto/api/internal/service"
	"github.com/gin-gonic/gin"
)

func main() {
	// Load configuration
	cfg := config.Load()

	// Connect to PostgreSQL
	db := database.ConnectPostgres(&cfg.Database)

	// Auto-migrate models
	if err := db.AutoMigrate(&model.User{}); err != nil {
		log.Fatalf("Failed to auto-migrate: %v", err)
	}
	fmt.Println("✅ Database migration completed")

	// Initialize layers
	// Repositories
	userRepo := repository.NewUserRepository(db)

	// Services
	authService := service.NewAuthService(&cfg.JWT)
	userService := service.NewUserService(userRepo, authService)

	// Handlers
	authHandler := handler.NewAuthHandler(userService)
	userHandler := handler.NewUserHandler(userService)

	// Setup Gin engine
	engine := gin.New()

	// Apply global middleware
	engine.Use(middleware.ErrorHandler())
	engine.Use(middleware.Logger())
	engine.Use(middleware.CORS())

	// Register routes
	router.Setup(engine, authHandler, userHandler, authService)

	// Start server
	addr := ":" + cfg.Server.Port
	fmt.Printf("🚀 Server starting on http://localhost%s\n", addr)
	if err := engine.Run(addr); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
