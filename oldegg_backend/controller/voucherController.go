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

func SearchVoucher(ctx *gin.Context) {

	type RequestBody struct {
		Code string `json:"code"`
	}

	var body RequestBody
	ctx.ShouldBindJSON(&body)

	var voucher model.Voucher
	config.DB.
		Model(model.Voucher{}).
		Where("code = ?", body.Code).
		First(&voucher)

	if voucher.ID == 0 {
		ctx.String(200, "Voucher Not Found!")
		return
	}

	if voucher.Status == "invalid" {
		ctx.String(200, "Voucher is invalid!")
		return
	}

	ctx.JSON(200, &voucher)
}
