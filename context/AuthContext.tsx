"use client";
import axios from "axios";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import BASE_URL from "@/config";

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/auth/me`, {
          withCredentials: true,
        });

        const user = res.data.user;
        setUser(user);

        // Only redirect if logged in and not already on dashboard
        if (user && pathname !== "/dashboard") {
          router.push("/dashboard");
        }
      } catch {
        setUser(null);
        // Optionally redirect unauthenticated users
        if (pathname.startsWith("/dashboard")) {
          router.push("/login");
        }
      }
    };
    fetchUser();
  }, [pathname, router]);

  const logout = async () => {
    await axios.post(
      `${BASE_URL}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
