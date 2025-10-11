"use client";

import * as React from "react";
import { useState } from "react";
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
import BASE_URL from "@/config";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

interface RegisterResponse {
  message: string;
}

export function RegisterForm() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const name = String(formData.get("name") || "");
      const email = String(formData.get("email") || "");
      const password = String(formData.get("password") || "");
      const role = "USER"; // default role

      const response = await axios.post<RegisterResponse>(
        `${BASE_URL}/api/auth/register`,
        { name, email, password, role },
        { withCredentials: true }
      );

      toast.success(response.data.message || "Account created successfully!");
      window.location.href = "/login";
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader className="space-y-2">
        <CardTitle className="text-balance">Create your account</CardTitle>
        <CardDescription className="text-pretty">
          Sign up to start managing your blog content.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              required
            />
          </div>

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
              autoComplete="new-password"
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating account…" : "Sign up"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="text-sm text-muted-foreground">
        Use a valid email you can access.
      </CardFooter>
    </Card>
  );
}

export default RegisterForm;
