"use client";

import * as React from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import BASE_URL from "@/config";
export default function CreateBlog() {
  const [title, setTitle] = React.useState<string>("");
  const [content, setContent] = React.useState<string>("");
  const [publishNow, setPublishNow] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const isValid = title.trim().length >= 3;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);
    try {
      await axios.post(
        `${BASE_URL}/api/blog/create`,
        {
          title,
          content,
          published: publishNow,
        },
        { withCredentials: true }
      );

      toast.success("Blog created successfully!");
      setTitle("");
      setContent("");
      setPublishNow(false);
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(error.response?.data?.message ?? "Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-3xl w-full">
      <CardHeader className="pb-0">
        <CardTitle className="text-balance text-base md:text-lg">
          Create a post
        </CardTitle>
      </CardHeader>

      <Separator />

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-5 pt-0">
          <div className="grid gap-2">
            <Label htmlFor="post-title">Title</Label>
            <Input
              id="post-title"
              placeholder="Post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              aria-invalid={!isValid ? true : undefined}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="post-content">Content</Label>
            <Textarea
              id="post-content"
              placeholder="Write your content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
            />
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t">
          <div className="flex items-center gap-3 py-4">
            <Label htmlFor="publish-now">Publish immediately</Label>
            <Switch
              id="publish-now"
              checked={publishNow}
              onCheckedChange={setPublishNow}
            />
          </div>

          <Button
            type="submit"
            variant="secondary"
            disabled={!isValid || loading}
          >
            {loading ? "Publishing…" : "Publish"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
