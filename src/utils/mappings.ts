export function getModelFullName(modelName: string): string {
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

export function getXAIFullName(xaiName: string): string {
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

export function getPredictionName(prediction: string): string {
  switch (prediction) {
    case "0":
      return "Benign";
    case "1":
      return "Malignant";
    default:
      return "N/A";
  }
} 