package model

import "gorm.io/gorm"

type Category struct {
	gorm.Model
	CategoryID   int    `json:"category_id" gorm:"primary_key"`
	CategoryName string `json:"category_name"`
}
