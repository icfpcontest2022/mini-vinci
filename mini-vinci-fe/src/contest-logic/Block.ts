/* eslint-disable */

import { Point } from './Point';
import { RGBA } from './Color';


export type Size = Point;
export enum BlockType { SimpleBlockType, ComplexBlockType };
export type Block =
    | SimpleBlock
    | ComplexBlock;

export class SimpleBlock {
    typ: BlockType;

    id: string;

    bottomLeft: Point;

    topRight: Point;

    size: Size;

    color: RGBA;
    
    constructor(id: string, bottomLeft: Point, topRight: Point, color: RGBA) {
        this.typ = BlockType.SimpleBlockType;
        this.id = id;
        this.bottomLeft = bottomLeft;
        this.topRight = topRight;
        this.size = topRight.getDiff(bottomLeft);
        this.color = color;
    }

    getChildren() {
        return [this];
    }
}

export class ComplexBlock {
    typ: BlockType;
    
    id: string;

    bottomLeft: Point;

    topRight: Point;

    size: Size;

    subBlocks: SimpleBlock[];

    constructor(id: string, bottomLeft: Point, topRight: Point, subBlocks: SimpleBlock[]) {
        this.typ = BlockType.ComplexBlockType;
        this.id = id;
        this.bottomLeft = bottomLeft;
        this.topRight = topRight;
        this.size = topRight.getDiff(bottomLeft);
        this.subBlocks = subBlocks;
    }

    getChildren() {
        return this.subBlocks;
    }
}