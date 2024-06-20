import React from "react";
import MobileCard from "./Components/MobileCard";

export default function Home() {
  return (
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
  );
}
