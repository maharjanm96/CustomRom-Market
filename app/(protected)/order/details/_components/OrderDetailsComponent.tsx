"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Order {
  _id: string;
  status: string;
  address: string;
  totalAmount: string;
  contact: string;
  deviceName: string;
  deviceImage: string;
  romName: string;
  romId: string;
  reviewed: boolean;
}

const OrderDetails = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user && user.id) {
          // Only fetch if user and user.id are defined
          console.log("Fetching orders for user ID:", user.id); // Log only when user.id is available
          const response = await axios.get(`/api/order/byid?id=${user.id}`);
          console.log(response.data);
          setOrders(response.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders");
      } finally {
        setLoading(false); // Set loading to false after the fetch attempt
      }
    };

    if (user && user.id) {
      // This ensures that the fetch function only runs when user.id is defined
      fetchOrders();
    }
  }, [user]); // Only run the effect when `user` changes

  const handleClickReview = async (orderId: string, romId: string) => {
    if (user && user.id) {
      router.push(
        `/order/ratings?orderId=${orderId}&userId=${user.id}&romId=${romId}`
      );
    } else {
      console.log("No IDs found for this user.");
    }
  };

  if (loading) {
    return <div className="text-center font-semibold text-2xl">Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="px-28">
      <Table>
        <TableCaption>A list of your recent orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Device</TableHead>
            <TableHead>Rom</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>
                  <div className="flex items-center">
                    <Image
                      src={order.deviceImage}
                      alt={order.deviceName}
                      width={50}
                      height={50}
                      objectFit="contain"
                      className="rounded-md"
                    />
                    <span className="ml-2">{order.deviceName}</span>
                    {/* Add margin for text spacing */}
                  </div>
                </TableCell>
                <TableCell>{order.romName}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{order.contact}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>Rs.{order.totalAmount}</TableCell>
                <TableCell>
                  {order.status === "Completed" ? (
                    order.reviewed ? (
                      <span className="text-gray-500">Reviewed</span>
                    ) : (
                      <Button
                        onClick={() =>
                          handleClickReview(order._id, order.romId)
                        }
                      >
                        Review
                      </Button>
                    )
                  ) : order.status === "Pending" ? (
                    <span className="text-yellow-500">Pending</span>
                  ) : null}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderDetails;
