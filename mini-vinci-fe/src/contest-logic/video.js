/* eslint-disable */

import { Image } from "./image";

export class Video {
  constructor(width, height) {
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

  cut(canvas, at) {
    return this.image.cut(canvas, at);
  }

  cut_horizontally(canvas, at) {
    return this.image.cut_horizontally(canvas, at);
  }

  cut_vertically(canvas, at) {
    return this.image.cut_vertically(canvas, at);
  }

  merge(canvas1, canvas2) {
    return this.image.merge(canvas1, canvas2);
  }

  paint(canvas, color) {
    this.image.paint(canvas, color);
    this._save_frame();
  }

  swap(canvas1, canvas2) {
    this.image.swap(canvas1, canvas2);
    this._save_frame();
  }

  render() {
    return this.frames;
  }

  _save_frame() {
    this.frames.push(this.image.render());
  }
}
