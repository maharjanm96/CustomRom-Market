"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Device, Rom } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const AddRomComponent: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [roms, setRoms] = useState<Rom[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");
  const [selectedRom, setSelectedRom] = useState<string | null>(null); // Single ROM
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Fetch devices
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

  // Fetch ROMs
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

  // Handle device selection
  const handleDeviceChange = (value: string) => {
    setSelectedDeviceId(value);
    setSelectedRom(null); // Reset ROM selection when device changes
  };

  // Handle ROM selection
  const handleRomChange = (value: string) => {
    setSelectedRom(value); // Single selection
  };


  const handleRomSubmit = async () => {
    if (!selectedDeviceId) {
      toast.error("Please select a device.");
      return;
    }

    if (!selectedRom) {
      toast.error("Please select a ROM.");
      return;
    }

    setIsSubmitting(true); // Disable the button and show loading state
    try {
      await axios.post(`/api/admin/device/add_rom?id=${selectedDeviceId}`, {
        roms: [selectedRom], // Single ROM in an array
      });
      toast.success("ROM added successfully!");
      setSelectedRom(null);
      setSelectedDeviceId("");
    } catch (error) {
      console.error("Failed to add ROM:", error);
      toast.error("Failed to add ROM.");
    } finally {
      setIsSubmitting(false); // Re-enable the button
    }
  };

  if (loading)
    return <div className="text-center text-2xl font-semibold">Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex w-full flex-row justify-center items-center">
      <div className="p-8 font-medium w-1/3 h-auto space-y-8 shadow-2xl rounded-lg mt-32">
        <h2 className="text-xl font-bold mb-6">Add ROM to Device</h2>

        {/* Device Selection Dropdown */}
        <div className="mb-4">
          <Label htmlFor="device">Select Device</Label>
          <Select onValueChange={handleDeviceChange}>
            <SelectTrigger id="device">
              <SelectValue placeholder="Select a device" />
            </SelectTrigger>
            <SelectContent>
              {devices.map((device) => (
                <SelectItem key={device._id} value={device._id}>
                  {device.name} ({device.codeName})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* ROM Selection Dropdown */}
        <div className="mb-4">
          <Label htmlFor="roms">Select ROM</Label>
          <Select onValueChange={handleRomChange}>
            <SelectTrigger id="roms">
              <SelectValue
                placeholder={
                  selectedRom
                    ? roms.find((rom) => rom._id === selectedRom)?.name
                    : "Select a ROM"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {roms.map((rom) => (
                <SelectItem key={rom._id} value={rom._id}>
                  {rom.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleRomSubmit}
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add ROM"}
        </Button>
      </div>
    </div>
  );
};

export default AddRomComponent;
