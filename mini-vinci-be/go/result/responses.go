package result

import (
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/common"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/problem"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/user"
	"sort"
	"time"
)

type SingleResultResponse struct {
	ProblemID       uint      `json:"problem_id"`
	ProblemName     string    `json:"problem_name"`
	LastSubmittedAt time.Time `json:"last_submitted_at"`
	SubmissionCount uint      `json:"submission_count"`
	MaxScore        uint      `json:"max_score"`
}

type GetUserResultsResponse struct {
	Results    []SingleResultResponse `json:"results"`
	TotalScore uint                   `json:"total_score"`
}

type GetUserResultsSerializer struct {
	Problems []problem.Problem
	Results  []common.Result
}

func (s GetUserResultsSerializer) Response() GetUserResultsResponse {
	resp := GetUserResultsResponse{
		Results: make([]SingleResultResponse, 0),
	}

	resultMap := make(map[uint]common.Result)
	for _, res := range s.Results {
		resultMap[res.ProblemID] = res
	}

	for _, p := range s.Problems {
		r := SingleResultResponse{
			ProblemID:   p.ID,
			ProblemName: p.Name,
		}

		if res, ok := resultMap[p.ID]; ok {
			r.MaxScore = res.MaxScore
			r.SubmissionCount = res.SubmissionCount

			if res.LastSubmittedAt.Valid {
				r.LastSubmittedAt = res.LastSubmittedAt.Time
			}
		}

		resp.Results = append(resp.Results, r)
	}

	sort.Slice(resp.Results, func(i, j int) bool {
		return resp.Results[i].ProblemID < resp.Results[j].ProblemID
	})

	resp.TotalScore = 0
	for _, res := range resp.Results {
		resp.TotalScore += res.MaxScore
	}

	return resp
}

type ScoreboardUserResponse struct {
	UserID     uint                   `json:"user_id"`
	TeamName   string                 `json:"team_name"`
	Results    []SingleResultResponse `json:"results"`
	TotalScore uint                   `json:"total_score"`
}

type GetScoreboardResponse struct {
	IsFrozen      bool                     `json:"is_frozen"`
	LastUpdatedAt time.Time                `json:"last_updated_at"`
	Users         []ScoreboardUserResponse `json:"users"`
}

type GetScoreboardSerializer struct {
	Users    []user.User
	Problems []problem.Problem
	Results  []common.Result
}

func (s GetScoreboardSerializer) Response() GetScoreboardResponse {
	resp := GetScoreboardResponse{
		IsFrozen:      false,
		LastUpdatedAt: time.Now(),
		Users:         make([]ScoreboardUserResponse, 0),
	}

	resultMap := make(map[uint]map[uint]common.Result)
	for _, res := range s.Results {
		if _, ok := resultMap[res.UserID]; !ok {
			resultMap[res.UserID] = make(map[uint]common.Result)
		}
		resultMap[res.UserID][res.ProblemID] = res
	}

	for _, usr := range s.Users {
		userResp := ScoreboardUserResponse{
			UserID:   usr.ID,
			TeamName: usr.TeamName,
			Results:  make([]SingleResultResponse, 0),
		}

		for _, p := range s.Problems {
			r := SingleResultResponse{
				ProblemID:   p.ID,
				ProblemName: p.Name,
			}

			if res, ok := resultMap[usr.ID][p.ID]; ok {
				r.MaxScore = res.MaxScore
				r.SubmissionCount = res.SubmissionCount

				if res.LastSubmittedAt.Valid {
					r.LastSubmittedAt = res.LastSubmittedAt.Time
				}

			}

			userResp.Results = append(userResp.Results, r)
		}

		sort.Slice(userResp.Results, func(i, j int) bool {
			return userResp.Results[i].ProblemID < userResp.Results[j].ProblemID
		})

		userResp.TotalScore = 0
		for _, res := range userResp.Results {
			userResp.TotalScore += res.MaxScore
		}

		resp.Users = append(resp.Users, userResp)
	}

	sort.Slice(resp.Users, func(i, j int) bool {
		return resp.Users[i].UserID < resp.Users[j].UserID
	})

	return resp
}
