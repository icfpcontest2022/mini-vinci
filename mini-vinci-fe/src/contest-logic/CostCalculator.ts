
import { Image } from "./Image";
import { Instruction, InstructionType } from "./Instruction";


export class CostCalculator {

    
    calculateTotalCost() {

    }

    baseInstructionCosts(instructionType: InstructionType) {
        switch (instructionType) {
            case InstructionType.NopInstruction:        return 0;
            case InstructionType.ColorInstruction:      return 2;
            case InstructionType.LineCutInstruction:    return 2;
            case InstructionType.PointCutInstruction:   return 2;
            case InstructionType.SwapInstruction:       return 2;
            case InstructionType.MergeInstruction:      return 2;
        }
    }
    
    dynamicInstructionCost(instruction: Instruction) {

    }

    calculateInstructionCost(instruction: Instruction, image: Image) {
        
    }
}