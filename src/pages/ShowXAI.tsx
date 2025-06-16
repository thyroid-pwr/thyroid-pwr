import "./ShowXAI.css";
import { useState, useActionState } from "react";

// TO DO - every 2nd row gray
// TO DO - sort by correctness, highlight correctness row
// TO DO - add correct class in debug

function getModelFullName(modelName: string) {
  if (modelName == "resnet50") {
    return "ResNet50";
  } else if (modelName == "densenet161") {
    return "DenseNet161";
  } else if (modelName == "vgg16") {
    return "VGG16";
  } else {
    return "N/A";
  }
}

async function readText(filepath: string) {
  const res = await fetch(filepath)
  const filetext = await res.text();
  return filetext;
}

async function readClass(filepath: string) {
  const res = await fetch(filepath)
  const filetext = await res.text();

  if (filetext == "0") {
    return "Benign"
  } else if (filetext == "1") {
    return "Malignant"
  } else {
    return "N/A"
  }
}

async function readSingleModelData(thyroidFile: string, modelName: string, xaiData: string[][], showDebug: boolean) {
  // Read model data
  const modelFullName = getModelFullName(modelName);
  const predictedClass = await readClass("showxai/" + thyroidFile + "/" + modelName + "/predicted_class.txt");
  const confidence = await readText("showxai/" + thyroidFile + "/" + modelName + "/confidence.txt");

  // Read debug data
  var correctClass = null;
  if (showDebug) {
    correctClass = await readClass("showxai/" + thyroidFile + "/" + modelName + "/correct_class.txt");
  }

  // Read XAI (saliency maps)
  var saliencyMaps: { xaiFullName: string; filepath: string; }[] = []
  xaiData.forEach(([xai, xaiFullName]) => {
    saliencyMaps.push({
      xaiFullName: xaiFullName,
      filepath: "showxai/" + thyroidFile + "/" + modelName + "/" + xai + "/saliency_map.jpg"
    })
  });
  
  return {
    modelFullName: modelFullName, 
    predictedClass: predictedClass, 
    confidence: confidence, 
    correctClass: correctClass,
    saliencyMaps: saliencyMaps,
  }
}

async function updateData(_previousState: any, formData: any) {
  const thyroidFile = formData.get("thyroidfile");
  const showDebug = formData.get("showdebug")

  // Read data about XAI
  var xaiData = []
  if (formData.get("occlusion")) {
    xaiData.push(["occlusion", "Occlusion"])
  }
  if (formData.get("gradcam")) {
    xaiData.push(["gradcam", "Grad-CAM"])
  }
  if (formData.get("gradcamplusplus")) {
    xaiData.push(["gradcamplusplus", "Grad-CAM++"])
  }
  if (formData.get("integratedgradients")) {
    xaiData.push(["integratedgradients", "Integrated Gradients"])
  }
  if (formData.get("gradientshap")) {
    xaiData.push(["gradientshap", "Gradient SHAP"])
  }

  // Read data about models and generated saliency map
  var modelsData = []
  if (formData.get("resnet50")) {
    modelsData.push(await readSingleModelData(thyroidFile, "resnet50", xaiData, showDebug))
  }
  if (formData.get("densenet161")) {
    modelsData.push(await readSingleModelData(thyroidFile, "densenet161", xaiData, showDebug))
  }
  if (formData.get("vgg16")) {
    modelsData.push(await readSingleModelData(thyroidFile, "vgg16", xaiData, showDebug))
  }

  // Verify config settings to later display potential errors
  const isOneModelChosen = modelsData.length > 0;
  const isOneXAIChosen = xaiData.length > 0;
  const isCorrectConfig = isOneModelChosen && isOneXAIChosen;
  const configCheck = {
    "isOneModelChosen": isOneModelChosen,
    "isOneXAIChosen": isOneXAIChosen,
    "isCorrectConfig": isCorrectConfig,
  }

  return {
    "configCheck": configCheck,
    "thyroidFile": thyroidFile,
    "modelsData": modelsData,
    "showDebug": showDebug,
  }
}

