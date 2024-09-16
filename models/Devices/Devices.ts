import { Schema, model, models, Model } from "mongoose";

const deviceSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    codeName: { type: String, required: true },
    androidVersion: { type: String, required: true },
    
  },
  { strict: false }
);

let Devices: Model<any>;
try {
  Devices = models.Devices || model("Devices", deviceSchema, "Devices");
} catch (error) {
  Devices = model("Devices", deviceSchema, "Devices");
}

export default Devices;
