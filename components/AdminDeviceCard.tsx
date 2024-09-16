"use client";
import React, { useEffect, useState } from "react";
import { Device } from "@/lib/types";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import AlertBox from "./DeleteAlertBox";
import { useRouter } from "next/navigation";
import Image from "next/image";

const AdminDeviceCard = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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

  if (loading) return <div className="text-center text-3xl">Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="px-24">
      <div className="flex items-end justify-between my-6">
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
        <TableCaption>A list of all devices</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Device Name</TableHead>
            <TableHead>Code Name</TableHead>
            <TableHead>Roms</TableHead>
            <TableHead>Details</TableHead>
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
              <TableCell>{device.roms}</TableCell>
              <TableCell>
                <Link href={`/admin/device/byid?id=${device._id}`}>
                  <Button variant="link">View Details</Button>
                </Link>
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
  );
};

export default AdminDeviceCard;
