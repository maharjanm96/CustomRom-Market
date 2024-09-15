import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Search from "@/components/Search";
import Loader from "@/components/ui/loader";

const DashboardComponent = () => {
  return (
    <div>
      <Search />
      <div className="px-28 mt-16">
        <span className="font-bold text-3xl">Popular Devices</span>
        <div className="flex justify-center items-center mt-8">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-7xl"
          >
            <CarouselContent>
              {Array.from({ length: 10 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                  {" "}
                  {/* Adjust width basis for larger cards */}
                  <div className="p-2">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        {" "}
                        {/* Adjust padding to make cards bigger */}
                        <span className="text-3xl font-semibold">
                          {index + 1}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
