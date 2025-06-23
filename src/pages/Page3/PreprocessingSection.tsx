import imgInitial from "@/assets/img_initial.jpg";
import maskInitial from "@/assets/mask_initial.png";
import imgPreprocessed from "@/assets/img_preprocessed.png";
import maskPreprocessed from "@/assets/mask_preprocessed.png";
import {
  ArrowDown,
  ArrowRight,
  File,
  FileCode,
  FileImage,
  Layers,
  Split,
} from "lucide-react";

export function PreprocessingSection() {
  return (
    <section className="space-y-8">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Preprocessing
      </h2>
      <div className="mx-auto max-w-5xl">
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6">
          {/* Left side - Original */}
          <div>
            <h3 className="text-lg font-semibold text-center mb-4">Before</h3>
            <div className="space-y-4">
              <div className="h-[300px] flex items-center justify-center">
                <img
                  src={imgInitial}
                  alt="Initial ultrasound"
                  className="rounded-lg max-h-full w-auto object-contain"
                />
              </div>
              <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground">
                <File className="size-4" />
                <span>.nii</span>
                <span>|</span>
                <span>.jpg</span>
                <span>|</span>
                <span>.bmp</span>
              </div>
              <div className="h-[300px] flex items-center justify-center">
                <div className="bg-white rounded-lg p-2 border border-gray-200 h-full flex items-center justify-center">
                  <img
                    src={maskInitial}
                    alt="Initial mask"
                    className="rounded-lg max-h-full w-auto object-contain"
                  />
                </div>
              </div>
              <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground">
                <FileCode className="size-4" />
                <span>.svg</span>
              </div>

              <div className="!mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Layers className="size-4" />
                <span className="font-medium text-gray-600">TNCD</span>
                <span className="text-gray-400">+</span>
                <span className="font-medium text-gray-600">Stanford</span>
                <span className="text-gray-400">+</span>
                <span className="font-medium text-gray-600">...others</span>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center">
            <ArrowRight className="hidden md:block size-12 text-muted-foreground" />
            <ArrowDown className="md:hidden size-12 text-muted-foreground" />
          </div>

          {/* Right side - Processed */}
          <div>
            <h3 className="text-lg font-semibold text-center mb-4">After</h3>
            <div className="space-y-4">
              <div className="h-[300px] flex items-center justify-center">
                <img
                  src={imgPreprocessed}
                  alt="Preprocessed ultrasound"
                  className="rounded-lg max-h-full w-auto object-contain"
                />
              </div>
              <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground">
                <FileImage className="size-4" />
                <span>.png</span>
              </div>
              <div className="h-[300px] flex items-center justify-center">
                <div className="bg-black rounded-lg p-2 h-full flex items-center justify-center">
                  <img
                    src={maskPreprocessed}
                    alt="Preprocessed mask"
                    className="rounded-lg max-h-full w-auto object-contain"
                  />
                </div>
              </div>
              <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground">
                <FileImage className="size-4" />
                <span>.png</span>
              </div>

              <div className="!mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Split className="size-4" />
                <span className="font-medium text-gray-600">Train</span>
                <span className="text-gray-400">/</span>
                <span className="font-medium text-gray-600">Validation</span>
                <span className="text-gray-400">/</span>
                <span className="font-medium text-gray-600">Test</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
