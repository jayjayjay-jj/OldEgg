package controller

import (
	"oldegg_backend/config"
	"oldegg_backend/model"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

func diff(a, b time.Time) (year, month, day, hour, min, sec int) {

	if a.Location() != b.Location() {
		b = b.In(a.Location())
	}
	if a.After(b) {
		a, b = b, a
	}
	y1, M1, d1 := a.Date()
	y2, M2, d2 := b.Date()

	h1, m1, s1 := a.Clock()
	h2, m2, s2 := b.Clock()

	year = int(y2 - y1)
	month = int(M2 - M1)
	day = int(d2 - d1)
	hour = int(h2 - h1)
	min = int(m2 - m1)
	sec = int(s2 - s1)

	if sec < 0 {
		sec += 60
		min--
	}

	if min < 0 {
		min += 60
		hour--
	}

	if hour < 0 {
		hour += 24
		day--
	}

	if day < 0 {
		t := time.Date(y1, M1, 32, 0, 0, 0, 0, time.UTC)
		day += 32 - t.Day()
		month--
	}

	if month < 0 {
		month += 12
		year--
	}

	return

}

func SignInWithOneTimeCode(ctx *gin.Context) {

	type RequestBody struct {
		Email string `json:"email"`
		Code  string `json:"code"`
	}

	var requestBody RequestBody
	ctx.ShouldBindJSON(&requestBody)

	var code model.OneTimeCode
	config.DB.Model(model.OneTimeCode{}).Where("email = ?", requestBody.Email).Where("code = ?", requestBody.Code).First(&code)

	if code.ID == 0 {
		ctx.String(200, "Invalid Code")
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"subject": code.Email,
		"expire":  time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("SECRETKEY")))
	if err != nil {
		ctx.String(200, "Failed to Create Token")
		return
	}

	_, _, _, _, min, _ := diff(code.UpdatedAt, time.Now())
	if min >= 15 {
		ctx.String(200, "Code is Not Longer Valid")
		return
	}

	ctx.String(200, tokenString)

}
