package model

import "gorm.io/gorm"

type DeliveryProvider struct {
	gorm.Model
	DeliveryName string `json:"delivery_name"`
}
