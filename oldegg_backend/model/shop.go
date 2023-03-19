package model

import "gorm.io/gorm"

type Shop struct {
	gorm.Model
	Name              string `json:"first_name"`
	Email             string `json:"email"`
	Password          string `json:"password"`
	RoleID            int    `json:"role_id" gorm:"foreign_key:RoleID"`
	Status            string `json:"status"`
}
