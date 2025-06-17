import { ExternalLink } from "lucide-react";

export function ContrastiveLearningSection() {
  return (
    <section className="space-y-8">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Uczenie kontrastowe przy użyciu transformerów wizyjnych
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">Opis...</p>
      <div className="flex justify-center">
        <a
          href="https://www.sciencedirect.com/science/article/abs/pii/S0010482522011520"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
        >
          Artykuł: Contrastive learning with vision transformers for thyroid
          nodule malignancy prediction in ultrasound images
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
