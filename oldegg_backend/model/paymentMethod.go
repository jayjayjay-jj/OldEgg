package model

import "gorm.io/gorm"

type PaymentMethod struct {
	gorm.Model
	PaymentName string `json:"payment_name"`
}