export function ShowXAI() {
  const [data, formAction] = useActionState(updateData, null);
  console.log(data);

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
          <select name="thyroidfile" id="thyroidfile">
            <option value="1">Image 1</option>
            <option value="2">Image 2</option>
          </select>
        </div>
        <div className="selectParameters">
          <span>
            <p className="center text-xl font-bold">Select Deep Learning Models</p>
            <div className="text-xl">
              <input type="checkbox" id="resnet50" name="resnet50" value="resnet50" defaultChecked/>
              <label htmlFor="resnet50">ResNet50</label><br/>
              <input type="checkbox" id="densenet161" name="densenet161" value="densenet161" defaultChecked/>
              <label htmlFor="densenet161">DenseNet161</label><br/>
              <input type="checkbox" id="vgg16" name="vgg16" value="vgg16"/>
              <label htmlFor="vgg16">VGG16</label>
            </div>
          </span>
          <span/>
          <span>
            <p className="center text-xl font-bold">Select Explainability Methods</p>
            <div className="text-xl">
              <input type="checkbox" id="occlusion" name="occlusion" value="occlusion" defaultChecked/>
              <label htmlFor="occlusion">Occlusion</label><br/>
              <input type="checkbox" id="gradcam" name="gradcam" value="gradcam"/>
              <label htmlFor="gradcam">Grad-CAM</label><br/>
              <input type="checkbox" id="gradcamplusplus" name="gradcamplusplus" value="gradcamplusplus"/>
              <label htmlFor="gradcamplusplus">Grad-CAM++</label><br/>
              <input type="checkbox" id="integratedgradients" name="integratedgradients" value="integratedgradients"/>
              <label htmlFor="integratedgradients">Integrated Gradients</label><br/>
              <input type="checkbox" id="gradientshap" name="gradientshap" value="gradientshap"/>
              <label htmlFor="gradientshap">Gradient SHAP</label>
            </div>
          </span>
          <span/>
          <span>
            <p className="center text-xl font-bold">Show Evaluation Criteria</p>
            <p className="center text-xl font-bold">(Debug Only)</p>
            <div className="text-xl">
              <input type="radio" id="showdebugyes" name="showdebug" value="yes" defaultChecked/>
              <label htmlFor="showdebugyes">Yes</label><br/>
              <input type="radio" id="showdebugno" name="showdebug" value="no"/>
              <label htmlFor="showdebugno">No</label><br/>
            </div>
          </span>
        </div>
        <div className="confirm">
          <button type="submit"><label className="center text-xl font-bold">Analyze Image</label></button>
        </div>
      </form>
      {/* Only run this code when config was chosen */}
      {data &&
        <div>
          {/* Display chosen options */}
          {data.configCheck.isCorrectConfig &&
            <div>
              {/* Display original image and possibly debug image */}
              <div className="centerPadding">
                <p className="center text-xl font-bold">Loaded Data</p>
              </div>
              <div className="showOriginalImage">
                <span className="center">
                  <p className="text-base">Original Image</p>
                  <img src={"showxai/" + data.thyroidFile + "/image.jpg"} width="180" height="180"/>
                </span>
                {data.showDebug == "yes" &&
                  <span className="center">
                    <p className="text-base">Annotated Image (DEBUG ONLY)</p>
                    <img src={"showxai/" + data.thyroidFile + "/annotated_image.jpg"} width="180" height="180"/>
                  </span>
                }
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
                    <p className="text-base">Predicted Class: {singleModelData.predictedClass}</p>
                    <p className="text-base">Confidence: {singleModelData.confidence}</p>
                    {data.showDebug == "yes" && 
                      <p className="text-base">True Class (Debug only): {singleModelData.correctClass}</p>
                    }
                  </span>
                  {singleModelData.saliencyMaps.map((saliencyMap) => (
                    <span className="center" key={saliencyMap.xaiFullName}>
                      <p className="text-base">{saliencyMap.xaiFullName}</p>
                      <img src={saliencyMap.filepath} width="180" height="180"/>
                    </span>
                  ))
                  }
                </div>
              ))
              }
            </div>
          }
          {/* Display error message if incorrect config */}
          {!data.configCheck.isCorrectConfig &&
            <div className="centerPadding">
              <span className="error downPadding">
                <p>ERROR</p>
              </span>
              {!data.configCheck.isOneModelChosen && 
                <span className="error downPadding">
                  <p>You need to choose at least one model</p>
                </span>
              }
              {!data.configCheck.isOneXAIChosen && 
                <span className="error downPadding">
                  <p>You need to choose at least one XAI method</p>
                </span>
              }
            </div>
          }
        </div>
      }
    </div>
  )
} 