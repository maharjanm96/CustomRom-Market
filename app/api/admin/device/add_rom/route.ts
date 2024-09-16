import { currentRole } from "@/lib/auth";
import connectMongo from "@/lib/database";
import Devices from "@/models/Devices/Devices";
import Roms from "@/models/Roms/Roms";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Add ROMs to Device");
  const user = await currentRole();

  try {
    const { searchParams } = new URL(request.url);
    const deviceId = searchParams.get("id");

    const data = await request.json();
    const { roms } = data;

    console.log("deviceId:", deviceId);
    console.log("roms:", roms);

    await connectMongo();

    if (user === "ADMIN") {
      // Update the device, adding ROMs to the roms array without duplicates
      const updatedData = await Devices.updateOne(
        { _id: deviceId }, // Use the deviceId from the URL
        { $addToSet: { roms: { $each: roms } } } // Add each ROM ID, ensuring no duplicates
      );

      if (updatedData.matchedCount > 0) {
        return NextResponse.json(
          { message: "ROMs successfully added to the device" },
          { status: 201 }
        );
      } else {
        return NextResponse.json(
          { message: "Device not found" },
          { status: 404 }
        );
      }
    } else {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};

export const GET = async () => {
  console.log("Running GET request:ADMIN Get all Roms");
  const user = await currentRole();

  try {
    await connectMongo();
    if (user === "ADMIN" || user === "USER") {
      const docs = await Roms.find().sort({
        createdDate: -1,
      });
      return NextResponse.json(docs, { status: 201 });
    } else {
      return NextResponse.json({ message: "Forbidden" }, { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};

export const DELETE = async (request: NextRequest) => {
  console.log("Running DELETE request: ADMIN DELETE ROM by id");
  const user = await currentRole();

  try {
    await connectMongo();
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("id");

    if (user === "ADMIN") {
      const exisitingDoc = await Roms.findOne({ _id });
      if (!exisitingDoc) {
        return NextResponse.json({ message: "No ROM Found" }, { status: 404 });
      }

      await Roms.deleteOne({ _id });

      return NextResponse.json({ message: "ROM Deleted" }, { status: 201 });
    } else {
      return NextResponse.json({ message: "Forbidden" }, { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
