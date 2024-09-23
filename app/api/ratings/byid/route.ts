import { currentRole } from "@/lib/auth";
import connectMongo from "@/lib/database";
import Ratings from "@/models/Ratings/Ratings";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
  console.log("Running GET request: ADMIN Get Ratings by id");
  const user = await currentRole();

  const { searchParams } = new URL(request.url);
  const romId = searchParams.get("romId");

  try {
    await connectMongo();
    if (user === "ADMIN" || user === "USER") {
      // Fetch ratings linked to the specific romId
      const docs = await Ratings.find({ linkedRomId: romId });
      return NextResponse.json(docs, { status: 200 });
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
