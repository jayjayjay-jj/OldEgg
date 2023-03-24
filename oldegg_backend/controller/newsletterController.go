package controller

import (
	"net/smtp"
	"oldegg_backend/config"
	"oldegg_backend/model"

	"github.com/gin-gonic/gin"
)

func SendNewsletter(ctx *gin.Context) {
	type RequestBody struct {
		NewsletterString string `json:"newsletter_string"`
	}

	var body RequestBody
	ctx.ShouldBindJSON(&body)

	var newsletter model.Newsletter

	config.DB.
		Table("newsletters").
		Select("newsletters.*").
		Find(&newsletter)

	auth := smtp.PlainAuth("", "jaysieacc@gmail.com", "mjvwmahelwymwqlo", "smtp.gmail.com")

	msg := "Subject: " + "Newsletter" + "\n\n" + body.NewsletterString + ""
	var to []string
	to = append(to, newsletter.Email)

	err := smtp.SendMail(
		"smtp.gmail.com:587",
		auth,
		"jaysieacc@gmail.com",
		to,
		[]byte(msg),
	)

	if err != nil {
		ctx.String(200, "Send Error")
		return
	}

	ctx.String(200, "Email Sent Successfully")
}
