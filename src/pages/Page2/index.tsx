import { Table } from "./Table";
import { DinoSection } from "./DINO_Map";
import {Summary} from './Summary';



export function Page2() {
  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        thyroID Overview
      </h1>

      <div className="flex flex-col gap-20">
        <Table />
        <DinoSection />
        <Summary />
      </div>
    </>
  );
}
