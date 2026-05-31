import { Router } from "express";
import { getPostsController } from "../controllers/postController.js";

const PostRouter = Router();

PostRouter.get("/posts", getPostsController);

export default PostRouter;
