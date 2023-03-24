package controller

import (
	"oldegg_backend/config"
	"oldegg_backend/model"

	"github.com/gin-gonic/gin"
)

func InsertReview(ctx *gin.Context) {
	var newReview model.Review
	ctx.ShouldBindJSON(&newReview)
	ctx.JSON(200, newReview)

	config.DB.Create(&newReview)
	ctx.JSON(200, newReview)
}

func ShowAllUserReview(ctx *gin.Context) {
	type RequestBody struct {
		ID int64 `json:"user_id"`
	}

	var requestBody RequestBody
	ctx.ShouldBindJSON(&requestBody)

	var reviews []model.Review
	config.DB.
		Table("reviews").
		Select("reviews.*").
		Joins("join users on users.id = reviews.user_id").
		Find(&reviews)

	ctx.JSON(200, &reviews)
}

func ShowUserOrderReview(ctx *gin.Context) {
	type RequestBody struct {
		ID      int64 `json:"user_id"`
		OrderID int64 `json:"order_id"`
	}

	var requestBody RequestBody
	ctx.ShouldBindJSON(&requestBody)

	var reviews []model.Review
	config.DB.
		Table("reviews").
		Select("reviews.*").
		Joins("join users on users.id = reviews.user_id").
		Joins("join order_headers on order_headers.id = reviews.order_id").
		Where("reviews.order_id = ?", requestBody.OrderID).
		Find(&reviews)

	ctx.JSON(200, &reviews)
}

func ShowReviewDetail(ctx *gin.Context) {

	type RequestBody struct {
		ID int64 `json:"id"`
	}

	var requestBody RequestBody
	ctx.ShouldBindJSON(&requestBody)

	var reviews []model.Review
	config.DB.
		Table("reviews").
		Select("reviews.*").
		Where("reviews.id = ?", requestBody.ID).
		Find(&reviews)

	ctx.JSON(200, &reviews)
}

func UpdateUserReview(ctx *gin.Context) {

	type RequestBody struct {
		ReviewID       uint   `json:"review_id"`
		ReviewDelivery int64  `json:"review_delivery"`
		ReviewProduct  int64  `json:"review_product"`
		ReviewService  int64  `json:"review_service"`
		ReviewComment  string `json:"review_comment"`
	}

	var body RequestBody
	ctx.ShouldBindJSON(&body)

	var review model.Review
	config.DB.Model(model.Review{}).Where("id = ?", body.ReviewID).First(&review)

	review.ReviewDelivery = int(body.ReviewDelivery)
	review.ReviewProduct = int(body.ReviewProduct)
	review.ReviewService = int(body.ReviewService)
	review.ReviewComment = body.ReviewComment

	config.DB.Save(&review)
	ctx.JSON(200, review)
}
