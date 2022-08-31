
import { Block, BlockType } from '../Block';
import { Canvas } from '../Canvas';
import { RGBA } from '../Color';
import { ColorInstruction, CommentInstruction, HorizontalCutInstruction, Instruction, InstructionType, MergeInstruction, NopInstruction, PointCutInstruction, SwapInstruction, VerticalCutInstruction } from '../Instruction';
import { Interpreter } from '../Interpreter';
import { Point } from '../Point';
const _ = require('lodash');

export class ContestLogicTester {

    runTester(size: number) {
        let canvas = new Canvas(400, 400, new RGBA([255, 0, 0, 0]));
        let interpreter = new Interpreter();
        let instructions = []
        for(let move = 0; move < size  ; move++) {
            const instruction = this.generateRandomInstruction(canvas);
            console.log(instruction.typ);
            instructions.push(instruction);
            const interpreterResult = interpreter.interpret(move, canvas, instruction);
            canvas = (interpreterResult.canvas as Canvas);
            this.checkCanvasInvariants(canvas);
        }
        return canvas;
    }
    
    checkCanvasInvariants(state: Canvas) {
        /**
         * 1. Blocks should be disjoint.
         * 2. Each block must be inside the canvas
         * 3. Check if block sizes add to the total cover.
         * 4. Each ComplexBlock must have (1) and (2) for its inner blocks.
         */
        if (!this.checkBlockDisjoint(state)) {
            throw Error('Blocks are not disjoint');
        }
        if (!this.checkBlockInside(state)) {
            throw Error('Blocks are not inside');
        }
        if (!this.checkBlockSizes(state)) {
            throw Error('Blocks are not the right size');
        }
        if (!this.checkComplexBlockDisjoint(state)) {
            throw Error('Complex Blocks are not disjoint');
        }
        if (!this.checkComplexBlockInside(state)){
            throw Error('Complex Blocks are not inside');
        }
        if (!this.checkComplexBlockSizes(state)) {
            throw Error('Complex Blocks are not the right size');
        }
    }
    checkBlockDisjoint(state: Canvas) {
        let disjoint = true;
        state.blocks.forEach((block1, blockId1) => {
            state.blocks.forEach((block2, blockId2) => {
                if (blockId1 != blockId2) {
                    disjoint = disjoint && 
                                (!((block1.bottomLeft.isStrictlyInside(block2.bottomLeft, block2.topRight) 
                                || block1.topRight.isStrictlyInside(block2.bottomLeft, block2.topRight)
                                || block2.bottomLeft.isStrictlyInside(block1.bottomLeft, block1.topRight)
                                || block2.topRight.isStrictlyInside(block1.bottomLeft, block1.topRight))));
                }
            })
        })
        return disjoint;
    }

    checkBlockInside(state: Canvas) {
        let inside = true;
        let stateBottomLeft = new Point([0, 0]);
        let stateTopRight = new Point([state.width, state.height]);
        state.blocks.forEach(block => {
            inside = inside
                    && block.bottomLeft.isInside(stateBottomLeft, stateTopRight)
                    && block.topRight.isInside(stateBottomLeft, stateTopRight);
        })
        return inside;
    }

    checkBlockSizes(state: Canvas) {
        let size = 0;
        state.blocks.forEach(block => {
            size += block.size.getScalarSize();
        })
        return size === state.size.getScalarSize();
    }

    checkComplexBlockDisjoint(state: Canvas) {
        let disjoint = true;
        state.blocks.forEach(block => {
            if (block.typ === BlockType.ComplexBlockType) {
                const children = block.getChildren();
                children.forEach(block1 => {
                    children.forEach(block2 => {
                        disjoint = disjoint &&
                                (!(block1.bottomLeft.isStrictlyInside(block2.bottomLeft, block2.topRight) 
                                || block1.topRight.isStrictlyInside(block2.bottomLeft, block2.topRight)
                                || block2.bottomLeft.isStrictlyInside(block1.bottomLeft, block1.topRight)
                                || block2.topRight.isStrictlyInside(block1.bottomLeft, block1.topRight)));
                    })
                })
            }
        })
        return disjoint;
    }

    checkComplexBlockInside(state: Canvas) {
        let inside = true;
        state.blocks.forEach(block => {
            if (block.typ === BlockType.ComplexBlockType) {
                const children = block.getChildren();
                children.forEach(childBlock => {
                    inside = inside
                            && childBlock.bottomLeft.isInside(block.bottomLeft, block.topRight)
                            && childBlock.topRight.isInside(block.bottomLeft, block.topRight);
                })
            }
            
        })
        return inside;
    }

    checkComplexBlockSizes(state: Canvas) {
        let sameSize = true;
        state.blocks.forEach(block => {
            let size = 0;
            if (block.typ === BlockType.ComplexBlockType) {
                block.getChildren().forEach(childBlock => {
                    size += childBlock.size.getScalarSize();
                })
                sameSize = sameSize && (size === block.size.getScalarSize());
            }
        })
        return sameSize;
    }

