import { Request, Response } from "express";

export function getPostsController(req: Request, res: Response) {
  res.send("hello world");
}
