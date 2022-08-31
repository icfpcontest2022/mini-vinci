/* eslint-disable */

import { RGBA } from "./Color";
import { Frame } from "./Painter";

type HSV = {
  hue: number,
  sat: number,
  val: number
}

export class SimilarityChecker {

  static pngToFrame(filename: string): Frame {
    let frame: Frame = [];
    var fs = require("fs"),
    PNG = require("pngjs").PNG;
    
    var data = fs.readFileSync(filename);
    var png = PNG.sync.read(data);
    for (var y = 0; y < png.height; y++) {
      for (var x = 0; x < png.width; x++) {
        var idx = (png.width * y + x) << 2;
        frame.push(new RGBA(png.data.slice(idx, idx + 4)));
      }
    }
    return frame;
  }

  static imageDiff(f1: Frame, f2: Frame): number {
      let diff = 0;
      for (let index = 0; index < f1.length; index++) {
          const p1 = f1[index];
          const p2 = f2[index];
          diff += this.pixelDiff(p1, p2);
      }
      return diff;
  }

  static pixelDiff(p1: RGBA, p2: RGBA): number {
      const p1AsHsv = this.rgbToHsv(p1);
      const p2AsHsv = this.rgbToHsv(p2);
      const hueDist = Math.min(Math.abs(p1AsHsv.hue - p2AsHsv.hue), 360 - Math.abs(p1AsHsv.hue - p2AsHsv.hue)) / 180.0;
      const satDist = Math.abs(p1AsHsv.sat - p2AsHsv.sat);
      const valDist = Math.abs(p1AsHsv.val - p2AsHsv.val) / 255.0;
      const distance = Math.sqrt(hueDist * hueDist + satDist * satDist + valDist * valDist);
      return distance;
  }

  static rgbToHsv(rgba: RGBA): HSV {
      const r = rgba.r / 255;
      const g = rgba.g / 255;
      const b = rgba.b / 255;
      const maxc = Math.max(r, g, b);
      const minc = Math.min(r, g, b);
      const v = maxc;
      if (minc == maxc) {
          return { hue: 0.0, sat: 0.0, val: v };
      }
          
      const s = ((maxc-minc) / maxc) * 100;
      const rc = (maxc-r) / (maxc-minc);
      const gc = (maxc-g) / (maxc-minc);
      const bc = (maxc-b) / (maxc-minc);
      let h: number;
      switch (maxc) {
          case r: {
              h = 0.0 + bc - gc;
              break;
          }
          case g: {
              h = 2.0 + rc - bc;
              break;
          }
          case b: {
              h = 4.0 + gc - rc;
              break;
          }
          default:
              return { hue: 0.0, sat: 0.0, val: v };
      }
          
      const hue = ((h/6.0) % 1.0) * 360;
      const val = v * 100;
      const sat = s * 100;
      
      return { hue, sat, val };
  }

}