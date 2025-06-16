import imgInitial from "@/assets/img_initial.jpg";
import maskInitial from "@/assets/mask_initial.svg";
import imgPreprocessed from "@/assets/img_preprocessed.png";
import maskPreprocessed from "@/assets/mask_preprocessed.png";
import { ArrowRight, File, FileImage } from "lucide-react";

export function PreprocessingSection() {
  return (
    <div className="my-8">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Preprocessing
      </h2>
      <div className="mx-auto max-w-5xl">
        <div className="mt-6 grid md:grid-cols-[1fr_auto_1fr] gap-6">
          {/* Left side - Original */}
          <div>
            <h3 className="text-lg font-semibold text-center mb-4">Przed</h3>
            <div className="space-y-4">
              <div className="aspect-[560/360] w-full">
                <img
                  src={imgInitial}
                  alt="Initial ultrasound"
                  className="rounded-lg w-full h-full object-contain"
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
              <div className="aspect-[560/360] w-full bg-white rounded-lg p-2 border border-gray-200">
                <img
                  src={maskInitial}
                  alt="Initial mask"
                  className="rounded-lg w-full h-full object-contain"
                />
              </div>
              <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground">
                <File className="size-4" />
                <span>.svg</span>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex items-center justify-center">
            <ArrowRight className="size-12 text-muted-foreground" />
          </div>

          {/* Right side - Processed */}
          <div>
            <h3 className="text-lg font-semibold text-center mb-4">Po</h3>
            <div className="space-y-4">
              <div
                style={{ maxHeight: "360px" }}
                className="mx-auto flex items-center justify-center"
              >
                <img
                  src={imgPreprocessed}
                  alt="Preprocessed ultrasound"
                  className="rounded-lg h-full max-h-[360px] w-auto object-contain"
                />
              </div>
              <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground">
                <FileImage className="size-4" />
                <span>.png</span>
              </div>
              <div
                style={{ maxHeight: "360px" }}
                className="mx-auto flex items-center justify-center"
              >
                <div className="bg-black rounded-lg p-2 h-full">
                  <img
                    src={maskPreprocessed}
                    alt="Preprocessed mask"
                    className="rounded-lg h-full max-h-[360px] w-auto object-contain"
                  />
                </div>
              </div>
              <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground">
                <FileImage className="size-4" />
                <span>.png</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
