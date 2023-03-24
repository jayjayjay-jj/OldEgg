package controller

import (
	"oldegg_backend/config"
	"oldegg_backend/model"

	"github.com/gin-gonic/gin"
)

func InsertProductToLater(ctx *gin.Context) {

	type RequestBody struct {
		UserID    int64 `json:"user_id"`
		ProductID int64 `json:"product_id"`
		Quantity  int   `json:"quantity"`
	}

	var body RequestBody
	ctx.ShouldBindJSON(&body)
	ctx.JSON(200, &body)

	var later model.Later
	later.UserID = int(body.UserID)
	later.ProductID = int(body.ProductID)
	later.Quantity = body.Quantity

	var existLater model.Later
	config.DB.
		Model(model.Later{}).
		Where("user_id = ?", body.UserID).
		Where("product_id = ?", body.ProductID).
		First(&existLater)

	if existLater.ID == 0 {
		config.DB.Model(model.Later{}).Create(&later)

	} else {
		existLater.Quantity += body.Quantity
		config.DB.Save(&existLater)

	}

	// fmt.Println(existLater.Quantity)
	ctx.JSON(200, &later)
}

func GetLaterByUserId(ctx *gin.Context) {

	type RequestBody struct {
		UserID int64 `json:"user_id"`
	}

	var requestBody RequestBody
	ctx.ShouldBindJSON(&requestBody)

	var laters []model.Later
	var products []model.Product
	config.DB.
		Table("laters").
		Select("laters.*, products.*").
		Joins("join products on products.id = laters.product_id").
		Where("user_id = ?", requestBody.UserID).
		Find(&laters).
		Find(&products)

	ctx.JSON(200, gin.H{"laters": laters, "products": products})
}
