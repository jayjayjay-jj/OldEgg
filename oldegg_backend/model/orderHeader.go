package model

import "gorm.io/gorm"

type OrderHeader struct {
	gorm.Model
	UserID     int    `json:"user_id"`
	AddressID  int    `json:"address_id"`
	DeliveryID int    `json:"delivery_id"`
	PaymentID  int    `json:"payment_id"`
	Status     string `json:"status"`
}
