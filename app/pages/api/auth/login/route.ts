import dbConnect from "@/app/utils/database";
import UserModel from "@/app/models/UserSchema";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { setCookie } from "cookies-next";

const JWT_SECRET = "x8Xs9df5svg5j5iuksa551sa12c312a6X";

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

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log("Login Success", "token:", token);

    // Create a response and set a cookie with the user ID
    const response = NextResponse.json(
      { message: "Login Success" },
      { status: 200 }
    );
    response.headers.set("Authorization", `Bearer ${token}`);

    // Set the user ID cookie
    setCookie("userID", user._id.toString(), {
      req,
      res: response,
      maxAge: 60 * 60 * 24 * 7,
    }); // 1 week expiry

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
