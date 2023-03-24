package controller

import (
	"oldegg_backend/config"
	"oldegg_backend/model"

	"github.com/gin-gonic/gin"
)

func GetShopDescByShop(ctx *gin.Context) {

	type RequestBody struct {
		ShopID int64 `json:"shop_id"`
	}

	var requestBody RequestBody
	ctx.ShouldBindJSON(&requestBody)

	var shop []model.ShopDesc
	config.DB.
		Table("shop_descs").
		Select("*").
		Where("shop_id = ?", requestBody.ShopID).
		Find(&shop)

	ctx.JSON(200, shop)
}

func UpdateShopDesc(ctx *gin.Context) {

	type RequestBody struct {
		ID     int64  `json:"id"`
		ShopID int64  `json:"shop_id"`
		Desc   string `json:"desc"`
	}

	var body RequestBody
	ctx.ShouldBindJSON(&body)

	var desc model.ShopDesc
	config.DB.
		Model(model.ShopDesc{}).
		Where("id = ?", body.ID).
		Where("shop_id = ?", body.ShopID).
		First(&desc)
	desc.Desc = body.Desc

	config.DB.Save(&desc)
	ctx.JSON(200, desc)
}
