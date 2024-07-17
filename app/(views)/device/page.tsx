"use client";

import MobileCard from "@/components/MobileCard";
import Search from "@/components/Search";
import { useSession } from "next-auth/react";
import NotAuthorized from "../auth/notauthorized/page";

const DevicePage = () => {
  const { data: session } = useSession();
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
      {session ? (
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
      ) : (
        <>
          <NotAuthorized />
        </>
      )}
    </>
  );
};

export default DevicePage;
