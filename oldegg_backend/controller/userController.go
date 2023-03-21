package controller

import (
	"math/rand"
	"net/smtp"
	"oldegg_backend/config"
	"oldegg_backend/model"
	"os"
	"strconv"
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

func ShowAllUserPagination(ctx *gin.Context) {

	type RequestBody struct {
		UserPage  int `json:"userpage"`
		UserLimit int `json:"userlimit"`
	}

	var body RequestBody
	ctx.ShouldBindJSON(&body)

	offset := (body.UserPage - 1) * body.UserLimit

	users := []model.User{}
	config.DB.Limit(body.UserLimit).Offset(offset).Find(&users)

	ctx.JSON(200, &users)
}

func UpdateUserPhone(ctx *gin.Context) {

	type RequestBody struct {
		UserID      uint   `json:"user_id"`
		PhoneNumber string `json:"phone_number"`
	}

	var body RequestBody
	ctx.ShouldBindJSON(&body)

	var user model.User
	config.DB.Model(model.User{}).Where("id = ?", body.UserID).First(&user)
	user.MobilePhoneNumber = body.PhoneNumber

	config.DB.Save(&user)
	ctx.JSON(200, user)
}

func UpdateUserStatus(ctx *gin.Context) {
	var user model.User
	config.DB.Where("id = ?", ctx.Param("id")).First(&user)

	if user.Status == "Active" {
		user.Status = "Banned"
	} else {
		user.Status = "Active"
	}

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

func GetOneTimeCode(ctx *gin.Context) {

	type RequestBody struct {
		Email string `json:"email"`
	}

	var requestBody RequestBody
	ctx.ShouldBindJSON(&requestBody)

	if requestBody.Email == "" {
		ctx.String(200, "Field Can't be Empty")
		return
	}

	var user model.User
	config.DB.Model(model.User{}).Where("email = ?", requestBody.Email).First(&user)
	if user.ID == 0 {
		ctx.String(200, "Email isn't Registered")
		return
	}

	// Generate Code
	var code model.OneTimeCode
	code.Email = user.Email
	code.Code = strconv.Itoa(100000 + rand.Intn(999999-100000))

	var count int64
	config.DB.Model(model.OneTimeCode{}).Where("email = ?", code.Email).Count(&count)

	if count == 0 {

		config.DB.Create(&code)

	} else {

		var user model.OneTimeCode
		config.DB.Model(model.OneTimeCode{}).Where("email = ?", code.Email).First(&user)
		user.Code = code.Code
		config.DB.Save(&user)

	}

	auth := smtp.PlainAuth("", "miawmiawmiawcat@gmail.com", "stbqfvknnfvndqip", "smtp.gmail.com")

	msg := "Subject: " + "One Time Sign In Code" + "\n" + "\nYour Code is: " + code.Code
	var to []string
	to = append(to, code.Email)

	err := smtp.SendMail(
		"smtp.gmail.com:587",
		auth,
		"miawmiawmiawcat@gmail.com",
		to,
		[]byte(msg),
	)

	if err != nil {
		ctx.String(200, "Send Error")
		return
	}

	ctx.String(200, "Email Sent Successfully")

}

func GetUserByID(c *gin.Context) {

	type RequestBody struct {
		ID int64 `json:"id"`
	}

	var requestBody RequestBody
	c.ShouldBindJSON(&requestBody)

	var user model.User
	config.DB.Model(model.User{}).Where("id = ?", requestBody.ID).First(&user)

	c.JSON(200, user)

}
