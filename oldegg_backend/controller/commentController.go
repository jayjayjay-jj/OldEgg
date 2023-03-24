package controller

import (
	"oldegg_backend/config"
	"oldegg_backend/model"

	"github.com/gin-gonic/gin"
)

func InsertComment(ctx *gin.Context) {
	var newComment model.Comment
	ctx.ShouldBindJSON(&newComment)
	ctx.JSON(200, newComment)

	config.DB.Create(&newComment)
	ctx.JSON(200, newComment)
}

func ShowAllWishlistComment(ctx *gin.Context) {
	type RequestBody struct {
		ID int64 `json:"id"`
	}

	var requestBody RequestBody
	ctx.ShouldBindJSON(&requestBody)

	var comments []model.Comment
	var users []model.User
	config.DB.
		Table("comments").
		Select("comments.*, users.*").
		Joins("join users on users.id = comments.user_id").
		Where("comments.wishlist_id = ?", requestBody.ID).
		Find(&comments).
		Find(&users)

	ctx.JSON(200, gin.H{"comments": comments, "users": users})
}
