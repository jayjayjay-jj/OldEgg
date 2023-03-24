package controller

import (
	"oldegg_backend/config"
	"oldegg_backend/model"

	"github.com/gin-gonic/gin"
)

func ShowAllPaymentMethods(ctx *gin.Context) {
	payments := []model.PaymentMethod{}
	config.DB.Find(&payments)
	ctx.JSON(200, &payments)
}
