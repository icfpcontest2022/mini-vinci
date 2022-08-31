package types

import (
	"fmt"
	"image/color"
)

type Block interface {
	Repr() string
	Size() *Point
	SetID(id string)
	BlockID() string
	anchors() [2]*Point
	Children() []*SimpleBlock
	IsPointInside(*Point) bool
	DivideAroundPoint(p *Point) [4]Block
	DivideVertical(lineNumber int) [2]Block
	DivideHorizontal(lineNumber int) [2]Block
	IsVerticalLineInside(lineNumber int) bool
	IsHorizontalLineInside(lineNumber int) bool
	MergeTo(other Block, id string) (Block, error)
}

type SimpleBlock struct {
	id         string
	bottomLeft *Point
	topRight   *Point
	size       *Point
	color      color.RGBA
}

func NewSimpleBlock(id string, bottomLeft *Point, topRight *Point, color color.RGBA) *SimpleBlock {
	return &SimpleBlock{
		id:         id,
		bottomLeft: bottomLeft,
		topRight:   topRight,
		size:       topRight.Diff(bottomLeft),
		color:      color,
	}
}

func (b *SimpleBlock) Children() []*SimpleBlock {
	return []*SimpleBlock{b}
}

type ComplexBlock struct {
	id         string
	bottomLeft *Point
	topRight   *Point
	size       *Point
	subBlocks  []*SimpleBlock
}

func NewComplexBlock(id string, bottomLeft *Point, topRight *Point, subBlocks []*SimpleBlock) *ComplexBlock {
	return &ComplexBlock{
		id:         id,
		bottomLeft: bottomLeft,
		topRight:   topRight,
		size:       topRight.Diff(bottomLeft),
		subBlocks:  subBlocks,
	}
}

func (b *ComplexBlock) Children() []*SimpleBlock {
	return b.subBlocks
}

func (b *SimpleBlock) anchors() [2]*Point {
	return [2]*Point{b.bottomLeft.Clone(), b.topRight.Clone()}
}

func (b *ComplexBlock) anchors() [2]*Point {
	return [2]*Point{b.bottomLeft.Clone(), b.topRight.Clone()}
}

func (b *SimpleBlock) SetID(id string)  { b.id = id }
func (b *ComplexBlock) SetID(id string) { b.id = id }

func (b *SimpleBlock) BlockID() string  { return b.id }
func (b *ComplexBlock) BlockID() string { return b.id }

func (b *SimpleBlock) Size() *Point  { return b.size.Clone() }
func (b *ComplexBlock) Size() *Point { return b.size.Clone() }

func (b *SimpleBlock) IsPointInside(p *Point) bool {
	return p.IsInside(b.bottomLeft, b.topRight)
}

func (b *ComplexBlock) IsPointInside(p *Point) bool {
	return p.IsInside(b.bottomLeft, b.topRight)
}

func (b *SimpleBlock) Repr() string {
	return fmt.Sprintf("(%s, %s)", b.bottomLeft.Repr(), b.topRight.Repr())
}

func (b *ComplexBlock) Repr() string {
	return fmt.Sprintf("(%s, %s)", b.bottomLeft.Repr(), b.topRight.Repr())
}

func (b *SimpleBlock) DivideAroundPoint(point *Point) [4]Block {
	bottomLeftBlk := NewSimpleBlock(b.id+".0", b.bottomLeft, point, b.color)
	bottomRightBlk := NewSimpleBlock(b.id+".1", &Point{x: point.x, y: b.bottomLeft.y}, &Point{x: b.topRight.x, y: point.y}, b.color)
	topRightBlk := NewSimpleBlock(b.id+".2", point, b.topRight, b.color)
	topLeftBlk := NewSimpleBlock(b.id+".3", &Point{x: b.bottomLeft.x, y: point.y}, &Point{x: point.x, y: b.topRight.y}, b.color)

	return [4]Block{bottomLeftBlk, bottomRightBlk, topRightBlk, topLeftBlk}
}

