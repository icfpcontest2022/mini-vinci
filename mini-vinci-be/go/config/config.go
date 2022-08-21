package config

import (
	"fmt"
	"github.com/spf13/viper"
	"time"
)

var (
	internalConfig Config
)

type Config struct {
	Database DatabaseConfig `mapstructure:"database"`
	JWT      JWTConfig      `mapstructure:"jwt"`
	Async    AsyncConfig    `mapstructure:"async"`
	Email    EmailConfig    `mapstructure:"email"`
	Redis    RedisConfig    `mapstructure:"email"`
	S3       S3Config       `mapstructure:"s3"`
	Logging  LoggingConfig  `mapstructure:"logging"`
}

type DatabaseConfig struct {
	Host     string `mapstructure:"host"`
	User     string `mapstructure:"user"`
	Password string `mapstructure:"password"`
	Name     string `mapstructure:"name"`
	Port     string `mapstructure:"port"`
}

type JWTConfig struct {
	LoginSecret             string        `mapstructure:"login_secret"`
	LoginExpireTime         time.Duration `mapstructure:"login_expire_time"`
	VerificationSecret      string        `mapstructure:"verification_secret"`
	VerificationExpireTime  time.Duration `mapstructure:"verification_expire_time"`
	RenewPasswordSecret     string        `mapstructure:"renew_password_secret"`
	RenewPasswordExpireTime time.Duration `mapstructure:"renew_password_expire_time"`
}

type AsyncConfig struct {
	Eager bool `mapstructure:"eager"`
}

type EmailConfig struct {
	SESRegion       string `mapstructure:"ses_region"`
	From            string `mapstructure:"from"`
	VerificationURL string `mapstructure:"verification_url"`
}

type RedisConfig struct {
	Address string `mapstructure:"address"`
}

type S3Config struct {
	SubmissionsBucketName string `mapstructure:"submissions_bucket_name"`
	Region                string `mapstructure:"region"`
}

type LoggingConfig struct {
	OutputFile string `mapstructure:"output_file"`
	Level      string `mapstrucutre:"level"`
}

func Initialize() error {
	viper.AddConfigPath(".")
	viper.SetConfigName("config")

	err := viper.ReadInConfig()
	if err != nil {
		return fmt.Errorf("unable to read config: %v", err)
	}

	// set defaults
	internalConfig = Config{
		Async: AsyncConfig{
			Eager: true,
		},
		Logging: LoggingConfig{
			Level: "info",
		},
		JWT: JWTConfig{
			LoginExpireTime:         24,  // in hours
			VerificationExpireTime:  24,  // in hours
			RenewPasswordExpireTime: 24}, // in hours
	}

	err = viper.Unmarshal(&internalConfig)
	if err != nil {
		return fmt.Errorf("unable to decode into config struct: %v", err)
	}

	return nil
}

func Get() Config {
	return internalConfig
}
