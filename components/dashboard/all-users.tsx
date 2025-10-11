"use client";

import * as React from "react";
import axios, { AxiosError } from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import BASE_URL from "@/config";

type User = {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
};

type AllUsersProps = {
  className?: string;
};

type GetUsersResponse = {
  message: string;
  count: number;
  users: User[];
};

const AllUsersTable: React.FC<AllUsersProps> = ({ className }) => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get<GetUsersResponse>(
        `${BASE_URL}/api/user/getAllUsers`,
        { withCredentials: true }
      );
      setUsers(res.data.users);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message ?? "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(` ${BASE_URL}/api/user/delete/${id}`, {
        withCredentials: true,
      });
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast.success("User deleted successfully");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  if (loading) return <div className="p-4 text-center">Loading users...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;
  if (users.length === 0)
    return <div className="p-4 text-center">No users found</div>;

  return (
    <Card className={`rounded-2xl shadow-sm ${className ?? ""}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">All users</CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {u.email}
                </TableCell>
                <TableCell>
                  <code className="font-mono text-sm text-muted-foreground">
                    {u.id}
                  </code>
                </TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell className="text-right">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="rounded-full"
                    onClick={() => handleDelete(u.id)}
                    aria-label={`Delete ${u.name}`}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AllUsersTable;
