import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/database";
import Orders from "@/models/Orders/Orders";

export async function POST(request: NextRequest) {
  const { deviceId, romId, userId, address, contact, totalAmount } =
    await request.json();

  if (!deviceId || !romId || !userId || !address) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    await connectMongo();

    const newOrder = new Orders({
      linkedUserId: userId,
      linkedDeviceId: deviceId,
      linkedRomId: romId,
      address,
      contact,
      status: "Pending",
      totalAmount,
    });

    await newOrder.save();

    return NextResponse.json({ message: "Order Placed" }, { status: 201 });
  } catch (error) {
    console.error("Failed to create order:", error);
    return NextResponse.json(
      { message: "Failed to create order" },
      { status: 500 }
    );
  }
}
