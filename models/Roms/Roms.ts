import { Schema, model, models, Model } from "mongoose";

const romSchema = new Schema(
  {
    linkedDeviceIds: [{ type: Schema.Types.ObjectId, ref: "Device" }],
    name: { type: String, required: true },
    androidVersion: { type: String },
    status: { type: String, default: "Available" },
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
