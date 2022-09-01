package evaluation

import (
	"context"
	"fmt"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/common"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/config"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/problem"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/exec"
	"path"
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

func Evaluate(sub common.Submission, prob problem.Problem) EvaluationResult {
	dir, err := ioutil.TempDir("./evaluation/submissions", fmt.Sprintf("%d_problem%d_", sub.UserID, sub.ProblemID))
	if err != nil {
		log.Fatal(err)
	}
	//defer os.RemoveAll(dir)
	fmt.Println(dir)

	sess, err := session.NewSession(&aws.Config{Region: aws.String("us-east-1")})
	if err != nil {
		fmt.Println(err)
	}

	subFile, err := os.Create(path.Join(dir, "submission.isl"))
	if err != nil {
		fmt.Println(err)
	}
	defer subFile.Close()

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

	response, err := http.Get(prob.TargetLink)
	if err != nil {
		return EvaluationResult{}
	}
	defer response.Body.Close()

	if response.StatusCode != 200 {
		// return errors.New("Received non 200 response code")
	}

	//Create a empty file
	file, err := os.Create(path.Join(dir, "target.png"))
	if err != nil {
		//return err
	}
	defer file.Close()

	_, err = io.Copy(file, response.Body)
	if err != nil {
		// return err
	}

	// We got submission.isl, target.png in dir

	ctx := context.Background()
	var cancel context.CancelFunc
	ctx, cancel = context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	output, err := exec.CommandContext(ctx, "npm", "Emre").Output()
	if err != nil {
		fmt.Println("command context error", err)
	}

	fmt.Println("output:", string(output))

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
