package server

import (
	"github.com/gin-gonic/gin"
)

func InitalizeServer() {
	r := gin.Default()

	setUpRouters(r)

	r.Run("127.0.0.1:8000")
	// r.RunTLS(":443", "server/cert.pem", "server/key.pem")
}
