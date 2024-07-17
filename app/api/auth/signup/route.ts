import dbConnect from "@/lib/database";
import UserModel from "@/app/models/UserSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  await dbConnect();

  const { name, contact, email, password } = await req.json();
  try {
    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      console.log("User with email already exists");
      return NextResponse.json(
        { message: "User with email already exists" },
        { status: 400 }
      );
    }

    const existingContact = await UserModel.findOne({ contact });
    if (existingContact) {
      console.log("Contact already exists");
      return NextResponse.json(
        {
          message: "Contact already exists",
        },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      name,
      contact,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("User created successfully");
    return NextResponse.json(
      { message: "User created successfully", data: newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating user", error },
      { status: 500 }
    );
  }
}
