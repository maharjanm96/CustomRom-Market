import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/database";
import Ratings from "@/models/Ratings/Ratings";
import { currentRole } from "@/lib/auth";
import Orders from "@/models/Orders/Orders";

export async function POST(request: NextRequest) {
  console.log("Running POST Request: Add Ratings");
  const data = await request.json();
  const { rating, review } = data;
  const user = await currentRole();

  try {
    await connectMongo();
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");
    console.log("orderId:", orderId);
    const userId = searchParams.get("userId");
    console.log("User Id:", userId);
    const romId = searchParams.get("romId");

    if (user === "USER") {
      const newRating = new Ratings({
        linkedUserId: userId,
        linkedOrderId: orderId,
        linkedRomId: romId,
        rating,
        review,
      });
      await newRating.save();

      const existingOrder = await Orders.findOne({
        _id: orderId,
      });
      //console.log("Existing Order found:", existingOrder);
      if (existingOrder) {
        existingOrder.reviewed = true;
        await existingOrder.save();
      }

      return NextResponse.json(
        { message: "Rating and review updated" },
        { status: 201 }
      );
    } else {
      return NextResponse.json({ message: "Forbidden" }, { status: 400 });
    }
  } catch (error) {
    console.error("Failed to create order:", error);
    return NextResponse.json(
      { message: "Failed to create order" },
      { status: 500 }
    );
  }
}
