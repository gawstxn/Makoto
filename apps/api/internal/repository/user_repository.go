package repository

import (
	"github.com/gawstxn/makoto/api/internal/model"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// UserRepository defines the interface for user data access operations.
type UserRepository interface {
	Create(user *model.User) error
	FindByID(id uuid.UUID) (*model.User, error)
	FindByEmail(email string) (*model.User, error)
	FindAll(page, limit int) ([]model.User, int64, error)
	Update(user *model.User) error
	Delete(id uuid.UUID) error
}

// userRepository implements UserRepository using GORM.
type userRepository struct {
	db *gorm.DB
}

// NewUserRepository creates a new UserRepository instance.
func NewUserRepository(db *gorm.DB) UserRepository {
	return &userRepository{db: db}
}

// Create inserts a new user into the database.
func (r *userRepository) Create(user *model.User) error {
	return r.db.Create(user).Error
}

// FindByID retrieves a user by their UUID.
func (r *userRepository) FindByID(id uuid.UUID) (*model.User, error) {
	var user model.User
	if err := r.db.Where("id = ?", id).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

// FindByEmail retrieves a user by their email address.
func (r *userRepository) FindByEmail(email string) (*model.User, error) {
	var user model.User
	if err := r.db.Where("email = ?", email).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

// FindAll retrieves a paginated list of users and the total count.
func (r *userRepository) FindAll(page, limit int) ([]model.User, int64, error) {
	var users []model.User
	var total int64

	offset := (page - 1) * limit

	if err := r.db.Model(&model.User{}).Count(&total).Error; err != nil {
		return nil, 0, err
	}

	if err := r.db.Offset(offset).Limit(limit).Order("created_at DESC").Find(&users).Error; err != nil {
		return nil, 0, err
	}

	return users, total, nil
}

// Update saves changes to an existing user.
func (r *userRepository) Update(user *model.User) error {
	return r.db.Save(user).Error
}

// Delete soft-deletes a user by their UUID.
func (r *userRepository) Delete(id uuid.UUID) error {
	return r.db.Where("id = ?", id).Delete(&model.User{}).Error
}
