import dbConnect from "@/lib/database";
import UserModel from "@/app/models/UserSchema";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { email, password } = await req.json();

    const user = await UserModel.findOne({ email });

    if (!user) {
      console.log("User not found");
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      console.log("Password Invalid");
      return NextResponse.json(
        { message: "Invalid Password" },
        { status: 400 }
      );
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY!, {
      expiresIn: "7d",
    });

    console.log("Login Success", "token:", token);

    return NextResponse.json({ message: "Login Success" }, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
