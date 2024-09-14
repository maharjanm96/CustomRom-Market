"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Device } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AddRomForm: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]); // To store all devices for dropdown
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>(""); // Selected device from the dropdown
  const [romData, setRomData] = useState({
    name: "",
    androidVersion: "",
    releaseDate: "",
  }); // ROM form state
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all devices when the component mounts
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

  // Handle input change for ROM form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRomData({ ...romData, [e.target.name]: e.target.value });
  };

  // Handle device selection from the dropdown
  const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDeviceId(e.target.value);
  };

  // Handle form submit to add ROM to the selected device
  const handleRomSubmit = async () => {
    if (!selectedDeviceId) {
      alert("Please select a device");
      return;
    }

    try {
      const response = await axios.post(
        `/api/admin/device/add_rom/${selectedDeviceId}`,
        romData
      ); // API call to add ROM
      console.log("ROM added successfully", response.data);
      toast.success("ROM added")
      setRomData({ name: "", androidVersion: "", releaseDate: "" }); // Clear form after submission
      setSelectedDeviceId(""); // Reset selected device
    } catch (error) {
      console.error("Failed to add ROM:", error);
      toast.error("Failed to add ROM")
    }
  };

  if (loading) return <div className="text-center text-3xl">Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-6">Add ROM</h2>

      {/* Device Selection Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Device
        </label>
        <select
          value={selectedDeviceId}
          onChange={handleDeviceChange}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="">Select a device</option>
          {devices.map((device) => (
            <option key={device._id} value={device._id}>
              {device.name} ({device.codeName})
            </option>
          ))}
        </select>
      </div>

      {/* ROM Details Form */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ROM Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="ROM Name"
          value={romData.name}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Android Version
        </label>
        <input
          type="text"
          name="androidVersion"
          placeholder="Android Version"
          value={romData.androidVersion}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Release Date
        </label>
        <input
          type="date"
          name="releaseDate"
          value={romData.releaseDate}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <Button
        onClick={handleRomSubmit}
        className="p-4 bg-blue-500 text-white rounded-md"
      >
        Add ROM
      </Button>
    </div>
  );
};

export default AddRomForm;
