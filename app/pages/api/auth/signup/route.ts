import dbConnect from "@/app/utils/database";
import UserModel from "@/app/models/UserSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  await dbConnect();

  const { email, password } = await req.json();

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    console.log("User already exists");
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new UserModel({
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    console.log("User created successfully");
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    );
  }
}
