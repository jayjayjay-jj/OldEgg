package model

import (
	"gorm.io/gorm"
)

type Comment struct {
	gorm.Model
	WishlistID int    `json:"wishlist_id"`
	UserID     int    `json:"user_id"`
	Comment    string `json:"comment"`
	Type       string `json:"type"`
}
