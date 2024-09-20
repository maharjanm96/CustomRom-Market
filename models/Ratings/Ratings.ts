import { Schema, model, Document, Model, models } from "mongoose";

interface IRating extends Document {
  linkedOrderId: Schema.Types.ObjectId;
  linkedUserId: Schema.Types.ObjectId;
  rating: number;
  review?: string;
}

const ratingSchema = new Schema<IRating>(
  {
    linkedOrderId: { type: Schema.Types.ObjectId, required: true },
    linkedUserId: { type: Schema.Types.ObjectId, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    review: { type: String },
  },
  { strict: false }
);

let Ratings: Model<any>;
try {
  Ratings = models.Ratings || model("Ratings", ratingSchema, "Ratings");
} catch (error) {
  Ratings = model("Ratings", ratingSchema, "Ratings");
}

export default Ratings;
