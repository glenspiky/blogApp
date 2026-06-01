"use client"; // Marks this strictly as a Next.js Client Component

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const registerSchema = z
  .object({
    userName: z
      .string()
      .min(2, { message: "Username must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password." }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords do not match.",
        path: ["confirmPassword"],
      });
    }
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.userName,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Something went wrong during registration",
        );
      }

      console.log("Success!", result);
      router.push("/login");
    } catch (error: unknown) {
      console.error("Registration Request Failure:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center 0 p-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Create an Account
          </CardTitle>
          <CardDescription className="text-center">
            Sign up to start publishing your blog posts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* --- USERNAME FIELD --- */}
            <div className="space-y-2">
              <Label htmlFor="userName">Username</Label>
              <Controller
                name="userName"
                control={control}
                render={({ field }) => (
                  <Input id="userName" placeholder="johndoe" {...field} />
                )}
              />
              {errors.userName && (
                <p className="text-[0.8rem] font-medium text-destructive">
                  {errors.userName.message}
                </p>
              )}
            </div>
            {/* --- EMAIL ADDRESS FIELD --- */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...field}
                  />
                )}
              />
              {errors.email && (
                <p className="text-[0.8rem] font-medium text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* --- PASSWORD FIELD --- */}
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
                <p className="text-[0.8rem] font-medium text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>
            {/* --- CONFIRM PASSWORD FIELD --- */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    {...field}
                  />
                )}
              />
              {errors.confirmPassword && (
                <p className="text-[0.8rem] font-medium text-destructive">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting && <Spinner data-icon="inline-start" />}

              {isSubmitting ? "Creating Account..." : "Register"}
            </Button>{" "}
            <p className="text-sm text-center text-muted-foreground pt-2">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary underline-offset-4 hover:underline transition-colors"
              >
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
