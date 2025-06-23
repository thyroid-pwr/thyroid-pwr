import { ExternalLink } from "lucide-react";
import contrastiveLearning from "@/assets/contrastive-learning.svg";

export function ContrastiveLearningSection() {
  return (
    <section className="space-y-8">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Uczenie kontrastowe przy użyciu transformerów wizyjnych
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Uczenie kontrastowe to metoda samouczenia się, która polega na
        porównywaniu przykładów danych, aby nauczyć model rozróżniania między
        nimi. W tym przypadku używa się dwóch takich samych modeli
        (transformerów wizyjnych), które analizują obrazy USG tarczycy z
        zaznaczonym guzkiem. Celem jest, aby model nauczył się, że różne wersje
        tego samego guzka są do siebie podobne, a jednocześnie rozpoznawał, że
        inne guzki to coś innego. Dzięki temu model lepiej rozumie, jak
        wyglądają konkretne zmiany chorobowe.
      </p>

      {/* Contrastive Learning Diagram */}
      <div className="flex justify-center items-center w-full px-4">
        <img
          src={contrastiveLearning}
          alt="Diagram uczenia kontrastowego"
          className="w-full max-w-[800px] h-auto rounded-lg"
        />
      </div>

      <div className="mt-6 p-4 border rounded-lg bg-muted/50">
        <h3 className="font-semibold text-sm text-muted-foreground mb-2">
          Źródła:
        </h3>
        <a
          href="https://www.sciencedirect.com/science/article/abs/pii/S0010482522011520"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
        >
          Artykuł: Contrastive learning with vision transformers for thyroid
          nodule malignancy prediction in ultrasound images
          <ExternalLink className="h-4 w-4 flex-shrink-0" />
        </a>
      </div>
    </section>
  );
}
