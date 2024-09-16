"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const AddRomComponent = () => {
  const [romName, setRomName] = useState("");
  const [androidVersion, setAndroidVersion] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        name: romName,
        androidVersion,
      };

      const response = await axios.post("/api/admin/rom", payload);

      if (response.status === 201) {
        toast.success("New ROM Added");
        setRomName("");
        setAndroidVersion("");
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
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleSubmit} className="space-y-4 ">
        <div>
          <Label htmlFor="rom-name">ROM Name</Label>
          <Input
            id="rom-name"
            type="text"
            value={romName}
            onChange={(e) => setRomName(e.target.value)}
            placeholder="Enter ROM name"
            required
          />
        </div>
        <div>
          <Label htmlFor="android-version">Android Version</Label>
          <Input
            id="android-version"
            type="text"
            value={androidVersion}
            onChange={(e) => setAndroidVersion(e.target.value)}
            placeholder="Enter Android Version"
            required
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default AddRomComponent;
