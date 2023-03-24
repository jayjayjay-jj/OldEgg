package controller

import (
	"oldegg_backend/config"
	"oldegg_backend/model"

	"github.com/gin-gonic/gin"
)

func InsertProductToWishlist(ctx *gin.Context) {
	var newWishlistDetail model.WishlistDetail
	ctx.ShouldBindJSON(&newWishlistDetail)
	ctx.JSON(200, newWishlistDetail)

	config.DB.Create(&newWishlistDetail)
	ctx.JSON(200, newWishlistDetail)
}

func GetDetailsByID(ctx *gin.Context) {

	type RequestBody struct {
		WishlistID int   `json:"wishlist_id"`
		ProductID  int64 `json:"product_id"`
	}

	var body RequestBody
	ctx.ShouldBindJSON(&body)

	var wishlist model.WishlistDetail
	var product model.Product
	config.DB.
		Table("wishlist_details").
		Select("wishlist_details.* , products.*").
		Joins("join products on products.id = wishlist_details.product_id").
		Where("wishlist_details.wishlist_id = ?", body.WishlistID).
		Where("wishlist_details.product_id = ?", body.ProductID).
		First(&wishlist).
		First(&product)

	ctx.JSON(200, gin.H{"wishlist": wishlist, "product": product})
}

func GetWishlistDetailByID(ctx *gin.Context) {
	type RequestBody struct {
		ID int64 `json:"id"`
	}

	var body RequestBody
	ctx.ShouldBindJSON(&body)

	var products []model.Product
	var wishlists []model.WishlistHeader
	var details []model.WishlistDetail
	config.DB.
		Table("wishlist_details").
		Select("*").
		Joins("join wishlist_headers on wishlist_details.wishlist_id = wishlist_headers.id").
		Joins("join products on products.id = wishlist_details.product_id").
		Where("wishlist_details.product_id = ?", body.ID).
		Find(&products).
		Find(&wishlists).
		Find(&details)

	ctx.JSON(200, gin.H{"products": products, "wishlists": wishlists, "details": details})
}

func GetWishlistHeaderDetails(ctx *gin.Context) {
	type RequestBody struct {
		ID int64 `json:"id"`
	}

	var body RequestBody
	ctx.ShouldBindJSON(&body)

	var products []model.Product
	var details []model.WishlistDetail
	config.DB.
		Table("wishlist_details").
		Select("*").
		Joins("join wishlist_headers on wishlist_details.wishlist_id = wishlist_headers.id").
		Joins("join products on products.id = wishlist_details.product_id").
		Where("wishlist_headers.id = ?", body.ID).
		Find(&products).
		Find(&details)

	ctx.JSON(200, gin.H{"products": products, "details": details})
}

func UpdateDetailQuantity(ctx *gin.Context) {

	type RequestBody struct {
		WishlistID int64 `json:"wishlist_id"`
		ProductID  int64 `json:"product_id"`
		Quantity   int64 `json:"quantity"`
	}

	var body RequestBody
	ctx.ShouldBindJSON(&body)

	var wishlist model.WishlistDetail
	config.DB.Model(model.WishlistDetail{}).
		Where("wishlist_id = ?", body.WishlistID).
		Where("product_id = ?", body.ProductID).
		First(&wishlist)

	wishlist.Quantity = int(body.Quantity)

	config.DB.Save(&wishlist)
	ctx.JSON(200, wishlist)
}

func DeleteDetailItem(ctx *gin.Context) {

	type RequestBody struct {
		WishlistID int64 `json:"wishlist_id"`
		ProductID  int64 `json:"product_id"`
	}

	var body RequestBody
	ctx.ShouldBindJSON(&body)

	var wishlist model.WishlistDetail
	config.DB.Model(model.WishlistDetail{}).
		Where("wishlist_id = ?", body.WishlistID).
		Where("product_id = ?", body.ProductID).
		Unscoped().
		Delete(&model.WishlistDetail{})

	ctx.JSON(200, &wishlist)
}
