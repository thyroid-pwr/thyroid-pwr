import "./ShowXAI.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchThyroidData } from "../api/thyroidApi";
import type { ThyroidData } from "../api/thyroidApi";

// All possible images to choose from
const imagesToChoose = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

// Default form configuration
const defaultConfig = {
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

interface FormConfig {
  thyroidfile: string;
  resnet50: boolean;
  densenet161: boolean;
  vgg16: boolean;
  occlusion: boolean;
  gradcam: boolean;
  gradcamplusplus: boolean;
  integratedgradients: boolean;
  gradientshap: boolean;
  showdebug: boolean;
}

export function ShowXAI() {
  const [formConfig, setFormConfig] = useState<FormConfig>(defaultConfig);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const chosenModels = ["resnet50", "densenet161", "vgg16"].filter(
    (model) => formConfig[model as keyof FormConfig]
  );

  const chosenXAIs = [
    "occlusion",
    "gradcam",
    "gradcamplusplus",
    "integratedgradients",
    "gradientshap",
  ].filter((xai) => formConfig[xai as keyof FormConfig]);

  const isOneModelChosen = chosenModels.length > 0;
  const isOneXAIChosen = chosenXAIs.length > 0;
  const isCorrectConfig = isOneModelChosen && isOneXAIChosen;

  const { data, isLoading, isError } = useQuery<ThyroidData>({
    queryKey: ["thyroidData", formConfig],
    queryFn: () =>
      fetchThyroidData(
        formConfig.thyroidfile,
        chosenModels,
        chosenXAIs,
        formConfig.showdebug
      ),
    enabled: isCorrectConfig && hasSubmitted,
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setFormConfig({
      thyroidfile: formData.get("thyroidfile") as string,
      resnet50: formData.get("resnet50") !== null,
      densenet161: formData.get("densenet161") !== null,
      vgg16: formData.get("vgg16") !== null,
      occlusion: formData.get("occlusion") !== null,
      gradcam: formData.get("gradcam") !== null,
      gradcamplusplus: formData.get("gradcamplusplus") !== null,
      integratedgradients: formData.get("integratedgradients") !== null,
      gradientshap: formData.get("gradientshap") !== null,
      showdebug: formData.get("showdebug") === "yes",
    });
    setHasSubmitted(true);
  };

  const curSelectedImage = formConfig.thyroidfile;
  const notSelectedImages = imagesToChoose.filter(
    (e) => e !== curSelectedImage
  );

  return (
    <div>
      <div className="text-6xl font-bold">
        <span className="center">
          <p>Explainable Methods</p>
        </span>
      </div>

      <form
        id="confirmOptions"
        className="confirmOptions"
        onSubmit={handleSubmit}
      >
        <div className="centerPadding">
          <p className="downPadding text-xl font-bold">Choose file to upload</p>
          <select name="thyroidfile" id="thyroidfile">
            <option value={curSelectedImage}>Image {curSelectedImage}</option>
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
            </div>
          </span>
        </div>

        <div className="confirm">
          <button type="submit">
            <label className="center text-xl font-bold">Analyze Image</label>
          </button>
        </div>
      </form>

      {isLoading && (
        <div className="centerPadding">
          <p className="text-xl font-bold">Loading...</p>
        </div>
      )}

      {isError && (
        <div className="centerPadding">
          <span className="error downPadding">
            <p>Error loading data. Please try again.</p>
          </span>
        </div>
      )}

      {data && isCorrectConfig && (
        <div>
          <div className="showOriginalImage">
            <span className="center">
              <p className="text-base">Original Image</p>
              <img
                src={`showxai/${data.thyroidFile}/image.jpg`}
                width="180"
                height="180"
                alt="Original thyroid image"
              />
            </span>
            {data.showDebug && (
              <span className="center">
                <p className="text-base">Annotated Image (Debug Only)</p>
                <img
                  src={`showxai/${data.thyroidFile}/annotated_image.jpg`}
                  width="180"
                  height="180"
                  alt="Annotated thyroid image"
                />
              </span>
            )}
          </div>

          {/* Display XAI methods saliency maps */}
          <div className="centerPadding">
            <p className="center text-xl font-bold">Generated Explanations</p>
          </div>

          {/* Display XAI Methods */}
          {data.modelsData.map((singleModelData) => (
            <div className="showXAIMethods" key={singleModelData.modelFullName}>
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
                    alt={`${saliencyMap.xaiFullName} saliency map`}
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
                  Explainable Methods Evaluation (Debug Only)
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
                        Correctness <br /> Irrelevant Pixels <br /> Confidence
                        Change{" "}
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
                        Computational Efficiency <br /> Execution Time <br />{" "}
                        (in seconds){" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.xaiEval.map((dataRow) => (
                      <tr
                        key={`${dataRow.modelFullName}-${dataRow.xaiFullName}`}
                        className={dataRow.modelFullName + dataRow.xaiFullName}
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
      {!isCorrectConfig && (
        <div className="centerPadding">
          <span className="error downPadding">
            <p>ERROR</p>
          </span>
          {!isOneModelChosen && (
            <span className="error downPadding">
              <p>You need to choose at least one model</p>
            </span>
          )}
          {!isOneXAIChosen && (
            <span className="error downPadding">
              <p>You need to choose at least one explainability method</p>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
