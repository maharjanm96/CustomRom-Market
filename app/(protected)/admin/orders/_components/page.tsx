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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Order {
  _id: string; // Changed to _id
  status: string;
  address: string;
  totalAmount: string;
  contact: string;
  deviceName: string;
  deviceImage: string;
  romName: string;
  userName: string;
}

const OrderDetailsComponent = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<{
    [key: string]: string;
  }>({});

  const fetchOrders = async () => {
    try {
      if (user?.role === "ADMIN") {
        const response = await axios.get(`/api/order`);
        console.log(response);
        setOrders(response.data);
      } else {
        setError("You do not have permission to view this data.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role) {
      fetchOrders();
    }
  }, [user]);

  const handleClickSubmit = async (orderId: string) => {
    console.log("orderId:", orderId);
    try {
      const newStatus = selectedStatus[orderId];
      if (!newStatus) {
        toast.error("No status selected");
        return;
      }
      await axios.post(`/api/order?id=${orderId}`, { status: newStatus });
      toast.success(`Order status updated`);

      fetchOrders(); // Refresh the orders list after updating
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error(`Failed updating order status`);
    }
  };

  const handleStatusChange = (orderId: string, status: string) => {
    setSelectedStatus((prev) => ({ ...prev, [orderId]: status }));
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
        <TableCaption>A list of recent orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Device</TableHead>
            <TableHead>Rom</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <TableRow key={order._id}>
                {" "}
                {/* Use _id here */}
                <TableCell>
                  <img
                    src={order.deviceImage}
                    alt={order.deviceName}
                    width={50}
                  />
                  {order.deviceName}
                </TableCell>
                <TableCell>{order.romName}</TableCell>
                <TableCell>{order.userName}</TableCell>
                <TableCell>{order.contact}</TableCell>
                <TableCell>
                  <Select
                    onValueChange={(status) =>
                      handleStatusChange(order._id, status)
                    }
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder={order.status} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell className="text-right">
                  Rs.{order.totalAmount}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleClickSubmit(order._id)}>
                    Submit
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                {orders.length === 0 && !loading
                  ? "No orders found"
                  : "Loading..."}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderDetailsComponent;
