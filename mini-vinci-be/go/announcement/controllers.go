package announcement

import (
	"github.com/gin-gonic/gin"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/apiresponses"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/logging"
	"github.com/sirupsen/logrus"
	"net/http"
)

type AnnouncementController struct{}

func (ac *AnnouncementController) GetAnnouncements(c *gin.Context) (int, interface{}) {
	log := logging.Logger.WithFields(logrus.Fields{
		"location": "GetAnnouncements",
	})

	announcementStore := NewAnnouncementStore()

	announcements, err := announcementStore.Find()
	if err != nil {
		log.WithError(err).Errorf("could not get announcements")
		return apiresponses.InternalServerError()
	}

	var resp GetAnnouncementsResponse

	for _, a := range announcements {
		resp.Announcements = append(resp.Announcements, SingleAnnouncementResponse{
			Time:    a.CreatedAt,
			Content: a.Content,
		})
	}

	return http.StatusOK, resp
}
