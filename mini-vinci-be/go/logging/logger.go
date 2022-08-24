package logging

import (
	"fmt"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/config"
	"github.com/sirupsen/logrus"
	"os"
)

var (
	Logger *logrus.Logger
)

func Initialize() error {
	Logger = logrus.New()

	outputFileName := config.Get().Logging.OutputFile
	file, err := os.OpenFile(outputFileName, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
	if err != nil {
		return fmt.Errorf("could not log to file: %v", outputFileName)
	}

	Logger.Out = file

	Logger.SetFormatter(&logrus.JSONFormatter{})

	level, err := logrus.ParseLevel(config.Get().Logging.Level)
	if err != nil {
		return fmt.Errorf("invalid log level: %v", config.Get().Logging.Level)
	}
	Logger.SetLevel(level)

	return nil
}