func (b *ComplexBlock) DivideAroundPoint(point *Point) [4]Block {
	bottomLeftBlocks := []*SimpleBlock{}
	bottomRightBlocks := []*SimpleBlock{}
	topRightBlocks := []*SimpleBlock{}
	topLeftBlocks := []*SimpleBlock{}

	for _, sub := range b.subBlocks {
		if sub.bottomLeft.x >= point.x && sub.bottomLeft.y >= point.y {
			topRightBlocks = append(topRightBlocks, sub)
			continue
		}
		if sub.topRight.x <= point.x && sub.topRight.y <= point.y {
			bottomLeftBlocks = append(bottomLeftBlocks, sub)
			continue
		}
		if sub.topRight.x <= point.x && sub.bottomLeft.y >= point.y {
			topLeftBlocks = append(topLeftBlocks, sub)
			continue
		}
		if sub.bottomLeft.x >= point.x && sub.topRight.y <= point.y {
			bottomRightBlocks = append(bottomRightBlocks, sub)
			continue
		}
		bottomLeftBlocks = append(bottomLeftBlocks, NewSimpleBlock("child", sub.bottomLeft, point, sub.color))
		bottomRightBlocks = append(bottomRightBlocks, NewSimpleBlock("child", &Point{x: point.x, y: sub.bottomLeft.y}, &Point{x: sub.topRight.x, y: point.y}, sub.color))
		topRightBlocks = append(topRightBlocks, NewSimpleBlock("child", point, sub.topRight, sub.color))
		topLeftBlocks = append(topLeftBlocks, NewSimpleBlock("child", &Point{x: sub.bottomLeft.x, y: point.y}, &Point{x: point.x, y: sub.topRight.y}, sub.color))
	}

	bottomLeftBlk := NewComplexBlock(b.id+".0", b.bottomLeft, point, bottomLeftBlocks)
	bottomRightBlk := NewComplexBlock(b.id+".1", &Point{x: point.x, y: b.bottomLeft.y}, &Point{x: b.topRight.x, y: point.y}, bottomRightBlocks)
	topRightBlk := NewComplexBlock(b.id+".2", point, b.topRight, topRightBlocks)
	topLeftBlk := NewComplexBlock(b.id+".3", &Point{x: b.bottomLeft.x, y: point.y}, &Point{x: point.x, y: b.topRight.y}, topLeftBlocks)

	return [4]Block{bottomLeftBlk, bottomRightBlk, topRightBlk, topLeftBlk}
}

func (b *SimpleBlock) IsVerticalLineInside(lineNumber int) bool {
	return b.bottomLeft.x <= lineNumber && b.topRight.x >= lineNumber
}
func (b *SimpleBlock) IsHorizontalLineInside(lineNumber int) bool {
	return b.bottomLeft.y <= lineNumber && b.topRight.y >= lineNumber
}

func (b *ComplexBlock) IsVerticalLineInside(lineNumber int) bool {
	return b.bottomLeft.x <= lineNumber && b.topRight.x >= lineNumber
}
func (b *ComplexBlock) IsHorizontalLineInside(lineNumber int) bool {
	return b.bottomLeft.y <= lineNumber && b.topRight.y >= lineNumber
}

func (b *SimpleBlock) DivideVertical(lineNumber int) [2]Block {
	return [2]Block{
		NewSimpleBlock(b.id+".0", b.bottomLeft, &Point{x: lineNumber, y: b.topRight.y}, b.color), // left block
		NewSimpleBlock(b.id+".1", &Point{x: lineNumber, y: b.bottomLeft.y}, b.topRight, b.color), // right block
	}
}

