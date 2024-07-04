import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  contact: number;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: false,
  },

  contact: {
    type: Number,
    required: [true, "Contact is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    unique: true,
  },
});

const UserModel =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default UserModel;
