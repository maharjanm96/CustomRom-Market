"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import axios from "axios";

const OrderPage = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userid");
  const deviceId = searchParams.get("deviceid");
  const romId = searchParams.get("romid");

  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [totalAmount] = useState(1000);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("/api/order", {
        userId,
        deviceId,
        romId,
        address,
        contact,
        totalAmount,
      });

      setSuccess("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      setError("Failed to place the order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Order Your ROM Installation</h1>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="address" className="block text-lg font-semibold mb-2">
            Address
          </label>
          <p>Note* Your device will be picked up from this address.</p>
          <input
            type="text"
            id="address"
            className="w-full p-2 border border-gray-300 rounded"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="contact" className="block text-lg font-semibold mb-2">
            Contact
          </label>
          <input
            type="text"
            id="contact"
            className="w-full p-2 border border-gray-300 rounded"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="totalAmount"
            className="block text-lg font-semibold mb-2"
          >
            totalAmount
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            id="totalAmount"
            value={totalAmount}
            readOnly
          />
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default OrderPage;
