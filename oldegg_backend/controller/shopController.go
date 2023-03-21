package controller

import (
	"oldegg_backend/config"
	"oldegg_backend/model"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

func InsertShop(ctx *gin.Context) {
	var newShop model.Shop
	ctx.ShouldBindJSON(&newShop)
	ctx.JSON(200, newShop)

	var countEmail int64 = 0
	config.DB.Model(model.User{}).Where("email = ?", newShop.Email).Count(&countEmail)
	if countEmail != 0 {
		ctx.String(200, "Email is not unique")

		return
	}

	// Minimum length for password is 8
	hash, error := bcrypt.GenerateFromPassword([]byte(newShop.Password), 8)

	if error != nil {
		ctx.String(200, "Password hashing failed")
		return
	}

	newShop.Password = string(hash)

	config.DB.Create(&newShop)
	ctx.JSON(200, newShop)
}

func ShopSignIn(ctx *gin.Context) {
	var attemptShopLogin, shopCreated model.Shop
	ctx.ShouldBindJSON(&attemptShopLogin)

	config.DB.Model(model.Shop{}).Where("email = ?", attemptShopLogin.Email).First(&shopCreated)

	if shopCreated.ID == 0 {
		ctx.String(200, "Email not found!")
		return
	}

	error := bcrypt.CompareHashAndPassword([]byte(shopCreated.Password), []byte(attemptShopLogin.Password))
	if error != nil {
		ctx.String(200, "Password not found!")
		return
	}

	if shopCreated.Status == "Banned" {
		ctx.String(200, "Banned!")
		return
	}

	// Generate JWT
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"subject": shopCreated.Email,
		"expire":  time.Now().Add(time.Hour * 72).Unix(),
	})

	tokenString, error := token.SignedString([]byte(os.Getenv("key")))
	if error != nil {
		ctx.String(200, "LMAO JWT failed!")
		return
	}

	ctx.String(200, tokenString)
}

func ShopAuthenticate(ctx *gin.Context) {
	currShop, _ := ctx.Get("currentShop")

	ctx.JSON(200, currShop)
}

func UpdateShopStatus(ctx *gin.Context) {
	var shop model.Shop
	config.DB.Where("id = ?", ctx.Param("id")).First(&shop)

	if shop.Status == "Active" {
		shop.Status = "Banned"
	} else {
		shop.Status = "Active"
	}

	config.DB.Save(&shop)
	ctx.JSON(200, &shop)
}

func ShowAllShop(ctx *gin.Context) {
	shops := []model.Shop{}
	config.DB.Find(&shops)
	ctx.JSON(200, &shops)
}

func ShowAllShopPagination(ctx *gin.Context) {

	type RequestBody struct {
		ShopPage  int `json:"shoppage"`
		ShopLimit int `json:"shoplimit"`
	}

	var body RequestBody
	ctx.ShouldBindJSON(&body)

	offset := (body.ShopPage - 1) * body.ShopLimit

	shops := []model.Shop{}
	config.DB.Limit(body.ShopLimit).Offset(offset).Find(&shops)

	ctx.JSON(200, &shops)
}

func ShowAllShopPaginationStatus(ctx *gin.Context) {

	type RequestBody struct {
		Status    string `json:"status"`
		ShopPage  int    `json:"shoppage"`
		ShopLimit int    `json:"shoplimit"`
	}

	var body RequestBody
	ctx.ShouldBindJSON(&body)

	offset := (body.ShopPage - 1) * body.ShopLimit

	shops := []model.Shop{}

	if body.Status == "" {
		config.DB.Limit(body.ShopLimit).Offset(offset).Find(&shops)
	} else {
		config.DB.Where("status = ?", body.Status).Limit(body.ShopLimit).Offset(offset).Find(&shops)
	}

	ctx.JSON(200, &shops)
}

func GetShopById(c *gin.Context) {

	type RequestBody struct {
		ID int64 `json:"id"`
	}

	var requestBody RequestBody
	c.ShouldBindJSON(&requestBody)

	var shop model.Shop
	config.DB.Model(model.Shop{}).Where("id = ?", requestBody.ID).First(&shop)

	c.JSON(200, shop)
}
