"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import axios, { AxiosError } from "axios";
import BASE_URL from "@/config";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface LoginResponse {
  message: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: "USER" | "ADMIN";
  };
}

export function LoginForm() {
  const { setUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      const email = String(formData.get("email") || "");
      const password = String(formData.get("password") || "");

      const res = await axios.post<LoginResponse>(
        `${BASE_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      setUser(res.data.user); // Update context immediately
      toast.success(res.data.message || "Successfully logged in!");

      router.push("/dashboard"); // SPA navigation
    } catch (err) {
      const error = err as AxiosError<{
        message?: string;
        errors?: { message: string }[];
      }>;
      const message =
        error.response?.data?.errors?.[0]?.message ||
        error.response?.data?.message ||
        "Login failed";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader className="space-y-2">
        <CardTitle className="text-balance">Welcome back</CardTitle>
        <CardDescription className="text-pretty">
          Sign in to continue to your account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="text-sm text-muted-foreground">
        Use your work email to sign in.
      </CardFooter>
    </Card>
  );
}

export default LoginForm;
