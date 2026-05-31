import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    userName: { type: String, requred: [true, "Name is requred"], trim: true },
    email: {
      type: String,
      requred: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false, // Hidden by default so it doesn't leak in API responses
    },
  },
  { timestamps: true },
);
export const User = model("User", UserSchema);
