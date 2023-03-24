package model

import "gorm.io/gorm"

type Newsletter struct {
	gorm.Model
	UserID int    `json:"user_id"`
	Email  string `json:"email"`
}
