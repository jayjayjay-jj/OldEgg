package model

import "gorm.io/gorm"

type OneTimeCode struct {
	gorm.Model
	Email string `json:"email"`
	Code  string `json:"code"`
}
