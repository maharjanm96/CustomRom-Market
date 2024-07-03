"use client";

import MobileCard from "@/app/Components/MobileCard";
import React, { useEffect } from "react";
import Search from "@/app/Components/Search";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const DevicePage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/auth/notauthorized");
    }
  }, [router]);

  const mobileCardsData = [
    {
      title: "Xiaomi Poco F1",
      description: "BERYLLIUM",
      downloads: "1,085,632 Downloads",
    },
    {
      title: "Samsung",
      description: "BERYLLIUM",
      downloads: "1,085,632 Downloads",
    },
    {
      title: "Iphone 15 Pro Max",
      description: "BERYLLIUM",
      downloads: "1,085,632 Downloads",
    },
    {
      title: "One Plus",
      description: "BERYLLIUM",
      downloads: "1,085,632 Downloads",
    },
    {
      title: "Redmi 15 Pro ",
      description: "BERYLLIUM",
      downloads: "1,085,632 Downloads",
    },
    {
      title: "Xiaomi Poco F1",
      description: "BERYLLIUM",
      downloads: "1,085,632 Downloads",
    },
    {
      title: "Xiaomi Poco F1",
      description: "BERYLLIUM",
      downloads: "1,085,632 Downloads",
    },
  ];

  return (
    <>
      <Search />
      <div className="h-auto w-full p-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {mobileCardsData.map((card, index) => (
            <MobileCard
              key={index}
              title={card.title}
              description={card.description}
              downloads={card.downloads}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DevicePage;
