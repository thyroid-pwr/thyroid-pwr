import "./ShowXAI.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchThyroidData } from "../api/thyroidApi";
import type { ThyroidData } from "../api/thyroidApi";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

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
    <div className="container mx-auto p-6">
      <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8">
        <h1 className="text-center">Explainable Methods</h1>
      </div>

      <form id="confirmOptions" className="space-y-8" onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div></div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Choose file to upload
              </h3>
              <div className="w-full relative">
                <Select name="thyroidfile" defaultValue={curSelectedImage}>
                  <SelectTrigger className="text-center w-full">
                    <SelectValue
                      placeholder="Select an image"
                      className="text-center"
                    />
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    align="center"
                    avoidCollisions={false}
                    className="w-[var(--radix-select-trigger-width)]"
                  >
                    <SelectItem
                      value={curSelectedImage}
                      className="text-center"
                    >
                      Image {curSelectedImage}
                    </SelectItem>
                    {notSelectedImages.map((notSelectedImage) => (
                      <SelectItem
                        key={notSelectedImage}
                        value={notSelectedImage}
                        className="text-center"
                      >
                        Image {notSelectedImage}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Select Deep Learning Models
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="resnet50"
                    name="resnet50"
                    value="resnet50"
                    defaultChecked={formConfig.resnet50}
                  />
                  <Label htmlFor="resnet50">ResNet50</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="densenet161"
                    name="densenet161"
                    value="densenet161"
                    defaultChecked={formConfig.densenet161}
                  />
                  <Label htmlFor="densenet161">DenseNet161</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vgg16"
                    name="vgg16"
                    value="vgg16"
                    defaultChecked={formConfig.vgg16}
                  />
                  <Label htmlFor="vgg16">VGG16</Label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                Select Explainability Methods
              </h3>
              <div className="space-y-2">
                {[
                  ["occlusion", "Occlusion"],
                  ["gradcam", "Grad-CAM"],
                  ["gradcamplusplus", "Grad-CAM++"],
                  ["integratedgradients", "Integrated Gradients"],
                  ["gradientshap", "Gradient SHAP"],
                ].map(([value, label]) => (
                  <div key={value} className="flex items-center space-x-2">
                    <Checkbox
                      id={value}
                      name={value}
                      value={value}
                      defaultChecked={
                        formConfig[value as keyof FormConfig] as boolean
                      }
                    />
                    <Label htmlFor={value}>{label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                Show Evaluation Criteria
              </h3>
              <p className="text-sm text-muted-foreground mb-2">(Debug Only)</p>
              <RadioGroup
                name="showdebug"
                defaultValue={formConfig.showdebug ? "yes" : "no"}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="showdebugyes" />
                  <Label htmlFor="showdebugyes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="showdebugno" />
                  <Label htmlFor="showdebugno">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button type="submit" size="lg">
            Analyze Image
          </Button>
        </div>
      </form>

      {isLoading && (
        <div className="flex justify-center mt-8">
          <div className="space-y-3">
            <Skeleton className="h-4 w-[350px]" />
            <Skeleton className="h-4 w-[280px]" />
            <Skeleton className="h-4 w-[320px]" />
            <Skeleton className="h-4 w-[260px]" />
            <Skeleton className="h-4 w-[300px]" />
            <Skeleton className="h-4 w-[240px]" />
            <Skeleton className="h-4 w-[290px]" />
            <Skeleton className="h-4 w-[270px]" />
            <Skeleton className="h-4 w-[310px]" />
          </div>
        </div>
      )}

      {isError && (
        <Card className="mt-8 border-destructive">
          <CardContent className="p-6">
            <p className="text-destructive">
              Error loading data. Please try again.
            </p>
          </CardContent>
        </Card>
      )}

      {data && isCorrectConfig && (
        <div className="space-y-8 mt-8">
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <div className="text-center flex flex-col items-center">
              <div className="h-12 flex items-center justify-center mb-2">
                <p>Original Image</p>
              </div>
              <img
                src={`showxai/${data.thyroidFile}/image.jpg`}
                width="180"
                height="180"
                alt="Original thyroid image"
                className="rounded-lg"
              />
            </div>
            {data.showDebug && (
              <div className="text-center flex flex-col items-center">
                <div className="h-12 flex items-center justify-center mb-2">
                  <p>Annotated Image (Debug Only)</p>
                </div>
                <img
                  src={`showxai/${data.thyroidFile}/annotated_image.jpg`}
                  width="180"
                  height="180"
                  alt="Annotated thyroid image"
                  className="rounded-lg"
                />
              </div>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Generated Explanations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {data.modelsData.map((singleModelData) => (
                <div
                  key={singleModelData.modelFullName}
                  className="flex flex-col md:flex-row gap-8"
                >
                  <div className="md:min-w-48 flex-shrink-0 flex flex-col items-center md:items-start md:justify-center">
                    <h3 className="text-lg font-semibold mb-2 text-center md:text-left">
                      {singleModelData.modelFullName}
                    </h3>
                    <div className="space-y-1 text-sm text-muted-foreground text-center md:text-left">
                      <p>Predicted Class: {singleModelData.predictedClass}</p>
                      <p>Confidence: {singleModelData.confidence}</p>
                      {data.showDebug && (
                        <p>
                          True Class (Debug Only):{" "}
                          {singleModelData.correctClass}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 flex-grow">
                    {singleModelData.saliencyMaps.map((saliencyMap) => (
                      <div
                        key={saliencyMap.xaiFullName}
                        className="text-center flex flex-col items-center"
                      >
                        <div className="h-12 flex items-center justify-center mb-2">
                          <p className="text-sm font-medium leading-tight">
                            {saliencyMap.xaiFullName}
                          </p>
                        </div>
                        <img
                          src={saliencyMap.filepath}
                          width="180"
                          height="180"
                          alt={`${saliencyMap.xaiFullName} saliency map`}
                          className="rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {data.showDebug && (
            <Card>
              <CardHeader>
                <CardTitle>
                  Explainable Methods Evaluation (Debug Only)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold">Model</TableHead>
                      <TableHead className="font-bold">
                        Explainable Method
                      </TableHead>
                      <TableHead className="font-bold">
                        Correctness
                        <br />
                        Relevant Pixels
                        <br />
                        Confidence Change
                      </TableHead>
                      <TableHead className="font-bold">
                        Correctness
                        <br />
                        Irrelevant Pixels
                        <br />
                        Confidence Change
                      </TableHead>
                      <TableHead className="font-bold">
                        Contrastivity
                        <br />
                        Predicted Class
                      </TableHead>
                      <TableHead className="font-bold">
                        Contrastivity
                        <br />
                        Confidence
                      </TableHead>
                      <TableHead className="font-bold">
                        Coherence
                        <br />% of Relevant Pixels In Nodule
                      </TableHead>
                      <TableHead className="font-bold">
                        Computational Efficiency
                        <br />
                        Execution Time
                        <br />
                        (in seconds)
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.xaiEval.map((dataRow) => (
                      <TableRow
                        key={`${dataRow.modelFullName}-${dataRow.xaiFullName}`}
                        className="even:bg-muted hover:bg-muted/80"
                      >
                        <TableCell>{dataRow.modelFullName}</TableCell>
                        <TableCell>{dataRow.xaiFullName}</TableCell>
                        <TableCell>{dataRow.cor_rel_pixels}</TableCell>
                        <TableCell>{dataRow.cor_ir_pixels}</TableCell>
                        <TableCell>{dataRow.con_class}</TableCell>
                        <TableCell>{dataRow.con_conf}</TableCell>
                        <TableCell>{dataRow.coh}</TableCell>
                        <TableCell>{dataRow.com_time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {!isCorrectConfig && (
        <Card className="mt-8 border-destructive">
          <CardContent className="p-6 space-y-4">
            <p className="text-destructive font-bold">ERROR</p>
            {!isOneModelChosen && (
              <p className="text-destructive">
                You need to choose at least one model
              </p>
            )}
            {!isOneXAIChosen && (
              <p className="text-destructive">
                You need to choose at least one explainability method
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
