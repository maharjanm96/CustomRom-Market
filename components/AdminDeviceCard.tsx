"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Device, Rom } from "@/lib/types"; // Assuming Rom type is already defined
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AlertBox from "./DeleteAlertBox";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

const AdminDeviceCard = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [romDetails, setRomDetails] = useState<Record<string, Rom>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get("/api/admin/device");
        setDevices(response.data);
      } catch (error) {
        console.error("Failed to fetch devices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  useEffect(() => {
    const fetchRomDetails = async (romIds: string[]) => {
      try {
        const romsResponse = await Promise.all(
          romIds.map((id) => axios.get(`/api/admin/rom/byid?id=${id}`))
        );

        const roms = romsResponse.reduce((acc, response) => {
          const rom = response.data;
          acc[rom._id] = rom;
          return acc;
        }, {} as Record<string, Rom>);

        setRomDetails((prevRomDetails) => ({ ...prevRomDetails, ...roms }));
      } catch (error) {
        console.error("Failed to fetch ROM details:", error);
      }
    };

    // Fetch ROM details for all devices' ROMs
    const allRomIds = devices.flatMap((device) => device.roms || []);
    if (allRomIds.length > 0) {
      fetchRomDetails(allRomIds);
    }
  }, [devices]);

  const handleUpdateClick = (deviceId: string) => {
    router.push(`device/update_device?id=${deviceId}`);
  };

  const handleClickDelete = async (deviceId: string) => {
    try {
      const response = await axios.delete(`/api/admin/device?id=${deviceId}`);

      if (response.status === 201) {
        toast.success("Deleted Successfully!");
        router.refresh();
      } else {
        toast.error("Failed to delete the device");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  if (loading)
    return <div className="text-center font-bold text-2xl">Loading...</div>;

  return (
    <div className="px-24">
      <div className="px-20">
        <div className="flex items-center justify-between my-6">
          <h2 className="text-xl font-bold">Device List</h2>
          <div className="flex gap-4">
            <Link href="/admin/device/add_device">
              <Button className="p-4">Add Device</Button>
            </Link>
            <Link href="/admin/add_roms">
              <Button>Add ROMs</Button>
            </Link>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Device Name</TableHead>
              <TableHead>Code Name</TableHead>
              <TableHead>Roms</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {devices.map((device) => (
              <TableRow key={device._id}>
                <TableCell>
                  <Image
                    src={device.image}
                    alt={device.name}
                    width={64}
                    height={64}
                    className="object-contain rounded-md"
                  />
                </TableCell>
                <TableCell>{device.name}</TableCell>
                <TableCell>{device.codeName}</TableCell>
                <TableCell>
                  {device.roms && device.roms.length > 0 ? (
                    device.roms.map((romId) => (
                      <div key={romId}>
                        {romDetails[romId] ? (
                          <div>
                            <p>{romDetails[romId].name}</p>
                            {/* <p>Version: {romDetails[romId].androidVersion}</p> */}
                          </div>
                        ) : (
                          <p>Loading ROM details...</p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No ROMs available</p>
                  )}
                </TableCell>
                <TableCell className=" flex gap-4 items-center">
                  <Button onClick={() => handleUpdateClick(device._id)}>
                    Update
                  </Button>

                  <AlertBox
                    name={"Delete"}
                    description="This action cannot be undone. This will permanently delete the item "
                    handleClick={handleClickDelete}
                    deviceId={device._id}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminDeviceCard;
