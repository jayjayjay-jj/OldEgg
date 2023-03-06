package middleware

import (
	"fmt"
	"oldegg_backend/config"
	"oldegg_backend/model"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

func AuthenticationMiddleware(ctx *gin.Context) {
	type JWTToken struct {
		TokenString string `json:"token_string"`
	}

	var token JWTToken
	ctx.ShouldBindJSON(&token)

	if token.TokenString == "" {
		ctx.String(200, "Where is Cookie? 0_0")

		return
	}

	result, error := jwt.Parse(token.TokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(os.Getenv("key")), nil
	})

	if error != nil {
		ctx.String(200, "Token Parsing Failed")

		return
	}

	if claims, ok := result.Claims.(jwt.MapClaims); ok && result.Valid {

		if float64(time.Now().Unix()) > claims["expire"].(float64) {
			ctx.String(200, "Token Expired")

			return
		}

		var currUser model.User
		config.DB.Model(model.User{}).Where("email = ?", claims["subject"]).First(&currUser)

		if currUser.Status == "Banned" {
			ctx.JSON(200, "You can't sign in")
			return
		}

		ctx.Set("currentUser", currUser)
		ctx.Next()
	} else {
		fmt.Println(error)
	}
}
