"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import BASE_URL from "@/config";
import apiClient from "@/lib/api-client";

interface User {
  id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN";
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Fetch user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiClient.get(`${BASE_URL}/api/auth/me`);
        setUser(res.data.user);
        // Don't redirect here - let individual pages handle their own redirects
      } catch (error) {
        setUser(null);
        // Only redirect if trying to access protected route without authentication
        if (pathname.startsWith("/dashboard")) {
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [pathname, router]);

  const logout = async () => {
    try {
      await apiClient.post(`${BASE_URL}/api/auth/logout`, {});
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setUser(null);
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
