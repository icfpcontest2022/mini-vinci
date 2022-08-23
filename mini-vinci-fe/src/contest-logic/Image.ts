/* eslint-disable */

import { Canvas } from './Canvas';
import { Rgba } from './Rgba';
import { Section } from './Section';

export type Frame = Rgba[];

export class Image {
  sections: Array<Section>;

  drawnCanvases: Set<Canvas>;

  constructor(width: number, height: number) {
    const section = new Section(
      width,
      height,

      /* topLeftPosition: */ [0, 0],
      /* priority: */ 1,
      
      /* isPainted: */ true,
      /* color: */ new Rgba([0, 0, 0, 0]),

      /* parent: */ new Canvas(0),
      /* childs: */ [],
    );
    const sections = [section];

    const drawnCanvases: Set<Canvas> = new Set();
    drawnCanvases.add(new Canvas(0));

    this.sections = sections;
    this.drawnCanvases = drawnCanvases;
  }

  get height() {
    return this.sections[0].height;
  }

  get width() {
    return this.sections[0].width;
  }

  _insert(section: Section) {
    const index = this.sections.length;
    this.sections.push(section);
    return new Canvas(index);
  }

  canvas() {
    return new Canvas(0);
  }

  cut(canvas: Canvas, at: Array<number>) {
    const section = this.sections[canvas.index];
    const priority = Math.max(
      section.priority,
      Math.max(0, ...section.childs.map((c: Canvas) => this.sections[c.index].priority)) + 1,
    );

    const xStart = section.topLeftPosition[0];
    const xEnd = xStart + section.width;

    const yStart = section.topLeftPosition[1];
    const yEnd = yStart + section.height;

    const xAt = at[0];
    const yAt = this.height - at[1];

    const toLeft = xAt - xStart;
    const toRight = xEnd - xAt;

    const toTop = yAt - yStart;
    const toBottom = yEnd - yAt;

    const topLeftSection = new Section(
      /* width: */ toLeft,
      /* height: */ toTop,

      /* topLeftPosition: */ [...section.topLeftPosition],
      /* priority: */ priority,


      /* isPainted: */ section.isPainted,
      /* color: */ section.color,


      /* parent: */ canvas,
      /* childs: */[],
    );

    const topRightSection = new Section(
      /* width: */ toRight,
      /* height: */ toTop,

      /* topLeftPosition: */ [...section.topLeftPosition],
      /* priority: */ priority,      

      /* isPainted: */ section.isPainted,
      /* color: */ section.color,

      /* parent: */ canvas,
      /* childs: */ [],
    );
    topRightSection.topLeftPosition[0] += toLeft;

    const bottomLeftSection = new Section(
      /* width: */  toLeft,
      /* height: */ toBottom,

      /* topLeftPosition: */ [...section.topLeftPosition],
      /* priority */ priority,      

      /* isPainted: */ section.isPainted,
      /* color: */ section.color,

      /* parent: */ canvas,
      /* childs: */ [],
    );
    bottomLeftSection.topLeftPosition[1] += toTop;

    const bottomRightSection = new Section(
      /* width: */ toRight,
      /* height: */ toBottom,

      /* topLeftPosition: */ [...section.topLeftPosition],
      /* priority */ priority,      

      /* isPainted: */ section.isPainted,
      /* color: */ section.color,



      /* parent: */ canvas,
      /* childs: */ [],
    );
    bottomRightSection.topLeftPosition[0] += toLeft;
    bottomRightSection.topLeftPosition[1] += toTop;

    const topLeftCanvas = this._insert(topLeftSection);
    const topRightCanvas = this._insert(topRightSection);
    const bottomLeftCanvas = this._insert(bottomLeftSection);
    const bottomRightCanvas = this._insert(bottomRightSection);

    this.drawnCanvases.delete(canvas);

    this.drawnCanvases.add(topLeftCanvas);
    this.drawnCanvases.add(topRightCanvas);
    this.drawnCanvases.add(bottomLeftCanvas);
    this.drawnCanvases.add(bottomRightCanvas);

    section.isPainted = false;
    section.childs = [bottomLeftCanvas, bottomRightCanvas, topRightCanvas, topLeftCanvas];

    return [bottomLeftCanvas, bottomRightCanvas, topRightCanvas, topLeftCanvas];
  }

  cut_horizontally(canvas: Canvas, at: number) {
    const section = this.sections[canvas.index];
    const priority = Math.max(
      section.priority,
      Math.max(0, ...section.childs.map((c: Canvas) => this.sections[c.index].priority)) + 1,
    );

    const start = section.topLeftPosition[1];
    const end = start + section.height;

    at = this.height - at;

    const toTop = at - start;
    const toBottom = end - at;

    const topSection = new Section(
      /* width: */ section.width,
      /* height: */ toTop,

      /* topLeftPosition: */ [...section.topLeftPosition],
      /* priority */ priority,      

      /* isPainted: */ section.isPainted,
      /* color: */ section.color,



      /* parent: */ canvas,
      /* childs: */ [],
    );

    const bottomSection = new Section(
      /* width: */ section.width,
      /* height: */ toBottom,

      /* topLeftPosition: */ [...section.topLeftPosition],
      /* priority */ priority,      

      /* isPainted: */ section.isPainted,
      /* color: */ section.color,



      /* parent: */ canvas,
      /* childs: */ [],
    );
    bottomSection.topLeftPosition[1] += toTop;

    const top_canvas = this._insert(topSection);
    const bottom_canvas = this._insert(bottomSection);

    this.drawnCanvases.delete(canvas);

    this.drawnCanvases.add(top_canvas);
    this.drawnCanvases.add(bottom_canvas);

    section.isPainted = false;
    section.childs = [top_canvas, bottom_canvas];

    return [bottom_canvas, top_canvas];
  }

