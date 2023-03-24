package controller

import (
	"oldegg_backend/config"
	"oldegg_backend/model"

	"github.com/gin-gonic/gin"
)

func InsertAddress(ctx *gin.Context) {
	var newAddress model.Address
	ctx.ShouldBindJSON(&newAddress)
	ctx.JSON(200, newAddress)

	config.DB.Create(&newAddress)
	ctx.JSON(200, newAddress)
}

func ShowAllAddresses(ctx *gin.Context) {
	addresses := []model.Address{}
	config.DB.Find(&addresses)
	ctx.JSON(200, &addresses)
}

func ShowUserAddresses(ctx *gin.Context) {
	type RequestBody struct {
		UserID int64 `json:"user_id"`
	}

	var body RequestBody
	ctx.ShouldBindJSON(&body)

	var addresses []model.Address
	config.DB.
		Table("addresses").
		Select("*").
		Where("addresses.user_id = ?", body.UserID).
		Find(&addresses)

	ctx.JSON(200, addresses)
}

func DeleteAddress(ctx *gin.Context) {
	type RequestBody struct {
		ID int64 `json:"id"`
	}

	var body RequestBody
	ctx.ShouldBindJSON(&body)

	var address model.Address
	config.DB.
		Model(model.Address{}).
		Where("addresses.id = ?", body.ID).
		Unscoped().
		Delete(&model.Address{})

	ctx.JSON(200, &address)
}
