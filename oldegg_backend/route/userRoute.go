package route

import (
	"oldegg_backend/controller"
	"oldegg_backend/middleware"

	"github.com/gin-gonic/gin"
)

func UserRoute(router *gin.Engine) {
	router.POST("/sign-up", controller.SignUp)
	router.POST("/sign-in", controller.SignIn)

	router.GET("/show-all-user", controller.ShowAllUser)
	router.PUT("/update-user/:id", controller.UpdateUser)
	router.DELETE("/delete-user/:id", controller.DeleteUser)

	router.POST("/authenticate", middleware.AuthenticationMiddleware, controller.Authenticate)
}
