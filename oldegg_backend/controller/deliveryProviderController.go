package controller

import (
	"oldegg_backend/config"
	"oldegg_backend/model"

	"github.com/gin-gonic/gin"
)

func ShowAllDeliveryProviders(ctx *gin.Context) {
	deliveries := []model.DeliveryProvider{}
	config.DB.Find(&deliveries)
	ctx.JSON(200, &deliveries)
}
