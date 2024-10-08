import { currentRole } from "@/lib/auth";
import connectMongo from "@/lib/database";
import Devices from "@/models/Devices/Devices";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
  console.log("Running GET request: ADMIN Get Device by id");
  const user = await currentRole();

  const { searchParams } = new URL(request.url);
  const _id = searchParams.get("id");

  try {
    await connectMongo();
    if (user === "ADMIN" || user === "USER") {
      const doc = await Devices.findOne({ _id });
      if (!doc) {
        return NextResponse.json(
          { message: "No data available" },
          { status: 404 }
        );
      }
      return NextResponse.json(doc, { status: 200 });
    } else {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
