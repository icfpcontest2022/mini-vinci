/* eslint-disable */

import { Image } from "./Image";
import { Instruction, InstructionType, Orientation, MergeInstructionAttributes, SwapInstructionAttributes, PointCutInstructionAttributes, LineCutInstructionAttributes, ColorInstructionAttributes } from "./Instruction";
import TypeChecker from "./TypeChecker";
import { Video } from "./Video";

export class Interpreter {
  instructions: Array<Instruction>

  constructor(program: string) {
    const instructions: Array<Instruction> = [];
    // TODO: needs line trimming (\r or others)
    const splitProgram : Array<[number, string]> = []
    program.split("\n").forEach((value, index) => { splitProgram.push([index, value])});
    for (const [index, line] of splitProgram) {
      const instruction = new Instruction(index, line);
      if (instruction.kind !== InstructionType.NopInstruction) {
        instructions.push(instruction);
      }
    }
    this.instructions = instructions;
  }

  draw(width: number, height: number) {
    const image = new Image(width, height);
    return this._run(image);
  }

  animate(width: number, height: number) {
    const video = new Video(width, height);
    return this._run(video);
  }

  _run(on: Image | Video) {
    const blocks = new Map();
    blocks.set("0", on.canvas());

    let merge_counter = 0;
    for (const instruction of this.instructions) {
      switch (instruction.kind) {
        case InstructionType.ColorInstruction: {
          const { block, color } = instruction.attributes as ColorInstructionAttributes;
          const instructionValid = TypeChecker.typeCheckColorInstruction(blocks, block);

          if(!instructionValid.result) {
            throw new Error(`failed to execute line ${instruction.line}: [${instructionValid.error}]`);
          }

          const canvas = blocks.get(block);

          on.paint(canvas, color);

          break;
        }

        case InstructionType.LineCutInstruction: {
          const { block, orientation, location } = instruction.attributes as LineCutInstructionAttributes;

          if (!blocks.has(block)) {
            throw new Error(`failed to execute line ${instruction.line}`);
          }
          const canvas = blocks.get(block);

          if (orientation === Orientation.Horizontal) {
            let [bottom_canvas, top_canvas] = on.cut_horizontally(canvas, location);
            blocks.set(`${block}.0`, bottom_canvas);
            blocks.set(`${block}.1`, top_canvas);
          } else {
            let [left_canvas, right_canvas] = on.cut_vertically(canvas, location);
            blocks.set(`${block}.0`, left_canvas);
            blocks.set(`${block}.1`, right_canvas);
          }

          break;
        }

        case InstructionType.MergeInstruction: {
          const { block1, block2 } = instruction.attributes as MergeInstructionAttributes;

          if (!blocks.has(block1)) {
            throw new Error(`failed to execute line ${instruction.line}`);
          }
          const canvas1 = blocks.get(block1);

          if (!blocks.has(block2)) {
            throw new Error(`failed to execute line ${instruction.line}`);
          }
          const canvas2 = blocks.get(block2);

          const new_canvas = on.merge(canvas1, canvas2);

          merge_counter += 1;
          blocks.set(merge_counter.toString(), new_canvas);

          break;
        }

        case InstructionType.PointCutInstruction: {
          const { block, position } = instruction.attributes as PointCutInstructionAttributes;

          if (!blocks.has(block)) {
            throw new Error(`failed to execute line ${instruction.line}`);
          }
          const canvas = blocks.get(block);

          let [bottom_left_canvas, bottom_right_canvas, top_right_canvas, top_left_canvas] = on.cut(
            canvas,
            position,
          );

          blocks.set(`${block}.0`, bottom_left_canvas);
          blocks.set(`${block}.1`, bottom_right_canvas);
          blocks.set(`${block}.2`, top_right_canvas);
          blocks.set(`${block}.3`, top_left_canvas);

          break;
        }

        case InstructionType.SwapInstruction: {
          const { block1, block2 } = instruction.attributes as SwapInstructionAttributes;

          if (!blocks.has(block1)) {
            throw new Error(`failed to execute line ${instruction.line}`);
          }
          const canvas1 = blocks.get(block1);

          if (!blocks.has(block2)) {
            throw new Error(`failed to execute line ${instruction.line}`);
          }
          const canvas2 = blocks.get(block2);

          on.swap(canvas1, canvas2);

          break;
        }
      }
    }

    return on;
  }
}
