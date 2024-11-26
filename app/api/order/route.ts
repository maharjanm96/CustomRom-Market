import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/database";
import Orders from "@/models/Orders/Orders";
import { currentRole } from "@/lib/auth";
import Devices from "@/models/Devices/Devices";
import Roms from "@/models/Roms/Roms";
import Users from "@/models/Users";

export async function POST(request: NextRequest) {
  console.log("Running POST Request: Add/Update Orders");
  const data = await request.json();
  const { deviceId, romId, userId, address, contact, totalAmount } = data;
  const user = await currentRole();

  try {
    await connectMongo();
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("id");
    console.log("orderId:", orderId);

    if (user === "ADMIN" || user === "USER") {
      const existingDoc = await Orders.findOne({ _id: orderId });
      if (existingDoc) {
        await existingDoc.updateOne(data);
        return NextResponse.json({ message: "Order Updated" }, { status: 201 });
      } else {
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
        const existingRom = await Roms.findOne({ _id: romId });
        if (existingRom) {
          let sold = existingRom.sold || 0; // Initialize 'sold' with the current value or default to 0
          existingRom.sold = sold + 1;
          await existingRom.save();
        }
        console.log(newOrder);
        return NextResponse.json(
          { message: "Order Placed", newOrder },
          { status: 201 }
        );
      }
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

export const GET = async () => {
  console.log("Running GET request: ADMIN Get all Orders");
  const user = await currentRole();

  try {
    await connectMongo();

    if (user === "ADMIN") {
      const orders = await Orders.find().sort({ orderDate: -1 });

      const enrichedOrders = await Promise.all(
        orders.map(async (order) => {
          try {
            // Fetch the device details based on linkedDeviceId
            const device = await Devices.findOne({ _id: order.linkedDeviceId });
            const existingUser = await Users.findOne({
              _id: order.linkedUserId,
            });
            // Fetch the ROM details based on linkedRomId
            const rom = await Roms.findOne({ _id: order.linkedRomId });

            // Return enriched order with additional device and ROM details
            return {
              ...order._doc, // Spread order fields
              deviceName: device?.name || "Unknown Device", // Fallback if not found
              deviceImage: device?.image || "/default-image.png", // Fallback if not found
              romName: rom?.name || "Unknown ROM", // Fallback if not found
              userName: existingUser?.name || "",
            };
          } catch (err) {
            console.error(`Error enriching order ${order._id}:`, err);
            return order; // If enrichment fails, return the original order without enrichment
          }
        })
      );

      // Return enriched orders
      return NextResponse.json(enrichedOrders, { status: 201 });
    } else {
      // If the user is not an ADMIN, return forbidden message
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
