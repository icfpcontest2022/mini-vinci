package db

import (
	"fmt"
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/config"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var internalDB *gorm.DB

func Initialize() error {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		config.Get().Database.Host,
		config.Get().Database.User,
		config.Get().Database.Password,
		config.Get().Database.Name,
		config.Get().Database.Port)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return err
	}

	internalDB = db

	return nil
}

func Get() *gorm.DB {
	return internalDB
}
