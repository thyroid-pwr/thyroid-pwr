import { ExternalLink } from "lucide-react";
import explainableAi from "@/assets/explainable-ai.png";

export function ExplainableAiSection() {
  return (
    <section className="space-y-8">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Convolutional neural networks and model explainability
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Instead of using self-supervised learning methods,
        we can train a convolutional neural network on labeled data, and
        then apply a selected explainability method to generate a
        visualization showing which areas of the image had the greatest influence on
        the model’s decision.
      </p>

      {/* Explainable AI Diagram */}
      <div className="flex justify-center items-center w-full px-4">
        <img
          src={explainableAi}
          alt="Diagram metod wyjaśnialności AI"
          className="w-full max-w-[1000px] h-auto rounded-lg"
        />
      </div>

      <div className="mt-6 p-4 border rounded-lg bg-muted/50">
        <h3 className="font-semibold text-sm text-muted-foreground mb-2">
          Sources:
        </h3>
        <a
          href="https://pubmed.ncbi.nlm.nih.gov/36990051/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
        >
          Article: Explainable AI in medical imaging: An overview for clinical
          practitioners - Beyond saliency-based XAI approaches
          <ExternalLink className="h-4 w-4 flex-shrink-0" />
        </a>
      </div>
    </section>
  );
}
