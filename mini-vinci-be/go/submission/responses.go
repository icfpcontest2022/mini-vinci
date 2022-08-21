package submission

import "time"

type RetrieveSubmissionResponse struct {
	ID          uint      `json:"id"`
	SubmittedAt time.Time `json:"submitted_at"`
	Status      string    `json:"status"`
	Score       uint      `json:"score"`
	FileURL     string    `json:"file_url"`
}

type SingleSubmission struct {
	ID          uint      `json:"id"`
	SubmittedAt time.Time `json:"submitted_at"`
	Status      string    `json:"status"`
	Score       uint      `json:"score"`
}

type GetSubmissionsResponse struct {
	Submissions []SingleSubmission `json:"submissions"`
}
