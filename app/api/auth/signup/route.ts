import Users from "@/models/Users";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectMongo from "@/lib/database";

export async function POST(req: NextRequest) {
  console.log("Running post request: Signup");

  try {
    const { name, contact, email, password } = await req.json();

    await connectMongo();
    console.log("MongoDB connected");

    const existingUser = await Users.findOne({
      $or: [{ email }, { contact }],
    });

    if (existingUser) {
      console.log("Already Exists");
      return NextResponse.json({ message: "Already Exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({
      name,
      contact,
      email,
      password: hashedPassword,
      userType: "ADMIN",
    });

    try {
      await newUser.save();
      console.log("New user added");

      return NextResponse.json(
        { message: "Signup Successful!" },
        { status: 201 }
      );
    } catch (error) {
      console.error("User creation failed", error);
      return NextResponse.json(
        { error: "User creation failed" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("An error occurred", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
