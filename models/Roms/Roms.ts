import { Schema, model, models, Model } from "mongoose";

const romSchema = new Schema(
  {
    name: { type: String, required: true },
    androidVersion: { type: String },
    status: { type: String, default: "Available" },
    sold: { type: Number, default: 0 },
  },
  { strict: false }
);

let Roms: Model<any>;
try {
  Roms = models.Roms || model("Roms", romSchema, "Roms");
} catch (error) {
  Roms = model("Roms", romSchema, "Roms");
}

export default Roms;
