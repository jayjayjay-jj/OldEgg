package model

import "gorm.io/gorm"

type Address struct {
	gorm.Model
	UserID      int    `json:"user_id"`
	AddressName string `json:"address_name"`
}
