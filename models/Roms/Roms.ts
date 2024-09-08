import { Schema, model, models, Model } from "mongoose";

const romSchema = new Schema(
  {
    linkedUserId: {
      type: Schema.Types.ObjectId,
      ref: "Devices",
    },
    codeName: {
      type: String,
      required: true,
    },
    version: { type: String, required: true },
    createdDate: {
      type: Date,
      default: Date.now(),
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
