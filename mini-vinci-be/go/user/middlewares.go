package user

import (
	"errors"
	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/config"
	"time"
)

var ErrIncorrectEmailOrPassword = errors.New("incorrect Email or Password")

type LoginParams struct {
	Email    string `form:"email" json:"email" binding:"required"`
	Password string `form:"password" json:"password" binding:"required"`
}

var IdentityKey = "email"

func GetAuthMiddleware() (*jwt.GinJWTMiddleware, error) {
	authMiddleware, err := jwt.New(&jwt.GinJWTMiddleware{
		Realm:       "Robo Vinci",
		Key:         []byte(config.Get().JWT.LoginSecret),
		Timeout:     config.Get().JWT.LoginExpireTime * time.Hour,
		MaxRefresh:  config.Get().JWT.LoginExpireTime * time.Hour,
		IdentityKey: IdentityKey,
		PayloadFunc: func(data interface{}) jwt.MapClaims {
			if v, ok := data.(*User); ok {
				return jwt.MapClaims{
					IdentityKey: v.Email,
				}
			}
			return jwt.MapClaims{}
		},
		Authenticator: func(c *gin.Context) (interface{}, error) {
			var loginParams LoginParams
			if err := c.ShouldBind(&loginParams); err != nil {
				return "", jwt.ErrMissingLoginValues
			}

			userStore := NewUserStore()
			usr, err := userStore.First(map[string]interface{}{"email": loginParams.Email})
			if err != nil {
				return "", ErrIncorrectEmailOrPassword
			}
			err = usr.CheckPassword(loginParams.Password)
			if err != nil {
				return "", ErrIncorrectEmailOrPassword
			}

			return &User{
				Email: usr.Email,
			}, nil
		},
		Unauthorized: func(c *gin.Context, code int, message string) {
			c.JSON(code, gin.H{
				"code":    code,
				"message": message,
			})
		},
		TokenHeadName: "Bearer",
		TimeFunc:      time.Now,
	})

	return authMiddleware, err
}