func (b *ComplexBlock) DivideVertical(lineNumber int) [2]Block {
	leftBlocks := []*SimpleBlock{}
	rightBlocks := []*SimpleBlock{}

	for _, sub := range b.subBlocks {
		if sub.bottomLeft.x >= lineNumber {
			rightBlocks = append(rightBlocks, sub)
			continue
		}
		if sub.topRight.x <= lineNumber {
			leftBlocks = append(leftBlocks, sub)
			continue
		}
		leftBlocks = append(leftBlocks, NewSimpleBlock(
			"child",
			sub.bottomLeft,
			&Point{x: lineNumber, y: sub.topRight.y},
			sub.color,
		))
		rightBlocks = append(rightBlocks, NewSimpleBlock(
			"child",
			&Point{x: lineNumber, y: sub.bottomLeft.y},
			sub.topRight,
			sub.color,
		))
	}
	return [2]Block{
		NewComplexBlock(b.id+".0", b.bottomLeft, &Point{x: lineNumber, y: b.topRight.y}, leftBlocks),  // left block
		NewComplexBlock(b.id+".1", &Point{x: lineNumber, y: b.bottomLeft.y}, b.topRight, rightBlocks), // right block
	}
}

func (b *SimpleBlock) DivideHorizontal(lineNumber int) [2]Block {
	return [2]Block{
		NewSimpleBlock(b.id+".0", b.bottomLeft, &Point{x: b.topRight.x, y: lineNumber}, b.color), // bottom block
		NewSimpleBlock(b.id+".1", &Point{x: b.bottomLeft.x, y: lineNumber}, b.topRight, b.color), // top block
	}
}

func (b *ComplexBlock) DivideHorizontal(lineNumber int) [2]Block {
	bottomBlocks := []*SimpleBlock{}
	topBlocks := []*SimpleBlock{}

	for _, sub := range b.subBlocks {
		if sub.bottomLeft.y >= lineNumber {
			topBlocks = append(topBlocks, sub)
			continue
		}
		if sub.topRight.y <= lineNumber {
			bottomBlocks = append(bottomBlocks, sub)
			continue
		}
		bottomBlocks = append(bottomBlocks, NewSimpleBlock(
			"child",
			sub.bottomLeft,
			&Point{x: sub.topRight.x, y: lineNumber},
			sub.color,
		))
		topBlocks = append(topBlocks, NewSimpleBlock(
			"child",
			&Point{x: sub.bottomLeft.x, y: lineNumber},
			sub.topRight,
			sub.color,
		))
	}
	return [2]Block{
		NewComplexBlock(b.id+".0", b.bottomLeft, &Point{x: b.topRight.x, y: lineNumber}, bottomBlocks), // bottom block
		NewComplexBlock(b.id+".1", &Point{x: b.bottomLeft.x, y: lineNumber}, b.topRight, topBlocks),    // top block
	}
}

func (b *SimpleBlock) MergeTo(other Block, id string) (Block, error) {
	return mergeBlocks(b, other, id)
}

func (b *ComplexBlock) MergeTo(other Block, id string) (Block, error) {
	return mergeBlocks(b, other, id)
}

func mergeBlocks(b1 Block, b2 Block, id string) (Block, error) {
	anchors1 := b1.anchors()
	anchors2 := b2.anchors()
	// Bottom to top direction
	if anchors1[0].x == anchors2[0].x && anchors1[1].x == anchors2[1].x {
		newBottomLeft := anchors2[0]
		newTopRight := anchors1[1]
		if anchors1[0].y < anchors2[0].y {
			newBottomLeft = anchors1[0]
			newTopRight = anchors2[1]
		}
		return NewComplexBlock(
			id, newBottomLeft, newTopRight,
			append(b1.Children(), b2.Children()...),
		), nil
	}
	// Left to right direction
	if anchors1[0].y == anchors2[0].y && anchors1[1].y == anchors2[1].y {
		newBottomLeft := anchors2[0]
		newTopRight := anchors1[1]
		if anchors1[0].x < anchors2[0].x {
			newBottomLeft = anchors1[0]
			newTopRight = anchors2[1]
		}
		return NewComplexBlock(
			id, newBottomLeft, newTopRight,
			append(b1.Children(), b2.Children()...),
		), nil
	}
	return nil, fmt.Errorf("blocks %s and %s can't be merged", b1.Repr(), b2.Repr())
}
