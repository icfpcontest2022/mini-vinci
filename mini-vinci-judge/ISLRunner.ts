// import { Interpreter } from "../Interpreter";
// import { Painter } from "../Painter";
// import { SimilarityChecker } from "../SimilarityChecker";
// import * as fs from 'fs';

// const filename = process.argv[2];
// const fileContent = fs.readFileSync(filename,'utf8');

// const islRunner = (fileContent: string) => {
//     try {
//         const interpreter = new Interpreter();
//         const interpretedStructure = interpreter.run(fileContent);

//         const interpretedCanvas = interpretedStructure.canvas;
//         const instructionCost = interpretedStructure.cost;
//         const painter = new Painter();
//         const renderedData = painter.draw(interpretedCanvas);
//         const targetPainting = SimilarityChecker.pngToFrame('chess_board.png');
//         const similarityCost = SimilarityChecker.imageDiff(targetPainting, renderedData);
//         // console.log(`ic:`, instructionCost);
//         // console.log(`sc:`, similarityCost);
//         const totalCost = instructionCost + similarityCost;
//         return { "result": "success", "cost": totalCost };
//     } catch (error) {
//         return { "result": "error", "err": error.message};
//     }
// };

// console.log(JSON.stringify(islRunner(fileContent)));

export {}