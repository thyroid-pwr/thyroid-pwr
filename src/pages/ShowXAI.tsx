import "./ShowXAI.css";
import { useActionState } from "react";

function getModelFullName(modelName: string) {
  switch (modelName) {
    case "resnet50":
      return "ResNet50";
    case "densenet161":
      return "DenseNet161";
    case "vgg16":
      return "VGG16";
    default:
      return "N/A";
  }
}

function getXAIFullName(xaiName: string) {
  switch (xaiName) {
    case "occlusion":
      return "Occlusion";
    case "gradcam":
      return "Grad-CAM";
    case "gradcamplusplus":
      return "Grad-CAM++";
    case "integratedgradients":
      return "Integrated Gradients";
    case "gradientshap":
      return "Gradient SHAP";
    default:
      return "N/A";
  }
}

function getPredictionName(prediction: string) {
  switch (prediction) {
    case "0":
      return "Benign";
    case "1":
      return "Malignant";
    default:
      return "N/A";
  }
}

async function readText(filepath: string) {
  const res = await fetch(filepath);
  const filetext = await res.text();
  return filetext;
}

async function readSingleModelData(
  thyroidFile: string,
  modelName: string,
  chosenXAIs: string[],
  showDebug: boolean
) {
  const modelFullName = getModelFullName(modelName);
  const basePath = `showxai/${thyroidFile}/${modelName}`;

  // Prepare all promises in parallel
  const promises = [
    readText(`${basePath}/predicted_class.txt`).then(getPredictionName),
    readText(`${basePath}/confidence.txt`),
    ...(showDebug
      ? [readText(`${basePath}/correct_class.txt`).then(getPredictionName)]
      : []),
  ];

  // Wait for all promises to resolve
  const [predictedClass, confidence, correctClass] = await Promise.all(
    promises
  );

  // Prepare saliency map data
  const saliencyMaps = chosenXAIs.map((xaiName) => ({
    xaiFullName: getXAIFullName(xaiName),
    filepath: `${basePath}/${xaiName}/saliency_map.jpg`,
  }));

  return {
    modelFullName,
    predictedClass,
    confidence,
    correctClass: correctClass || null,
    saliencyMaps,
  };
}

