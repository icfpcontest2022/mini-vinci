package server

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/announcement"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/problem"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/submission"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/support"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/user"
	"log"
	"net/http"
)

func setUpRouters(r *gin.Engine) error {
	r.Use(cors.Default())

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
	nonAuthUserGroup.GET("verification/:verification_token", userRouter.VerificateUser)
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

	announcementGroup := r.Group("announcement")
	announcementGroup.GET("", announcementRouter.GetAnnouncements)

	return nil
}
