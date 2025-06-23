import { ExternalLink } from "lucide-react";
import contrastiveLearning from "@/assets/contrastive-learning.svg";

export function ContrastiveLearningSection() {
  return (
    <section className="space-y-8">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Contrastive Learning using vision transformers
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Contrastive learning is a self-supervised learning method that involves 
        comparing different data examples to teach the network to distinguish 
        between them. In our case, we use two identical neural networks that 
        analyze thyroid ultrasound images with marked abnormalities. The goal of 
        the network is to learn to differentiate between benign and malignant abnormalities.
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
          Sources:
        </h3>
        <a
          href="https://www.sciencedirect.com/science/article/abs/pii/S0010482522011520"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
        >
          Article: Contrastive learning with vision transformers for thyroid
          nodule malignancy prediction in ultrasound images
          <ExternalLink className="h-4 w-4 flex-shrink-0" />
        </a>
      </div>
    </section>
  );
}
