"use client";
import React, { useState } from "react";
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
import { useRouter } from "next/navigation";

const deviceSchema = z.object({
  name: z
    .string()
    .min(1, "Device Name is required")
    .max(40, "Device Name is too long"),
  codeName: z
    .string()
    .min(1, "Code Name is required")
    .max(20, "Code Name is too long")
    .regex(/^[a-zA-Z]+$/, "Code Name must only contain letters"),
  androidVersion: z
    .string()
    .min(1, "Android Version is required")
    .regex(/^[0-9]+$/, "Android Version must only contain numbers")
    .max(2, "Exceeds more than 2 characters"),
  image: z.string().url().optional(),
});

type DeviceFormData = z.infer<typeof deviceSchema>;

const DeviceForm = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const form = useForm<DeviceFormData>({
    resolver: zodResolver(deviceSchema),
    defaultValues: {
      name: "",
      codeName: "",
      androidVersion: "",
      image: "",
    },
  });

  const onSubmit = async (data: DeviceFormData) => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/device`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      toast.success("Device Added successfully!");
      router.push("/admin/device");
    } catch (err: any) {
      setLoading(false);
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        toast.error("Failed to add device!");
      }
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white p-4 rounded-lg shadow-xl w-1/3 mt-10">
        <Form {...form}>
          <FormLabel className="flex justify-start text-2xl font-bold">
            Add Device
          </FormLabel>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Device Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nothing Phone"
                      {...field}
                      className="w-full"
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
                      {...field}
                      className="w-full"
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
                    <Input placeholder="14" {...field} className="w-full" />
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
            <Button className="w-full" size="lg" disabled={loading}>
              {loading ? "Adding..." : "Add Device"}
            </Button>
            {message && <p className="text-red-500">{message}</p>}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default DeviceForm;
