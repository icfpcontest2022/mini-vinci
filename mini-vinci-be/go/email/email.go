package email

import (
	"fmt"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/ses"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/config"
)

type EmailDeliveryPayload struct {
	Receiver string
	Subject  string
	HTMLBody string
}

func SendEmail(payload EmailDeliveryPayload) error {
	fmt.Println("sending email")
	input := &ses.SendEmailInput{
		Destination: &ses.Destination{
			CcAddresses: []*string{},
			ToAddresses: []*string{
				aws.String(payload.Receiver),
			},
		},
		Message: &ses.Message{
			Body: &ses.Body{
				Html: &ses.Content{
					Charset: aws.String("UTF-8"),
					Data:    aws.String(payload.HTMLBody),
				},
			},
			Subject: &ses.Content{
				Charset: aws.String("UTF-8"),
				Data:    aws.String(payload.Subject),
			},
		},
		Source: aws.String(config.Get().Email.From),
	}

	sess, err := session.NewSession(&aws.Config{
		Region: aws.String(config.Get().Email.SESRegion)},
	)
	svc := ses.New(sess)
	_, err = svc.SendEmail(input)

	fmt.Println("email sent error", err)

	return err
}
