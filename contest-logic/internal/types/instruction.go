package types

import (
	"fmt"
	"image/color"
	"regexp"
	"strconv"
)

var (
	whitespaceRegex          = regexp.MustCompile(`\s+`)
	numberRawRegex           = `\(0|\[1-9\]\[0-9\]*\)`
	byteRawRegex             = `\(25\[0-5\]|2\[0-4\]\[0-9\]|1\[0-9\]\[0-9\]|\[1-9\]\[0-9\]|\[0-9\]\)`
	colorRawRegex            = byteRawRegex + `,` + byteRawRegex + `,` + byteRawRegex + `,` + byteRawRegex
	blockIDRawRegex          = numberRawRegex + `\(\\\.` + numberRawRegex + `\)*`
	pointRawRegex            = byteRawRegex + `,` + byteRawRegex
	colorInstructionRegex    = regexp.MustCompile(`color\\\[\(` + blockIDRawRegex + `\)\\\]\\\[(` + colorRawRegex + `)\\\]$`)
	lineCutInstructionRegex  = regexp.MustCompile(`cut\\\[\(` + blockIDRawRegex + `\)\\\]\\\[\(x|X|y|Y\)\\\]\\\[\(` + numberRawRegex + `\)\\\]$`)
	pointCutInstructionRegex = regexp.MustCompile(`cut\\\[\(` + blockIDRawRegex + `\)\\\]\\\[\(` + pointRawRegex + `\)\\\]$`)
	mergeInstructionRegex    = regexp.MustCompile(`merge\\\[\(` + blockIDRawRegex + `\)\\\]\\\[\(` + blockIDRawRegex + `\)\\\]$`)
	swapInstructionRegex     = regexp.MustCompile(`swap\\\[\(` + blockIDRawRegex + `\)\\\]\\\[\(` + blockIDRawRegex + `\)\\\]$`)
)

type Contextor interface {
	GetNextBlockID() string
}

type Instruction interface {
	Execute(*Canvas, Contextor) error
}

func ParseInstruction(code []byte) (Instruction, error) {
	if len(code) == 0 {
		return &NopInstruction{}, nil
	}
	if code[0] == '#' {
		return &CommentInstruction{
			comment: string(code[1:]),
		}, nil
	}
	code = whitespaceRegex.ReplaceAll(code, []byte{})
	if match := colorInstructionRegex.FindSubmatch(code); match != nil {
		return &ColorInstruction{
			blockID: string(match[0]),
			color: color.RGBA{
				R: match[1][0],
				G: match[1][1],
				B: match[1][2],
				A: match[1][3],
			},
		}, nil
	}
	if match := lineCutInstructionRegex.FindSubmatch(code); match != nil {
		blockID := string(match[0])
		orientation := string(match[1])
		lineNumber, err := strconv.ParseInt(string(match[2]), 10, 64)
		if err != nil {
			return nil, fmt.Errorf("could not parse lineNumber for lineCutInstructionRegex: %v", err)
		}
		if orientation == "x" || orientation == "X" {
			return &VerticalCutInstruction{blockID, int(lineNumber)}, nil
		}
		return &HorizontalCutInstruction{blockID, int(lineNumber)}, nil
	}
	if match := pointCutInstructionRegex.FindSubmatch(code); match != nil {
		//// TODO: HERE!!!
	}

	// Couldn't match the code to any instruction
	return nil, nil
}

type NopInstruction struct{}

type CommentInstruction struct {
	comment string
}

type ColorInstruction struct {
	blockID string
	color   color.RGBA
}

type PointCutInstruction struct {
	blockID string
	point   *Point
}

type VerticalCutInstruction struct {
	blockID    string
	lineNumber int
}

type HorizontalCutInstruction struct {
	blockID    string
	lineNumber int
}

type SwapInstruction struct {
	blockID1 string
	blockID2 string
}

type MergeInstruction struct {
	blockID1 string
	blockID2 string
}

func (i *NopInstruction) Execute(canvas *Canvas, ctxtr Contextor) error     { return nil }
func (i *CommentInstruction) Execute(canvas *Canvas, ctxtr Contextor) error { return nil }

func (i *ColorInstruction) Execute(canvas *Canvas, ctxtr Contextor) error {
	return canvas.ColorBlock(i.blockID, i.color)
}

func (i *PointCutInstruction) Execute(canvas *Canvas, ctxtr Contextor) error {
	return canvas.PointCut(i.blockID, i.point)
}

func (i *VerticalCutInstruction) Execute(canvas *Canvas, ctxtr Contextor) error {
	return canvas.VerticalCut(i.blockID, i.lineNumber)
}

func (i *HorizontalCutInstruction) Execute(canvas *Canvas, ctxtr Contextor) error {
	return canvas.HorizontalCut(i.blockID, i.lineNumber)
}

func (i *SwapInstruction) Execute(canvas *Canvas, ctxtr Contextor) error {
	return canvas.SwapBlocks(i.blockID1, i.blockID2)
}

func (i *MergeInstruction) Execute(canvas *Canvas, ctxtr Contextor) error { return nil } // TODO
