import {useRef, useState } from "react";
import dino_model from "@/assets/dino1.png";
import dino_att1 from "@/assets/dino1_att1.png";
import dino_att2 from "@/assets/dino1_att2.png";
import dino_att3 from "@/assets/dino1_att3.png";
import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TableRow = {
  id: number;
  name: string;
  acc?: string;
  prec?: string;
  recall?: string;
  f1?: string;
};

type Content = {
  label: string;
  images?: string[][];
  tableData?: TableRow[];
  text: string;
};

const contents: Content[] = [
  {
    label: "Classification",
    tableData: [
      { id: 1, name: "DINO", acc: "0.64", prec: "0.59", recall: "0.59", f1: "0.59" },
      { id: 2, name: "DINO v2",        acc: "0.65 ", prec: "0.60", recall: "0.59", f1: "0.60" },
      { id: 3, name: "Contrastive Learning", acc: "0.67", prec: "0.81", recall: "0.67", f1: "0.67" },
      { id: 4, name: "ResNet50",        acc: "0.76", prec: "0.75", recall: "0.74", f1: "0.74" },
      { id: 5, name: "DenseNet161", acc: "0.71", prec: "0.70", recall: "0.71", f1: "0.70" },
      { id: 6, name: "VGG16",        acc: "0.67", prec: "0.65", recall: "0.65", f1: "0.65" },
    ],
    text: "Evaluation metrics for the segmentation task.",
  },
  {
    label: "DINO Attention Map",
    images: [
      [dino_model, dino_att1],
      [dino_model, dino_att2],
      [dino_model, dino_att3],
    ],
    text: "Here, attention maps from the most promising heads of the DINO model are presented.",
  },
  {
    label: "DINOv2 Attention Map",
    images: [
      [dino_model, dino_att1],
      [dino_model, dino_att2],
      [dino_model, dino_att3],
    ],
    text: "Here, attention maps from the most promising heads of the DINOv2 model are presented.",
  },
];

export function Table() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const { images, text, tableData } = contents[activeIndex];
  // const widths = ["w-full", "w-full", "w-full"]; // use full width on mobile by default
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => Math.min(prev + 1, contents.length - 1));
      setImageIndex(0);
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
      setImageIndex(0);
      e.preventDefault();
    }
  };

  return (
    <section className="space-y-8 px-4 sm:px-8">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Results
      </h2>
      <div className="flex flex-col sm:flex-row p-6 bg-gray-100 min-h-[600px] items-start sm:items-center justify-center">
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="flex sm:flex-col gap-4 mb-6 sm:mb-0 sm:mr-6 outline-none w-full sm:w-auto"
        >
          <div className="sm:w-[200px] bg-white rounded-lg p-4 shadow">
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              ThryoID Project Overview
            </h2>
            <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-visible">
              {contents.map((content, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveIndex(index);
                    setImageIndex(0);
                  }}
                  className={`px-4 py-3 min-w-[120px] sm:min-w-full rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    index === activeIndex
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {content.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 italic mt-2 select-none">Press ↑ / ↓ to navigate</p>
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`flex flex-col gap-6 items-center bg-white rounded-xl p-6 sm:p-8 shadow-lg transition-all duration-300 w-full max-w-full sm:max-w-[1200px]`}
        >
          {/* Content Display */}
          {tableData ? (
            <div className="w-full overflow-x-auto">
              <UITable>
                <TableHeader>
                  <TableRow>
                    <TableHead>Model name</TableHead>
                    <TableHead>Accuracy</TableHead>
                    <TableHead>Precision</TableHead>
                    <TableHead>Recall</TableHead>
                    <TableHead>F1-score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.acc}</TableCell>
                      <TableCell>{row.prec}</TableCell>
                      <TableCell>{row.recall}</TableCell>
                      <TableCell>{row.f1}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </UITable>
            </div>
          ) : (
            <>
              {/* Image Switch Buttons */}
              <div className="flex gap-3 overflow-x-auto pb-2 w-full justify-center">
                {images?.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setImageIndex(idx)}
                    className={`w-10 h-10 text-base rounded-full flex items-center justify-center ${
                      idx === imageIndex
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                    aria-label={`Switch to image set ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              {/* Image Pair Display */}
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center w-full justify-center">
                {images?.[imageIndex].map((src, i) => (
                  <div key={i} className="flex flex-col items-center max-w-[320px] sm:max-w-[300px]">
                    <img
                      src={src}
                      alt={`Image ${i}`}
                      className="w-full max-w-[300px] h-[350px] object-cover rounded-lg border"
                      loading="lazy"
                    />
                    <p className="mt-2 text-lg text-gray-600 font-medium select-none">
                      {i === 0
                        ? "Input"
                        : `Head ${
                            (() => {
                              const filename = src.split("/").pop() || "";
                              const match = filename.match(/(\d+)(?=\.png$)/);
                              return match ? match[1] : "N/A";
                            })()
                          }`}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Description */}
          <div className="text-center text-lg sm:text-xl font-semibold text-gray-800 max-w-md mt-4 px-2 sm:px-0">
            {text}
          </div>
        </div>
      </div>
    </section>
  );
}
