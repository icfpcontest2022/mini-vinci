package result

import (
	"github.com/gin-gonic/gin"
)

type ResultRouter struct {
	controller ResultController
}

func (r *ResultRouter) GetUserResults(c *gin.Context) {
	c.JSON(r.controller.GetUserResults(c))
}

func (r *ResultRouter) GetScoreboard(c *gin.Context) {
	c.JSON(r.controller.GetScoreboard(c))
}
