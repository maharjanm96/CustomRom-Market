import { currentRole } from "@/lib/auth";
import connectMongo from "@/lib/database";
import Orders from "@/models/Orders/Orders";
import Devices from "@/models/Devices/Devices";
import Roms from "@/models/Roms/Roms";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
  console.log("Running GET request: Get Orders with device and ROM details");
  const user = await currentRole();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id"); // Get user ID from query parameters

  try {
    await connectMongo();

    if (user === "ADMIN" || (user === "USER" && userId)) {
      // Fetch orders by user ID
      const orders = await Orders.find({ linkedUserId: userId });

      if (!orders.length) {
        return NextResponse.json(
          { message: "No orders found" },
          { status: 404 }
        );
      }

      // Enrich the orders with device and ROM details
      const enrichedOrders = await Promise.all(
        orders.map(async (order) => {
          try {
            // Fetch the device details
            const device = await Devices.findOne({ _id: order.linkedDeviceId });
            // Fetch the ROM details
            const rom = await Roms.findOne({ _id: order.linkedRomId });

            return {
              ...order._doc, // Spread order fields
              deviceName: device?.name || "Unknown Device", // Fallback if not found
              deviceImage: device?.image || "/default-image.png", // Fallback if not found
              romName: rom?.name || "Unknown ROM", // Fallback if not found
            };
          } catch (err) {
            console.error(`Error enriching order ${order._id}:`, err);
            return order; // If enrichment fails, return the order without enrichment
          }
        })
      );

      return NextResponse.json(enrichedOrders, { status: 200 });
    } else {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
};
