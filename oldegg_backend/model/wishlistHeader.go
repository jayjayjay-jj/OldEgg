package model

import "gorm.io/gorm"

type WishlistHeader struct {
	gorm.Model
	WishlistID     int    `json:"wishlist_id"`
	WishlistName   string `json:"wishlist_name"`
	UserID         int    `json:"user_id"`
	WishlistStatus string `json:"wishlist_status"`
	Notes          string `json:"notes"`
}
