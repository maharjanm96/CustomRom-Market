"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Device, Rom } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Select, { MultiValue, ActionMeta } from "react-select"; // Import required types

interface SelectOption {
  value: string;
  label: string;
}

const AddRomForm: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [roms, setRoms] = useState<Rom[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");
  const [selectedRoms, setSelectedRoms] = useState<SelectOption[]>([]);
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

  // Fetch ROMs when the component mounts or when a device is selected
  useEffect(() => {
    const fetchRoms = async () => {
      try {
        const response = await axios.get(`/api/admin/rom`);
        setRoms(response.data);
      } catch (error) {
        console.error("Failed to fetch ROMs:", error);
        setError("Failed to fetch ROMs");
      }
    };

    fetchRoms();
  }, [selectedDeviceId]);

  // Handle device selection from the dropdown
  const handleDeviceChange = (selectedOption: any) => {
    setSelectedDeviceId(selectedOption.value);
    setSelectedRoms([]); // Reset selected ROMs when device changes
  };

  // Handle ROM selection from the dropdown
  const handleRomChange = (
    newValue: MultiValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>
  ) => {
    // Convert readonly array to mutable array
    setSelectedRoms(Array.isArray(newValue) ? newValue : []);
  };

  const handleRomSubmit = async () => {
    if (!selectedDeviceId || selectedRoms.length === 0) {
      toast.error("Please select a device and ROMs");
      return;
    }

    try {
      const roms = selectedRoms.map((rom) => rom.value);
      const response = await axios.post(
        `/api/admin/device/add_rom?id=${selectedDeviceId}`,
        { roms }
      );
      toast.success("ROMs added");
      setSelectedRoms([]); // Clear selected ROMs
      setSelectedDeviceId(""); // Reset selected device
    } catch (error) {
      console.error("Failed to add ROMs:", error);
      toast.error("Failed to add ROMs");
    }
  };

  if (loading) return <div className="text-center text-3xl">Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-8 ">
      <h2 className="text-xl font-bold mb-6">Add ROMs to Device</h2>

      {/* Device Selection Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Device
        </label>
        <Select
          options={devices.map((device) => ({
            value: device._id,
            label: `${device.name} (${device.codeName})`,
          }))}
          onChange={handleDeviceChange}
          placeholder="Select a device"
        />
      </div>

      {/* ROM Selection Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select ROMs
        </label>
        <Select
          options={roms.map((rom) => ({
            value: rom.name,
            status: rom.status,
            label: `${rom.name}`,
          }))}
          onChange={handleRomChange}
          isMulti
          placeholder="Select ROMs"
        />
      </div>

      <Button
        onClick={handleRomSubmit}
        // onClick={() => {
        //   console.log(selectedDeviceId, selectedRoms);
        // }}
        className="p-4 bg-blue-500 text-white rounded-md w-full"
      >
        Add ROMs
      </Button>
    </div>
  );
};

export default AddRomForm;
