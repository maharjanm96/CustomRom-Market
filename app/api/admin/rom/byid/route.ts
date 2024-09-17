import { currentRole } from "@/lib/auth";
import connectMongo from "@/lib/database";
import Roms from "@/models/Roms/Roms";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
  console.log("Running GET request:ADMIN Get Rom by id");
  const user = await currentRole();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    await connectMongo();
    if (user === "ADMIN" || user === "USER") {
      const doc = await Roms.findOne({ _id: id });
      return NextResponse.json(doc, { status: 201 });
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
