package server

import (
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/announcement"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/problem"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/result"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/submission"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/support"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/user"
	"log"
	"net/http"
)

func CORS() gin.HandlerFunc {
	// TO allow CORS
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}

func setUpRouters(r *gin.Engine) error {
	r.Use(CORS())

	r.Use(static.Serve("/", static.LocalFile("../../mini-vinci-fe/build", false)))

	r.GET("/ping", func(c *gin.Context) {
		c.String(http.StatusOK, "pong")
	})

	authMiddleware, err := user.GetAuthMiddleware()
	if err != nil {
		log.Fatal("error while getting auth middleware:", err.Error())
	}
	err = authMiddleware.MiddlewareInit()
	if err != nil {
		log.Fatal("error while initializing auth middleware:" + err.Error())
	}

	//user
	userRouter := user.UserRouter{}

	userGroup := r.Group("users")
	userGroup.Use(authMiddleware.MiddlewareFunc())
	userGroup.GET("", userRouter.RetrieveUser)

	nonAuthUserGroup := r.Group("users")
	nonAuthUserGroup.POST("register", userRouter.CreateUser)
	nonAuthUserGroup.POST("login", authMiddleware.LoginHandler)
	nonAuthUserGroup.GET("verification", userRouter.VerificateUser)
	nonAuthUserGroup.POST("verification/resend-email", userRouter.ResendVerificationEmail)
	nonAuthUserGroup.POST("password/send-renew-email", userRouter.SendRenewPasswordEmail)
	nonAuthUserGroup.POST("password/renew", userRouter.RenewPassword)

	// submission
	submissionRouter := submission.SubmissionRouter{}

	submissionGroup := r.Group("submissions")
	submissionGroup.Use(authMiddleware.MiddlewareFunc())
	submissionGroup.POST(":problem_id/create", submissionRouter.CreateSubmission)
	submissionGroup.GET(":id", submissionRouter.RetrieveSubmission)
	submissionGroup.GET("", submissionRouter.GetSubmissions)

	// problem
	problemRouter := problem.ProblemRouter{}

	problemGroup := r.Group("problems")
	problemGroup.Use(authMiddleware.MiddlewareFunc())
	problemGroup.GET("", problemRouter.GetProblems)

	// support
	supportRouter := support.SupportRouter{}

	supportGroup := r.Group("support")
	supportGroup.Use(authMiddleware.MiddlewareFunc())
	supportGroup.GET("", supportRouter.GetMessages)
	supportGroup.POST("", supportRouter.SendMessage)

	// announcement
	announcementRouter := announcement.AnnouncementRouter{}

	announcementGroup := r.Group("announcements")
	announcementGroup.Use(authMiddleware.MiddlewareFunc())
	announcementGroup.GET("", announcementRouter.GetAnnouncements)

	// result
	resultRouter := result.ResultRouter{}

	resultGroup := r.Group("results")
	resultGroup.Use(authMiddleware.MiddlewareFunc())
	resultGroup.GET("user", resultRouter.GetUserResults)
	resultGroup.GET("scoreboard", resultRouter.GetScoreboard)

	return nil
}
