"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function CreatePage() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const router = useRouter();

  // ============================================================================
  // SECURE SUBMIT HANDLER (Triggers ONLY on Form Submission)
  // ============================================================================
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Prevents the browser from reloading the page
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // 1. Grab that JWT token we just saved during login!
      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMessage("You must be logged in to create a post.");
        router.push("/login");
        return;
      }

      // 2. Make the authenticated network request
      const response = await fetch("http://localhost:5000/api/posts/create", {
        method: "POST", // Capitalized properly
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 👈 Attaching token to pass requireAuth
        },
        body: JSON.stringify({ title, content }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || result.message || "Failed to broadcast entry",
        );
      }

      console.log("Post created successfully:", result);

      // 3. Success redirect back to your beautiful feed page
      router.push("/blogs");
    } catch (error: any) {
      console.error("Submission Error Pipeline:", error);
      setErrorMessage(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl border-slate-200/80 shadow-md bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold tracking-tight">
            Draft a New Entry
          </CardTitle>
          <CardDescription>
            Share your software solutions or system logs with the network.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* ERROR DISPLAY AREA */}
            {errorMessage && (
              <div className="p-3 bg-destructive/10 text-destructive text-xs font-medium rounded-lg">
                {errorMessage}
              </div>
            )}

            {/* TITLE CONTAINER */}
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Post Title
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="e.g., Optimizing Application State Maps"
                value={title}
                onChange={(e) => setTitle(e.target.value)} // 👈 FIXED: Capturing value correctly
                required
                className="border-slate-200 bg-slate-50/50 focus-visible:bg-white transition-colors"
              />
            </div>

            {/* CONTENT CONTAINER */}
            <div className="space-y-2">
              <Label
                htmlFor="content"
                className="text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Body Content
              </Label>
              <Textarea
                id="content"
                placeholder="Type your markdown or terminal findings here..."
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)} // 👈 FIXED: Capturing value correctly
                required
                className="resize-none border-slate-200 bg-slate-50/50 focus-visible:bg-white transition-colors"
              />
            </div>

            {/* ACTION INITIATOR BUTTON */}
            <Button
              type="submit"
              className="w-full font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Publishing Broadcast..." : "Publish Post"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
