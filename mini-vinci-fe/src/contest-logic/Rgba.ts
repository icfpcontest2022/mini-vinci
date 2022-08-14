/* eslint-disable */

export class Rgba {
  r: number;

  g: number;
  
  b: number;

  a: number;

  constructor(rgba: number[] = [0, 0, 0, 0]) {
    this.r = rgba[0];
    this.g = rgba[1];
    this.b = rgba[2];
    this.a = rgba[3];
  }
}
