package model

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	Name        string `json:"name"`
	Category    int    `json:"category_id"`
	ShopID      int    `json:"shop_id"`
	Image       string `json:"image"`
	Description string `json:"description"`
	Price       int    `json:"price"`
	Stock       int    `json:"stock"`
	Details     string `json:"details"`
}
