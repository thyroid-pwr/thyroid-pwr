import "./ShowXAI.css";

//const [age, setAge] = useState(null);

// hook use state
function DisplayForm() {
  const onSubmit = (event: any) => {
    event.preventDefault();

    const variables = {
      file: event.target.thyroidfile.value,
      resnet50: event.target.resnet50.checked,
      densenet161: event.target.densenet161.checked,
      vgg16: event.target.vgg16.checked,
      occlusion: event.target.occlusion.checked,
      gradcam: event.target.gradcam.checked,
      gradcamplusplus: event.target.gradcamplusplus.checked,
      integratedgradients: event.target.integratedgradients.checked,
      gradientshap: event.target.gradientshap.checked,
      showevaluation: event.target.showdebug.value
    };

    

  };


  return (
    <div>
      <div className="text-6xl font-bold">
        <span className="center">
          <p>Explanaible Methods</p>
        </span>
      </div>
      <form id="confirmOptions" className="confirmOptions" onSubmit={onSubmit}>
        <div className="centerPadding">
          <p className="downPadding text-xl font-bold">Choose file to upload</p>
          <select name="thyroidfile" id="thyroidfile">
            <option value="0">Image 0</option>
            <option value="1">Image 1</option>
            <option value="2">Image 2</option>
            <option value="3">Image 3</option>
          </select>
        </div>
        <div className="selectParameters">
          <span>
            <p className="center text-xl font-bold">Select Deep Learning Models</p>
            <div className="text-xl">
              <input type="checkbox" id="resnet50" name="resnet50" value="resnet50"/>
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
              <input type="checkbox" id="occlusion" name="occlusion" value="occlusion"/>
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
              <input type="radio" id="showdebugyes" name="showdebug" value="yes"/>
              <label htmlFor="showdebugyes">Yes</label><br/>
              <input type="radio" id="showdebugno" name="showdebug" value="no" defaultChecked/>
              <label htmlFor="showdebugno">No</label><br/>
            </div>
          </span>
        </div>
        <div className="confirm">
          <button type="submit"><label className="center text-xl font-bold">Analyze Image</label></button>
        </div>
      </form>
    </div>
  )
}



