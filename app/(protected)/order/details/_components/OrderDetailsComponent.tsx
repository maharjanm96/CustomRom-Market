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

interface Order {
  _id: string;
  status: string;
  address: string;
  totalAmount: string;
  contact: string;
  deviceName: string;
  deviceImage: string;
  romName: string;
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
          const response = await axios.get(`/api/order/byid?id=${user.id}`);
          console.log(response.data);
          setOrders(response.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const handleClickReview = (orderId: string) => {
    if (user && user.id) {
      router.push(`/order/ratings?orderId=${orderId}&userId=${user.id}`);
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
                  <img
                    src={order.deviceImage}
                    alt={order.deviceName}
                    width={50}
                  />
                  {order.deviceName}
                </TableCell>
                <TableCell>{order.romName}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{order.contact}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>Rs.{order.totalAmount}</TableCell>
                <TableCell>
                  {order.status === "Completed" ? (
                    <Button onClick={() => handleClickReview(order._id)}>
                      Review
                    </Button>
                  ) : (
                    ""
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={10} className="text-center">
                {orders.length === 0 && loading
                  ? " No orders found"
                  : "Loading..."}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderDetails;
