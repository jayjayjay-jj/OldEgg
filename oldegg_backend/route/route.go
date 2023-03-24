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
	router.POST("/update-user-money", controller.UpdateUserMoney)
	router.DELETE("/delete-user/:id", controller.DeleteUser)

	router.POST("/authenticate", middleware.AuthenticationMiddleware, controller.Authenticate)
	router.POST("/shop-authenticate", middleware.ShopMiddleware, controller.ShopAuthenticate)

	router.POST("/check-password-before-update", controller.UpdatePasswordWithConfirmationChecking)
	router.POST("/update-password", controller.UpdateUserPassword)

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
	router.POST("/update-shop", controller.UpdateShop)
	router.POST("/get-shop-categories", controller.GetShopCategories)
	router.POST("/update-shop-password", controller.UpdateShopPassword)

	router.POST("/get-shop-desc-by-shop", controller.GetShopDescByShop)
	router.POST("/update-shop-desc", controller.UpdateShopDesc)

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
	router.POST("/get-similar-product", controller.GetSimilarProduct)

	router.POST("/insert-voucher", controller.InsertVoucher)
	router.GET("/show-all-voucher", controller.ShowAllVoucher)
	router.POST("/search-voucher", controller.SearchVoucher)

	router.GET("/show-all-categories", controller.ShowAllCategories)

	router.POST("/create-wishlist", controller.CreateWishlist)
	router.GET("/show-all-wishlist", controller.ShowAllWishlists)
	router.POST("/show-user-wishlist", controller.GetWishlistByUser)
	router.GET("/show-all-public-wishlist", controller.ShowAllPublicWishlists)
	router.POST("/show-all-public-wishlist-paginate", controller.ShowAllPublicWishlistsPagination)
	router.POST("/get-wishlist-by-id", controller.GetWishlistById)
	router.POST("/get-wishlist-by-user-id", controller.GetWishlistByUserId)
	router.POST("/update-wishlist-header", controller.UpdateWishlistHeader)
	router.POST("/update-wishlist-note", controller.UpdateWishlistHeaderNote)

	router.POST("/insert-product-to-wishlist", controller.InsertProductToWishlist)
	router.POST("/get-wishlist-details-by-header", controller.GetWishlistDetailByID)
	router.POST("/get-wishlist-header-details", controller.GetWishlistHeaderDetails)
	router.POST("/get-wishlist-details", controller.GetDetailsByID)
	router.POST("/update-wishlist-details", controller.UpdateDetailQuantity)
	router.POST("/delete-wishlist-details", controller.DeleteDetailItem)
	router.POST("/count-shop-order-quantity", controller.CountShopOrder)

	router.POST("/insert-product-to-cart", controller.InsertProductToCart)
	router.POST("/show-user-cart", controller.GetCartByUserId)
	router.POST("/delete-cart-item", controller.DeleteCartItem)
	router.POST("/get-cart-detail", controller.GetCartDetailItem)
	router.POST("/update-cart-item-quantity", controller.UpdateCartQuantity)

	router.POST("/insert-cart-to-later", controller.InsertProductToLater)
	router.POST("/show-user-later", controller.GetLaterByUserId)

	router.GET("/send-message", controller.SendMessage)
	router.POST("get-messages", controller.GetMessages)
	router.POST("/get-chatting-customer", controller.GetChattingCustomers)
	router.POST("delete-chatting-history", controller.DeleteMessages)

	router.POST("/insert-address", controller.InsertAddress)
	router.GET("/show-all-addreses", controller.ShowAllAddresses)
	router.POST("/show-user-address", controller.ShowUserAddresses)
	router.POST("/delete-address", controller.DeleteAddress)

	router.GET("/show-all-delivery-providers", controller.ShowAllDeliveryProviders)
	router.GET("/show-all-payment-methods", controller.ShowAllPaymentMethods)

	router.POST("/checkout", controller.CreateOrder)
	router.POST("/get-all-order", controller.GetAllOrder)
	router.POST("/get-user-order", controller.GetUserOrder)
	router.POST("/get-orders-detail-by-id", controller.GetOrderDetail)
	router.POST("/update-order-status/:id", controller.UpdateOrderStatus)

	router.POST("/send-newsletter", controller.SendNewsletter)

	router.POST("/insert-comment", controller.InsertComment)
	router.POST("/show-comment", controller.ShowAllWishlistComment)
}
