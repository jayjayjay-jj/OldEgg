package config

import (
	"oldegg_backend/model"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func migrate() {
	DB.AutoMigrate(&model.Role{})
	DB.AutoMigrate(&model.User{})
	DB.AutoMigrate(&model.OneTimeCode{})
	DB.AutoMigrate(&model.Shop{})
	DB.AutoMigrate(&model.Category{})
	DB.AutoMigrate(&model.Product{})
	DB.AutoMigrate(&model.Voucher{})
	DB.AutoMigrate(&model.WishlistHeader{})
	DB.AutoMigrate(&model.WishlistDetail{})
	DB.AutoMigrate(&model.Cart{})
	DB.AutoMigrate(&model.Later{})
	DB.AutoMigrate(&model.Message{})
	DB.AutoMigrate(&model.Address{})
	DB.AutoMigrate(&model.DeliveryProvider{})
	DB.AutoMigrate(&model.PaymentMethod{})
	DB.AutoMigrate(&model.OrderHeader{})
	DB.AutoMigrate(&model.OrderDetail{})
	DB.AutoMigrate(&model.Newsletter{})
	DB.AutoMigrate(&model.ShopDesc{})
	DB.AutoMigrate(&model.Comment{})
}

func Connect() {

	con := "host=localhost user=postgres password=prk dbname=oldEgg port=5432 TimeZone=Asia/Shanghai"
	database, error := gorm.Open(postgres.Open(con), &gorm.Config{})

	if error != nil {
		panic(error)
	}

	DB = database

	migrate()

}
