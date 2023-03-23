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

func GetProductByShopStatus(ctx *gin.Context) {

	type RequestBody struct {
		ID int64 `json:"id"`
	}

	var body RequestBody
	ctx.ShouldBindJSON(&body)

	var product []model.Product
	config.DB.
		Table("shops").
		Select("*").
		Joins("join products on products.shop_id = shops.id").
		Where("products.id = ?", body.ID).
		Where("shops.status = ?", "Active").
		Find(&product)

	ctx.JSON(200, &product)
}

func GetProductCount(ctx *gin.Context) {

	type RequestBody struct {
		ShopName string `json:"shop_name"`
	}

	var body RequestBody
	ctx.ShouldBindJSON(&body)

	var count int64
	config.DB.
		Table("shops").
		Select("*").
		Joins("join products on products.shop_id = shops.id").
		Where("products.shop_id = shops.id").
		Where("shops.name = ?", body.ShopName).
		Count(&count)

	ctx.JSON(200, &count)
}

func ShowAllProducts(ctx *gin.Context) {
	products := []model.Product{}
	config.DB.Find(&products)
	ctx.JSON(200, &products)
}

func ShowAllProductsPagination(ctx *gin.Context) {

	type RequestBody struct {
		ProductPage  int `json:"productpage"`
		ProductLimit int `json:"productlimit"`
	}

	var body RequestBody
	ctx.ShouldBindJSON(&body)

	offset := (body.ProductPage - 1) * body.ProductLimit

	var product []model.Product
	config.DB.Limit(body.ProductLimit).Offset(offset).Find(&product)

	ctx.JSON(200, &product)
}

func ShowHomeProductsPagination(ctx *gin.Context) {

	type RequestBody struct {
		ProductPage int `json:"productpage"`
	}

	var body RequestBody
	ctx.ShouldBindJSON(&body)

	var product []model.Product
	config.DB.Limit(9).Find(&product)

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

func ShowProductByShopNamePaginationStock(ctx *gin.Context) {

	type RequestBody struct {
		ShopName     string `json:"shop_name"`
		StockStatus  string `json:"stock_status"`
		ProductPage  int    `json:"productpage"`
		ProductLimit int    `json:"productlimit"`
	}

	var body RequestBody
	ctx.ShouldBindJSON(&body)

	offset := (body.ProductPage - 1) * body.ProductLimit

	var product []model.Product
	if body.StockStatus == "All" {
		config.DB.
			Table("shops").
			Select("*").
			Joins("join products on products.shop_id = shops.id").
			Where("products.shop_id = shops.id").
			Where("shops.name = ?", body.ShopName).
			Limit(body.ProductLimit).
			Offset(offset).
			Find(&product)

	} else if body.StockStatus == "Available" {
		config.DB.
			Table("shops").
			Select("*").
			Joins("join products on products.shop_id = shops.id").
			Where("products.shop_id = shops.id").
			Where("shops.name = ?", body.ShopName).
			Where("stock != ?", 0).
			Limit(body.ProductLimit).
			Offset(offset).
			Find(&product)

	} else if body.StockStatus == "Out of Stock" {
		config.DB.
			Table("shops").
			Select("*").
			Joins("join products on products.shop_id = shops.id").
			Where("products.shop_id = shops.id").
			Where("shops.name = ?", body.ShopName).
			Where("stock = ?", 0).
			Limit(body.ProductLimit).
			Offset(offset).
			Find(&product)
	}

	ctx.JSON(200, &product)
}

func GetProductsById(c *gin.Context) {

	type RequestBody struct {
		ID int64 `json:"id"`
	}

	var requestBody RequestBody
	c.ShouldBindJSON(&requestBody)

	var product model.Product
	config.DB.Model(model.Product{}).Where("id = ?", requestBody.ID).First(&product)

	c.JSON(200, &product)
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
