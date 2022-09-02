package evaluation

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/google/uuid"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/common"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/config"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/logging"
	"github.com/sirupsen/logrus"
	"math/rand"
	"os"
	"os/exec"
	"path"
	"strings"
	"time"
)

const (
	EvaluationTimeOutInSeconds = 10

	EvaluationErrSystem  = "system error"
	EvaluationErrTimeout = "timeout"

	EvaluationResultTypeSucceed = "succeed"
	EvaluationResultTypeFailed  = "failed"
)

type SubmissionEvaluationPayload struct {
	SubmissionID uint
}

type JudgeResult struct {
	Result string `json:"result"`
	Err    string `json:"err"`
	Cost   int    `json:"cost"`
}

type EvaluationResult struct {
	Result string
	Score  int
	Error  string
}

func Evaluate(sub common.Submission) EvaluationResult {
	log := logging.Logger.WithFields(logrus.Fields{
		"location":      "Evaluate",
		"submission_id": sub.ID,
	})

	subFileName := fmt.Sprintf("%s.isl", uuid.New().String())
	subFilePath := path.Join("../../mini-vinci-judge/submissions", subFileName)

	subFile, err := os.Create(subFilePath)
	if err != nil {
		log.WithError(err).Errorf("could not create submission file")
		return EvaluationResult{Result: EvaluationResultTypeFailed, Error: EvaluationErrSystem}
	}
	defer func() {
		subFile.Close()
		if err := os.Remove(subFilePath); err != nil {
			log.WithError(err).Errorf("could not delete submission file")
		}
	}()

	sess, err := session.NewSession(&aws.Config{Region: aws.String("us-east-1")})
	if err != nil {
		log.WithError(err).Errorf("could not create new aws session")
		return EvaluationResult{Result: EvaluationResultTypeFailed, Error: EvaluationErrSystem}
	}

	downloader := s3manager.NewDownloader(sess)
	numBytes, err := downloader.Download(subFile,
		&s3.GetObjectInput{
			Bucket: aws.String(config.Get().S3.SubmissionsBucketName),
			Key:    aws.String(sub.S3Key),
		})
	if err != nil {
		log.WithError(err).Errorf("could not download submission")
		return EvaluationResult{Result: EvaluationResultTypeFailed, Error: EvaluationErrSystem}
	}

	fmt.Println("Downloaded", subFile.Name(), numBytes, "bytes")

	ctx := context.Background()
	var cancel context.CancelFunc
	ctx, cancel = context.WithTimeout(context.Background(), EvaluationTimeOutInSeconds*time.Second)
	defer cancel()

	cmd := exec.CommandContext(ctx, "yarn", "run", "-s", "test",
		fmt.Sprintf("submissions/%s", subFileName),
		fmt.Sprintf("%d", sub.ProblemID))

	cmd.Dir = "../../mini-vinci-judge"

	output, err := cmd.Output()
	if err != nil {
		log.WithError(err).Errorf("could not run the command")
		return EvaluationResult{Result: EvaluationResultTypeFailed, Error: EvaluationErrSystem}
	}

	if ctx.Err() == context.DeadlineExceeded {
		log.WithError(ctx.Err()).Errorf("timeout happened")
		return EvaluationResult{Result: EvaluationResultTypeFailed, Error: EvaluationErrTimeout}
	}

	outputAsStr := strings.TrimSpace(string(output))

	log.Infof("judge result: %s", outputAsStr)

	var judgeResult JudgeResult

	if err := json.Unmarshal([]byte(outputAsStr), &judgeResult); err != nil {
		log.WithError(err).Errorf("could not unmarshall judge result")
		return EvaluationResult{Result: EvaluationResultTypeFailed, Error: EvaluationErrSystem}
	}

	fmt.Println(judgeResult)

	return EvaluationResult{
		Result: EvaluationResultTypeSucceed,
		Score:  judgeResult.Cost,
		Error:  judgeResult.Result,
	}
}

func EvaluateSubmission(payload SubmissionEvaluationPayload) error {
	submissionStore := common.NewSubmissionStore()

	submission, err := submissionStore.First(map[string]interface{}{
		"id": payload.SubmissionID,
	})
	if err != nil {
		return fmt.Errorf("error while getting submission: %v", err)
	}

	err = submissionStore.Update(payload.SubmissionID, map[string]interface{}{
		"status":            common.SubmissionStatusProcessing,
		"status_changed_at": time.Now(),
	})

	result := EvaluationResult{}

	rand.Seed(time.Now().UnixNano())

	randomSleep := 2000 + rand.Intn(2000)
	fmt.Println(randomSleep, "ms")
	time.Sleep(time.Duration(randomSleep) * time.Millisecond)
	result.Score = rand.Intn(100)

	err = submissionStore.Update(payload.SubmissionID, map[string]interface{}{
		"status":            common.SubmissionStatusSucceed,
		"status_changed_at": time.Now(),
		"score":             result.Score,
	})
	if err != nil {
		return fmt.Errorf("error while updating submission: %v", err)
	}

	resultStore := common.NewResultStore()

	err = resultStore.CreateIfRequired(submission.UserID, submission.ProblemID)
	if err != nil {
		return fmt.Errorf("error while creating result record if required: %v", err)
	}

	err = resultStore.UpdateResult(submission.UserID, submission.ProblemID, submission.CreatedAt, result.Score)
	if err != nil {
		return fmt.Errorf("error while updating result: %v", err)
	}

	return nil
}
