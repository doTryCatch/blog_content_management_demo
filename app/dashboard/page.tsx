"use client";

import { useState } from "react";
import ProfileCard from "@/components/dashboard/profile-card";
import CreateBlog from "@/components/dashboard/create-blog";
import AllPosts from "@/components/dashboard/all-posts";
import AllUsers from "@/components/dashboard/all-users";
import { useAuth } from "@/context/AuthContext";

type MenuOption = { label: string; value: "blogs" | "users" | "myblogs" };

export default function DashboardPage() {
  const { user } = useAuth();
  const [selected, setSelected] = useState<"blogs" | "users" | "myblogs">(
    "blogs"
  );

  if (!user) return <p>Loading...</p>; // wait for auth state

  const menuOptions: MenuOption[] =
    user.role === "ADMIN"
      ? [
          { label: "Blogs", value: "blogs" },
          { label: "Users", value: "users" },
        ]
      : [
          { label: "All Blogs", value: "blogs" },
          { label: "My Blogs", value: "myblogs" },
        ];

  return (
    <main className="mx-auto m-10 gap-10 p-10 flex justify-between">
      {/* Left: Menu + Content */}
      <div className="left w-[70%] flex flex-col gap-5">
        {/* Menu */}
        <div className="flex gap-4 mb-5">
          {menuOptions.map((opt) => (
            <button
              key={opt.value}
              className={`px-4 py-2 rounded ${
                selected === opt.value
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground"
              }`}
              onClick={() => setSelected(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {selected === "blogs" && <AllPosts />}
          {selected === "users" && <AllUsers />}
          {selected === "myblogs" && <AllPosts myBlogsOnly={true} />}{" "}
          {/* Correctly pass boolean */}
        </div>
      </div>

      {/* Right: Profile + Create */}
      <div className="right w-[30%] space-y-5">
        <ProfileCard />
        <CreateBlog />
      </div>
    </main>
  );
}
