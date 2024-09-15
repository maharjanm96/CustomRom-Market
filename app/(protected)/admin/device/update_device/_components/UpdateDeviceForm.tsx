"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

const deviceSchema = z.object({
  name: z
    .string()
    .min(1, "Device Name is required")
    .max(20, "Device Name is too long"),
  codeName: z
    .string()
    .min(1, "Code Name is required")
    .max(12, "Code Name is too long")
    .regex(/^[a-zA-Z]+$/, "Code Name must only contain letters"),
  androidVersion: z
    .string()
    .min(1, "Android Version is required")
    .regex(/^[0-9]+$/, "Android Version must only contain numbers")
    .max(2, "Exceeds more than 2 characters"),
  image: z.string().url().optional(),
});

type UpdateDeviceFormData = z.infer<typeof deviceSchema>;

const UpdateDeviceForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<UpdateDeviceFormData>({
    resolver: zodResolver(deviceSchema),
    defaultValues: {
      name: "",
      codeName: "",
      androidVersion: "",
      image: "",
    },
  });

  useEffect(() => {
    const fetchDeviceData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/admin/device/byid?id=${id}`);
        form.reset({
          name: response.data.name,
          codeName: response.data.codeName,
          androidVersion: response.data.androidVersion,
          image: response.data.image || "",
        });
      } catch (error) {
        console.error("Failed to fetch device data:", error);
        setError("Failed to fetch device data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDeviceData();
    }
  }, [id, form]);

  const handleUpdate = async (data: UpdateDeviceFormData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`/api/admin/device?id=${id}`, data);
      console.log(data);
      if (response.status === 201) {
        toast.success("Device updated successfully!");
        router.push("/admin/device");
      } else {
        toast.error("Failed to update the device");
      }
    } catch (error) {
      console.error("Error updating device:", error);
      toast.error("An error occurred while updating the device");
      setError("An error occurred while updating the device");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white p-4 sm:p-12 md:p-8 rounded-lg shadow-lg w-full max-w-lg mx-auto">
        <Form {...form}>
          <FormLabel className="text-xl sm:text-2xl font-bold py-1">
            Update Device
          </FormLabel>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Device Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Pocophone F1"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="codeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="beryllium"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="androidVersion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Android Version</FormLabel>
                  <FormControl>
                    <Input placeholder="14" className="w-full" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
              <Button
                type="button"
                className="w-full sm:w-auto"
                onClick={() => router.push("/admin/device")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </Button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateDeviceForm;
