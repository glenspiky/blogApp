import { Document, model, Schema, Types } from "mongoose";
import { User } from "./User";

export interface userPost extends Document {
  title: string;
  content: string;
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<userPost>(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for your blog post"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Blog content cannot be empty"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: User, // Matches the name we gave our User model
      required: true,
    },
  },
  { timestamps: true },
);

export const Post = model<userPost>("Post", PostSchema);
