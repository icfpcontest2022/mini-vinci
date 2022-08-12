/* eslint-disable */

import { Canvas } from "./canvas";
import { Rgba } from "./rgba";
import { Section } from "./section";

export class Image {
  constructor(width, height) {
    const section = new Section({
      width,
      height,

      top_left_position: [0, 0],
      priority: 1,

      is_painted: true,
      color: new Rgba(0, 0, 0, 0),

      parent: new Canvas(0),
      childs: [],
    });
    const sections = [section];

    const drawn_canvases = new Set();
    drawn_canvases.add(new Canvas(0));

    this.sections = sections;
    this.drawn_canvases = drawn_canvases;
  }

  get height() {
    return this.sections[0].height;
  }

  get width() {
    return this.sections[0].width;
  }

  _insert(section) {
    const index = this.sections.length;
    this.sections.push(section);
    return new Canvas(index);
  }

  canvas() {
    return new Canvas(0);
  }

  cut(canvas, at) {
    const section = this.sections[canvas.index];
    const priority = Math.max(
      section.priority,
      Math.max(0, ...section.childs.map((c) => this.sections[c.index].priority)) + 1,
    );

    const x_start = section.top_left_position[0];
    const x_end = x_start + section.width;

    const y_start = section.top_left_position[1];
    const y_end = y_start + section.height;

    const x_at = at[0];
    const y_at = this.height - at[1];

    const to_left = x_at - x_start;
    const to_right = x_end - x_at;

    const to_top = y_at - y_start;
    const to_bottom = y_end - y_at;

    const top_left_section = new Section({
      width: to_left,
      height: to_top,

      is_painted: section.is_painted,
      color: section.color,

      top_left_position: [...section.top_left_position],
      priority,

      parent: canvas,
      childs: [],
    });

    const top_right_section = new Section({
      width: to_right,
      height: to_top,

      top_left_position: [...section.top_left_position],
      priority,

      is_painted: section.is_painted,
      color: section.color,

      parent: canvas,
      childs: [],
    });
    top_right_section.top_left_position[0] += to_left;

    const bottom_left_section = new Section({
      width: to_left,
      height: to_bottom,

      top_left_position: [...section.top_left_position],
      priority,

      is_painted: section.is_painted,
      color: section.color,

      parent: canvas,
      childs: [],
    });
    bottom_left_section.top_left_position[1] += to_top;

    const bottom_right_section = new Section({
      width: to_right,
      height: to_bottom,

      top_left_position: [...section.top_left_position],
      priority,

      is_painted: section.is_painted,
      color: section.color,

      parent: canvas,
      childs: [],
    });
    bottom_right_section.top_left_position[0] += to_left;
    bottom_right_section.top_left_position[1] += to_top;

    const top_left_canvas = this._insert(top_left_section);
    const top_right_canvas = this._insert(top_right_section);
    const bottom_left_canvas = this._insert(bottom_left_section);
    const bottom_right_canvas = this._insert(bottom_right_section);

    this.drawn_canvases.delete(canvas);

    this.drawn_canvases.add(top_left_canvas);
    this.drawn_canvases.add(top_right_canvas);
    this.drawn_canvases.add(bottom_left_canvas);
    this.drawn_canvases.add(bottom_right_canvas);

    section.is_painted = false;
    section.childs = [bottom_left_canvas, bottom_right_canvas, top_right_canvas, top_left_canvas];

    return [bottom_left_canvas, bottom_right_canvas, top_right_canvas, top_left_canvas];
  }

  cut_horizontally(canvas, at) {
    const section = this.sections[canvas.index];
    const priority = Math.max(
      section.priority,
      Math.max(0, ...section.childs.map((c) => this.sections[c.index].priority)) + 1,
    );

    const start = section.top_left_position[1];
    const end = start + section.height;

    at = this.height - at;

    const to_top = at - start;
    const to_bottom = end - at;

    const top_section = new Section({
      width: section.width,
      height: to_top,

      top_left_position: [...section.top_left_position],
      priority,

      is_painted: section.is_painted,
      color: section.color,

      parent: canvas,
      childs: [],
    });

    const bottom_section = new Section({
      width: section.width,
      height: to_bottom,

      top_left_position: [...section.top_left_position],
      priority,

      is_painted: section.is_painted,
      color: section.color,

      parent: canvas,
      childs: [],
    });
    bottom_section.top_left_position[1] += to_top;

    const top_canvas = this._insert(top_section);
    const bottom_canvas = this._insert(bottom_section);

    this.drawn_canvases.delete(canvas);

    this.drawn_canvases.add(top_canvas);
    this.drawn_canvases.add(bottom_canvas);

    section.is_painted = false;
    section.childs = [top_canvas, bottom_canvas];

    return [bottom_canvas, top_canvas];
  }

