package types

import "fmt"

type Point struct {
	x int
	y int
}

func (p *Point) Diff(other *Point) *Point {
	x := p.x - other.x
	y := p.y - other.y
	if x < 0 {
		x = 0
	}
	if y < 0 {
		y = 0
	}
	return &Point{x, y}
}

func (p *Point) IsInside(bottomLeft, topRight *Point) bool {
	return p.x >= bottomLeft.x && p.x <= topRight.x && p.y >= bottomLeft.y && p.y <= topRight.y
}

func (p *Point) Repr() string {
	return fmt.Sprintf("(%d, %d)", p.x, p.y)
}
