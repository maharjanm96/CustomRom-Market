import { currentRole } from "@/lib/auth";
import connectMongo from "@/lib/database";
import Roms from "@/models/Roms/Roms";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: ADMIN Add/Update ROM");
  const user = await currentRole();

  try {
    const data = await request.json();

    await connectMongo();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (user === "ADMIN") {
      const existingDoc = await Roms.findOne({ _id: id });
      if (existingDoc) {
        await existingDoc.updateOne(data);
        return NextResponse.json(
          { message: "ROM Updated" },
          { status: 201 }
        );
      } else {
        const newDoc = new Roms({ ...data });
        await newDoc.save();
        return NextResponse.json(
          { message: "New ROM Added" },
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
        return NextResponse.json(
          { message: "No ROM Found" },
          { status: 404 }
        );
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
