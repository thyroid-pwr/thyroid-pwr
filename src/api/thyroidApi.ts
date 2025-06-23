import { getPredictionName, getModelFullName, getXAIFullName } from '../utils/mappings';

export interface ModelData {
  modelFullName: string;
  predictedClass: string;
  confidence: string;
  correctClass: string | null;
  saliencyMaps: {
    xaiFullName: string;
    filepath: string;
  }[];
}

export interface XAIEvalData {
  modelFullName: string;
  xaiFullName: string;
  cor_rel_pixels: string;
  cor_ir_pixels: string;
  con_class: string;
  con_conf: string;
  coh: string;
  com_time: string;
}

export interface ThyroidData {
  thyroidFile: string;
  modelsData: ModelData[];
  xaiEval: XAIEvalData[];
  showDebug: boolean;
}

async function readText(filepath: string) {
  const res = await fetch(filepath);
  const filetext = await res.text();
  return filetext;
}

async function fetchSingleModelData(
  thyroidFile: string,
  modelName: string,
  chosenXAIs: string[],
  showDebug: boolean
): Promise<ModelData> {
  const modelFullName = getModelFullName(modelName);
  const basePath = `showxai/${thyroidFile}/${modelName}`;

  const [predictedClass, confidence, correctClass] = await Promise.all([
    readText(`${basePath}/predicted_class.txt`).then(getPredictionName),
    readText(`${basePath}/confidence.txt`),
    showDebug ? readText(`${basePath}/correct_class.txt`).then(getPredictionName) : Promise.resolve(null),
  ]);

  const saliencyMaps = chosenXAIs.map((xaiName) => ({
    xaiFullName: getXAIFullName(xaiName),
    filepath: `${basePath}/${xaiName}/saliency_map.jpg`,
  }));

  return {
    modelFullName,
    predictedClass,
    confidence,
    correctClass,
    saliencyMaps,
  };
}

export async function fetchThyroidData(
  thyroidFile: string,
  chosenModels: string[],
  chosenXAIs: string[],
  showDebug: boolean
): Promise<ThyroidData> {
  // Read models data in parallel
  const modelsData = await Promise.all(
    chosenModels.map((model) =>
      fetchSingleModelData(thyroidFile, model, chosenXAIs, showDebug)
    )
  );

  // Read XAI evaluation data in parallel
  const xaiEvalPromises = chosenModels.flatMap((modelName) =>
    chosenXAIs.map(async (xaiName) => {
      const basePath = `showxai/${thyroidFile}/${modelName}/${xaiName}`;
      const [
        cor_rel_pixels,
        cor_ir_pixels,
        con_class,
        con_conf,
        coh,
        com_time,
      ] = await Promise.all([
        readText(`${basePath}/correctness_confidence_change_relevant_pixels.txt`),
        readText(`${basePath}/correctness_confidence_change_irrelevant_pixels.txt`),
        readText(`${basePath}/contrastivity_predicted_class.txt`).then(getPredictionName),
        readText(`${basePath}/contrastivity_confidence.txt`),
        readText(`${basePath}/coherence.txt`),
        readText(`${basePath}/computational_efficiency.txt`),
      ]);

      return {
        modelFullName: getModelFullName(modelName),
        xaiFullName: getXAIFullName(xaiName),
        cor_rel_pixels,
        cor_ir_pixels,
        con_class,
        con_conf,
        coh,
        com_time,
      };
    })
  );

  const xaiEval = await Promise.all(xaiEvalPromises);

  return {
    thyroidFile,
    modelsData,
    xaiEval,
    showDebug,
  };
} 