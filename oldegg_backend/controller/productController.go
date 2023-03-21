package controller

import (
	"oldegg_backend/config"
	"oldegg_backend/model"

	"github.com/gin-gonic/gin"
)

func InsertProduct(ctx *gin.Context) {
	var newProduct model.Product
	ctx.ShouldBindJSON(&newProduct)
	ctx.JSON(200, newProduct)

	config.DB.Create(&newProduct)
	ctx.JSON(200, newProduct)
}

func GetProductByShop(ctx *gin.Context) {

	type RequestBody struct {
		ShopID int64 `json:"shop_id"`
	}

	var requestBody RequestBody
	ctx.ShouldBindJSON(&requestBody)

	var product []model.Product
	config.DB.Model([]model.Product{}).Where("shop_id = ?", requestBody.ShopID).Find(&product)

	ctx.JSON(200, &product)
}

func ShowProductByShopPagination(ctx *gin.Context) {

	type RequestBody struct {
		ShopID       int64 `json:"shop_id"`
		ProductPage  int   `json:"productpage"`
		ProductLimit int   `json:"productlimit"`
	}

	var body RequestBody
	ctx.ShouldBindJSON(&body)

	offset := (body.ProductPage - 1) * body.ProductLimit

	var product []model.Product
	config.DB.Model([]model.Product{}).Where("shop_id = ?", body.ShopID).Limit(body.ProductLimit).Offset(offset).Find(&product)

	ctx.JSON(200, &product)
}

func ShowProductByShopPaginationStock(ctx *gin.Context) {

	type RequestBody struct {
		ShopID       int64  `json:"shop_id"`
		StockStatus  string `json:"stock_status"`
		ProductPage  int    `json:"productpage"`
		ProductLimit int    `json:"productlimit"`
	}

	var body RequestBody
	ctx.ShouldBindJSON(&body)

	offset := (body.ProductPage - 1) * body.ProductLimit

	var product []model.Product
	if body.StockStatus == "All" {
		config.DB.Model([]model.Product{}).Where("shop_id = ?", body.ShopID).Limit(body.ProductLimit).Offset(offset).Find(&product)

	} else if body.StockStatus == "Available" {
		config.DB.Model([]model.Product{}).Where("shop_id = ? and stock != ?", body.ShopID, 0).Limit(body.ProductLimit).Offset(offset).Find(&product)

	} else if body.StockStatus == "Out of Stock" {
		config.DB.Model([]model.Product{}).Where("shop_id = ? and stock = ?", body.ShopID, 0).Limit(body.ProductLimit).Offset(offset).Find(&product)
	}

	ctx.JSON(200, &product)
}

func SearchProduct(c *gin.Context) {

	type Body struct {
		Keyword string `json:"keyword"`
	}
	var body Body
	c.ShouldBindJSON(&body)

	if body.Keyword == "" {
		return
	}

	var products []model.Product
	config.DB.Model(model.Product{}).Where("name ILIKE ?", "%"+body.Keyword+"%").Limit(5).Find(&products)

	c.JSON(200, products)

}
