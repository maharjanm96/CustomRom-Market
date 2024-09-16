"use client";
import React, { useEffect, useState } from "react";
import { Device } from "@/lib/types";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

const DeviceCard: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get("/api/admin/device");
        setDevices(response.data);
      } catch (error) {
        console.error("Failed to fetch devices:", error);
        setError("Failed to fetch devices");
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  if (loading) return <div className="text-center text-3xl">Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="px-24">
        <div className="flex items-end justify-between my-6">
          <h2 className="text-xl font-bold">Device List</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {devices.map((device) => (
            <Link key={device._id} href={`/admin/device/byid?id=${device._id}`}>
              <div className="flex flex-col items-center justify-center border border-gray-300 rounded-lg p-4 shadow-md hover:border-custom transition-colors duration-300 cursor-pointer">
                <div className="w-48 h-40 relative mb-2 overflow-hidden">
                  <Image
                    src={device.image}
                    alt={device.name}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <div className="flex flex-col gap-2 justify-center items-center mt-4">
                  <h3 className="text-md font-semibold">{device.name}</h3>
                  <p className="text-xs font-semibold text-custom bg-slate-200 p-1 px-2 rounded-3xl">
                    {device.codeName.toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-400 pb-8">
                    Android Version: {device.androidVersion}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeviceCard;
