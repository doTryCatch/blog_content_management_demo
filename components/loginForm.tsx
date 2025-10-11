"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AxiosError } from "axios";
import BASE_URL from "@/config";
import apiClient from "@/lib/api-client";
import { testCookieHandling, testCORS } from "@/lib/cookie-test";
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

      console.log("Login request to:", `${BASE_URL}/api/auth/login`);
      console.log("Cookies before login:", document.cookie);
      
      const res = await apiClient.post<LoginResponse>(
        `${BASE_URL}/api/auth/login`,
        { email, password }
      );

      console.log("Login response:", res.data);
      console.log("Cookies after login:", document.cookie);
      console.log("Response headers:", res.headers);
      console.log("Set-Cookie header:", res.headers['set-cookie']);
      
      // Check if cookie was set
      setTimeout(() => {
        console.log("Cookies after 1 second:", document.cookie);
      }, 1000);

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
          
          {/* Debug buttons */}
          <div className="mt-4 space-y-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={testCookieHandling}
              className="w-full text-xs"
            >
              Test Cookie Handling
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={testCORS}
              className="w-full text-xs"
            >
              Test CORS
            </Button>
          </div>
        </form>
      </CardContent>

      <CardFooter className="text-sm text-muted-foreground">
        Use your work email to sign in.
      </CardFooter>
    </Card>
  );
}

export default LoginForm;
