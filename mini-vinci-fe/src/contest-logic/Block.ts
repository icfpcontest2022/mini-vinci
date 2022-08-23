
export type Shape = [[number, number], [number, number]];

export class Block {
    shape: Shape
    bid: string

    constructor(shape: Shape, bid: string) {
        this.shape = shape;
        this.bid = bid
    }
}
