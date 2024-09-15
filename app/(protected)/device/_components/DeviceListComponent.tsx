"use client";
import React, { useEffect, useState } from "react";
import { Device } from "@/lib/types";
import axios from "axios";
import Link from "next/link";

const DeviceListComponent: React.FC = () => {
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
              <div className="border border-gray-300 rounded-lg p-4 shadow-md hover:border-custom transition-colors duration-300 cursor-pointer">
                <img
                  src={device.image}
                  alt={device.name}
                  className="w-full h-40 object-contain rounded-md mb-2"
                />
                <div className="flex flex-col justify-center items-center">
                  <h3 className="text-lg font-semibold mb-1">{device.name}</h3>
                  <p className="text-sm text-custom font-medium mb-1 bg-slate-200 p-1 rounded-3xl">
                    {device.codeName}
                  </p>
                  <p className="text-sm text-gray-600">
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

export default DeviceListComponent;
