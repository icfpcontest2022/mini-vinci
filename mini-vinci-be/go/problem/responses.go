package problem

type SingleProblem struct {
	ID          uint   `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	CanvasLink  string `json:"canvas_link"`
	TargetLink  string `json:"target_link"`
}

type GetProblemsResponse struct {
	Problems []SingleProblem `json:"problems"`
}
