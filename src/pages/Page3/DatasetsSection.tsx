import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, Image, Library, Tags } from "lucide-react";

const otherOrganDatasets = [
  {
    name: "BUSI",
    url: "https://www.kaggle.com/datasets/aryashah2k/breast-ultrasound-images-dataset",
  },
  {
    name: "Breast-Lesions-USG",
    url: "https://www.cancerimagingarchive.net/collection/breast-lesions-usg/",
  },
  {
    name: "CAMUS",
    url: "https://www.creatis.insa-lyon.fr/Challenge/camus/index.html",
  },
  { name: "HC18", url: "https://hc18.grand-challenge.org/" },
];

const otherThyroidDatasets = [
  { name: "DDTI", url: "http://cimalab.unal.edu.co/applications/thyroid/" },
  { name: "HUN_DB", url: "http://cimalab.unal.edu.co/applications/thyroid/" },
  {
    name: "AUOTND",
    url: "https://figshare.com/articles/dataset/An_ultrasonography_of_thyroid_nodules_dataset_with_pathological_diagnosis_annotation_for_deep_learning/27021604?utm_source=chatgpt.com",
  },
  { name: "TNUS", url: "https://github.com/taodeng/TNPPD-Net/tree/main/TNUS" },
  {
    name: "US Enhance 2023",
    url: "https://ultrasoundenhance2023.grand-challenge.org/datasets/",
  },
];

const thyroidDatasetsWithMalignancy = [
  { name: "TNCD", url: "https://arxiv.org/abs/2207.00807" },
  {
    name: "Stanford",
    url: "https://stanfordaimi.azurewebsites.net/datasets/a72f2b02-7b53-4c5d-963c-d7253220bfd5",
  },
  {
    name: "AUITD",
    url: "https://www.kaggle.com/datasets/azouzmaroua/algeria-ultrasound-images-thyroid-dataset-auitd",
  },
];

export function DatasetsSection() {
  return (
    <>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Zbiory danych
      </h2>
      <div className="grid md:grid-cols-3 gap-4 my-4">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Library />
              USG innych organów
            </CardTitle>
            <CardDescription>
              Zbiór do nauki ogólnych cech obrazów USG.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="font-bold text-lg">Ponad 2,400 obrazów</p>
            <p className="text-sm text-muted-foreground mt-2">Źródła:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              {otherOrganDatasets.map((dataset) => (
                <li key={dataset.name}>
                  <a
                    href={dataset.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline inline-flex items-center gap-1"
                  >
                    {dataset.name}
                    <ExternalLink className="size-3" />
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image />
              Pozostałe zbiory danych tarczycy
            </CardTitle>
            <CardDescription>
              Zbiór do samonadzorowanego treningu i innych zadań.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="font-bold text-lg">Ponad 16,000 obrazów</p>
            <p className="text-sm text-muted-foreground mt-2">Źródła:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              {otherThyroidDatasets.map((dataset) => (
                <li key={dataset.name}>
                  <a
                    href={dataset.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline inline-flex items-center gap-1"
                  >
                    {dataset.name}
                    <ExternalLink className="size-3" />
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tags />
              USG tarczycy etykietowane (Złośliwość)
            </CardTitle>
            <CardDescription>
              Dane do klasyfikacji złośliwości guzków tarczycy.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="font-bold text-lg">Ponad 23,000 obrazów</p>
            <p className="text-sm text-muted-foreground mt-2">Źródła:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              {thyroidDatasetsWithMalignancy.map((dataset) => (
                <li key={dataset.name}>
                  <a
                    href={dataset.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline inline-flex items-center gap-1"
                  >
                    {dataset.name}
                    <ExternalLink className="size-3" />
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
