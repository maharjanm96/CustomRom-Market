"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // For fetching query params and routing
import { Rating as ReactRating } from "@smastrom/react-rating";
import axios from "axios"; // Importing axios for API requests
import { toast } from "sonner";

const ReviewForm = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the orderId and userId from the URL query parameters
  const orderId = searchParams.get("orderId");
  const userId = searchParams.get("userId");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Ensure orderId and userId exist
      if (!orderId || !userId) {
        throw new Error("Order ID or User ID is missing.");
      }

      // Make the POST request using Axios
      const response = await axios.post(
        `/api/ratings`,
        {
          rating,
          review: feedback,
        },
        {
          params: {
            orderId: orderId,
            userId: userId,
          },
        }
      );

      if (response.status !== 201) {
        throw new Error("Failed to submit review");
      }
      setFeedback("");
      setRating(0);
      toast.success("Review submitted successfully");
      router.push("/order/details");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Submit Your Review</h2>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col mb-4">
          <label htmlFor="feedback" className="text-lg font-semibold mb-2">
            Your Review:
          </label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
            className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rating" className="text-sm font-semibold mb-2">
            Your Rating:
          </label>
          <ReactRating
            value={rating}
            onChange={setRating}
            className="flex justify-center"
            style={{ maxWidth: 200 }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-lg text-white font-semibold ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } transition-colors`}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
        {error && <p className="mt-2 text-red-500 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default ReviewForm;
