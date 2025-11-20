"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // User is authenticated, redirect to dashboard
        router.push("/dashboard");
      } else {
        // User is not authenticated, redirect to login
        router.push("/login");
      }
    }
  }, [user, loading, router]);

  // Show loading while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>Redirecting...</div>;
}
