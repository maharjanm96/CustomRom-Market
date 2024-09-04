import { Schema, model, models } from "mongoose";

const UserType = {
  ADMIN: "ADMIN",
  USER: "USER",
};

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contact: { type: String },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
    },
    userType: {
      type: String,
      enum: Object.values(UserType),
      default: UserType.USER,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    joinedDate: {
      type: Date,
      default: Date.now(),
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { strict: false }
);

const Users = models.Users || model("Users", userSchema, "Users");

export default Users;
