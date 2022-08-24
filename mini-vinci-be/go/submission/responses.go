package submission

import (
	. "github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/common"
	"sort"
	"time"
)

type RetrieveSubmissionResponse struct {
	ID          uint      `json:"id"`
	SubmittedAt time.Time `json:"submitted_at"`
	Status      string    `json:"status"`
	Score       uint      `json:"score"`
	FileURL     string    `json:"file_url"`
}

type RetrieveSubmissionSerializer struct {
	Submission   Submission
	PresignedURl string
}

func (s RetrieveSubmissionSerializer) Response() RetrieveSubmissionResponse {
	return RetrieveSubmissionResponse{
		ID:          s.Submission.ID,
		SubmittedAt: s.Submission.CreatedAt,
		Status:      s.Submission.Status,
		Score:       s.Submission.Score,
		FileURL:     s.PresignedURl,
	}
}

type SingleSubmissionResponse struct {
	ID          uint      `json:"id"`
	SubmittedAt time.Time `json:"submitted_at"`
	Status      string    `json:"status"`
	Score       uint      `json:"score"`
}

type GetSubmissionsResponse struct {
	Submissions []SingleSubmissionResponse `json:"submissions"`
}

type GetSubmissionsSerializer struct {
	Submissions []Submission
}

func (s GetSubmissionsSerializer) Response() GetSubmissionsResponse {
	resp := GetSubmissionsResponse{Submissions: make([]SingleSubmissionResponse, 0)}

	for _, sub := range s.Submissions {
		resp.Submissions = append(resp.Submissions, SingleSubmissionResponse{
			ID:          sub.ID,
			SubmittedAt: sub.CreatedAt,
			Status:      sub.Status,
			Score:       sub.Score,
		})
	}

	sort.Slice(resp.Submissions, func(i, j int) bool {
		return resp.Submissions[i].ID < resp.Submissions[j].ID
	})

	return resp
}
