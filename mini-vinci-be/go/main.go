package main

import (
	"fmt"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/common"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/config"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/evaluation"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/logging"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/problem"
)

const (
	ModeServer = "SERVER"
	ModeWorker = "WORKER"
)

func main() {
	if err := config.Initialize(); err != nil {
		fmt.Printf("error while initializing config: %v\n", err)
		return
	}

	if err := logging.Initialize(); err != nil {
		fmt.Printf("error while initializing logger: %v/n", err)
	}

	evaluation.Evaluate(common.Submission{
		ProblemID: 1,
		S3Key:     "user26_problem_2_414f52ba-ed97-4ab9-853f-6f24d0be3f8a.isl",
		UserID:    23,
	}, problem.Problem{
		TargetLink: "https://minivinci-dev-problems.s3.amazonaws.com/target_1.png",
	})
}
