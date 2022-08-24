package problem

import "gorm.io/gorm"

type Problem struct {
	gorm.Model
	Name        string
	Description string
	CanvasLink  string
	TargetLink  string
}
