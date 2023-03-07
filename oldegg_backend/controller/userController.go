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

func SignUp(ctx *gin.Context) {
	var newUser model.User
	ctx.ShouldBindJSON(&newUser)
	ctx.JSON(200, newUser)

	var countEmail int64 = 0
	config.DB.Model(model.User{}).Where("email = ?", newUser.Email).Count(&countEmail)
	if countEmail != 0 {
		ctx.String(200, "Email is not unique")

		return
	}

	var countPhoneNumber int64 = 0
	config.DB.Model(model.User{}).Where("mobile_phone_number = ?", newUser.MobilePhoneNumber).Count(&countPhoneNumber)
	if countPhoneNumber != 0 {
		ctx.String(200, "Phone Number already used!")

		return
	}

	// Minimum length for password is 8
	hash, error := bcrypt.GenerateFromPassword([]byte(newUser.Password), 8)

	if error != nil {
		ctx.String(200, "Password hashing failed")
		return
	}

	newUser.Password = string(hash)

	config.DB.Create(&newUser)
	ctx.JSON(200, newUser)
}

func SignIn(ctx *gin.Context) {
	var attemptUserLogin, userCreated model.User
	ctx.ShouldBindJSON(&attemptUserLogin)

	// config.DB.First(&userCreated, "email = ?", attemptUserLogin.Email)
	config.DB.Model(model.User{}).Where("email = ?", attemptUserLogin.Email).First(&userCreated)

	if userCreated.ID == 0 {
		ctx.String(200, "Email not found!")
		return
	}

	error := bcrypt.CompareHashAndPassword([]byte(userCreated.Password), []byte(attemptUserLogin.Password))
	if error != nil {
		ctx.String(200, "Password not found!")
		return
	}

	if userCreated.Status == "Banned" {
		ctx.String(200, "Banned!")
		return
	}

	// Generate JWT
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"subject": userCreated.Email,
		"expire":  time.Now().Add(time.Hour * 72).Unix(),
	})

	tokenString, error := token.SignedString([]byte(os.Getenv("key")))
	if error != nil {
		ctx.String(200, "LMAO JWT failed!")
		return
	}

	ctx.String(200, tokenString)
}

func ShowAllUser(ctx *gin.Context) {
	users := []model.User{}
	config.DB.Find(&users)
	ctx.JSON(200, &users)
}

func UpdateUser(ctx *gin.Context) {
	var user model.User
	config.DB.Where("id = ?", ctx.Param("id")).First(&user)
	ctx.BindJSON(&user)

	config.DB.Save(&user)
	ctx.JSON(200, &user)
}

func DeleteUser(ctx *gin.Context) {
	var user model.User
	config.DB.Where("id = ?", ctx.Param("id")).Delete(&user)
	ctx.JSON(200, &user)
}

func Authenticate(ctx *gin.Context) {
	currUser, _ := ctx.Get("currentUser")

	ctx.JSON(200, currUser)
}
