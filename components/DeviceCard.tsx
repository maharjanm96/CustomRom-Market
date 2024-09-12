"use client";
import React, { useEffect, useState } from "react";
import { Device } from "@/lib/types";
import axios from "axios";
import { Button } from "@/components/ui/button";
import AddDeviceForm from "@/app/(protected)/admin/device/add_device/_components/AddDevice";
import { currentRole } from "@/lib/auth";
import { auth } from "@/auth";
import Link from "next/link";

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
      <div className="flex justify-end mr-10">
        <Link href="/admin/device/add_device">
          {" "}
          <Button className="p-4">Add Device</Button>
        </Link>
      </div>
      <div className="px-24">
        <h2 className="text-xl font-bold mb-4">Device List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {devices.map((device, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 shadow-md hover:border-custom transition-colors duration-300"
            >
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeviceCard;
