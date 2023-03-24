package model

import "gorm.io/gorm"

type Cart struct {
	gorm.Model
	CartID    int `json:"cart_id"`
	UserID    int `json:"user_id"`
	ProductID int `json:"product_id"`
	Quantity  int `json:"quantity"`
}
