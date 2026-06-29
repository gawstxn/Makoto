package database

import (
	"fmt"
	"log"
	"time"

	"github.com/gawstxn/makoto/api/internal/config"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// ConnectPostgres establishes a connection to the PostgreSQL database using GORM.
func ConnectPostgres(cfg *config.DatabaseConfig) *gorm.DB {
	db, err := gorm.Open(postgres.Open(cfg.URL), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		log.Fatalf("Failed to connect to PostgreSQL: %v", err)
	}

	// Configure connection pooling
	sqlDB, err := db.DB()
	if err != nil {
		log.Fatalf("Failed to get underlying sql.DB: %v", err)
	}

	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)
	sqlDB.SetConnMaxLifetime(time.Hour)

	fmt.Println("✅ Connected to PostgreSQL successfully")
	return db
}