function ShowOptionsHardcoded() {
  return (
    <div>
      <div className="text-6xl font-bold">
        <span className="center">
          <p>Explanaible Methods</p>
        </span>
      </div>
      <form id="confirmOptions" className="confirmOptions">
        <div className="centerPadding">
          <p className="downPadding text-xl font-bold">Choose file to upload</p>
          <select name="thyroidfile" id="thyroidfile">
            <option value="0">Image 0</option>
            <option value="1">Image 1</option>
            <option value="2">Image 2</option>
            <option value="3">Image 3</option>
          </select>
        </div>
        <div className="selectParameters">
          <span>
            <p className="center text-xl font-bold">Select Deep Learning Models</p>
            <div className="text-xl">
              <input type="checkbox" id="resnet50" name="resnet50" value="resnet50"/>
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
              <input type="checkbox" id="occlusion" name="occlusion" value="occlusion"/>
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
              <input type="radio" id="showdebugyes" name="showdebug" value="yes"/>
              <label htmlFor="showdebugyes">Yes</label><br/>
              <input type="radio" id="showdebugno" name="showdebug" value="no" defaultChecked/>
              <label htmlFor="showdebugno">No</label><br/>
            </div>
          </span>
        </div>
        <div className="confirm">
          <button type="submit"><label className="center text-xl font-bold">Analyze Image</label></button>
        </div>
      </form>
      <div className="centerPadding">
        <p className="center text-xl font-bold">Loaded Data</p>
      </div>
      <div className="showOriginalImage">
        <span className="center">
          <p className="text-base">Original Image</p>
          <img src="showxai/0/image.jpg" width="180" height="180"/>
        </span>
        <span className="center">
          <p className="text-base">Annotated Image (DEBUG ONLY)</p>
          <img src="showxai/0/annotated_image.jpg" width="180" height="180"/>
        </span>
      </div>
      <div className="centerPadding">
        <p className="center text-xl font-bold">Generated Explanations</p>
      </div>
      <div className="showXAIMethods">
        <span className="center">
          <p className="text-base">ResNet50</p>
          <p className="text-base">Class: Benign</p>
          <p className="text-base">Confidence: 0.5402</p>
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
      <div className="showXAIMethods">
        <span className="center">
          <p className="text-base">DenseNet161</p>
          <p className="text-base">Class: Benign</p>
          <p className="text-base">Confidence: 0.9660</p>
        </span>
        <span className="center">
          <p className="text-base">Occlusion</p>
          <img src="showxai/0/densenet161/occlusion/saliency_map.jpg" width="180" height="180"/>
        </span>
        <span className="center">
          <p className="text-base">Grad-CAM</p>
          <img src="showxai/0/densenet161/gradcam/saliency_map.jpg" width="180" height="180"/>
        </span>
        <span className="center">
          <p className="text-base">Grad-CAM++</p>
          <img src="showxai/0/densenet161/gradcamplusplus/saliency_map.jpg" width="180" height="180"/>
        </span>
        <span className="center">
          <p className="text-base">Integrated Gradients</p>
          <img src="showxai/0/densenet161/integratedgradients/saliency_map.jpg" width="180" height="180"/>
        </span>
        <span className="center">
          <p className="text-base">Gradient SHAP</p>
          <img src="showxai/0/densenet161/gradientshap/saliency_map.jpg" width="180" height="180"/>
        </span>
      </div>
      <div className="showXAIMethods">
        <span className="center">
          <p className="text-base">VGG16</p>
          <p className="text-base">Class: Benign</p>
          <p className="text-base">Confidence: 0.8212</p>
        </span>
        <span className="center">
          <p className="text-base">Occlusion</p>
          <img src="showxai/0/vgg16/occlusion/saliency_map.jpg" width="180" height="180"/>
        </span>
        <span className="center">
          <p className="text-base">Grad-CAM</p>
          <img src="showxai/0/vgg16/gradcam/saliency_map.jpg" width="180" height="180"/>
        </span>
        <span className="center">
          <p className="text-base">Grad-CAM++</p>
          <img src="showxai/0/vgg16/gradcamplusplus/saliency_map.jpg" width="180" height="180"/>
        </span>
        <span className="center">
          <p className="text-base">Integrated Gradients</p>
          <img src="showxai/0/vgg16/integratedgradients/saliency_map.jpg" width="180" height="180"/>
        </span>
        <span className="center">
          <p className="text-base">Gradient SHAP</p>
          <img src="showxai/0/vgg16/gradientshap/saliency_map.jpg" width="180" height="180"/>
        </span>
      </div>
      <div className="centerPadding">
        <p className="center text-xl font-bold">Explanable Methods Evaluation (Debug only)</p>
      </div>
      <div className="showXAIEval">
        <table>
          <tr>
            <th>Model</th>
            <th>Explainable Method</th>
            <th>Correctness <br/> Relevant Pixels <br/> Drop Confidence  </th>
            <th>Correctness <br/> Irrelevant Pixels <br/> Drop Confidence  </th>
            <th>Contrastivity <br/> Predicted Class </th>
            <th>Contrastivity <br/> Confidence </th>
            <th>Coherence <br/> % of Relevant Pixels In Nodule </th>
            <th>Computational Efficiency  <br/> Execution Time <br/> (in seconds) </th>
          </tr>
          <tr>
            <td>ResNet50</td>
            <td>Grad-CAM</td>
            <td>0.1990</td>
            <td>0.1883</td>
            <td>Malignant</td>
            <td>0.9660</td>
            <td>0.9722</td>
            <td>0.6443</td>
          </tr>
          <tr>
            <td>ResNet50</td>
            <td>Grad-CAM++</td>
            <td>0.1990</td>
            <td>0.1883</td>
            <td>Malignant</td>
            <td>0.9660</td>
            <td>0.9722</td>
            <td>0.6443</td>
          </tr>
          <tr>
            <td>ResNet50</td>
            <td>Integrated Gradients</td>
            <td>0.1990</td>
            <td>0.1883</td>
            <td>Malignant</td>
            <td>0.9660</td>
            <td>0.9722</td>
            <td>0.6443</td>
          </tr>
          <tr>
            <td>ResNet50</td>
            <td>Gradient SHAP</td>
            <td>0.1990</td>
            <td>0.1883</td>
            <td>Malignant</td>
            <td>0.9660</td>
            <td>0.9722</td>
            <td>0.6443</td>
          </tr>
          <tr>
            <td>DenseNet161</td>
            <td>Occlusion</td>
            <td>0.1990</td>
            <td>0.1883</td>
            <td>Malignant</td>
            <td>0.9660</td>
            <td>0.9722</td>
            <td>0.6443</td>
          </tr>
          <tr>
            <td>DenseNet161</td>
            <td>Grad-CAM</td>
            <td>0.1990</td>
            <td>0.1883</td>
            <td>Malignant</td>
            <td>0.9660</td>
            <td>0.9722</td>
            <td>0.6443</td>
          </tr>
          <tr>
            <td>DenseNet161</td>
            <td>Grad-CAM++</td>
            <td>0.1990</td>
            <td>0.1883</td>
            <td>Malignant</td>
            <td>0.9660</td>
            <td>0.9722</td>
            <td>0.6443</td>
          </tr>
          <tr>
            <td>DenseNet161</td>
            <td>Integrated Gradients</td>
            <td>0.1990</td>
            <td>0.1883</td>
            <td>Malignant</td>
            <td>0.9660</td>
            <td>0.9722</td>
            <td>0.6443</td>
          </tr>
          <tr>
            <td>DenseNet161</td>
            <td>Gradient SHAP</td>
            <td>0.1990</td>
            <td>0.1883</td>
            <td>Malignant</td>
            <td>0.9660</td>
            <td>0.9722</td>
            <td>0.6443</td>
          </tr>
          <tr>
            <td>VGG16</td>
            <td>Occlusion</td>
            <td>0.1990</td>
            <td>0.1883</td>
            <td>Malignant</td>
            <td>0.9660</td>
            <td>0.9722</td>
            <td>0.6443</td>
          </tr>
          <tr>
            <td>VGG16</td>
            <td>Grad-CAM</td>
            <td>0.1990</td>
            <td>0.1883</td>
            <td>Malignant</td>
            <td>0.9660</td>
            <td>0.9722</td>
            <td>0.6443</td>
          </tr>
          <tr>
            <td>VGG16</td>
            <td>Grad-CAM++</td>
            <td>0.1990</td>
            <td>0.1883</td>
            <td>Malignant</td>
            <td>0.9660</td>
            <td>0.9722</td>
            <td>0.6443</td>
          </tr>
          <tr>
            <td>VGG16</td>
            <td>Integrated Gradients</td>
            <td>0.1990</td>
            <td>0.1883</td>
            <td>Malignant</td>
            <td>0.9660</td>
            <td>0.9722</td>
            <td>0.6443</td>
          </tr>
          <tr>
            <td>VGG16</td>
            <td>Gradient SHAP</td>
            <td>0.1990</td>
            <td>0.1883</td>
            <td>Malignant</td>
            <td>0.9660</td>
            <td>0.9722</td>
            <td>0.6443</td>
          </tr>
        </table>
      </div>
    </div>
  )
}

// Zrób listę wybieralną zamiast wybierania dowolnego pliku
export function ShowXAI() {
  return (
    <div>
      {ShowOptionsHardcoded()}
    </div>
  )
} 