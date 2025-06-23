import dinoArchitecture from "@/assets/dino-architecture.png";
import { ExternalLink } from "lucide-react";

export function DinoSection() {
  return (
    <section className="space-y-8">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        DINO (self-distillation with no labels)
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        DINO to metoda samonadzorowanego uczenia reprezentacji, oparta na
        procesie destylacji wiedzy. Wykorzystuje ona dwie identyczne sieci
        neuronowe - nauczyciela i studenta. Sieć nauczyciela uczy się na bazie
        globalnych widoków danych, natomiast sieć ucznia przetwarza widoki
        lokalne. Celem studenta jest dopasowanie swojej predykcji do wyników
        generowanych przez nauczyciela.
      </p>

      {/* DINO Architecture Image */}
      <div className="flex justify-center items-center w-full px-4">
        <img
          src={dinoArchitecture}
          alt="DINO architecture"
          className="w-full max-w-[1000px] h-auto rounded-lg"
        />
      </div>

      <div className="mt-6 p-4 border rounded-lg bg-muted/50">
        <h3 className="font-semibold text-sm text-muted-foreground mb-2">
          Źródła:
        </h3>
        <a
          href="https://arxiv.org/abs/2104.14294"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
        >
          Artykuł: Emerging Properties in Self-Supervised Vision Transformers
          <ExternalLink className="h-4 w-4 flex-shrink-0" />
        </a>
      </div>
    </section>
  );
}
