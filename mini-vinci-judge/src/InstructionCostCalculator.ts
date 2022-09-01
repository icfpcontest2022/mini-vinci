/* eslint-disable */

import { InstructionType } from "./Instruction";


export class InstructionCostCalculator {
    static baseCostMap: Map<InstructionType, number> = new Map([
        [InstructionType.NopInstructionType,            0],
        [InstructionType.CommentInstructionType,        0],
        [InstructionType.ColorInstructionType,          3],
        [InstructionType.VerticalCutInstructionType,    4],
        [InstructionType.HorizontalCutInstructionType,  4],
        [InstructionType.PointCutInstructionType,       5],
        [InstructionType.SwapInstructionType,           2],
        [InstructionType.MergeInstructionType,          1],
    ])

    static getCost(instructionType: InstructionType, blockSize: number, canvasSize: number): number {
        const baseCost = this.baseCostMap.get(instructionType) as number;
        const totalCost = Math.round(baseCost * Math.sqrt(canvasSize / blockSize));
        return totalCost;
    }
}