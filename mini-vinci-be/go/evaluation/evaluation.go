package evaluation

import (
	"context"
	"fmt"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/google/uuid"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/common"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/config"
	"os"
	"os/exec"
	"path"
	"strings"
	"time"
)

type SubmissionEvaluationPayload struct {
	SubmissionID uint
}

type EvaluationResult struct {
	Result string
	Score  int
	Error  string
}

func Evaluate(sub common.Submission) EvaluationResult {
	tmpFileName := fmt.Sprintf("%s.isl", uuid.New().String())

	subFile, err := os.Create(path.Join("../../mini-vinci-judge/submissions", tmpFileName))
	if err != nil {
		fmt.Println(err)
	}
	defer subFile.Close()

	sess, err := session.NewSession(&aws.Config{Region: aws.String("us-east-1")})
	if err != nil {
		fmt.Println(err)
	}

	downloader := s3manager.NewDownloader(sess)
	numBytes, err := downloader.Download(subFile,
		&s3.GetObjectInput{
			Bucket: aws.String(config.Get().S3.SubmissionsBucketName),
			Key:    aws.String(sub.S3Key),
		})
	if err != nil {
		fmt.Println("could not download", err)
	}

	fmt.Println("Downloaded", subFile.Name(), numBytes, "bytes")

	// We got submission.isl, target.png in dir

	ctx := context.Background()
	var cancel context.CancelFunc
	ctx, cancel = context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	fmt.Println(subFile.Name())

	cmd := exec.CommandContext(ctx, "yarn", "run", "-s", "test", fmt.Sprintf("submissions/%s", tmpFileName), fmt.Sprintf("%d", sub.ProblemID))
	cmd.Dir = "../../mini-vinci-judge"

	output, err := cmd.Output()
	if err != nil {
		fmt.Println("command context error", err)
	}

	fmt.Println("output:", strings.TrimSpace(string(output)))

	return EvaluationResult{
		Score: 11,
		Error: "",
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
