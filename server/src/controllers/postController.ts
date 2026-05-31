import { Request, Response } from "express";
import { Post } from "../models/Post";
import { Types } from "mongoose";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}
export async function createPost(req: AuthenticatedRequest, res: Response) {
  try {
    const { title, content } = req.body;

    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }
    // req.user.id comes straight from our protect middleware!
    const newPost = await Post.create({
      title,
      content,
      author: new Types.ObjectId(req.user.id),
    });
    res.status(201).json({
      success: true,
      data: newPost,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
}
// 2. UPDATE A POST (Protected & Owner-Only)

export const updatePost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    // find the post first to make sure it exists
    const post = await Post.findById(id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    } // SECURITY CHECK: Make sure the logged-in user is actually the creator of this post
    if (post.author.toString() !== req.user?.id) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized to edit this post" });
    }

    // update the post
    post.title = title || post.title;
    post.content = content || post.content;
    await post.save();

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
// 3. DELETE A POST (Protected & Owner-Only)
export const deletePost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    if (post.author.toString() !== req.user?.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this post",
      });
    }

    await post.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Post successfully deleted" });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
// 4. GET ALL POSTS (Public - for your Next.js homepage!)
export const getAllPosts = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const posts = await Post.find()
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: posts });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
