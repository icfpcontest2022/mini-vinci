/* eslint-disable */

export class Section {
  constructor({ width, height, top_left_position, priority, is_painted, color, parent, childs }) {
    this.width = width;
    this.height = height;

    this.top_left_position = top_left_position;
    this.priority = priority;

    this.is_painted = is_painted;
    this.color = color;

    this.parent = parent;
    this.childs = childs;
  }
}
