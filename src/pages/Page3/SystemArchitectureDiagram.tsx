import allMethodsPipeline from "@/assets/all-methods-pipeline.png";

export function SystemArchitectureDiagram() {
  return (
    <section className="space-y-8">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Diagram systemu
      </h2>
      <div className="flex justify-center items-center w-full mt-8">
        <img
          src={allMethodsPipeline}
          alt="Pipeline diagram of the system architecture"
          className="max-w-full h-auto p-4"
        />
      </div>
    </section>
  );
}
