package config

import (
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
)

// Config holds all configuration for the application.
type Config struct {
	Server   ServerConfig
	Database DatabaseConfig
	JWT      JWTConfig
}

// ServerConfig holds server-related configuration.
type ServerConfig struct {
	Port string
}

// DatabaseConfig holds PostgreSQL connection configuration.
type DatabaseConfig struct {
	URL string
}

// JWTConfig holds JWT-related configuration.
type JWTConfig struct {
	Secret        string
	AccessExpiry  time.Duration
	RefreshExpiry time.Duration
}

// Load reads configuration from environment variables.
// It loads a .env file if present (for local development).
func Load() *Config {
	// Load .env file if it exists (ignore error if not found)
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using environment variables")
	}

	return &Config{
		Server: ServerConfig{
			Port: getEnv("SERVER_PORT", "8080"),
		},
		Database: DatabaseConfig{
			URL: getEnv("DATABASE_URL", "postgres://postgres:postgres@localhost:5432/makoto?sslmode=disable"),
		},
		JWT: JWTConfig{
			Secret:        getEnv("JWT_SECRET", "your-super-secret-key-change-in-production"),
			AccessExpiry:  parseDuration(getEnv("JWT_ACCESS_EXPIRY", "15m")),
			RefreshExpiry: parseDuration(getEnv("JWT_REFRESH_EXPIRY", "168h")),
		},
	}
}

// getEnv reads an environment variable or returns a default value.
func getEnv(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}

// parseDuration parses a duration string, falling back to 15 minutes on error.
func parseDuration(s string) time.Duration {
	d, err := time.ParseDuration(s)
	if err != nil {
		log.Printf("Warning: invalid duration %q, using default 15m", s)
		return 15 * time.Minute
	}
	return d
}
