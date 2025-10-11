"use client";

import * as React from "react";
import axios, { AxiosError } from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import BASE_URL from "@/config";

export type Post = {
  id: string;
  title: string;
  authorId: string;
  createdAt: Date | string | number;
  content?: string;
};

export interface AllPostsProps {
  className?: string;
  title?: string;
  myBlogsOnly?: boolean;
}

function formatDate(value: Post["createdAt"]) {
  const d = value instanceof Date ? value : new Date(value);
  return d.toLocaleString();
}

const AllPosts: React.FC<AllPostsProps> = ({
  className,
  title = "All Posts",
  myBlogsOnly = false,
}) => {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [editingPostId, setEditingPostId] = React.useState<string | null>(null);
  const [editTitle, setEditTitle] = React.useState("");
  const [editContent, setEditContent] = React.useState("");

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const url = myBlogsOnly
        ? `${BASE_URL}/api/blog/getMyBlogs`
        : `${BASE_URL}/api/blog/allBlogs`;
      const res = await axios.get<Post[]>(url, { withCredentials: true });
      setPosts(res.data);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message ?? "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchPosts();
  }, [myBlogsOnly]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`${BASE_URL}/api/blog/delete/${id}`, {
        withCredentials: true,
      });
      toast.success("Post deleted successfully");
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(error.response?.data.message || "Failed to delete post");
    }
  };

  const startEdit = (post: Post) => {
    setEditingPostId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content || "");
  };

  const cancelEdit = () => {
    setEditingPostId(null);
    setEditTitle("");
    setEditContent("");
  };

  const saveEdit = async (id: string) => {
    try {
      const res = await axios.put<{ post: Post }>(
        `${BASE_URL}/api/blog/update/${id}`,
        { title: editTitle, content: editContent },
        { withCredentials: true }
      );
      setPosts((prev) => prev.map((p) => (p.id === id ? res.data.post : p)));
      toast.success("Post updated successfully");
      cancelEdit();
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(error.response?.data.message || "Failed to update post");
    }
  };

  if (loading) return <div className="p-4 text-center">Loading posts...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;
  if (posts.length === 0)
    return <div className="p-4 text-center">No posts found</div>;

  return (
    <Card className={`rounded-2xl shadow-sm ${className ?? ""}`}>
      <CardHeader>
        <CardTitle className="text-foreground text-pretty">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {posts.map((post) => (
          <article
            key={post.id}
            className="rounded-lg border border-border p-4"
            aria-labelledby={`post-${post.id}-title`}
          >
            {editingPostId === post.id ? (
              <div className="flex flex-col gap-2">
                <input
                  className="border rounded px-2 py-1"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea
                  className="border rounded px-2 py-1"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={4}
                />
                <div className="flex gap-2 mt-2">
                  <Button size="sm" onClick={() => saveEdit(post.id)}>
                    Save
                  </Button>
                  <Button size="sm" variant="secondary" onClick={cancelEdit}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <h3
                  id={`post-${post.id}-title`}
                  className="text-foreground font-semibold text-base"
                >
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Author: {post.authorId} • {formatDate(post.createdAt)}
                </p>
                <Separator className="my-3" />
                <p className="text-foreground text-pretty">{post.content}</p>

                {myBlogsOnly && (
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" onClick={() => startEdit(post)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(post.id)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </>
            )}
          </article>
        ))}
      </CardContent>
    </Card>
  );
};

export default AllPosts;
