import MobileCard from "@/app/Components/MobileCard";
import React from "react";
import Search from "@/app/Components/Search";
const DevicePage = () => {
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