async function updateData(_previousState: any, formData: any) {
  const thyroidFile = formData.get("thyroidfile");
  const showDebug = formData.get("showdebug") == "yes";

  // Get which models were chosen by the user
  const chosenModels = ["resnet50", "densenet161", "vgg16"].filter(
    (model) => formData.get(model) !== null
  );

  // Get which XAI methods were chosen by the user
  const chosenXAIs = [
    "occlusion",
    "gradcam",
    "gradcamplusplus",
    "integratedgradients",
    "gradientshap",
  ].filter((xai) => formData.get(xai) !== null);

  // Read models data in parallel
  const modelsData = await Promise.all(
    chosenModels.map((model) =>
      readSingleModelData(thyroidFile, model, chosenXAIs, showDebug)
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
        readText(
          `${basePath}/correctness_confidence_change_relevant_pixels.txt`
        ),
        readText(
          `${basePath}/correctness_confidence_change_irrelevant_pixels.txt`
        ),
        readText(`${basePath}/contrastivity_predicted_class.txt`).then(
          getPredictionName
        ),
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

  // Verify config settings
  const isOneModelChosen = chosenModels.length > 0;
  const isOneXAIChosen = chosenXAIs.length > 0;
  const isCorrectConfig = isOneModelChosen && isOneXAIChosen;

  return {
    configCheck: {
      isOneModelChosen,
      isOneXAIChosen,
      isCorrectConfig,
    },
    thyroidFile,
    modelsData,
    showDebug,
    xaiEval,
    formData,
  };
}

function getFormConfig(data: any) {
  if (data) {
    return {
      thyroidfile: data.formData.get("thyroidfile"),
      resnet50: data.formData.get("resnet50") !== null ? true : false,
      densenet161: data.formData.get("densenet161") !== null ? true : false,
      vgg16: data.formData.get("vgg16") !== null ? true : false,
      occlusion: data.formData.get("occlusion") !== null ? true : false,
      gradcam: data.formData.get("gradcam") !== null ? true : false,
      gradcamplusplus:
        data.formData.get("gradcamplusplus") !== null ? true : false,
      integratedgradients:
        data.formData.get("integratedgradients") !== null ? true : false,
      gradientshap: data.formData.get("gradientshap") !== null ? true : false,
      showdebug: data.formData.get("showdebug") == "yes" ? true : false,
    };
  } else {
    return {
      thyroidfile: "1",
      resnet50: true,
      densenet161: true,
      vgg16: true,
      occlusion: true,
      gradcam: true,
      gradcamplusplus: true,
      integratedgradients: true,
      gradientshap: true,
      showdebug: true,
    };
  }
}

// All possible images to choose from
const imagesToChoose = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

export function ShowXAI() {
  const [data, formAction] = useActionState(updateData, null);
  const formConfig = getFormConfig(data); // Mantain form selection after reload

  // Split into currently chosen image and rest of the images
  const curSelectedImage = formConfig.thyroidfile;
  const notSelectedImages = imagesToChoose.filter(
    (e) => e !== curSelectedImage
  );

  return (
    <div>
      {/* Title */}
      <div className="text-6xl font-bold">
        <span className="center">
          <p>Explanaible Methods</p>
        </span>
      </div>
      {/* Form to send data */}
      <form id="confirmOptions" className="confirmOptions" action={formAction}>
        <div className="centerPadding">
          <p className="downPadding text-xl font-bold">Choose file to upload</p>
          {/* Start from chosen option than show other possible selections */}
          <select name="thyroidfile" id="thyroidfile">
            {<option value={curSelectedImage}>Image {curSelectedImage}</option>}
            {notSelectedImages.map((notSelectedImage) => (
              <option value={notSelectedImage} key={notSelectedImage}>
                Image {notSelectedImage}
              </option>
            ))}
          </select>
        </div>
        <div className="selectParameters">
          <span>
            <p className="center text-xl font-bold">
              Select Deep Learning Models
            </p>
            <div className="text-xl">
              <input
                type="checkbox"
                id="resnet50"
                name="resnet50"
                value="resnet50"
                defaultChecked={formConfig.resnet50}
              />
              <label htmlFor="resnet50">ResNet50</label>
              <br />
              <input
                type="checkbox"
                id="densenet161"
                name="densenet161"
                value="densenet161"
                defaultChecked={formConfig.densenet161}
              />
              <label htmlFor="densenet161">DenseNet161</label>
              <br />
              <input
                type="checkbox"
                id="vgg16"
                name="vgg16"
                value="vgg16"
                defaultChecked={formConfig.vgg16}
              />
              <label htmlFor="vgg16">VGG16</label>
            </div>
          </span>
          <span />
          <span>
            <p className="center text-xl font-bold">
              Select Explainability Methods
            </p>
            <div className="text-xl">
              <input
                type="checkbox"
                id="occlusion"
                name="occlusion"
                value="occlusion"
                defaultChecked={formConfig.occlusion}
              />
              <label htmlFor="occlusion">Occlusion</label>
              <br />
              <input
                type="checkbox"
                id="gradcam"
                name="gradcam"
                value="gradcam"
                defaultChecked={formConfig.gradcam}
              />
              <label htmlFor="gradcam">Grad-CAM</label>
              <br />
              <input
                type="checkbox"
                id="gradcamplusplus"
                name="gradcamplusplus"
                value="gradcamplusplus"
                defaultChecked={formConfig.gradcamplusplus}
              />
              <label htmlFor="gradcamplusplus">Grad-CAM++</label>
              <br />
              <input
                type="checkbox"
                id="integratedgradients"
                name="integratedgradients"
                value="integratedgradients"
                defaultChecked={formConfig.integratedgradients}
              />
              <label htmlFor="integratedgradients">Integrated Gradients</label>
              <br />
              <input
                type="checkbox"
                id="gradientshap"
                name="gradientshap"
                value="gradientshap"
                defaultChecked={formConfig.gradientshap}
              />
              <label htmlFor="gradientshap">Gradient SHAP</label>
            </div>
          </span>
          <span />
          <span>
            <p className="center text-xl font-bold">Show Evaluation Criteria</p>
            <p className="center text-xl font-bold">(Debug Only)</p>
            <div className="text-xl">
              <input
                type="radio"
                id="showdebugyes"
                name="showdebug"
                value="yes"
                defaultChecked={formConfig.showdebug}
              />
              <label htmlFor="showdebugyes">Yes</label>
              <br />
              <input
                type="radio"
                id="showdebugno"
                name="showdebug"
                value="no"
                defaultChecked={!formConfig.showdebug}
              />
              <label htmlFor="showdebugno">No</label>
              <br />
            </div>
          </span>
        </div>
        <div className="confirm">
          <button type="submit">
            <label className="center text-xl font-bold">Analyze Image</label>
          </button>
        </div>
      </form>
      {/* Only run this code when config was chosen */}
      {data && (
        <div>
          {/* Display chosen options */}
          {data.configCheck.isCorrectConfig && (
            <div>
              {/* Display original image and possibly debug image */}
              <div className="centerPadding">
                <p className="center text-xl font-bold">Loaded Data</p>
              </div>
              <div className="showOriginalImage">
                <span className="center">
                  <p className="text-base">Original Image</p>
                  <img
                    src={"showxai/" + data.thyroidFile + "/image.jpg"}
                    width="180"
                    height="180"
                  />
                </span>
                {data.showDebug && (
                  <span className="center">
                    <p className="text-base">Annotated Image (Debug Only)</p>
                    <img
                      src={
                        "showxai/" + data.thyroidFile + "/annotated_image.jpg"
                      }
                      width="180"
                      height="180"
                    />
                  </span>
                )}
              </div>
              {/* Display XAI methods saliency maps */}
              <div className="centerPadding">
                <p className="center text-xl font-bold">
                  Generated Explanations
                </p>
              </div>
              {/* Display XAI Methods */}
              {data.modelsData.map((singleModelData) => (
                <div
                  className="showXAIMethods"
                  key={singleModelData.modelFullName}
                >
                  <span className="center">
                    <p className="text-base">{singleModelData.modelFullName}</p>
                    <p className="text-base">
                      Predicted Class: {singleModelData.predictedClass}
                    </p>
                    <p className="text-base">
                      Confidence: {singleModelData.confidence}
                    </p>
                    {data.showDebug && (
                      <p className="text-base">
                        True Class (Debug Only): {singleModelData.correctClass}
                      </p>
                    )}
                  </span>
                  {singleModelData.saliencyMaps.map((saliencyMap) => (
                    <span className="center" key={saliencyMap.xaiFullName}>
                      <p className="text-base">{saliencyMap.xaiFullName}</p>
                      <img
                        src={saliencyMap.filepath}
                        width="180"
                        height="180"
                      />
                    </span>
                  ))}
                </div>
              ))}
              {/* Display debug table */}
              {data.showDebug && (
                <div>
                  <div className="centerPadding">
                    <p className="center text-xl font-bold">
                      Explanaible Methods Evaluation (Debug Only)
                    </p>
                  </div>
                  <div className="showXAIEval">
                    <table>
                      <thead>
                        <tr>
                          <th>Model</th>
                          <th>Explainable Method</th>
                          <th>
                            Correctness <br /> Relevant Pixels <br /> Confidence
                            Change{" "}
                          </th>
                          <th>
                            Correctness <br /> Irrelevant Pixels <br />{" "}
                            Confidence Change{" "}
                          </th>
                          <th>
                            Contrastivity <br /> Predicted Class{" "}
                          </th>
                          <th>
                            Contrastivity <br /> Confidence{" "}
                          </th>
                          <th>
                            Coherence <br /> % of Relevant Pixels In Nodule{" "}
                          </th>
                          <th>
                            Computational Efficiency <br /> Execution Time{" "}
                            <br /> (in seconds){" "}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.xaiEval.map((dataRow) => (
                          <tr
                            className={
                              dataRow.modelFullName + dataRow.xaiFullName
                            }
                          >
                            <td>{dataRow.modelFullName}</td>
                            <td>{dataRow.xaiFullName}</td>
                            <td>{dataRow.cor_rel_pixels}</td>
                            <td>{dataRow.cor_ir_pixels}</td>
                            <td>{dataRow.con_class}</td>
                            <td>{dataRow.con_conf}</td>
                            <td>{dataRow.coh}</td>
                            <td>{dataRow.com_time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* Display error message if incorrect config */}
          {!data.configCheck.isCorrectConfig && (
            <div className="centerPadding">
              <span className="error downPadding">
                <p>ERROR</p>
              </span>
              {!data.configCheck.isOneModelChosen && (
                <span className="error downPadding">
                  <p>You need to choose at least one model</p>
                </span>
              )}
              {!data.configCheck.isOneXAIChosen && (
                <span className="error downPadding">
                  <p>You need to choose at least one explainability method</p>
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
