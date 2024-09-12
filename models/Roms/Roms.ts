import { Schema, model, models, Model } from "mongoose";

const romSchema = new Schema(
  {
    linkedUserId: {
      type: Schema.Types.ObjectId,
      ref: "Devices",
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    androidVersion: { type: String, required: true },
    latestRelease: {
      type: String,
    },
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
