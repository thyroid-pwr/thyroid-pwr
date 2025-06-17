import {
  Image,
  Brain,
  BarChart3,
  Settings,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

export function DinoFlowchart() {
  return (
    <div className="w-full p-8 flex items-center justify-center">
      <div className="max-w-6xl w-full">
        <div className="flex items-center justify-between">
          {/* Input Image */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-24 border-2 border-black rounded-lg flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition-colors">
              <Image size={32} className="text-black mb-2" />
              <span className="text-sm font-semibold text-black">
                Input Image
              </span>
            </div>
          </div>

          {/* Arrow 1 */}
          <div className="h-[2px] w-16 bg-black relative">
            <div className="absolute -right-2 -top-[5px] w-0 h-0 border-t-[6px] border-t-transparent border-l-[12px] border-l-black border-b-[6px] border-b-transparent" />
          </div>

          {/* DINO Model */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-24 border-2 border-black rounded-lg flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition-colors">
              <Brain size={32} className="text-black mb-2" />
              <span className="text-sm font-semibold text-black">
                DINO Model
              </span>
            </div>
          </div>

          {/* Arrow 2 */}
          <div className="h-[2px] w-16 bg-black relative">
            <div className="absolute -right-2 -top-[5px] w-0 h-0 border-t-[6px] border-t-transparent border-l-[12px] border-l-black border-b-[6px] border-b-transparent" />
          </div>

          {/* Feature Vectors */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-24 border-2 border-black rounded-lg flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition-colors">
              <BarChart3 size={32} className="text-black mb-2" />
              <span className="text-sm font-semibold text-black">
                Feature Vectors
              </span>
            </div>
          </div>

          {/* Arrow 3 */}
          <div className="h-[2px] w-16 bg-black relative">
            <div className="absolute -right-2 -top-[5px] w-0 h-0 border-t-[6px] border-t-transparent border-l-[12px] border-l-black border-b-[6px] border-b-transparent" />
          </div>

          {/* SVM Classifier */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-24 border-2 border-black rounded-lg flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition-colors">
              <Settings size={32} className="text-black mb-2" />
              <span className="text-sm font-semibold text-black">
                SVM Classifier
              </span>
            </div>
          </div>

          {/* Split Arrow */}
          <div className="relative w-24 flex items-center justify-center">
            {/* Main horizontal line */}
            <div className="h-[2px] w-12 bg-black absolute left-0"></div>

            {/* Upper diagonal line */}
            <div className="absolute left-12 -top-12 w-16 h-[2px] bg-black transform rotate-[-45deg] origin-left">
              <div className="absolute right-0 -top-[5px] w-0 h-0 border-t-[6px] border-t-transparent border-l-[12px] border-l-black border-b-[6px] border-b-transparent transform rotate-[-45deg]" />
            </div>

            {/* Lower diagonal line */}
            <div className="absolute left-12 top-12 w-16 h-[2px] bg-black transform rotate-[45deg] origin-left">
              <div className="absolute right-0 -top-[5px] w-0 h-0 border-t-[6px] border-t-transparent border-l-[12px] border-l-black border-b-[6px] border-b-transparent transform rotate-[45deg]" />
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col gap-12">
            {/* Benign */}
            <div className="flex flex-col items-center">
              <div className="w-28 h-20 border-2 border-black rounded-lg flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition-colors">
                <CheckCircle size={28} className="text-black mb-1" />
                <span className="text-sm font-semibold text-black">Benign</span>
              </div>
            </div>

            {/* Malignant */}
            <div className="flex flex-col items-center">
              <div className="w-28 h-20 border-2 border-black rounded-lg flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition-colors">
                <AlertTriangle size={28} className="text-black mb-1" />
                <span className="text-sm font-semibold text-black">
                  Malignant
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
