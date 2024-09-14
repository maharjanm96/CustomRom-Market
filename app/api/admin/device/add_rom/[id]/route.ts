import connectMongo from "@/lib/database";
import Devices from "@/models/Devices/Devices";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const { name, androidVersion, releaseDate } = await request.json(); 

  try {
    await connectMongo();
    const device = await Devices.findById(id);
    console.log(device)

    if (device) {
      // Add ROM to the device's ROMs array
      device.roms.push({ name, androidVersion, releaseDate });
      await device.save();

      return NextResponse.json({ message: "ROM added successfully!" });
    } else {
      return NextResponse.json({ message: "Device not found" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to add ROM" });
  }
};
