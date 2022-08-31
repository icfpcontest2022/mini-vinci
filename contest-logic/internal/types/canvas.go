package types

import (
	"fmt"
	"image/color"
)

type Canvas struct {
	width           int
	height          int
	backgroundColor color.RGBA
	blocks          map[string]Block
}

func NewCanvas(width, height int, backgroundColor color.RGBA) *Canvas {
	return &Canvas{
		width:           width,
		height:          height,
		backgroundColor: backgroundColor,
		blocks: map[string]Block{
			"0": NewSimpleBlock("0", &Point{0, 0}, &Point{width, height}, backgroundColor),
		},
	}
}

func (c *Canvas) Simplify() []*SimpleBlock {
	simplified := []*SimpleBlock{}
	for _, block := range c.blocks {
		simplified = append(simplified, block.Children()...)
	}
	return simplified
}

func (c *Canvas) getBlock(id string) (Block, error) {
	block, ok := c.blocks[id]
	if !ok {
		return nil, fmt.Errorf("block with ID %q is not found", id)
	}
	return block, nil
}

func (c *Canvas) ColorBlock(blockID string, color color.RGBA) error {
	block, err := c.getBlock(blockID)
	if err != nil {
		return err
	}
	switch block := block.(type) {
	case *SimpleBlock:
		block.color = color
	case *ComplexBlock:
		c.blocks[blockID] = NewSimpleBlock(block.id, block.bottomLeft, block.topRight, color)
	}
	return nil
}

func (c *Canvas) PointCut(blockID string, point *Point) error {
	block, err := c.getBlock(blockID)
	if err != nil {
		return err
	}
	if !block.IsPointInside(point) {
		return fmt.Errorf("point %s is out of block %s %s", point.Repr(), blockID, block.Repr())
	}
	newBlocks := block.DivideAroundPoint(point)
	delete(c.blocks, blockID)
	for _, b := range newBlocks {
		c.blocks[b.BlockID()] = b
	}
	return nil
}

func (c *Canvas) VerticalCut(blockID string, lineNumber int) error {
	block, err := c.getBlock(blockID)
	if err != nil {
		return err
	}
	if !block.IsVerticalLineInside(lineNumber) {
		return fmt.Errorf("vertical line with number %d is out of block %s %s", lineNumber, blockID, block.Repr())
	}
	newBlocks := block.DivideVertical(lineNumber)
	delete(c.blocks, blockID)
	for _, b := range newBlocks {
		c.blocks[b.BlockID()] = b
	}
	return nil
}

func (c *Canvas) HorizontalCut(blockID string, lineNumber int) error {
	block, err := c.getBlock(blockID)
	if err != nil {
		return err
	}
	if !block.IsHorizontalLineInside(lineNumber) {
		return fmt.Errorf("horizontal line with number %d is out of block %s %s", lineNumber, blockID, block.Repr())
	}
	newBlocks := block.DivideHorizontal(lineNumber)
	delete(c.blocks, blockID)
	for _, b := range newBlocks {
		c.blocks[b.BlockID()] = b
	}
	return nil
}

func (c *Canvas) SwapBlocks(blockID1, blockID2 string) error {
	block1, err := c.getBlock(blockID1)
	if err != nil {
		return err
	}
	block2, err := c.getBlock(blockID2)
	if err != nil {
		return err
	}
	if !block1.Size().IsEqual(block2.Size()) {
		return fmt.Errorf("blocks %s and %s have different sizes", blockID1, blockID2)
	}
	block1.SetID(blockID2)
	block2.SetID(blockID1)
	c.blocks[blockID1] = block2
	c.blocks[blockID2] = block1
	return nil
}

func (c *Canvas) MergeBlocks(blockID1, blockID2, newBlockID string) error {
	block1, err := c.getBlock(blockID1)
	if err != nil {
		return err
	}
	block2, err := c.getBlock(blockID2)
	if err != nil {
		return err
	}
	newBlock, err := block1.MergeTo(block2, newBlockID)
	if err != nil {
		return err
	}
	delete(c.blocks, blockID1)
	delete(c.blocks, blockID2)
	c.blocks[newBlockID] = newBlock
	return nil
}
