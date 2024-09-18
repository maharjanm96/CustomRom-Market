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

interface Order {
  id: string;
  status: string;
  address: string;
  totalAmount: string;
  contact: string;
  deviceName: string;
  deviceImage: string;
  romName: string;
}

const OrderDetails = () => {
  const { user } = useAuth(); // Get the current user
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user && user.id) {
          const response = await axios.get(`/api/order/byid?id=${user.id}`);
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
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <TableRow key={order.id}>
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
                <TableCell className="text-right">
                  Rs.{order.totalAmount}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                {orders.length === 0 && !loading
                  ? "Loading..."
                  : "No orders found"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderDetails;