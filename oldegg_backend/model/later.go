package model

import "gorm.io/gorm"

type Later struct {
	gorm.Model
	LaterID   int `json:"later_id"`
	UserID    int `json:"user_id"`
	ProductID int `json:"product_id"`
	Quantity  int `json:"quantity"`
}
