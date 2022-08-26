package evaluation

import (
	"fmt"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/common"
	"math/rand"
	"time"
)

type SubmissionEvaluationPayload struct {
	SubmissionID uint
}

func EvaluateSubmission(payload SubmissionEvaluationPayload) error {
	submissionStore := common.NewSubmissionStore()

	err := submissionStore.Update(payload.SubmissionID, map[string]interface{}{
		"status":            common.SubmissionStatusProcessing,
		"status_changed_at": time.Now(),
	})

	rand.Seed(time.Now().UnixNano())

	randomSleep := 2000 + rand.Intn(2000)
	fmt.Println(randomSleep, "ms")
	time.Sleep(time.Duration(randomSleep) * time.Millisecond)

	randomScore := rand.Intn(100)

	err = submissionStore.Update(payload.SubmissionID, map[string]interface{}{
		"status":            common.SubmissionStatusSucceed,
		"status_changed_at": time.Now(),
		"score":             randomScore,
	})
	if err != nil {
		return fmt.Errorf("error while updating submission: %v", err)
	}

	submission, err := submissionStore.First(map[string]interface{}{
		"id": payload.SubmissionID,
	})
	if err != nil {
		return fmt.Errorf("error while getting submission: %v", err)
	}

	resultStore := common.NewResultStore()

	err = resultStore.CreateIfRequired(submission.UserID, submission.ProblemID)
	if err != nil {
		return fmt.Errorf("error while creating result record if required: %v", err)
	}

	err = resultStore.UpdateResult(submission.UserID, submission.ProblemID, submission.CreatedAt, randomScore)
	if err != nil {
		return fmt.Errorf("error while updating result: %v", err)
	}

	return nil
}
