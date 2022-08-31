package internal

import (
	"fmt"

	"github.com/icfpcontest2022/mini-vinci/contest-logic/internal/parser"
	"github.com/icfpcontest2022/mini-vinci/contest-logic/internal/types"
)

type Interpreter struct {
	topLevelIDCounter int
}

func NewInterpreter() *Interpreter {
	return &Interpreter{
		topLevelIDCounter: 0,
	}
}

func (i *Interpreter) GetNextBlockID() string {
	i.topLevelIDCounter++
	return fmt.Sprintf("%d", i.topLevelIDCounter)
}

func (i *Interpreter) Run(code string) (*types.Canvas, error) {
	program, err := parser.ParseCode(code)
	if err != nil {
		return nil, fmt.Errorf("could not parse the code: %v", err)
	}
	canvas := program.GetCanvas()
	if err := program.ExecuteInstructions(canvas, i); err != nil {
		return nil, fmt.Errorf("error while executing instructions: %v", err)
	}
	return canvas, nil
}
