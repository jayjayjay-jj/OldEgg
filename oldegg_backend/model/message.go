package model

import "gorm.io/gorm"

type Message struct {
	gorm.Model
	From    string `json:"from"`
	To      string `json:"to"`
	Message string `json:"message"`
}
