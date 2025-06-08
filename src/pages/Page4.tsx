import { useEffect, useRef, useState } from "react";

type Content = {
  label: string;
  images: [string, string];
  text: string;
};

const contents: Content[] = [
  {
    label: "Model Setup 1",
    images: ["src/assets/0000_mask.jpg", "src/assets/0000.jpg"],
    text: "This is the content for Button 1",
  },
  {
    label: "Model Setup 2",
    images: ["src/assets/0000_mask.jpg", "src/assets/0000.jpg"],
    text: "This is the content for Button 2",
  },
  {
    label: "Model Setup 3",
    images: ["src/assets/0000_mask.jpg", "src/assets/0000.jpg"],
    text: "This is the content for Button 3",
  },
];

export function Page4() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { images, text } = contents[activeIndex];
  const widths = ["w-[1200px]", "w-[1000px]", "w-[900px]"];
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => Math.min(prev + 1, contents.length - 1));
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
      e.preventDefault();
    }
  };

  return (
    <div className="flex p-6 bg-gray-100 min-h-[600px] items-center justify-center">
      {/* Sidebar - focusable and keyboard-aware */}
      <div
        ref={sidebarRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="flex flex-col gap-4 mr-6 outline-none"
      >
        <h2 className="text-lg font-bold text-gray-800 mb-2">
          ThryoID Project Overview
        </h2>
        {contents.map((content, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              index === activeIndex
                ? "bg-blue-600 text-white"
                : "bg-white border border-gray-300 text-gray-800"
            }`}
          >
            {content.label}
          </button>
        ))}
        <p className="text-xs text-gray-500 italic mt-2">Press ↑ / ↓ to navigate</p>
      </div>

      {/* Main Content */}
      <div
        className={`flex flex-1 items-center justify-between bg-white rounded-xl p-8 shadow-lg transition-all duration-300 ${
          widths[activeIndex] || "w-full"
        }`}
      >
        {/* Images */}
        <div className="flex gap-8">
          <img
            src={images[0]}
            alt="Left"
            className="w-[300px] h-[300px] object-cover rounded-lg border"
          />
          <img
            src={images[1]}
            alt="Right"
            className="w-[300px] h-[300px] object-cover rounded-lg border"
          />
        </div>

        {/* Text */}
        <div className="ml-12 text-xl font-semibold text-gray-800 max-w-md">
          {text}
        </div>
      </div>
    </div>
  );
}
