"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

// ============================================================================
// 1. ZOD SCHEMA DEFINITION (FIXED: z.string().email())
// ============================================================================
const loginSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email address" }),
  password: z
    .string()
    .min(6, { message: "The password should be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();

  // ============================================================================
  // 2. FORM ENGINE LIFE-CYCLE (FIXED: Swap isLoading to isSubmitting)
  // ============================================================================
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  // ============================================================================
  // 3. EXPRESS LOGIN TRANSACTION HANDLER
  // ============================================================================
  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      // FIXED: .ok lives directly on the raw network 'response' object
      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      console.log("Success! Authenticated session:", result);
      //store jwt in localhost
      if (result.token) {
        localStorage.setItem("token", result.token);
        console.log("Jwt saved successfully");
      } else {
        console.warn("Backend did not send any token string");
      }

      // Redirect straight over to your authenticated posts dashboard view
      router.push("/blogs");
    } catch (error: unknown | undefined) {
      console.error("Login Request Failed:", error);
    }
  };

  // ============================================================================
  // 4. PRESENTATIONAL JSX VIEW LAYOUT
  // ============================================================================
  return (
    <div className="min-h-screen flex justify-center items-center  p-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-bold">
            Login to your account
          </CardTitle>
          <CardDescription className="text-center">
            Login to start publishing posts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* --- EMAIL BLOCK --- */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    id="email"
                    placeholder="john@example.com"
                    type="email"
                    {...field}
                  />
                )}
              />
              {errors.email && (
                <p className="text-sm text-destructive font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* --- PASSWORD BLOCK --- */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...field}
                  />
                )}
              />
              {errors.password && (
                <p className="text-sm text-destructive font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* --- FORM TRANSACTION BUTTON (Using clean inline Tailwind Spinner) --- */}
            <Button
              type="submit"
              className="w-full font-medium flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>

            {/* --- REDIRECT NAVIGATION ANCHOR LINK --- */}
            <p className="text-sm text-center text-muted-foreground pt-2">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-primary underline-offset-4 hover:underline transition-colors"
              >
                Register
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
