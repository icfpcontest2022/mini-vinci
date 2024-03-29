import * as fs from 'fs/promises';
import axios from 'axios';

import { Interpreter } from "./Interpreter";
import { Painter } from "./Painter";
import { SimilarityChecker } from "./SimilarityChecker";

const filename = process.argv[2];
const problemId = process.argv[3];

const islRunner = async () => {
    try {
        const problemIdNumber = Number(problemId);

        let initialConfigResponse = null;

        try {
            initialConfigResponse = await axios.get(`https://cdn.robovinci.xyz/imageframes/${problemIdNumber}.initial.json`);
        } catch {}

        try {
            if (initialConfigResponse && initialConfigResponse.data.sourcePngJSON) {
                initialConfigResponse.data.sourcePngData = (await axios.get(
                    initialConfigResponse.data.sourcePngJSON,
                )).data;
            }
        } catch {}

        const targetPaintingDataResponse = await axios.get(`https://cdn.robovinci.xyz/imageframes/${problemIdNumber}.json`);

        const fileContent = await fs.readFile(filename, 'utf8');

        const interpreter = new Interpreter();
        const interpretedStructure = initialConfigResponse ? interpreter.run_with_config(fileContent, initialConfigResponse.data, problemIdNumber) : interpreter.run(fileContent);

        const interpretedCanvas = interpretedStructure.canvas;
        const instructionCost = interpretedStructure.cost;

        const painter = new Painter();
        const renderedData = painter.draw(interpretedCanvas);

        const targetPainting = SimilarityChecker.dataToFrame(targetPaintingDataResponse.data);
        const similarityCost = SimilarityChecker.imageDiff(targetPainting, renderedData);

        const totalCost = instructionCost + similarityCost;
        return { "result": "success", "cost": totalCost };
    } catch (error) {
        return { "result": "error", "err": error.message};
    }
};


Promise.resolve(true)
    .then(async () => {
        console.log(
            JSON.stringify(await islRunner())
        );
    })
