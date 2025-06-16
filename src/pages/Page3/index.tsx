import dinoArchitecture from "@/assets/dino-architecture.png";
import { DatasetsSection } from "./DatasetsSection";

export function Page3() {
  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Architektura systemu
      </h1>

      <DatasetsSection />

      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Preprocessing
      </h2>

      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        DINO (self-distillation with no labels)
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        krótki opis czym jest dino
      </p>
      <a
        href="https://arxiv.org/abs/2104.14294"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        Artykuł: Emerging Properties in Self-Supervised Vision Transformers
      </a>

      <img
        src={dinoArchitecture}
        alt="DINO architecture"
        className="max-w-full max-h-[600px] object-contain"
      />
    </>
  );
}
