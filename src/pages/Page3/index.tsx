import { ContrastiveLearningSection } from "./ContrastiveLearningSection";
import { DatasetsSection } from "./DatasetsSection";
import { DinoSection } from "./DinoSection";
import { PreprocessingSection } from "./PreprocessingSection";
// import { SystemArchitectureDiagram } from "./SystemArchitectureDiagram";
import { ExplainableAiSection } from "./ExplainableAiSection";

export function Page3() {
  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Architektura systemu
      </h1>

      <div className="flex flex-col gap-20">
        {/* <SystemArchitectureDiagram /> */}
        <DatasetsSection />
        <PreprocessingSection />
        <DinoSection />
        <ContrastiveLearningSection />
        <ExplainableAiSection />
      </div>
    </>
  );
}
