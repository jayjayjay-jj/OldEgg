package model

import "gorm.io/gorm"

type Review struct {
	gorm.Model
	UserID         int    `json:"user_id"`
	OrderID        int    `json:"order_id"`
	ReviewDelivery int    `json:"review_delivery"`
	ReviewProduct  int    `json:"review_product"`
	ReviewService  int    `json:"review_service"`
	ReviewComment  string `json:"review_comment"`
}
