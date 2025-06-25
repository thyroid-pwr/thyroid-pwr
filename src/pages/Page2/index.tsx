import { Table } from "./Table";


export function Page2() {
  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Results
      </h1>

      <div className="flex flex-col gap-20">
        <Table />
      </div>
    </>
  );
}
