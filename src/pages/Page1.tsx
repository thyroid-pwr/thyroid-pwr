import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function Page1() {
  return (
    <div className="text-2xl font-bold">
    <p> Strona tytułowa </p>
    <Carousel>
      <CarouselContent>
        <CarouselItem>...</CarouselItem>
        <CarouselItem>...</CarouselItem>
        <CarouselItem>...</CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </div>
  )
} 