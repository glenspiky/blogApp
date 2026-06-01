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
import { Spinner } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

const loginSchema = z.object({
  userName: z.string().min(3, { message: "Please provide your username" }),
  password: z
    .string()
    .min(6, { message: "The password should be atleast 6 characors" }),
});

type loginFormValues = z.infer<typeof loginSchema>;
export default function LoginPage() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<loginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { userName: "", password: "" },
  });
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card className="w-full max-w-md">
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
            {" "}
            <div className="space-y-2">
              <Label htmlFor="userName">Username</Label>
              <Controller
                name="userName"
                control={control}
                render={({ field }) => (
                  <Input id="userName" placeholder="Johndoe" {...field} />
                )}
              ></Controller>
              {errors.userName && (
                <p className="text-destructive font-medium">
                  {errors.userName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input id="password" placeholder="••••••••" {...field} />
                )}
              ></Controller>
              {errors.password && (
                <p className="text-destructive font-medium">
                  Please provide your password
                </p>
              )}
            </div>{" "}
            <Button
              type="submit"
              className="w-full font-medium"
              disabled={isLoading}
            >
              {isLoading && <Spinner data-icon="inline-start" />}

              {isLoading ? "Creating Account..." : "Register"}
            </Button>
            <p className="text-sm text-center text-muted-foreground pt-2 cursor-pointer">
              Dont have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-primary cursor-pointer underline-offset-4 hover:underline transition-colors"
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
