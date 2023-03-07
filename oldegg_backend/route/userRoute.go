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
	router.POST("/update-user/:id", controller.UpdateUser)
	router.POST("/update-user-status/:id", controller.UpdateUserStatus)
	router.DELETE("/delete-user/:id", controller.DeleteUser)

	router.POST("/authenticate", middleware.AuthenticationMiddleware, controller.Authenticate)

	router.POST("/get-one-time-sign-in-code", controller.GetOneTimeCode)
	router.POST("/sign-in-with-one-time-code", controller.SignInWithOneTimeCode)
	router.POST("/get-user-by-id", controller.GetUserByID)

}
