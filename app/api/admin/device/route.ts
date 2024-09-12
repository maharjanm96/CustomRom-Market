import { currentRole } from "@/lib/auth";
import connectMongo from "@/lib/database";
import Devices from "@/models/Devices/Devices";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: ADMIN Add/Update Device");
  const user = await currentRole();

  try {
    const Data = await request.json();
    await connectMongo();

    if (user === "ADMIN") {
      const existingDoc = await Devices.findOne({ _id: Data?._id });
      if (existingDoc) {
        await existingDoc.updateOne(Data);
        return NextResponse.json(
          { message: "Device Updated" },
          { status: 201 }
        );
      } else {
        const newDoc = new Devices({ ...Data });
        await newDoc.save();
        return NextResponse.json(
          { message: "New Device Added" },
          { status: 201 }
        );
      }
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
  console.log("Running GET request:ADMIN Get all Devices");
  const user = await currentRole();

  try {
    await connectMongo();
    if (user === "ADMIN") {
      const docs = await Devices.find().sort({
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
  console.log("Running DELETE request: ADMIN DELETE Device by id");
  const user = await currentRole();

  try {
    await connectMongo();
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("id");

    if (user === "ADMIN") {
      const exisitingDoc = await Devices.findOne({ _id });
      if (!exisitingDoc) {
        return NextResponse.json(
          { message: "No Device Found" },
          { status: 404 }
        );
      }

      await Devices.deleteOne({ _id });

      return NextResponse.json({ message: "Device Deleted" }, { status: 201 });
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
