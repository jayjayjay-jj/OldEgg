package controller

import (
	"oldegg_backend/config"
	"oldegg_backend/model"

	"github.com/gin-gonic/gin"
)

func CreateWishlist(ctx *gin.Context) {
	var wishlist model.WishlistHeader
	ctx.ShouldBindJSON(&wishlist)
	ctx.JSON(200, wishlist)

	config.DB.Create(&wishlist)
	ctx.JSON(200, wishlist)
}

func GetWishlistByUserId(ctx *gin.Context) {

	type RequestBody struct {
		UserID int64 `json:"user_id"`
	}

	var requestBody RequestBody
	ctx.ShouldBindJSON(&requestBody)

	var wishlist []model.WishlistHeader
	config.DB.Model([]model.WishlistHeader{}).Where("user_id = ?", requestBody.UserID).Find(&wishlist)

	ctx.JSON(200, &wishlist)
}

func ShowAllWishlists(ctx *gin.Context) {
	wishlist := []model.WishlistHeader{}
	config.DB.Find(&wishlist)
	ctx.JSON(200, &wishlist)
}

func GetWishlistById(ctx *gin.Context) {

	type RequestBody struct {
		WishlistId int64 `json:"id"`
	}

	var body RequestBody
	ctx.ShouldBindJSON(&body)

	var wishlistHeader model.WishlistHeader
	config.DB.Model(model.WishlistHeader{}).Where("id = ?", body.WishlistId).First(&wishlistHeader)

	ctx.JSON(200, &wishlistHeader)
}

func UpdateWishlistHeader(ctx *gin.Context) {

	type RequestBody struct {
		id             uint   `json:"id"`
		WishlistName   string `json:"wishlist_name"`
		WishlistStatus string `json:"wishlist_status"`
	}

	var body RequestBody
	ctx.ShouldBindJSON(&body)

	var wishlist model.WishlistHeader
	config.DB.Model(model.WishlistHeader{}).Where("id = ?", body.id).First(&wishlist)
	wishlist.WishlistName = body.WishlistName
	wishlist.WishlistStatus = body.WishlistStatus

	config.DB.Save(&wishlist)
	ctx.JSON(200, wishlist)
}
