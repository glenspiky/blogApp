"use client";

import { formatDate } from "@/components/shared/FormatDate";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

const getPosts = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/posts/get");
    if (!response.ok) {
      console.log("An error occured");
    }
    return await response.json();
  } catch (error: unknown) {
    console.log(error);
    return []; //so that the map does not crash
  }
};
interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    userName: string;
  };
  updatedAt: Date;
  createdAt: Date;
}
export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchAndStoreData = async () => {
      const result = await getPosts();
      setPosts(result.data);
      setLoading(false);
    };

    fetchAndStoreData();
  }, []);
  console.log("Current state posts:", posts);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading feed...
      </div>
    );
  }
  return (
    <div className="min-h-screen flex justify-center items-center flex-col gap-6 mt-5 ">
      {posts.map((post) => {
        const date = formatDate(post.createdAt);
        return (
          <Card key={post._id} className="w-full max-w-md relative">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>
                Created by: {post.author?.userName || "Anonymous"}
              </CardDescription>
            </CardHeader>
            <CardContent>{post.content}</CardContent>
            <CardDescription className="absolute bottom-2 right-2">
              Created at: {date}
            </CardDescription>
          </Card>
        );
      })}
    </div>
  );
}
