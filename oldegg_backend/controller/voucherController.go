package controller

import (
	"oldegg_backend/config"
	"oldegg_backend/model"

	"github.com/gin-gonic/gin"
)

func InsertVoucher(ctx *gin.Context) {
	var newVoucher model.Voucher
	ctx.ShouldBindJSON(&newVoucher)
	ctx.JSON(200, newVoucher)

	config.DB.Create(&newVoucher)
	ctx.JSON(200, newVoucher)
}

func ShowAllVoucher(ctx *gin.Context) {
	vouchers := []model.Voucher{}
	config.DB.Find(&vouchers)
	ctx.JSON(200, &vouchers)
}
