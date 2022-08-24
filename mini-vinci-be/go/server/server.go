package server

import (
	"github.com/gin-gonic/gin"
)

func InitalizeServer() {
	r := gin.Default()

	setUpRouters(r)

	r.Run(":8080")
}
