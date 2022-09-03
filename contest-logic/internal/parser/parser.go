package parser

import (
	"fmt"
	"image/color"
	"strings"

	"github.com/icfpcontest2022/mini-vinci/contest-logic/internal/types"
)

const (
	DefaultWidth  = 100
	DefaultHeight = 100
)

var (
	DefaultBackgroundColor = color.RGBA{255, 255, 255, 255}
)

type Metadata struct {
	width           int
	height          int
	backgroundColor color.RGBA
}

type Program struct {
	instructions []types.Instruction
	metaData     *Metadata
}

func (p *Program) GetCanvas() *types.Canvas {
	return types.NewCanvas(p.metaData.width, p.metaData.height, p.metaData.backgroundColor)
}

func (p *Program) ExecuteInstructions(canvas *types.Canvas, ctxtr types.Contextor) error {
	for index, instruction := range p.instructions {
		if err := instruction.Execute(canvas, ctxtr); err != nil {
			return fmt.Errorf("could not execute instruction %d: %s", index, err)
		}
	}
	return nil
}

func ParseCode(code string) (*Program, error) {
	instructions := []types.Instruction{}
	for index, line := range strings.Split(code, "\n") {
		ins, err := parseLine(index, line)
		if err != nil {
			return nil, err
		}
		switch ins.(type) {
		case *types.NopInstruction, *types.CommentInstruction:
			continue
		}
		instructions = append(instructions, ins)
	}
	return &Program{
		instructions: instructions,
		metaData: &Metadata{
			width:           DefaultWidth,
			height:          DefaultHeight,
			backgroundColor: DefaultBackgroundColor,
		}}, nil
}

func parseLine(lineNumber int, line string) (types.Instruction, error) {
	line = strings.TrimSpace(line)
	instr, err := types.ParseInstruction([]byte(line))
	if err != nil {
		return nil, fmt.Errorf("could not parse the instruction at line %d: %s", lineNumber, err)
	}
	if instr == nil {
		return nil, fmt.Errorf("line %d does not map to any instruction: %q", lineNumber, line)
	}
	return instr, nil
}
