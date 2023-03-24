package model

import "gorm.io/gorm"

type ShopDesc struct {
	gorm.Model
	ShopID int    `json:"shop_id"`
	Desc   string `json:"desc"`
}
