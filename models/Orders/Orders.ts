import { Schema, model, Document, Model, models } from "mongoose";

interface IOrder extends Document {
  linkedUserId: Schema.Types.ObjectId;
  linkedDeviceId: Schema.Types.ObjectId;
  linkedRomId: Schema.Types.ObjectId;
  status: string;
  address: string;
  contact: string;
  totalAmount: string;
  orderDate: Date;
  completionDate?: Date;
  rating?: {
    romRating: number;
    comments?: string;
  };
  reviewed: boolean;
}

const orderSchema = new Schema<IOrder>(
  {
    linkedUserId: { type: Schema.Types.ObjectId, required: true },
    linkedDeviceId: { type: Schema.Types.ObjectId, required: true },
    linkedRomId: { type: Schema.Types.ObjectId, required: true },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    totalAmount: String,
    orderDate: { type: Date, default: Date.now },
    rating: {
      romRating: { type: Number, min: 1, max: 5 },
      comments: { type: String },
    },
    reviewed: {
      type: Boolean,
      default: false,
    },
  },
  { strict: false }
);

let Orders: Model<any>;
try {
  Orders = models.Orders || model("Orders", orderSchema, "Orders");
} catch (error) {
  Orders = model("Orders", orderSchema, "Orders");
}

export default Orders;
