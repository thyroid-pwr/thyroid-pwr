import dinoArchitecture from "@/assets/dinvo2_res.png";


export function DinoSection() {
  return (
    <section className="space-y-8">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      DINO Embedding Space
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
      As the results obtained from the attention heads were surprisingly good, we decided to use the DINOv2 embeddings for the classification task of identifying malignant thyroid tumors. Below, a UMAP visualization of the DINOv2 embeddings on the test set is presented, with class labels included.
        </p>

      {/* DINO Architecture Image */}
      <div className="flex justify-center items-center w-full px-4">
        <img
          src={dinoArchitecture}
          alt="DINO architecture"
          className="w-full max-w-[1000px] h-auto rounded-lg"
        />
      </div>

    </section>
  );
}