    generateRandomInstruction(state: Canvas): Instruction {
        let instructionType = _.sample(
            [
                InstructionType.ColorInstructionType, 
                InstructionType.HorizontalCutInstructionType,
                InstructionType.VerticalCutInstructionType,
                InstructionType.PointCutInstructionType,
                InstructionType.SwapInstructionType,
                InstructionType.MergeInstructionType,
                
            ]) as InstructionType;
        
        switch(instructionType) {
            case InstructionType.ColorInstructionType: {
                let block: Block = _.sample(Array.from(state.blocks.values())) as Block;
                let color = this.generateRandomColor();
                return {
                    typ: InstructionType.ColorInstructionType,
                    blockId: block.id,
                    color: color
                } as ColorInstruction;
            }
            case InstructionType.HorizontalCutInstructionType: {
                let block: Block = _.sample(Array.from(state.blocks.values())) as Block;
                let min = Math.ceil(block.bottomLeft.py) + 1;
                let max = Math.floor(block.topRight.py) - 1;
                let position = Math.floor(Math.random() * (max - min) + min);
                if (max - min <= 1) {
                    return { typ: InstructionType.NopInstructionType } as NopInstruction;
                }
                return {
                    typ: InstructionType.HorizontalCutInstructionType,
                    blockId: block.id,
                    lineNumber: position
                } as HorizontalCutInstruction;              
            }
            case InstructionType.VerticalCutInstructionType: {
                let block: Block = _.sample(Array.from(state.blocks.values())) as Block;
                let min = Math.ceil(block.bottomLeft.px) + 1;
                let max = Math.floor(block.topRight.px) - 1;
                let position = Math.floor(Math.random() * (max - min) + min);
                if (max - min <= 1) {
                    return { typ: InstructionType.NopInstructionType } as NopInstruction;
                }
                return {
                    typ: InstructionType.VerticalCutInstructionType,
                    blockId: block.id,
                    lineNumber: position
                } as VerticalCutInstruction;              
            }
            case InstructionType.PointCutInstructionType: {
                let block = _.sample(Array.from(state.blocks.values())) as Block;
                let xMin = block.bottomLeft.px + 1;
                let xMax = block.topRight.px - 1;
                let xPosition = Math.floor(Math.random() * (xMax - xMin) + xMin);
                let yMin = block.bottomLeft.py + 1;
                let yMax = block.topRight.py - 1;
                let yPosition = Math.floor(Math.random() * (yMax - yMin) + yMin);
                let position = new Point([xPosition, yPosition]);
                if(xMax - xMin <= 1 || yMax - yMin <= 1) {
                    return { typ: InstructionType.NopInstructionType } as NopInstruction;
                }
                return {
                    typ: InstructionType.PointCutInstructionType,
                    blockId: block.id,
                    point: position
                } as PointCutInstruction;              
            }
            case InstructionType.SwapInstructionType: {
                let swapPairs: [string, string][] = []
                state.blocks.forEach((block1, blockId1) => {
                    state.blocks.forEach((block2, blockId2) => {
                        if (blockId1 != blockId2) {
                            if (block1.size === block2.size) {
                                swapPairs.push([blockId1, blockId2]);
                            }
                        }
                    })
                })
                if(swapPairs.length === 0) {
                    return { typ: InstructionType.NopInstructionType } as NopInstruction;
                }
                let pair: [string, string] = _.sample(swapPairs);
                return {
                    typ: InstructionType.SwapInstructionType,
                    blockId1: pair[0],
                    blockId2: pair[1] 
                } as SwapInstruction;        
            }
            case InstructionType.MergeInstructionType: {
                let mergePairs: [string, string][] = []
                state.blocks.forEach((block1, blockId1) => {
                    state.blocks.forEach((block2, blockId2) => {
                        if (blockId1 != blockId2) {
                            const bottomToTop = ( block1.bottomLeft.py === block2.topRight.py ||
                                block1.topRight.py === block2.bottomLeft.py ) &&
                                block1.bottomLeft.px === block2.bottomLeft.px &&
                                block1.topRight.px === block2.topRight.px;
                            
                            const leftToRight = ( block1.bottomLeft.px === block2.topRight.px ||
                                block1.topRight.px === block2.bottomLeft.px ) &&
                                block1.bottomLeft.py === block2.bottomLeft.py &&
                                block1.topRight.py === block2.topRight.py;

                            const mergable = bottomToTop || leftToRight;
                            if (mergable) {
                                mergePairs.push([blockId1, blockId2]);
                            }
                        }
                    })
                })
                if(mergePairs.length === 0) {
                    return { typ: InstructionType.NopInstructionType } as NopInstruction;
                }
                let pair: [string, string] = _.sample(mergePairs);
                return {
                    typ: InstructionType.MergeInstructionType,
                    blockId1: pair[0],
                    blockId2: pair[1] 
                } as MergeInstruction;    
            }
        }
        return {comment: 'Should not come here'} as CommentInstruction;
    }

    generateRandomColor(): RGBA {
        const min = Math.ceil(0);
        const max = Math.floor(255);
        const randomR = Math.floor(Math.random() * (max - min) + min);
        const randomG = Math.floor(Math.random() * (max - min) + min);
        const randomB = Math.floor(Math.random() * (max - min) + min);
        const randomA = Math.floor(Math.random() * (max - min) + min);
        return new RGBA([randomR, randomG, randomB, randomA]);
    }
};