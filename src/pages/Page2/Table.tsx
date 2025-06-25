import { useRef, useState, useEffect } from "react";
import dino_model from "@/assets/dino1.png";
import dino_att1 from "@/assets/dino1_att1.png";
import dino_att2 from "@/assets/dino1_att2.png";
import dino_att3 from "@/assets/dino1_att3.png";

import dino2_model from "@/assets/dino2.png";
import dino2_att1 from "@/assets/dino2_att1.png";
import dino2_att2 from "@/assets/dino2_att2.png";
import dino2_att3 from "@/assets/dino2_att3.png";

import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TableRowData = {
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
  tableData?: TableRowData[];
  text: string;
};

const contents: Content[] = [
  {
    label: "Classification",
    tableData: [
      { id: 1, name: "DINO", acc: "0.64", prec: "0.59", recall: "0.59", f1: "0.59" },
      { id: 2, name: "DINO v2", acc: "0.65 ", prec: "0.60", recall: "0.59", f1: "0.60" },
      { id: 3, name: "Contrastive Learning", acc: "0.67", prec: "0.81", recall: "0.67", f1: "0.67" },
      { id: 4, name: "ResNet50", acc: "0.76", prec: "0.75", recall: "0.74", f1: "0.74" },
      { id: 5, name: "DenseNet161", acc: "0.71", prec: "0.70", recall: "0.71", f1: "0.70" },
      { id: 6, name: "VGG16", acc: "0.67", prec: "0.65", recall: "0.65", f1: "0.65" },
    ],
    text: "Evaluation metrics for the classification task.",
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
      [dino2_model, dino2_att1],
      [dino2_model, dino2_att2],
      [dino2_model, dino2_att3],
    ],
    text: "Here, attention maps from the most promising heads of the DINOv2 model are presented.",
  },
];

export function Table() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const { images, text, tableData } = contents[activeIndex];
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Automatically focus the sidebar when the component mounts to enable keyboard navigation
  useEffect(() => {
    sidebarRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => {
        const nextIndex = Math.min(prev + 1, contents.length - 1);
        if(nextIndex !== prev) setImageIndex(0);
        return nextIndex;
      });
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => {
        const nextIndex = Math.max(prev - 1, 0);
        if(nextIndex !== prev) setImageIndex(0);
        return nextIndex;
      });
    }
  };

  return (
    <section className="space-y-8 px-4 py-8 sm:px-8">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Results
      </h2>
      {/* Main container: Changed to flex-col and removed fixed min-height for better mobile adaptability */}
      <div className="flex flex-col lg:flex-row p-2 sm:p-4 bg-gray-100 items-start justify-center gap-6">
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="w-full lg:w-auto outline-none"
        >
          <div className="bg-white rounded-lg p-4 shadow w-full lg:w-[250px]">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              thyroID Project Overview
            </h2>
            {/* FIX: Sidebar buttons now use flex-wrap on mobile to flow into multiple lines instead of forcing a horizontal scroll.
              On large screens (lg), it becomes a vertical column.
            */}
            <div className="flex flex-wrap lg:flex-col gap-2">
              {contents.map((content, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveIndex(index);
                    setImageIndex(0);
                  }}
                  className={`
                    px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap
                    flex-grow lg:flex-grow-0 text-center
                    ${
                      index === activeIndex
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-100 hover:border-gray-400"
                    }
                  `}
                >
                  {content.label}
                </button>
              ))}
            </div>
            {/* FIX: Helper text is now hidden on mobile (hidden) and shown from sm breakpoint upwards (sm:block) */}
            <p className="text-xs text-gray-500 italic mt-3 select-none text-center lg:text-left hidden sm:block">
              Use ↑ / ↓ to navigate
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-6 items-center bg-white rounded-xl p-4 sm:p-8 shadow-lg w-full transition-all duration-300">
          {tableData ? (
            <div className="w-full overflow-x-auto">
              <UITable>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-bold">Model name</TableHead>
                    <TableHead>Accuracy</TableHead>
                    <TableHead>Precision</TableHead>
                    <TableHead>Recall</TableHead>
                    <TableHead>F1-score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">{row.name}</TableCell>
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
                    className={`
                      w-10 h-10 text-base rounded-full flex items-center justify-center flex-shrink-0
                      ${
                        idx === imageIndex
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      }
                    `}
                    aria-label={`Switch to image set ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              {/* Image Pair Display */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center justify-center w-full">
                {images?.[imageIndex].map((src, i) => (
                  <div key={i} className="flex flex-col items-center w-full max-w-xs sm:max-w-sm">
                    <img
                      src={src}
                      alt={`${contents[activeIndex].label} - ${i === 0 ? "Input" : `Head ${imageIndex + i}`}`}
                      className="w-full h-auto object-cover rounded-lg border aspect-square"
                      loading="lazy"
                    />
                    <p className="mt-2 text-sm sm:text-base text-gray-600 font-medium select-none">
                      {i === 0 ? "Input" : `Head ${imageIndex + 1}`}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Description */}
          <div className="text-center text-base font-medium text-gray-700 max-w-xl mt-4 px-2 sm:px-0">
            {text}
          </div>
        </div>
      </div>
    </section>
  );
}