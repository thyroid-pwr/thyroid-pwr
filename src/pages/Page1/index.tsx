import { IntroSection } from "./IntroSection";
import { TeamSection } from "./TeamSection";
import { CarouselSection } from "./CarouselSection";

export function Page1() {
  return (
      <>
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          ThyroID
        </h1>
  
        <div className="flex flex-col gap-20">
          <IntroSection />
          <CarouselSection />
          <TeamSection />
        </div>
      </>
    );
} 