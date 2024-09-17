import { currentRole } from "@/lib/auth";
import connectMongo from "@/lib/database";
import Devices from "@/models/Devices/Devices";
import Roms from "@/models/Roms/Roms";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: ADMIN Add ROM");
  const user = await currentRole();

  try {
    await connectMongo();

    const data = await request.json();
    const { name, androidVersion } = data;

    if (user === "ADMIN") {
      const existingRom = await Roms.findOne({ name });
      if (existingRom) {
        return NextResponse.json(
          { message: "Rom already exists" },
          { status: 400 }
        );
      }
      const newDoc = new Roms({
        name,
        androidVersion,
        status: "Available",
      });
      await newDoc.save();
      return NextResponse.json({ message: "New ROM Added" }, { status: 201 });
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
