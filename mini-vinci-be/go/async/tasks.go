package async

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/hibiken/asynq"
	. "github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/common"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/config"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/email"
	"log"
	"math/rand"
	"time"
)

func EvaluateSubmission(payload SubmissionEvaluationPayload) error {
	submissionStore := NewSubmissionStore()

	err := submissionStore.Update(payload.SubmissionID, map[string]interface{}{
		"status":            SubmissionStatusProcessing,
		"status_changed_at": time.Now(),
	})

	n := 1000 + rand.Intn(1000)
	fmt.Println(n, "ms")
	time.Sleep(time.Duration(n) * time.Millisecond)

	err = submissionStore.Update(payload.SubmissionID, map[string]interface{}{
		"status":            SubmissionStatusSucceed,
		"status_changed_at": time.Now(),
		"score":             rand.Intn(100),
	})
	if err != nil {
		return err
	}

	return nil
}

type SubmissionEvaluationPayload struct {
	SubmissionID uint
}

const (
	TypeEmailDelivery      = "email:deliver"
	TypeEvaluateSubmission = "submission:evaluate"
)

func SendEmail(p email.EmailDeliveryPayload) error {
	if config.Get().Async.Eager {
		return email.SendEmail(p)
	}

	payload, err := json.Marshal(p)
	if err != nil {
		return err
	}
	task := asynq.NewTask(TypeEmailDelivery, payload)

	client := asynq.NewClient(asynq.RedisClientOpt{Addr: config.Get().Redis.Address})
	defer client.Close()
	info, err := client.Enqueue(task)
	if err != nil {
		log.Fatalf("could not enqueue task: %v", err)
		return err
	}

	log.Printf("enqueued task: id=%s queue=%s", info.ID, info.Queue)

	return nil
}

func HandleEmailDeliveryTask(ctx context.Context, t *asynq.Task) error {
	var p email.EmailDeliveryPayload
	if err := json.Unmarshal(t.Payload(), &p); err != nil {
		return fmt.Errorf("json.Unmarshal failed: %v: %w", err, asynq.SkipRetry)
	}

	return email.SendEmail(p)
}

func PlanSubmissionEvaluation(p SubmissionEvaluationPayload) error {
	if config.Get().Async.Eager {
		return EvaluateSubmission(p)
	}

	payload, err := json.Marshal(p)
	if err != nil {
		return err
	}
	task := asynq.NewTask(TypeEvaluateSubmission, payload)

	client := asynq.NewClient(asynq.RedisClientOpt{Addr: config.Get().Redis.Address})
	defer client.Close()
	info, err := client.Enqueue(task)
	if err != nil {
		log.Fatalf("could not enqueue task: %v", err)
		return err
	}

	log.Printf("enqueued task: id=%s queue=%s", info.ID, info.Queue)

	return nil
}

func HandleSubmissionEvaluation(ctx context.Context, t *asynq.Task) error {
	var p SubmissionEvaluationPayload
	if err := json.Unmarshal(t.Payload(), &p); err != nil {
		return fmt.Errorf("json.Unmarshal failed: %v: %w", err, asynq.SkipRetry)
	}

	return EvaluateSubmission(p)
}
