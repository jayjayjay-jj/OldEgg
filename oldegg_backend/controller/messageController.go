package controller

import (
	"fmt"
	"net/http"
	"oldegg_backend/config"
	"oldegg_backend/model"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

var conns = map[string]*websocket.Conn{}

func SendMessage(ctx *gin.Context) {

	var ReqFrom string
	h := http.Header{}

	for _, sub := range websocket.Subprotocols(ctx.Request) {

		h.Set("Sec-Websocket-Protocol", sub)
		ReqFrom = sub

	}

	// Upgrading HTTP Request Method to Web Socket
	ws, err := upgrader.Upgrade(ctx.Writer, ctx.Request, h)

	if err != nil {
		fmt.Println(err)
	}

	conns[ReqFrom] = ws

	for {

		var req model.Message
		_ = ws.ReadJSON(&req)
		if req.From != "" {

			config.DB.Create(&req)

		}

		conns[req.From] = ws
		if con, ok := conns[req.To]; ok {

			err = con.WriteJSON(&req)

			if err != nil {

				fmt.Println(err)

			}

		}

		if con, ok := conns[req.From]; ok {

			err = con.WriteJSON(&req)

			if err != nil {

				fmt.Println(err)

			}

		}

	}

}

func GetMessages(ctx *gin.Context) {
	var body model.Message
	ctx.ShouldBindJSON(&body)

	var messages []model.Message

	config.DB.Where("\"from\" = ? AND \"to\" = ?", body.From, body.To).Or("\"from\" = ? AND \"to\" = ?", body.To, body.From).Order("updated_at ASC").Find(&messages)

	ctx.JSON(200, messages)
}

func GetChattingCustomers(ctx *gin.Context) {

	type Body struct {
		UserID string `json:"user_id"`
	}

	var body Body
	ctx.ShouldBindJSON(&body)

	query := `
		SELECT DISTINCT "to"
		FROM messages
		WHERE "from" = '` + body.UserID + ` AND deleted_at IS NULL'
		UNION 
		SELECT DISTINCT "from"
		FROM messages
		WHERE "to" = '` + body.UserID + `' AND deleted_at IS NULL`

	rows, _ := config.DB.Raw(query).Rows()

	var userIDs []string

	for rows.Next() {

		var row string
		err := rows.Scan(&row)
		if err != nil {
			panic(err)
		}

		userIDs = append(userIDs, row)

	}

	ctx.JSON(200, userIDs)
}

func DeleteMessages(ctx *gin.Context) {
	var body model.Message
	ctx.ShouldBindJSON(&body)

	var messages []model.Message

	config.DB.
		Where("\"from\" = ? AND \"to\" = ?", body.From, body.To).
		Or("\"from\" = ? AND \"to\" = ?", body.To, body.From).
		Order("updated_at ASC").
		Find(&messages)

	length := len(messages)
	for i := 0; i < length; i++ {
		config.DB.Delete(&messages[i])
	}

	ctx.String(200, "Messages Deleted")

}
