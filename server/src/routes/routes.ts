import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
} from "../controllers/postController.js";
import { protect } from "../middleware/protect.js";

const PostRouter = Router();

PostRouter.get("/get", getAllPosts);
PostRouter.post("/create", protect, createPost);
PostRouter.put("/update/:id", protect, updatePost);
PostRouter.delete("/delete/:id", protect, deletePost);

export default PostRouter;
