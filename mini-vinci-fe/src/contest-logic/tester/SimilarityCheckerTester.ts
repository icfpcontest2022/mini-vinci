
import { Interpreter } from '../Interpreter';
import { Painter } from '../Painter';
import { SimilarityChecker } from '../SimilarityChecker';

const filename = 'chess_board.png';
const target = SimilarityChecker.pngToFrame(filename);
const instructions =
`
cut [0] [x] [350]
color [0.1] [0, 74, 173, 255]
cut [0.0] [y] [50]
color [0.0.0] [0, 74, 173, 255]
cut [0.0.1] [320, 80]
color [0.0.1.1] [0, 74, 173, 255]
`;
const interpreter = new Interpreter();
const res = interpreter.run(instructions);
const painter = new Painter();
const paint = painter.draw(res.canvas);
console.log(SimilarityChecker.imageDiff(target, paint));
