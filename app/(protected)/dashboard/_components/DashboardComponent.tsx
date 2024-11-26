"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Search from "@/components/Search";
import { DBSCAN } from "density-clustering";
import ScatterPlot from "@/components/Chart";
import Image from "next/image";

interface Rom {
  name: string;
  sold: number;
  _id: string; // Assuming each ROM has a unique ID in the database
  image: string;
}

// Fetch ROM data from your API using Axios
const fetchRomData = async (): Promise<Rom[]> => {
  const response = await axios.get("/api/admin/rom"); // Adjust API endpoint accordingly
  console.log("API Response:", response.data);
  return response.data; // Return the data directly
};

const DashboardComponent = () => {
  const [roms, setRoms] = useState<Rom[]>([]);
  const [popularRoms, setPopularRoms] = useState<Rom[]>([]);

  useEffect(() => {
    // Fetch data and apply clustering
    const fetchAndClusterRoms = async () => {
      try {
        const romData = await fetchRomData();
        console.log("Fetched ROM data:", romData); // Log fetched data

        // Check if the response is an array and has items
        if (!Array.isArray(romData) || romData.length === 0) {
          throw new Error("Fetched data is not a valid array");
        }

        setRoms(romData); // Set the fetched ROM data

        // Prepare the data for DBSCAN (only the 'sold' values)
        const soldData = romData.map((rom) => [rom.sold]);
        console.log("Sold Data for DBSCAN:", soldData);

        // Apply DBSCAN algorithm
        const dbscan = new DBSCAN();
        const clusters = dbscan.run(soldData, 10, 2); // eps = 2, minPoints = 2
        console.log("Clusters:", clusters);

        // Find the largest cluster (most popular ROMs)
        const largestClusterIndex = clusters.reduce(
          (largest, cluster, index) =>
            cluster.length > clusters[largest].length ? index : largest,
          0
        );
        const popular = clusters[largestClusterIndex]?.map(
          (index: number) => romData[index]
        );
        setPopularRoms(popular || []);
      } catch (error) {
        console.error("Error fetching ROMs or applying DBSCAN:", error);
      }
    };

    fetchAndClusterRoms();
  }, []);

  return (
    <div>
      <Search />
      <div className="px-28 mt-16">
        <span className="font-bold text-3xl">Popular ROMS</span>

        <div className="flex justify-center items-center mt-8">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-7xl"
          >
            <CarouselContent>
              {popularRoms.length > 0 ? (
                popularRoms.map((rom) => (
                  <CarouselItem
                    key={rom._id}
                    className="md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="p-2">
                      <Card>
                        <CardContent className="flex flex-col items-center justify-center p-6">
                          <div className="relative w-full h-48">
                            {" "}
                            {/* Set a fixed height for the image */}
                            <Image
                              src={rom.image}
                              alt={rom.name}
                              layout="fill"
                              objectFit="contain"
                              className="rounded-md"
                            />
                          </div>
                          <span className="text-xl font-semibold mt-4">
                            {rom.name}
                          </span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <div className="p-6">No popular ROMs found.</div>
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
      <ScatterPlot roms={popularRoms} />
    </div>
  );
};

export default DashboardComponent;
