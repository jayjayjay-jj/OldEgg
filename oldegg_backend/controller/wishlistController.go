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

func GetWishlistByUser(ctx *gin.Context) {

	type RequestBody struct {
		WishlistId int64 `json:"user_id"`
	}

	var body RequestBody
	ctx.ShouldBindJSON(&body)

	var wishlistHeader []model.WishlistHeader
	config.DB.
		Model(model.WishlistHeader{}).
		Where("user_id = ?", body.WishlistId).
		Find(&wishlistHeader)

	ctx.JSON(200, &wishlistHeader)
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

func ShowAllPublicWishlists(ctx *gin.Context) {
	var users []model.User
	var wishlists []model.WishlistHeader

	config.DB.
		Table("wishlist_headers").
		Select("wishlist_headers.*, users.*").
		Joins("join users on users.id = wishlist_headers.user_id").
		Where("wishlist_status = ?", "Public").
		Find(&users).
		Find(&wishlists)

	ctx.JSON(200, gin.H{"users": users, "wishlists": wishlists})
}

func ShowAllPublicWishlistsPagination(ctx *gin.Context) {
	type RequestBody struct {
		WishPage  int `json:"wishpage"`
		WishLimit int `json:"wishlimit"`
	}

	var body RequestBody
	ctx.ShouldBindJSON(&body)

	offset := (body.WishPage - 1) * body.WishLimit

	var users []model.User
	var wishlists []model.WishlistHeader

	config.DB.
		Table("wishlist_headers").
		Select("wishlist_headers.*, users.*").
		Joins("join users on users.id = wishlist_headers.user_id").
		Where("wishlist_status = ?", "Public").
		Limit(body.WishLimit).
		Offset(offset).
		Find(&users).
		Find(&wishlists)

	ctx.JSON(200, gin.H{"users": users, "wishlists": wishlists})
}

func UpdateWishlistHeader(ctx *gin.Context) {

	type RequestBody struct {
		WishlistId     int64  `json:"id"`
		WishlistName   string `json:"wishlist_name"`
		WishlistStatus string `json:"wishlist_status"`
	}

	var body RequestBody
	ctx.ShouldBindJSON(&body)

	var wishlist model.WishlistHeader
	config.DB.Model(model.WishlistHeader{}).Where("id = ?", body.WishlistId).First(&wishlist)
	wishlist.WishlistName = body.WishlistName
	wishlist.WishlistStatus = body.WishlistStatus

	config.DB.Save(&wishlist)
	ctx.JSON(200, wishlist)
}

func UpdateWishlistHeaderNote(ctx *gin.Context) {

	type RequestBody struct {
		WishlistId   int64  `json:"id"`
		WishlistNote string `json:"notes"`
	}

	var body RequestBody
	ctx.ShouldBindJSON(&body)

	var wishlist model.WishlistHeader
	config.DB.Model(model.WishlistHeader{}).Where("id = ?", body.WishlistId).First(&wishlist)
	wishlist.Notes = body.WishlistNote

	config.DB.Save(&wishlist)
	ctx.JSON(200, wishlist)
}
