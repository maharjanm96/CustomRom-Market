"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Device } from "@/lib/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const AdminDeviceCard: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null); // To track which device we're adding ROM for
  const [romData, setRomData] = useState({
    name: "",
    androidVersion: "",
    releaseDate: "",
  }); // ROM form state

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

 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRomData({ ...romData, [e.target.name]: e.target.value });
  };

 
  const handleRomSubmit = async (deviceId: string) => {
    try {
      const response = await axios.post(
        `/api/admin/device/${deviceId}/add-rom`,
        romData
      ); 
      console.log("ROM added successfully", response.data);
      setSelectedDevice(null); 
    } catch (error) {
      console.error("Failed to add ROM:", error);
    }
  };

  if (loading) return <div className="text-center text-3xl">Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="px-24">
        <div className="flex items-end justify-between my-6">
          <h2 className="text-xl font-bold">Device List</h2>
          <Link href="/admin/device/add_device">
            <Button className="p-4">Add Device</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {devices.map((device) => (
            <div
              key={device._id}
              className="border border-gray-300 rounded-lg p-4 shadow-md hover:border-custom transition-colors duration-300"
            >
              <div className="w-full h-40 relative mb-2">
                <Image
                  src={device.image}
                  alt={device.name}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-md"
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <h3 className="text-lg font-semibold mb-1">{device.name}</h3>
                <p className="text-sm text-custom font-medium mb-1 bg-slate-200 p-1 rounded-3xl">
                  {device.codeName}
                </p>
                <p className="text-sm text-gray-600">
                  Android Version: {device.androidVersion}
                </p>
              </div>
              <Button onClick={() => setSelectedDevice(device)}>Add ROM</Button>{" "}
            </div>
          ))}
        </div>

        {selectedDevice && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md">
              <h2 className="text-xl font-bold mb-4">
                Add ROM for {selectedDevice.name}
              </h2>
              <input
                type="text"
                name="name"
                placeholder="ROM Name"
                value={romData.name}
                onChange={handleInputChange}
                className="border mb-4 p-2 w-full"
              />
              <input
                type="text"
                name="androidVersion"
                placeholder="Android Version"
                value={romData.androidVersion}
                onChange={handleInputChange}
                className="border mb-4 p-2 w-full"
              />
              <input
                type="date"
                name="releaseDate"
                placeholder="Release Date"
                value={romData.releaseDate}
                onChange={handleInputChange}
                className="border mb-4 p-2 w-full"
              />
              <div className="flex justify-between">
                <Button onClick={() => handleRomSubmit(selectedDevice._id)}>
                  Submit ROM
                </Button>
                <Button
                  onClick={() => setSelectedDevice(null)}
                  variant="secondary"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDeviceCard;
