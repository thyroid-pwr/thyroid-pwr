import "./ShowXAI.css";
import { useState, useEffect } from "react";

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

async function readSingleModelData(thyroidFile: string, modelName: string) {
  console.log(thyroidFile)
  console.log("showxai/" + thyroidFile + "/" + modelName + "/predicted_class.txt")
  const modelFullName = getModelFullName(modelName);
  const predictedClass = await readClass("showxai/" + thyroidFile + "/" + modelName + "/predicted_class.txt");
  const confidence = await readText("showxai/" + thyroidFile + "/" + modelName + "/confidence.txt");
  const correctClass = await readClass("showxai/" + thyroidFile + "/" + modelName + "/correct_class.txt");
  return {
    modelFullName: modelFullName, 
    predictedClass: predictedClass, 
    confidence: confidence, 
    correctClass: correctClass
  }
}


export function ShowXAI() {
  // States collected by form
  const [thyroidFile, setThyroidFile] = useState("");
  const [resnet50, setResnet50] = useState(false);
  const [densenet161, setDensenet161] = useState(false);
  const [vgg16, setVgg16] = useState(false);
  const [occlusion, setOcclusion] = useState(false);
  const [gradcam, setGradcam] = useState(false);
  const [gradcamplusplus, setGradcamplusplus] = useState(false);
  const [integratedgradients, setIntegratedGradients] = useState(false);
  const [gradientshap, setGradientshap] = useState(false);
  const [showevaluation, setShowevaluation] = useState("yes");

  // States collected by functions
  const [resnet50data, setResnet50Data] = useState<any>(null);
  const [densenet161data, setDensenet161Data] = useState<any>(null);
  const [vgg16data, setVgg16Data] = useState<any>(null);

  const onSubmit = (event: any) => {
    event.preventDefault();
    setThyroidFile(event.target.thyroidfile.value);
    setResnet50(event.target.resnet50.checked)
    setDensenet161(event.target.densenet161.checked)
    setVgg16(event.target.vgg16.checked)
    setOcclusion(event.target.occlusion.checked)
    setGradcam(event.target.gradcam.checked)
    setGradcamplusplus(event.target.gradcamplusplus.checked)
    setIntegratedGradients(event.target.integratedgradients.checked)
    setGradientshap(event.target.gradientshap.checked)
    setShowevaluation(event.target.showdebug.value)
  };

  // Read data for each model 
  // TO DO - how to read this properly
  useEffect(() => {
    readSingleModelData(thyroidFile, "resnet50")
      .then(setResnet50Data);
  }, []);
  useEffect(() => {
    readSingleModelData(thyroidFile, "densenet161")
      .then(setDensenet161Data);
  }, []);
  useEffect(() => {
    readSingleModelData(thyroidFile, "vgg16")
      .then(setVgg16Data);
  }, []);

  console.log(thyroidFile)

  // Define if config is correct
  const isOneModelChosen = resnet50 || densenet161 || vgg16;
  const isOneXAIChosen = occlusion || gradcam || gradcamplusplus || integratedgradients || gradientshap;
  const isCorrectConfig = isOneModelChosen && isOneXAIChosen;


  return (
    <div>
      {/* Title */}
      <div className="text-6xl font-bold">
        <span className="center">
          <p>Explanaible Methods</p>
        </span>
      </div>
      {/* Form to send data */}
      <form id="confirmOptions" className="confirmOptions" onSubmit={onSubmit}>
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
              <input type="checkbox" id="densenet161" name="densenet161" value="densenet161"/>
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
      {thyroidFile &&
        <div>
          {/* Display chosen options */}
          {isCorrectConfig &&
              <div>
                {/* Display original image and possibly debug image */}
                <div className="centerPadding">
                  <p className="center text-xl font-bold">Loaded Data</p>
                </div>
                <div className="showOriginalImage">
                  <span className="center">
                    <p className="text-base">Original Image</p>
                    <img src={"showxai/" + thyroidFile + "/image.jpg"} width="180" height="180"/>
                  </span>
                  {showevaluation == "yes" &&
                    <span className="center">
                      <p className="text-base">Annotated Image (DEBUG ONLY)</p>
                      <img src={"showxai/" + thyroidFile + "/annotated_image.jpg"} width="180" height="180"/>
                    </span>
                  }
                </div>
                {/* Display XAI methods saliency maps */}
                <div className="centerPadding">
                  <p className="center text-xl font-bold">Generated Explanations</p>
                </div>
                {/* TO DO - if for XAI methods */}
                {resnet50 &&
                  <div className="showXAIMethods">
                    <span className="center">
                      <p className="text-base">{resnet50data.modelFullName}</p>
                      <p className="text-base">Predicted Class: {resnet50data.predictedClass}</p>
                      <p className="text-base">Confidence: {resnet50data.confidence}</p>
                      {showevaluation == "yes" &&
                        <p className="text-base">True Class (Debug only): {resnet50data.correctClass}</p>
                      }
                    </span>
                    <span className="center">
                      <p className="text-base">Occlusion</p>
                      <img src="showxai/0/resnet50/occlusion/saliency_map.jpg" width="180" height="180"/>
                    </span>
                    <span className="center">
                      <p className="text-base">Grad-CAM</p>
                      <img src="showxai/0/resnet50/gradcam/saliency_map.jpg" width="180" height="180"/>
                    </span>
                    <span className="center">
                      <p className="text-base">Grad-CAM++</p>
                      <img src="showxai/0/resnet50/gradcamplusplus/saliency_map.jpg" width="180" height="180"/>
                    </span>
                    <span className="center">
                      <p className="text-base">Integrated Gradients</p>
                      <img src="showxai/0/resnet50/integratedgradients/saliency_map.jpg" width="180" height="180"/>
                    </span>
                    <span className="center">
                      <p className="text-base">Gradient SHAP</p>
                      <img src="showxai/0/resnet50/gradientshap/saliency_map.jpg" width="180" height="180"/>
                    </span>
                  </div>
                }
              </div>
          }

          {/* Display error message if incorrect config */}
          {!isCorrectConfig &&
            <div className="centerPadding">
              <span className="error downPadding">
                <p>ERROR</p>
              </span>
              {!isOneModelChosen && 
                <span className="error downPadding">
                  <p>You need to choose at least one model</p>
                </span>
              }
              {!isOneXAIChosen && 
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