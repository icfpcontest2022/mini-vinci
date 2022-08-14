
import { Frame } from './Image';
import { Rgba } from './Rgba';

type Hsv = {hue: number, saturation: number, value: number}
class SimilarityCalculator {

    hsvDistance(c1: Hsv, c2: Hsv): number {
        // todo@goktug
        return 0;
    }
    rgbaToHsvConverter(color: Rgba): Hsv {
        // todo@goktug
        return {hue: 0, saturation: 0, value: 0}
    }

    calculatePixelDistance(p1: Rgba, p2: Rgba): number {
        const c1 = this.rgbaToHsvConverter(p1);
        const c2 = this.rgbaToHsvConverter(p2);
        const distance = this.hsvDistance(c1, c2);
        return distance;
    }

    calculateFrameDistance(f1: Frame, f2: Frame): number {
        let totalDistance = 0;
        f1.forEach((_, index) => {
            totalDistance += this.calculatePixelDistance(f1[index], f2[index]);
        })
        return totalDistance;
    }

}

export default SimilarityCalculator;