"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";

const formSchema = z.object({
  romName: z.string().min(1, { message: "ROM name is required" }),
  androidVersion: z.string().min(2, { message: "Android version is required" }),
});

const AddRomComponent = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      romName: "",
      androidVersion: "",
    },
  });

  // Handle form submission
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    try {
      const payload = {
        name: values.romName,
        androidVersion: values.androidVersion,
      };

      const response = await axios.post("/api/admin/rom", payload);

      if (response.status === 201) {
        toast.success("New ROM Added");
        form.reset();
      }
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 400) {
          toast.error(data.message || "ROM already exists");
        } else {
          toast.error("Failed Adding ROM");
        }

        console.error("Error adding ROM:", data.message || error.message);
      } else {
        toast.error("Failed Adding ROM");
        console.error("Error adding ROM:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="rounded-lg shadow-xl p-8 w-2/6">
        <span className="text-xl font-bold">Add a Rom</span>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="romName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ROM Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter ROM name"
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
                    <Input
                      placeholder="Enter Android version"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddRomComponent;
