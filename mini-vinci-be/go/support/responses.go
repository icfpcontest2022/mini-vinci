package support

import "time"

type SingleMessageResponse struct {
	Time     time.Time `json:"time"`
	Message  string    `json:"message"`
	IsAnswer bool      `json:"is_answer"`
}

type GetSupportMessagesResponse struct {
	History []SingleMessageResponse `json:"history"`
}
