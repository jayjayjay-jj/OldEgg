package model

import "gorm.io/gorm"

type OrderDetail struct {
	gorm.Model
	OrderID   int `json:"order_id"`
	ProductID int `json:"product_id"`
	Quantity  int `json:"quantity"`
}
