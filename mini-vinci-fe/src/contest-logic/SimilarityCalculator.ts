
import { Frame } from './Image';
import { Rgba } from './Rgba';

type Hsv = {hue: number, saturation: number, value: number}
class SimilarityCalculator {

    hsvDistance(c1: Hsv, c2: Hsv): number {
        
        Math.min( Math.abs(c1.hue - c2.hue), 360 - Math.abs(c1.hue - c2.hue));

        return 0;
    }
    
    rgbaToHsvConverter(color: Rgba): Hsv {
        // todo@goktug
        
        const r = color.r / 255.0;
        const g = color.g / 255.0;
        const b = color.b / 255.0;
        
        const max = Math.max(r,g,b);
        const min = Math.min(r,g,b);
        
        switch(max){
            case r: return {hue : (g-b)/(max-min), saturation : 0, value : 0};
            case g: return {hue : 2.0 + (b-r)/(max-min), saturation : 0, value : 0};
            case b: return {hue : 4.0 + (r-g)/(max-min), saturation : 0, value : 0};
        }
        
        return {hue : -1, saturation : -1,value :-1};
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