"use client";
import { deleteUser, listUsers } from "@/services/users";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DataTable } from "../ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/user";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  EllipsisVerticalIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { DeleteConfirmationModal } from "../shared/delete-confirmation-modal";
import { CreateUserModal } from "./create-user-modal";
import { EditUserModal } from "./edit-user-modal";
import ViewUserModal from "./view-user-modal";
import { UsersChart } from "./users-chart";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { sortOptions } from "@/lib/dummy-data";

export default function Users() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", page, perPage, debouncedSearch, sort],
    queryFn: () =>
      listUsers({
        _page: page,
        _per_page: perPage,
        _sort: sort,
        q: debouncedSearch,
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: (response, id) => {
      if (response.success) {
        toast.success("User deleted successfully");
        setOpenDeleteModal(false);
        setSelectedUser(null);
        setUsers(users.filter((user) => user.id !== id));
      } else {
        toast.error(response.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (!data?.success && data?.message) {
      toast.error(data.message);
    }
    if (data?.success) {
      setUsers(data?.data || []);
    }
  }, [data]);

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "username",
      header: "Username",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Phone",
      accessorKey: "phone",
    },
    {
      header: "Website",
      accessorKey: "website",
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <EllipsisVerticalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                setSelectedUser(row.original);
                setOpenViewModal(true);
              }}
            >
              <EyeIcon className="h-4 w-4 text-green-500" /> View User
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSelectedUser(row.original);
                setOpenEditModal(true);
              }}
            >
              <PencilIcon className="h-4 w-4 text-blue-500" /> Edit User
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSelectedUser(row.original);
                setOpenDeleteModal(true);
              }}
            >
              <TrashIcon className="h-4 w-4 text-red-500" /> Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const handleDeleteUser = () => {
    if (selectedUser?.id) {
      deleteMutation.mutate(selectedUser.id);
    }
  };

  const handleAddUser = (data: User) => {
    setUsers([data, ...users]);
  };

  const handleEditUser = (data: User) => {
    setUsers(users.map((user) => (user.id === data.id ? data : user)));
  };

  return (
    <>
      <UsersChart />
      <h1 className="text-2xl font-bold">Users</h1>
      <div className="flex items-center justify-between gap-2">
        <Input
          placeholder="Search..."
          value={search}
          type="text"
          onChange={(event) => setSearch(event.target.value)}
          className="max-w-xl"
        />
        <div className="flex items-center gap-2">
          <Select value={sort} onValueChange={(value) => setSort(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => setOpenAddModal(true)}>Add User</Button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={users}
        isLoading={isLoading}
        pagination={{
          currentPage: page,
          pageSize: perPage,
          totalCount: data?.totalCount || 0,
          onPageChange: (page) => setPage(page),
          onPageSizeChange: (size) => setPerPage(size),
        }}
      />

      <DeleteConfirmationModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        title="Delete User"
        description="Are you sure you want to delete this user?"
        onOkay={handleDeleteUser}
        isLoading={deleteMutation.isPending}
      />

      <ViewUserModal
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
        initialData={selectedUser}
      />

      <EditUserModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        onSuccess={handleEditUser}
        initialData={selectedUser}
      />

      <CreateUserModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onSuccess={handleAddUser}
      />
    </>
  );
}
