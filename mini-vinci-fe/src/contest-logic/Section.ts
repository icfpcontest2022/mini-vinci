
import { Rgba } from './Rgba';
import { Canvas } from './Canvas';

export class Section {
  width: number;

  height: number;

  topLeftPosition: number[];

  priority: number;

  isPainted: Boolean;

  color: Rgba;

  parent: Canvas;

  childs: Canvas[];

  constructor(
    width: number, 
    height: number, 
    topLeftPosition: number[], 
    priority: number, 
    isPainted: Boolean, 
    color: Rgba, 
    parent: Canvas, 
    childs: Canvas[], 
  ) {
    this.width = width;
    this.height = height;

    this.topLeftPosition = topLeftPosition;
    this.priority = priority;

    this.isPainted = isPainted;
    this.color = color;

    this.parent = parent;
    this.childs = childs;
  }
}
