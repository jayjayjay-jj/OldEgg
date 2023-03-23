package controller

import (
	"oldegg_backend/config"
	"oldegg_backend/model"

	"github.com/gin-gonic/gin"
)

func ShowAllCategories(ctx *gin.Context) {
	categories := []model.Category{}
	config.DB.Find(&categories)
	ctx.JSON(200, &categories)
}
