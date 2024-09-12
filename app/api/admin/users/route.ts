import { currentRole } from "@/lib/auth";
import connectMongo from "@/lib/database";
import Users from "@/models/Users";
import { NextResponse, NextRequest } from "next/server";

export const GET = async () => {
  console.log("Running GET request:ADMIN Get all Users");
  const user = await currentRole();

  try {
    await connectMongo();
    if (user === "ADMIN") {
      const docs = await Users.find().sort({
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
  console.log("Running DELETE request: ADMIN DELETE User by id");
  const user = await currentRole();

  try {
    await connectMongo();
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("id");

    if (user === "ADMIN") {
      const exisitingDoc = await Users.findOne({ _id });
      if (!exisitingDoc) {
        return NextResponse.json({ message: "No User Found" }, { status: 404 });
      }

      await Users.deleteOne({ _id });

      return NextResponse.json({ message: "User Deleted" }, { status: 201 });
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
