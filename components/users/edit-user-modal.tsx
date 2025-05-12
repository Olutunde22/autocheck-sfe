import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { userSchema } from "@/schemas/user";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "@/services/users";
import { UserForm } from "./user-form";
import { toast } from "sonner";
import { ModalProps } from "@/types";

export function EditUserModal({
  open,
  onClose,
  onSuccess,
  initialData,
}: ModalProps) {
  const updateUserMutation = useMutation({
    mutationFn: (data: z.infer<typeof userSchema>) =>
      updateUser({
        id: initialData?.id,
        ...data,
      }),
    onSuccess: (response) => {
      if (response.success) {
        toast.success("User updated successfully");
        onClose(false);
        onSuccess?.(response.data);
      } else {
        toast.error(response.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: z.infer<typeof userSchema>) => {
    console.log(data);
    updateUserMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="px-0 sm:max-w-[627px]">
        <DialogHeader className="px-6">
          <DialogTitle className="mb-5">Edit User</DialogTitle>
          <DialogDescription hidden>Edit your user</DialogDescription>
          <Separator className="border-b border-gray-200" />
        </DialogHeader>
        <div className="h-fit max-h-[calc(100vh-200px)] overflow-y-auto px-6">
          <UserForm
            onSuccess={onSuccess}
            onClose={onClose}
            onSubmit={onSubmit}
            initialData={initialData}
            isLoading={updateUserMutation.isPending}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
