import { ExternalLink } from "lucide-react";
import explainableAi from "@/assets/explainable-ai.png";

export function ExplainableAiSection() {
  return (
    <section className="space-y-8">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Sieci konwolucyjne i wyjaśnialność modeli
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Zamiast korzystać z metod samonadzorowanych uczenia reprezentacji,
        możemy wytrenować konwolucyjną sieć neuronową na danych z etykietami, a
        następnie zastosować wybraną metodę wyjaśnialności, aby wygenerować
        wizualizację pokazującą, które obszary obrazu miały największy wpływ na
        decyzję modelu.
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
          Źródła:
        </h3>
        <a
          href="https://pubmed.ncbi.nlm.nih.gov/36990051/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
        >
          Artykuł: Explainable AI in medical imaging: An overview for clinical
          practitioners - Beyond saliency-based XAI approaches
          <ExternalLink className="h-4 w-4 flex-shrink-0" />
        </a>
      </div>
    </section>
  );
}
