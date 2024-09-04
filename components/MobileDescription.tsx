
"use client";
import React from "react";
import Image from "next/image";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import { useState } from "react";
import { ArrowDropDown } from "@mui/icons-material";

const MobileDescription = () => {
  const roms = ["PixelOS", "crDroid", "Evolution X", "Stock ROM"];
  const [selectedRom, setSelectedRom] = useState<string | null>(null);

  const toggleRomDetails = (rom: string) => {
    setSelectedRom(selectedRom === rom ? null : rom);
  };

  return (
    <div className="flex flex-row justify-evenly items-start p-8">
      <div className="flex flex-col items-center">
        <Image
          src="/assets/poco.jpg"
          alt="Google Pixel 5a"
          width={200}
          height={200}
          className="rounded-md"
        />
        <div className="flex space-x-2 mt-4">
          <button className="flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-md">
            <InfoOutlinedIcon style={{ fontSize: 20 }} />
            <span className="ml-2">Device Info</span>
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-md">
            <DescriptionOutlinedIcon style={{ fontSize: 20 }} />
            <span className="ml-2">Install Guide</span>
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-md">
            <BuildOutlinedIcon style={{ fontSize: 20 }} />
            <span className="ml-2">Build Guide</span>
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="text-5xl font-bold">
          Xiaomi Poco F1{" "}
          <span className="text-blue-500 border-2 bg-gray-200 rounded-xl text-sm px-2">
            BERYLLIUM
          </span>
        </h1>

        <div className="flex items-center mt-4">
          <span className="text-gray-500">
            Available ROMs for Xiaomi Poco F1
          </span>
        </div>
        <div className="flex flex-col rounded-2xl mt-4">
          {roms.map((rom) => (
            <div key={rom} className="mb-2">
              <div
                onClick={() => toggleRomDetails(rom)}
                className="flex justify-between items-center font-semibold px-4 py-2 bg-gray-100 text-md rounded-md cursor-pointer"
              >
                <span>{rom}</span>
                <span className="text-green-500 text-sm p-2">
                  Available <ArrowDropDown />
                </span>
              </div>
              {selectedRom === rom && (
                <div className="mt-2 bg-gray-100 p-4 rounded-md">
                  <div className="text-green-600 font-bold text-sm mb-2">
                    Status: Available
                  </div>
                  <div className="text-lg font-semibold mb-2">
                    Codename : beryllium
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    Android Version: 14
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    Latest Release : 29 May 2024
                  </div>
                  <div className="mt-2 flex space-x-4">
                    <button className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md">
                      Get {rom}
                    </button>
                    <button className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md">
                      Report Issue
                    </button>
                  </div>
                  <div className="mt-4 p-2 bg-yellow-100 text-yellow-800 rounded-md ">
                    Installation will be done within 1-2 days
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileDescription;
