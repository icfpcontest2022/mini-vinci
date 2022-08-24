package announcement

import "time"

type SingleAnnouncementResponse struct {
	Time    time.Time `json:"time"`
	Content string    `json:"content"`
}

type GetAnnouncementsResponse struct {
	Announcements []SingleAnnouncementResponse `json:"announcements"`
}
