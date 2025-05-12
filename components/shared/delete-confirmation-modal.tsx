import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { ModalProps } from "@/types";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon } from "lucide-react";

type DeleteConfirmationModalProps = ModalProps & {
  title: string;
  description: string;
  isLoading?: boolean;
};

export function DeleteConfirmationModal({
  open,
  onClose,
  title,
  onOkay,
  description,
  isLoading,
}: DeleteConfirmationModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-[350px] gap-0 rounded-[10px] shadow-xl sm:max-w-[400px]">
        <AlertDialogHeader className="flex flex-col items-center">
          <AlertCircleIcon className="h-10 w-10 text-red-500" />
          <AlertDialogTitle className="mt-2 text-center text-lg">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-sm">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="mt-4 flex items-center justify-between space-x-3">
          <Button
            disabled={isLoading}
            onClick={() => onClose(false)}
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            loading={isLoading}
            onClick={() => onOkay?.()}
            variant="destructive"
          >
            Delete
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
