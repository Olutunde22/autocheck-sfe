import { ModalProps } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export default function ViewUserModal({
  open,
  onClose,
  initialData,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData?.name}&apos;s Details</DialogTitle>
          <DialogDescription hidden>View user details</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Name</p>
            <p className="text-sm">{initialData?.name}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Email</p>
            <p className="text-sm">{initialData?.email}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Phone</p>
            <p className="text-sm">{initialData?.phone}</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Website</p>
            <p className="text-sm">{initialData?.website}</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Company</p>
            <p className="text-sm">{initialData?.company?.name}</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Address</p>
            <p className="text-sm">
              {initialData?.address?.street}, {initialData?.address?.suite},{" "}
              {initialData?.address?.city}, {initialData?.address?.zipcode}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
