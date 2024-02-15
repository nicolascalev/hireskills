"use client";
import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";

function ProjectMediaCarousel() {
  return (
    <Carousel
      withIndicators
      height={200}
      slideSize="33.333333%"
      slideGap="md"
      loop
      align="start"
      slidesToScroll={3}
    >
      <Carousel.Slide>
        <Image src="https://picsum.photos/200/300" alt="Temp image" />
      </Carousel.Slide>
      <Carousel.Slide>
        <Image src="https://picsum.photos/200/300" alt="Temp image" />
      </Carousel.Slide>
      <Carousel.Slide>
        <Image src="https://picsum.photos/200/300" alt="Temp image" />
      </Carousel.Slide>
      {/* ...other slides */}
    </Carousel>
  );
}

export default ProjectMediaCarousel;
