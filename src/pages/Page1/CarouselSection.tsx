import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import dinoArchitecture from "@/assets/dino-architecture.png";
import calculator from "@/assets/kalkulator.png";
import poster from "@/assets/poster.png";

export function CarouselSection() {
    return (
        <section>
            <Carousel
                plugins={[
                    Autoplay({
                        delay: 4000,
                }),
            ]}
            >
                <CarouselContent>
                    <CarouselItem>
                        <img
                            src={poster}
                            alt="poster"
                            className="w-full h-auto rounded-lg"
                        />
                    </CarouselItem>
                    <CarouselItem>...</CarouselItem>
                    <CarouselItem>...</CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    )
}