package model

import "gorm.io/gorm"

type Shop struct {
	gorm.Model
	ShopID   int    `json:"shop_id" gorm:"primary_key"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
	RoleID   int    `json:"role_id" gorm:"foreign_key:RoleID"`
	Image    string `json:"image"`
	Status   string `json:"status"`
}
