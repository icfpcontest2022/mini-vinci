/* eslint-disable */

import { Rgba } from "./rgba";

const COLOR_INSTRUCTION_REGEX =
  /^ *color *\[ *(0|[1-9][0-9]*)(\.(0|[1-9][0-9]*))* *\] *\[ *(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])( *, *(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])){3} *\] *$/;

const LINE_CUT_INSTRUCTION_REGEX =
  /^ *cut *\[ *(0|[1-9][0-9]*)(\.(0|[1-9][0-9]*))* *\] *[xy] *(0|[1-9][0-9]*) *$/;

const MERGE_INSTRUCTION_REGEX =
  /^ *merge *\[ *(0|[1-9][0-9]*)(\.(0|[1-9][0-9]*))* *\] *\[ *(0|[1-9][0-9]*)(\.(0|[1-9][0-9]*))* *\] *$/;

const POINT_CUT_INSTRUCTION_REGEX =
  /^ *cut *\[ *(0|[1-9][0-9]*)(\.(0|[1-9][0-9]*))* *\] *\[ *(0|[1-9][0-9]*) *, *(0|[1-9][0-9]*) *\] *$/;

const SWAP_INSTRUCTION_REGEX =
  /^ *swap *\[ *(0|[1-9][0-9]*)(\.(0|[1-9][0-9]*))* *\] *\[ *(0|[1-9][0-9]*)(\.(0|[1-9][0-9]*))* *\] *$/;

export class Instruction {
  constructor(index, line) {
    this.line = index + 1;

    let instruction = line.trim();
    if (instruction === "") {
      this.kind = "NOP";
      this.attributes = {};
      return;
    }

    if (COLOR_INSTRUCTION_REGEX.test(instruction)) {
      const block_bracket_start = instruction.indexOf("[") + 1;
      const block_bracket_end = instruction.indexOf("]");
      const block = instruction.substring(block_bracket_start, block_bracket_end).trim();

      instruction = instruction.substring(block_bracket_end + 1, instruction.length).trim();

      const color_bracket_start = instruction.indexOf("[") + 1;
      const color_bracket_end = instruction.indexOf("]");
      const color = instruction.substring(color_bracket_start, color_bracket_end).trim();

      this.kind = "COLOR";
      this.attributes = {
        block,
        color: new Rgba(...color.split(",").map((c) => +c.trim())),
      };
    } else if (LINE_CUT_INSTRUCTION_REGEX.test(instruction)) {
      const block_bracket_start = instruction.indexOf("[") + 1;
      const block_bracket_end = instruction.indexOf("]");
      const block = instruction.substring(block_bracket_start, block_bracket_end).trim();

      instruction = instruction.substring(block_bracket_end + 1, instruction.length).trim();

      const orientation = instruction[0];
      const location = +instruction.substring(1, instruction.length).trim();

      this.kind = "LINE_CUT";
      this.attributes = {
        block,
        orientation: orientation === "x" ? "VERTICAL" : "HORIZONTAL",
        location,
      };
    } else if (MERGE_INSTRUCTION_REGEX.test(instruction)) {
      const block1_bracket_start = instruction.indexOf("[") + 1;
      const block1_bracket_end = instruction.indexOf("]");
      const block1 = instruction.substring(block1_bracket_start, block1_bracket_end).trim();

      instruction = instruction.substring(block1_bracket_end + 1, instruction.length).trim();

      let block2_bracket_start = instruction.indexOf("[") + 1;
      let block2_bracket_end = instruction.indexOf("]");
      let block2 = instruction.substring(block2_bracket_start, block2_bracket_end).trim();

      this.kind = "MERGE";
      this.attributes = {
        block1,
        block2,
      };
    } else if (POINT_CUT_INSTRUCTION_REGEX.test(instruction)) {
      const block_bracket_start = instruction.indexOf("[") + 1;
      const block_bracket_end = instruction.indexOf("]");
      const block = instruction.substring(block_bracket_start, block_bracket_end).trim();

      instruction = instruction.substring(block_bracket_end + 1, instruction.length).trim();

      const position_bracket_start = instruction.indexOf("[") + 1;
      const position_bracket_end = instruction.indexOf("]");
      const position = instruction.substring(position_bracket_start, position_bracket_end).trim();

      this.kind = "POINT_CUT";
      this.attributes = {
        block,
        position: position.split(",").map((c) => +c.trim()),
      };
    } else if (SWAP_INSTRUCTION_REGEX.test(instruction)) {
      const block1_bracket_start = instruction.indexOf("[") + 1;
      const block1_bracket_end = instruction.indexOf("]");
      const block1 = instruction.substring(block1_bracket_start, block1_bracket_end).trim();

      instruction = instruction.substring(block1_bracket_end + 1, instruction.length).trim();

      let block2_bracket_start = instruction.indexOf("[") + 1;
      let block2_bracket_end = instruction.indexOf("]");
      let block2 = instruction.substring(block2_bracket_start, block2_bracket_end).trim();

      this.kind = "SWAP";
      this.attributes = {
        block1,
        block2,
      };
    } else {
      throw new Error(`failed to parse line ${this.line}`);
    }
  }
}
