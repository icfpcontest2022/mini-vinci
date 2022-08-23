package submission

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/gin-gonic/gin"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/apiresponses"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/async"
	. "github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/common"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/config"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/logging"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/user"
	"github.com/sirupsen/logrus"
	"net/http"
	"time"
)

type SubmissionController struct{}

func (sc *SubmissionController) CreateSubmission(c *gin.Context, params CreateSubmissionParams) (int, interface{}) {
	log := logging.Logger.WithFields(logrus.Fields{
		"location": "CreateSubmission",
	})

	usr, err := user.GetUserFromGinContext(c)
	if err != nil {
		log.WithError(err).Errorf("could not get user from context")
		return apiresponses.InternalServerError()
	}

	submissionStore := NewSubmissionStore()

	subFile, err := params.File.Open()
	if err != nil {
		log.WithError(err).Errorf("could not open submission file")
		return apiresponses.InternalServerError()
	}

	sess, err := session.NewSession(&aws.Config{
		Region: aws.String(config.Get().S3.Region)},
	)
	if err != nil {
		log.WithError(err).Errorf("could not start new aws session")
		return apiresponses.InternalServerError()
	}

	uploader := s3manager.NewUploader(sess)

	s3Key := GenerateS3FileKey(usr.ID, params.ProblemID)

	_, err = uploader.Upload(&s3manager.UploadInput{
		Bucket: aws.String(config.Get().S3.SubmissionsBucketName),
		Key:    aws.String(s3Key),
		Body:   subFile,
	})
	if err != nil {
		log.WithError(err).Errorf("could not upload to s3")
		return apiresponses.InternalServerError()
	}

	createdSub, _ := submissionStore.Create(Submission{
		ProblemID:       params.ProblemID,
		UserID:          usr.ID,
		S3Key:           s3Key,
		Status:          SubmissionStatusQueued,
		StatusChangedAt: time.Now(),
	})

	async.PlanSubmissionEvaluation(async.SubmissionEvaluationPayload{SubmissionID: createdSub.ID})

	return apiresponses.SuccessMessage("submission created successfully")
}

func (sc *SubmissionController) RetrieveSubmission(c *gin.Context, params RetrieveSubmissionParams) (int, interface{}) {
	log := logging.Logger.WithFields(logrus.Fields{
		"location": "RetrieveSubmission",
	})

	usr, err := user.GetUserFromGinContext(c)
	if err != nil {
		log.WithError(err).Errorf("could not get user from context")
		return apiresponses.InternalServerError()
	}

	submissionStore := NewSubmissionStore()
	sub, err := submissionStore.First(map[string]interface{}{
		"id":      params.ID,
		"user_id": usr.ID,
	})
	if err != nil {
		log.WithError(err).Errorf("could not find submission")
		return apiresponses.InternalServerError()
	}

	sess, err := session.NewSession(&aws.Config{
		Region: aws.String(config.Get().Email.SESRegion)},
	)
	if err != nil {
		log.WithError(err).Errorf("could not start new aws session")
		return apiresponses.InternalServerError()
	}

	r, _ := s3.New(sess).GetObjectRequest(&s3.GetObjectInput{
		Bucket: aws.String(config.Get().S3.SubmissionsBucketName),
		Key:    aws.String(sub.S3Key),
	})

	presignedURL, err := r.Presign(5 * time.Minute)
	if err != nil {
		log.WithError(err).Errorf("could not generate presigned url")
		return apiresponses.InternalServerError()
	}

	return http.StatusOK, RetrieveSubmissionResponse{
		ID:          sub.ID,
		SubmittedAt: sub.CreatedAt,
		Status:      sub.Status,
		Score:       sub.Score,
		FileURL:     presignedURL,
	}
}

func (sc *SubmissionController) GetSubmissions(c *gin.Context) (int, interface{}) {
	log := logging.Logger.WithFields(logrus.Fields{
		"location": "GetSubmissions",
	})

	usr, err := user.GetUserFromGinContext(c)
	if err != nil {
		log.WithError(err).Errorf("could not get user from context")
		return apiresponses.InternalServerError()
	}

	submissionStore := NewSubmissionStore()
	subs, err := submissionStore.Find(map[string]interface{}{
		"user_id": usr.ID,
	})
	if err != nil {
		log.WithError(err).Errorf("could not find submissions")
		return apiresponses.InternalServerError()
	}

	var responseSubs []SingleSubmission
	for _, sub := range subs {
		responseSubs = append(responseSubs, SingleSubmission{
			ID:          sub.ID,
			Status:      sub.Status,
			Score:       sub.Score,
			SubmittedAt: sub.CreatedAt,
		})
	}

	return http.StatusOK, GetSubmissionsResponse{
		Submissions: responseSubs,
	}
}
