package controller

import (
	"oldegg_backend/config"
	"oldegg_backend/model"

	"github.com/gin-gonic/gin"
)

func CreateOrder(ctx *gin.Context) {
	type RequestBody struct {
		UserID     int          `json:"user_id"`
		AddressID  int          `json:"address_id"`
		DeliveryID int          `json:"delivery_id"`
		PaymentID  int          `json:"payment_id"`
		Status     string       `json:"status"`
		CartItem   []model.Cart `json:"cart_items"`
	}

	var body RequestBody
	ctx.ShouldBindJSON(&body)

	var order model.OrderHeader
	order.UserID = body.UserID
	order.AddressID = body.AddressID
	order.DeliveryID = body.DeliveryID
	order.PaymentID = body.PaymentID
	order.Status = "open"

	config.DB.
		Model(model.OrderHeader{}).
		Create(&order)

	itemCount := len(body.CartItem)
	for i := 0; i < itemCount; i++ {

		var detail model.OrderDetail
		detail.OrderID = int(order.ID)
		detail.ProductID = body.CartItem[i].ProductID
		detail.Quantity = body.CartItem[i].Quantity
		config.DB.
			Model(model.OrderDetail{}).
			Create(&detail)
	}

	var cart []model.Cart
	config.DB.
		Model(model.Cart{}).
		Where("user_id = ?", body.UserID).
		Find(&cart)

	cartItemCount := len(cart)
	for i := 0; i < cartItemCount; i++ {
		config.DB.
			Model(model.Cart{}).
			Delete(&cart[i])
	}

	ctx.String(200, "Checkout done!")
}

func GetOrderDetail(ctx *gin.Context) {

	type RequestBody struct {
		OrderID int64  `json:"order_id`
		UserID  int64  `json:"user_id"`
		Status  string `json:"status"`
	}

	var requestBody RequestBody
	ctx.ShouldBindJSON(&requestBody)

	var id []model.OrderHeader
	var orders []model.OrderHeader
	var details []model.OrderDetail
	var products []model.Product
	if requestBody.Status == "all" {
		config.DB.
			Table("order_headers").
			Select("DISTINCT order_details.order_id, order_headers.*, order_details.*, products.*").
			Joins("join order_details on order_headers.id = order_details.order_id").
			Joins("join products on products.id = order_details.product_id").
			Where("order_headers.user_id = ?", requestBody.UserID).
			Where("order_details.order_id = ?", requestBody.OrderID).
			Find(&id).
			Find(&orders).
			Find(&details).
			Find(&products)

	} else if requestBody.Status == "open" {
		config.DB.
			Table("order_headers").
			Select("DISTINCT order_details.order_id, order_headers.*, order_details.*, products.*").
			Joins("join order_details on order_headers.id = order_details.order_id").
			Joins("join products on products.id = order_details.product_id").
			Where("order_headers.user_id = ?", requestBody.UserID).
			Where("order_details.order_id = ?", requestBody.OrderID).
			Where("order_headers.status = ?", "open").
			Find(&id).
			Find(&orders).
			Find(&details).
			Find(&products)

	} else if requestBody.Status == "cancelled" {
		config.DB.
			Table("order_headers").
			Select("DISTINCT order_details.order_id, order_headers.*, order_details.*, products.*").
			Joins("join order_details on order_headers.id = order_details.order_id").
			Joins("join products on products.id = order_details.product_id").
			Where("order_headers.user_id = ?", requestBody.UserID).
			Where("order_details.order_id = ?", requestBody.OrderID).
			Where("order_headers.status = ?", "cancelled").
			Find(&id).
			Find(&orders).
			Find(&details).
			Find(&products)
	}

	ctx.JSON(200, gin.H{"ids": id, "orders": orders, "details": details, "products": products})
}

func GetAllOrder(ctx *gin.Context) {

	type RequestBody struct {
		Status string `json:"status"`
	}

	var requestBody RequestBody
	ctx.ShouldBindJSON(&requestBody)

	var orders []model.OrderHeader
	if requestBody.Status == "all" {
		config.DB.
			Table("order_headers").
			Select("*").
			Find(&orders)

	} else if requestBody.Status == "open" {
		config.DB.
			Table("order_headers").
			Select("*").
			Where("order_headers.status = ?", "open").
			Find(&orders)

	} else if requestBody.Status == "cancelled" {
		config.DB.
			Table("order_headers").
			Select("*").
			Where("order_headers.status = ?", "cancelled").
			Find(&orders)

	} else if requestBody.Status == "finished" {
		config.DB.
			Table("order_headers").
			Select("*").
			Where("order_headers.status = ?", "finished").
			Find(&orders)
	}

	ctx.JSON(200, &orders)
}

func GetUserOrder(ctx *gin.Context) {

	type RequestBody struct {
		UserID int64  `json:"user_id"`
		Status string `json:"status"`
	}

	var requestBody RequestBody
	ctx.ShouldBindJSON(&requestBody)

	var orders []model.OrderHeader
	if requestBody.Status == "all" {
		config.DB.
			Table("order_headers").
			Select("*").
			Where("order_headers.user_id = ?", requestBody.UserID).
			Find(&orders)

	} else if requestBody.Status == "open" {
		config.DB.
			Table("order_headers").
			Select("*").
			Where("order_headers.user_id = ?", requestBody.UserID).
			Where("order_headers.status = ?", "open").
			Find(&orders)

	} else if requestBody.Status == "cancelled" {
		config.DB.
			Table("order_headers").
			Select("*").
			Where("order_headers.user_id = ?", requestBody.UserID).
			Where("order_headers.status = ?", "cancelled").
			Find(&orders)

	} else if requestBody.Status == "finished" {
		config.DB.
			Table("order_headers").
			Select("*").
			Where("order_headers.user_id = ?", requestBody.UserID).
			Where("order_headers.status = ?", "finished").
			Find(&orders)

	}

	ctx.JSON(200, &orders)
}

func UpdateOrderStatus(ctx *gin.Context) {
	var orders model.OrderHeader
	config.DB.Where("id = ?", ctx.Param("id")).First(&orders)

	if orders.Status == "open" {
		orders.Status = "finished"

	} else if orders.Status == "cancelled" {
		orders.Status = "finished"

	}

	config.DB.Save(&orders)
	ctx.JSON(200, &orders)
}
