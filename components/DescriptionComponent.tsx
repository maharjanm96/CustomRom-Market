"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Device, Rom } from "@/lib/types";
import { ArrowDropDown } from "@mui/icons-material";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

const DeviceDetails = () => {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const deviceId = searchParams.get("id");
  const [device, setDevice] = useState<Device | null>(null);
  const [roms, setRoms] = useState<Rom[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRom, setSelectedRom] = useState<string | null>(null);
  const router = useRouter();

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
          setDevice(response.data);

          // Fetch ROM details
          const romIds = response.data.roms || [];
          if (romIds.length > 0) {
            const romsResponse = await Promise.all(
              romIds.map((id: string) =>
                axios.get(`/api/admin/rom/byid?id=${id}`)
              )
            );

            setRoms(romsResponse.map((res) => res.data));
          }
        } catch (error) {
          console.error("Failed to fetch device or ROM details:", error);
          setError("Failed to fetch device or ROM details");
        } finally {
          setLoading(false);
        }
      };

      fetchDevice();
    }
  }, [deviceId]);

  const handleGetOrder = (romId: string) => {
    router.push(`/order?userid=${user.id}&romid=${romId}&deviceid=${deviceId}`);
  };

  if (loading) return <div className="text-center text-3xl">Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-16 py-8">
      {device && (
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 flex justify-center mb-4 md:mb-0">
            <div className="w-full border flex flex-col items-center border-gray-300 rounded-lg">
              <Image
                src={device.image}
                alt={device.name}
                width={400}
                height={350}
                className="object-contain p-6"
              />
            </div>
          </div>
          <div className="w-full md:w-2/3 md:pl-8">
            <div className="mb-4 flex justify-start items-center gap-3">
              <h1 className="text-4xl font-bold mb-2">{device.name}</h1>
              <p className="text-sm bg-slate-200 min-w-10 text-custom font-semibold rounded-3xl px-3 ">
                {device.codeName.toUpperCase()}
              </p>
            </div>
            <p className="text-md">
              <strong>Android Version:</strong> {device.androidVersion}
            </p>

            <div className="flex flex-col rounded-2xl">
              <div className="mt-2">
                <span className="text-gray-500 text-sm">
                  Available ROMs for {device.name}
                </span>
              </div>
              <div className="mt-4">
                {roms.map((rom) => (
                  <div key={rom._id} className="mb-2">
                    <div
                      onClick={() => toggleRomDetails(rom._id)}
                      className="flex justify-between items-center font-semibold px-4 py-2 bg-gray-100 text-md rounded-md cursor-pointer hover:bg-gray-200 transition"
                    >
                      <span>{rom.name}</span>
                      <span className="text-green-500 text-sm p-2">
                        Available <ArrowDropDown />
                      </span>
                    </div>
                    {selectedRom === rom._id && (
                      <div className="mt-2 bg-gray-100 p-4 rounded-md">
                        <div className="text-green-600 font-bold text-sm mb-2">
                          Status: {rom.status}
                        </div>
                        <div className="text-sm text-gray-500 mb-2">
                          Android Version: {rom.androidVersion}
                        </div>
                        <div className="mt-2 flex space-x-4">
                          <button
                            onClick={() => handleGetOrder(rom._id)}
                            className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md"
                          >
                            Get {rom.name}
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceDetails;
