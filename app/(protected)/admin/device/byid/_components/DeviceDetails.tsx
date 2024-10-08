"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Device, Rom } from "@/lib/types"; // Make sure Rom type exists
import { ArrowDropDown } from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const DeviceDetails: React.FC = () => {
  const searchParams = useSearchParams();
  const deviceId = searchParams.get("id");
  const [device, setDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRom, setSelectedRom] = useState<string | null>(null);

  const toggleRomDetails = (romId: string) => {
    setSelectedRom(selectedRom === romId ? null : romId);
  };

  useEffect(() => {
    if (deviceId) {
      const fetchDevice = async () => {
        try {
          const response = await axios.get(
            `/api/admin/device/byid?id=${deviceId}`
          );
          setDevice(response.data); // Device data now includes populated ROM details
        } catch (error) {
          console.error("Failed to fetch device:", error);
          setError("Failed to fetch device");
        } finally {
          setLoading(false);
        }
      };

      fetchDevice();
    }
  }, [deviceId]);

  if (loading) return <div className="text-center text-3xl">Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-16 py-8">
      {device && (
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 flex justify-center mb-4 md:mb-0">
            <div className=" w-full border flex flex-col items-center border-gray-300 rounded-lg">
              <Image
                src={device.image}
                alt={device.name}
                width={400}
                height={350}
                className="object-contain p-6"
              />
              <Link key={device._id} href={`/admin/add_roms?id=${device._id}`}>
                <Button className="mb-6">Add ROM</Button>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-2/3 md:pl-8">
            <div className="mb-4 flex justify-start items-center gap-3">
              <h1 className="text-5xl font-bold mb-2">{device.name}</h1>
              <p className="text-sm bg-slate-200 min-w-10 text-custom font-semibold rounded-3xl px-3 ">
                {device.codeName.toUpperCase()}
              </p>
            </div>
            <p className="text-lg mb-2">
              <strong>Android Version:</strong> {device.androidVersion}
            </p>
            <p>{device.roms[2]}</p>

            {/* <div className="flex flex-col rounded-2xl">
              <div className="mt-4">
                <span className="text-gray-500">
                  Available ROMs for {device.name}
                </span>
              </div>
              <div className="mt-4">
                {device.roms.map((rom: Rom) => (
                  <div key={rom._id} className="mb-2">
                    <div
                      onClick={() => toggleRomDetails(rom._id)}
                      className="flex justify-between items-center font-semibold px-4 py-2 bg-gray-100 text-md rounded-md cursor-pointer hover:bg-gray-200 transition"
                    >
                      <span>{rom.name}</span>
                      <span className="text-green-500 text-sm p-2">
                        {rom.status} <ArrowDropDown />
                      </span>
                    </div>
                    {selectedRom === rom._id && (
                      <div className="mt-2 bg-gray-100 p-4 rounded-md">
                        <div className="text-green-600 font-bold text-sm mb-2">
                          Status: {rom.status}
                        </div>
                        <div className="text-lg font-semibold mb-2">
                          Codename: {rom.codeName}
                        </div>
                        <div className="text-sm text-gray-500 mb-2">
                          Android Version: {rom.androidVersion}
                        </div>
                        <div className="text-sm text-gray-500 mb-2">
                          Latest Release: {/* You can add release date here 
                        </div>
                        <div className="mt-2 flex space-x-4">
                          <button className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md">
                            Get {rom.name}
                          </button>
                          <button className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md">
                            Report Issue
                          </button>
                        </div>
                        <div className="mt-4 p-2 bg-yellow-100 text-yellow-800 rounded-md">
                          Installation will be done within 1-2 days
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceDetails;
