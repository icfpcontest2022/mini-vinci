/* eslint-disable */

import { Image } from "./image";
import { Instruction } from "./instructions";
import { Video } from "./video";

export class Interpreter {
  constructor(program) {
    const instructions = [];
    // TODO: needs line trimming (\r or others)
    for (const [index, line] of program.split("\n").entries()) {
      const instruction = new Instruction(index, line);
      if (instruction.kind !== "NOP") {
        instructions.push(instruction);
      }
    }
    this.instructions = instructions;
  }

  draw(width, height) {
    const image = new Image(width, height);
    return this._run(image);
  }

  animate(width, height) {
    const video = new Video(width, height);
    return this._run(video);
  }

  _run(on) {
    const blocks = new Map();
    blocks.set("0", on.canvas());

    let merge_counter = 0;
    for (const instruction of this.instructions) {
      switch (instruction.kind) {
        case "COLOR": {
          const { block, color } = instruction.attributes;

          if (!blocks.has(block)) {
            throw new Error(`failed to execute line ${instruction.line}`);
          }
          const canvas = blocks.get(block);

          on.paint(canvas, color);

          break;
        }

        case "LINE_CUT": {
          const { block, orientation, location } = instruction.attributes;

          if (!blocks.has(block)) {
            throw new Error(`failed to execute line ${instruction.line}`);
          }
          const canvas = blocks.get(block);

          if (orientation === "HORIZONTAL") {
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

        case "MERGE": {
          const { block1, block2 } = instruction.attributes;

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

        case "POINT_CUT": {
          const { block, position } = instruction.attributes;

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

        case "SWAP": {
          const { block1, block2 } = instruction.attributes;

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
