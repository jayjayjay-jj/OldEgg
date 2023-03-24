package model

import (
	"gorm.io/gorm"
)

type Voucher struct {
	gorm.Model
	Name        string `json:"name"`
	Code        string `json:"code"`
	Description string `json:"description"`
	Amount      int    `json:"amount"`
	Status      string `json:"status"`
}
