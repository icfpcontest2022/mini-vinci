/* eslint-disable */

import { Image, Frame } from "./Image";
import { Canvas } from "./Canvas";
import { Rgba } from "./Rgba";



export class Video {
  frames: Frame[]
  image: Image

  constructor(width: number, height: number) {
    this.frames = [];
    this.image = new Image(width, height);

    this._save_frame();
  }

  get height() {
    return this.image.height;
  }

  get width() {
    return this.image.width;
  }

  canvas() {
    return this.image.canvas();
  }

  cut(canvas: Canvas, at: Array<number>) {
    return this.image.cut(canvas, at);
  }

  cut_horizontally(canvas: Canvas, at: number) {
    return this.image.cut_horizontally(canvas, at);
  }

  cut_vertically(canvas: Canvas, at: number) {
    return this.image.cut_vertically(canvas, at);
  }

  merge(canvas1: Canvas, canvas2: Canvas) {
    return this.image.merge(canvas1, canvas2);
  }

  paint(canvas: Canvas, color: Rgba) {
    this.image.paint(canvas, color);
    this._save_frame();
  }

  swap(canvas1: Canvas, canvas2: Canvas) {
    this.image.swap(canvas1, canvas2);
    this._save_frame();
  }

  render(): Frame[] {
    return this.frames;
  }

  _save_frame() {
    this.frames.push(this.image.render());
  }
}
