"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Profile from "@/public/profile.png";

export default function ProfileCard() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <section className="bg-card text-card-foreground rounded-xl border shadow-sm p-4">
        <p className="text-sm text-muted-foreground">No user logged in</p>
      </section>
    );
  }

  return (
    <section
      aria-label={`${user.name} profile card`}
      className="bg-card text-card-foreground rounded-xl border shadow-sm"
    >
      {/* Header */}
      <header className="p-4 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="shrink-0">
            <Image
              src={Profile}
              alt="Profile Avatar"
              width={32}
              height={32}
              className="h-8 w-8 rounded-md border object-cover"
            />
            <span className="sr-only">Profile Avatar</span>
          </div>
          <div>
            <h3 className="text-sm font-semibold leading-none">{user.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">{user.email}</p>
          </div>
        </div>

        {/* Badge */}
        <span
          aria-label={`${user.role} badge`}
          className="inline-flex items-center rounded-full border bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
        >
          {user.role}
        </span>
      </header>

      <hr className="border-t border-border" />

      {/* Body */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">User ID</span>
          <span className="text-xs font-medium">{user.id}</span>
        </div>

        <div
          aria-label="About"
          className="rounded-lg border bg-muted/40 px-3 py-2"
        >
          <p className="text-sm leading-6">
            I oversee the platform. {/* Customizable description */}
          </p>
        </div>

        {/* Logout Button */}
        <div className="pt-2">
          <button
            onClick={logout}
            className="w-full text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md py-2 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
}