  cut_vertically(canvas, at) {
    const section = this.sections[canvas.index];
    const priority = Math.max(
      section.priority,
      Math.max(0, ...section.childs.map((c) => this.sections[c.index].priority)) + 1,
    );

    const start = section.top_left_position[0];
    const end = start + section.width;

    const to_left = at - start;
    const to_right = end - at;

    const left_section = new Section({
      width: to_left,
      height: section.height,

      top_left_position: [...section.top_left_position],
      priority,

      is_painted: section.is_painted,
      color: section.color,

      parent: canvas,
      childs: [],
    });

    const right_section = new Section({
      width: to_right,
      height: section.height,

      top_left_position: [...section.top_left_position],
      priority,

      is_painted: section.is_painted,
      color: section.color,

      parent: canvas,
      childs: [],
    });
    right_section.top_left_position[0] += to_left;

    const left_canvas = this._insert(left_section);
    const right_canvas = this._insert(right_section);

    this.drawn_canvases.delete(canvas);

    this.drawn_canvases.add(left_canvas);
    this.drawn_canvases.add(right_canvas);

    section.is_painted = false;
    section.childs = [left_canvas, right_canvas];

    return [left_canvas, right_canvas];
  }

  merge(canvas1, canvas2) {
    const section1 = this.sections[canvas1.index];
    const section2 = this.sections[canvas2.index];

    const horizontal_merge = section1.top_left_position[0] === section2.top_left_position[0];
    const vertical_merge = section1.top_left_position[1] === section2.top_left_position[1];

    let width = section1.width;
    if (vertical_merge) {
      width += section2.width;
    }

    let height = section1.height;
    if (horizontal_merge) {
      height += section2.height;
    }

    let top_left_position;
    if (horizontal_merge) {
      top_left_position = [
        section1.top_left_position[0],
        Math.min(section1.top_left_position[1], section2.top_left_position[1]),
      ];
    } else {
      top_left_position = [
        Math.min(section1.top_left_position[0], section2.top_left_position[0]),
        section1.top_left_position[1],
      ];
    }

    const top_level_canvas = new Canvas(this.sections.length);
    const top_level_section = new Section({
      width,
      height,

      top_left_position,
      priority: 1,

      is_painted: false,
      color: new Rgba(0, 0, 0, 0),

      parent: top_level_canvas,
      childs: [canvas1, canvas2],
    });

    this._insert(top_level_section);

    const section1_parent = this.sections[section1.parent.index];
    section1_parent.childs = section1_parent.childs.filter((c) => c !== canvas1);

    const section2_parent = this.sections[section2.parent.index];
    section2_parent.childs = section2_parent.childs.filter((c) => c !== canvas2);

    section1.parent = top_level_canvas;
    section2.parent = top_level_canvas;

    return top_level_canvas;
  }

  paint(canvas, color) {
    const section = this.sections[canvas.index];

    if (section.childs.length === 0) {
      section.is_painted = true;
      section.color = color;
      return;
    }

    for (canvas of section.childs) {
      this.paint(canvas, color);
    }
  }

  swap(canvas1, canvas2) {
    const section1 = this.sections[canvas1.index];
    const section2 = this.sections[canvas2.index];

    const section1_color = section1.color;
    const section2_color = section2.color;

    section1.color = section2_color;
    section2.color = section1_color;
  }

  render() {
    const sorted_drawn_sections = Array.from(this.drawn_canvases)
      .map((canvas) => this.sections[canvas.index])
      .sort((a, b) => a.priority - b.priority);

    const data = new Array(this.width * this.height * 4);
      // .fill(0);
      
    for (const section of sorted_drawn_sections) {
      const [start_width, start_height] = section.top_left_position;

      const end_width = start_width + section.width;
      const end_height = start_height + section.height;

      const color = section.color;
      for (let i = start_height; i < end_height; i++) {
        for (let j = start_width; j < end_width; j++) {
          // if (section.is_painted) {
            const start_byte = this.width * i * 4 + j * 4;

            data[start_byte] = color.r;
            data[start_byte + 1] = color.g;
            data[start_byte + 2] = color.b;
            data[start_byte + 3] = color.a;
          // }
        }
      }
    }

    return data;
  }
}
