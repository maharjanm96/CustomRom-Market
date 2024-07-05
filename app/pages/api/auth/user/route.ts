import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/app/models/UserSchema";

const getSingleUserDetails = async (req: NextRequest) => {
  const userID = req.nextUrl.searchParams.get("userID");

  try {
    const user = await UserModel.findOne({ _id: userID }, { password: 0 });
    if (user) {
      return NextResponse.json(user);
    } else {
      return NextResponse.json("Data Not Found", { status: 404 });
    }
  } catch (err) {
    console.error("Something Went Wrong....", err);
    return NextResponse.json(
      { message: "Something Went Wrong", error: err },
      { status: 500 }
    );
  }
};

export const GET = getSingleUserDetails;
