package common

import (
	"github.com/icfpcontest2022/mini-vinci/mini-vinci-be/go/db"
	"gorm.io/gorm"
	"time"
)

type ResultStore struct {
	db *gorm.DB
}

func NewResultStore() ResultStore {
	return ResultStore{db: db.Get()}
}

func (s *ResultStore) Find(cond map[string]interface{}) ([]Result, error) {
	var results []Result

	err := s.db.Where(cond).Find(&results).Error
	if err != nil {
		return nil, err
	}

	return results, nil
}

func (s *ResultStore) CreateIfRequired(userID, problemID uint) error {
	err := s.db.FirstOrCreate(&Result{}, Result{UserID: userID, ProblemID: problemID}).Error
	return err
}

func (s *ResultStore) UpdateResult(userID, problemID uint, time time.Time, score int) error {
	err := s.db.Exec(`
			UPDATE results 
			SET submission_count = submission_count + 1, 
				last_submitted_at = GREATEST(last_submitted_at, ?),
				max_score = GREATEST(max_score, ?)
			WHERE user_id = ? and problem_id = ?`,
		time, score, userID, problemID).Error

	return err
}
