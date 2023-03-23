package model

import "gorm.io/gorm"

type WishlistDetail struct {
	gorm.Model
	WishlistID int `json:"wishlist_id"`
	ProductID  int `json:"product_id"`
	Quantity   int `json:"quantity"`
}