  cut_vertically(canvas: Canvas, at: number) {
    const section = this.sections[canvas.index];
    const priority = Math.max(
      section.priority,
      Math.max(0, ...section.childs.map((c: Canvas) => this.sections[c.index].priority)) + 1,
    );

    const start = section.topLeftPosition[0];
    const end = start + section.width;

    const toLeft = at - start;
    const toRight = end - at;

    const left_section = new Section(
      /* width: */ toLeft,
      /* height: */ section.height,

      /* topLeftPosition: */ [...section.topLeftPosition],
      /* priority */ priority,      

      /* isPainted: */ section.isPainted,
      /* color: */ section.color,



      /* parent: */ canvas,
      /* childs: */ [],
    );

    const right_section = new Section(
      /* width: */ toRight,
      /* height: */ section.height,

      /* topLeftPosition: */ [...section.topLeftPosition],
      /* priority */ priority,      

      /* isPainted: */ section.isPainted,
      /* color: */ section.color,



      /* parent: */ canvas,
      /* childs: */ [],
    );
    right_section.topLeftPosition[0] += toLeft;

    const left_canvas = this._insert(left_section);
    const right_canvas = this._insert(right_section);

    this.drawnCanvases.delete(canvas);

    this.drawnCanvases.add(left_canvas);
    this.drawnCanvases.add(right_canvas);

    section.isPainted = false;
    section.childs = [left_canvas, right_canvas];

    return [left_canvas, right_canvas];
  }

  merge(canvas1: Canvas, canvas2: Canvas) {
    const section1 = this.sections[canvas1.index];
    const section2 = this.sections[canvas2.index];

    const horizontal_merge = section1.topLeftPosition[0] === section2.topLeftPosition[0];
    const vertical_merge = section1.topLeftPosition[1] === section2.topLeftPosition[1];

    let width = section1.width;
    if (vertical_merge) {
      width += section2.width;
    }

    let height = section1.height;
    if (horizontal_merge) {
      height += section2.height;
    }

    let topLeftPosition;
    if (horizontal_merge) {
      topLeftPosition = [
        section1.topLeftPosition[0],
        Math.min(section1.topLeftPosition[1], section2.topLeftPosition[1]),
      ];
    } else {
      topLeftPosition = [
        Math.min(section1.topLeftPosition[0], section2.topLeftPosition[0]),
        section1.topLeftPosition[1],
      ];
    }

    const topLevelCanvas = new Canvas(this.sections.length);
    const topLevelSection = new Section(
      /* width: */ width,
      /* height: */ height,

      /* topLeftPosition: */ topLeftPosition,
      /* priority: */ 1,

      /* isPainted: */ false,
      /* color: */ new Rgba([0, 0, 0, 0]),

      /* parent: */ topLevelCanvas,
      /* childs: */ [canvas1, canvas2],
    );

    this._insert(topLevelSection);

    const section1_parent = this.sections[section1.parent.index];
    section1_parent.childs = section1_parent.childs.filter((c: Canvas) => c !== canvas1);

    const section2_parent = this.sections[section2.parent.index];
    section2_parent.childs = section2_parent.childs.filter((c: Canvas) => c !== canvas2);

    section1.parent = topLevelCanvas;
    section2.parent = topLevelCanvas;

    return topLevelCanvas;
  }

  paint(canvas: Canvas, color: Rgba) {
    const section = this.sections[canvas.index];

    if (section.childs.length === 0) {
      section.isPainted = true;
      section.color = color;
      return;
    }

    for (canvas of section.childs) {
      this.paint(canvas, color);
    }
  }

  swap(canvas1: Canvas, canvas2: Canvas) {
    const section1 = this.sections[canvas1.index];
    const section2 = this.sections[canvas2.index];

    const section1_color = section1.color;
    const section2_color = section2.color;

    section1.color = section2_color;
    section2.color = section1_color;
  }

  render() : Frame {
    const sorted_drawn_sections = Array.from(this.drawnCanvases)
      .map((canvas) => this.sections[canvas.index])
      .sort((a, b) => a.priority - b.priority);

    const data: Frame = new Array(this.width * this.height);
      // .fill(0);
      
    for (const section of sorted_drawn_sections) {
      const [start_width, start_height] = section.topLeftPosition;

      const end_width = start_width + section.width;
      const end_height = start_height + section.height;

      for (let i = start_height; i < end_height; i++) {
        for (let j = start_width; j < end_width; j++) {
            const start_byte = this.width * i * 4 + j * 4;
            data[start_byte] = section.color;;
        }
      }
    }

    return data;
  }
}
