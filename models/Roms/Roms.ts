import { Schema, model, models, Model } from "mongoose";

const romSchema = new Schema(
  {
    linkedDeviceId: {
      type: Schema.Types.ObjectId,
      ref: "Devices",
    },
    name: { type: String, required: true },
    androidVersion: { type: String },
    releaseDate: { type: Date },
    status: { type: String, default: "Available" },
    downloadLink: { type: String },
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
