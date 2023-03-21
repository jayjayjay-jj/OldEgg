package main

import (
	"net/http"
	"oldegg_backend/config"
	"oldegg_backend/route"

	"github.com/gin-gonic/gin"
	"github.com/rs/cors"
)

func main() {

	config.Connect()

	options := cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"},
		AllowCredentials: true,
	}

	router := gin.New()

	route.Route(router)

	http.ListenAndServe(":8080", cors.New(options).Handler(router))
}
