import dinoArchitecture from "@/assets/dino-architecture.png";
import { ExternalLink } from "lucide-react";

export function DinoSection() {
  return (
    <section className="space-y-8">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        DINO (self-distillation with no labels)
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {/* Opis DINO... */}
      </p>

      {/* DINO Architecture Image */}
      <div className="flex justify-center items-center w-full">
        <img
          src={dinoArchitecture}
          alt="DINO architecture"
          className="max-w-[1200px] max-h-[1000px] w-auto h-auto object-contain"
        />
      </div>

      <div className="mt-4 flex justify-center">
        <a
          href="https://arxiv.org/abs/2104.14294"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
        >
          Artykuł: Emerging Properties in Self-Supervised Vision Transformers
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
