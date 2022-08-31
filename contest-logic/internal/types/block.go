package types

import (
	"fmt"
	"image/color"
)

type Block interface {
	Repr() string
	BlockID() string
	Children() []*SimpleBlock
	IsPointInside(*Point) bool
	DivideAroundPoint(p *Point) [4]Block
}

// type BlockType interface {
// 	SimpleBlock | ComplexBlock
// }

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

func (b *SimpleBlock) BlockID() string  { return b.id }
func (b *ComplexBlock) BlockID() string { return b.id }

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
