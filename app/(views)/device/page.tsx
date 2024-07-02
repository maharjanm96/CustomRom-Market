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

  return (
    <>
      <Search />
      <div className="container my-10 flex gap-10 justify-evenly">
        <MobileCard
          title="Xiaomi Poco F1"
          description="BERYLLIUM"
          downloads="1,085,632 Downloads"
        />
        <MobileCard
          title="Xiaomi Poco F1"
          description="BERYLLIUM"
          downloads="1,085,632 Downloads"
        />
        <MobileCard
          title="Xiaomi Poco F1"
          description="BERYLLIUM"
          downloads="1,085,632 Downloads"
        />
        <MobileCard
          title="Xiaomi Poco F1"
          description="BERYLLIUM"
          downloads="1,085,632 Downloads"
        />
      </div>
    </>
  );
};

export default DevicePage;
