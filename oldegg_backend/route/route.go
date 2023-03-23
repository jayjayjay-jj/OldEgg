package route

import (
	"oldegg_backend/controller"
	"oldegg_backend/middleware"

	"github.com/gin-gonic/gin"
)

func Route(router *gin.Engine) {

	router.POST("/sign-up", controller.SignUp)
	router.POST("/sign-in", controller.SignIn)

	router.GET("/show-all-user", controller.ShowAllUser)
	router.POST("/show-all-user-paginate", controller.ShowAllUserPagination)
	router.POST("/update-user-phone", controller.UpdateUserPhone)
	router.POST("/update-user-status/:id", controller.UpdateUserStatus)
	router.DELETE("/delete-user/:id", controller.DeleteUser)

	router.POST("/authenticate", middleware.AuthenticationMiddleware, controller.Authenticate)
	router.POST("/shop-authenticate", middleware.ShopMiddleware, controller.ShopAuthenticate)

	router.POST("/get-one-time-sign-in-code", controller.GetOneTimeCode)
	router.POST("/sign-in-with-one-time-code", controller.SignInWithOneTimeCode)
	router.POST("/get-user-by-id", controller.GetUserByID)

	router.POST("/insert-shop", controller.InsertShop)
	router.POST("/shop-sign-in", controller.ShopSignIn)
	router.POST("/get-shop-by-id", controller.GetShopById)

	router.GET("/show-all-shop", controller.ShowAllShop)
	router.POST("/show-all-shop-paginate", controller.ShowAllShopPagination)
	router.POST("/show-all-shop-paginate-status", controller.ShowAllShopPaginationStatus)
	router.POST("/update-shop-status/:id", controller.UpdateShopStatus)

	router.POST("/insert-product", controller.InsertProduct)
	router.POST("/get-product-by-id", controller.GetProductsById)
	router.POST("/get-product-by-shop", controller.GetProductByShop)
	router.POST("/get-product-by-shop-status", controller.GetProductByShopStatus)
	router.POST("/get-product-count", controller.GetProductCount)
	router.GET("/show-all-product", controller.ShowAllProducts)
	router.POST("/show-all-product-paginate", controller.ShowAllProductsPagination)
	router.POST("/show-home-product-scrolling", controller.ShowHomeProductsPagination)
	router.POST("/show-product-by-shop-paginate", controller.ShowProductByShopPagination)
	router.POST("/show-product-paginate-stock", controller.ShowProductByShopPaginationStock)
	router.POST("/show-product-by-shop-name-paginate-stock", controller.ShowProductByShopNamePaginationStock)
	router.POST("/search-product", controller.SearchProduct)
	router.POST("/update-product", controller.UpdateProduct)

	router.POST("/insert-voucher", controller.InsertVoucher)
	router.GET("/show-all-voucher", controller.ShowAllVoucher)

	router.GET("/show-all-categories", controller.ShowAllCategories)

	router.POST("/create-wishlist", controller.CreateWishlist)
	router.GET("/show-all-wishlist", controller.ShowAllWishlists)
	router.POST("/get-wishlist-by-id", controller.GetWishlistById)
	router.POST("/get-wishlist-by-user-id", controller.GetWishlistByUserId)
	router.POST("/update-wishlist-header", controller.UpdateWishlistHeader)
}
