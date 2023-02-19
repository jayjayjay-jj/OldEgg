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
