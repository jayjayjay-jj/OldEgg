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
