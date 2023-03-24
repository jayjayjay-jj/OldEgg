package controller

import (
	"oldegg_backend/config"
	"oldegg_backend/model"

	"github.com/gin-gonic/gin"
)

func InsertProductToCart(ctx *gin.Context) {

	type RequestBody struct {
		UserID    int64 `json:"user_id"`
		ProductID int64 `json:"product_id"`
		Quantity  int   `json:"quantity"`
	}

	var body RequestBody
	ctx.ShouldBindJSON(&body)

	var cart model.Cart
	cart.UserID = int(body.UserID)
	cart.ProductID = int(body.ProductID)
	cart.Quantity = body.Quantity

	var existCart model.Cart
	config.DB.
		Model(model.Cart{}).
		Where("user_id = ?", body.UserID).
		Where("product_id = ?", body.ProductID).
		First(&existCart)

	if existCart.ID == 0 {
		config.DB.Model(model.Cart{}).Create(&cart)

	} else {
		existCart.Quantity += body.Quantity
		config.DB.Save(&existCart)

	}

	ctx.JSON(200, &cart)
}

func GetCartByUserId(ctx *gin.Context) {

	type RequestBody struct {
		UserID int64 `json:"user_id"`
	}

	var requestBody RequestBody
	ctx.ShouldBindJSON(&requestBody)

	var carts []model.Cart
	var products []model.Product
	config.DB.
		Table("carts").
		Select("carts.*, products.*").
		Joins("join products on products.id = carts.product_id").
		Where("user_id = ?", requestBody.UserID).
		Find(&carts).
		Find(&products)

	ctx.JSON(200, gin.H{"carts": carts, "products": products})
}

func GetCartDetailItem(ctx *gin.Context) {

	type RequestBody struct {
		CartID    int64 `json:"id"`
		ProductID int64 `json:"product_id"`
	}

	var body RequestBody
	ctx.ShouldBindJSON(&body)

	var cart model.Cart
	var product model.Product
	config.DB.
		Table("carts").
		Select("carts.*, products.*").
		Joins("join products on products.id = carts.product_id").
		Where("carts.id = ?", body.CartID).
		Where("carts.product_id = ?", body.ProductID).
		First(&cart).
		First(&product)

	ctx.JSON(200, gin.H{"cart": cart, "product": product})
}

func UpdateCartQuantity(ctx *gin.Context) {

	type RequestBody struct {
		CartID    int64 `json:"id"`
		ProductID int64 `json:"product_id"`
		Quantity  int   `json:"quantity"`
	}

	var body RequestBody
	ctx.ShouldBindJSON(&body)

	var cart model.Cart
	config.DB.Model(model.Cart{}).
		Where("cart_id = ?", body.CartID).
		Where("product_id = ?", body.ProductID).
		First(&cart)

	cart.Quantity = body.Quantity

	config.DB.Save(&cart)
	ctx.JSON(200, cart)
}

func DeleteCartItem(ctx *gin.Context) {

	type RequestBody struct {
		CartID    int64 `json:"id"`
		ProductID int64 `json:"product_id"`
	}

	var body RequestBody
	ctx.ShouldBindJSON(&body)

	var cart model.Cart
	config.DB.Model(model.Cart{}).
		Where("id = ?", body.CartID).
		Where("product_id = ?", body.ProductID).
		Unscoped().
		Delete(&model.Cart{})

	ctx.JSON(200, &cart)
}
