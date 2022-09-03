/* eslint-disable */

import { Block, SimpleBlock } from './Block';
import { RGBA } from './Color';
import { Point } from './Point';

export type Color = RGBA;

export type SerializedBlock = {
    blockId: string,
    bottomLeft: [number, number],
    topRight: [number, number],
    color: [number, number, number, number],
};

export type InitialConfig = {
    width: number,
    height: number,
    blocks: SerializedBlock[],
};

export class Canvas {
    width: number;

    height: number;

    backgroundColor: Color;

    blocks: Map<string, Block>;

    constructor(width: number, height: number, backgroundColor: Color) {
        this.width = width;
        this.height = height;

        this.backgroundColor = backgroundColor;
        this.blocks = new Map();
        this.blocks.set(
            "0",
            new SimpleBlock(
                "0",
                new Point([0, 0]),
                new Point([width, height]),
                backgroundColor,
            )
        );
    }

    static fromInitialConfiguration(initialConfig: InitialConfig): Canvas {
        let canvas = new Canvas(
            initialConfig.width,
            initialConfig.height,
            new RGBA([255, 255, 255, 255])
        );
        canvas.blocks.clear();
        initialConfig.blocks.forEach(serializedBlock => {
            canvas.blocks.set(
                serializedBlock.blockId,
                new SimpleBlock(
                    serializedBlock.blockId,
                    new Point(serializedBlock.bottomLeft),
                    new Point(serializedBlock.topRight),
                    new RGBA(serializedBlock.color)
                )
            )
        })
        return canvas;
    }

    get size(): Point {
        return new Point([this.width, this.height]);
    }

    simplify(): SimpleBlock[] {
        let simplifiedBlocks: SimpleBlock[] = [];
        this.blocks.forEach(value => {
            simplifiedBlocks = simplifiedBlocks.concat(value.getChildren());
        });
        return simplifiedBlocks;
    }
}
