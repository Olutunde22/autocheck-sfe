/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues } from "react-hook-form";

export interface ModalProps {
  initialData?: any;
  open: boolean;
  onClose: (open: boolean) => void;
  onSuccess?: (data?: any) => void;
  onOkay?: () => void;
}

export interface FormModalProps<T extends FieldValues> {
  onSuccess?: () => void;
  onSubmit: (data: T) => void;
  initialData?: T;
  onClose: (open: boolean) => void;
  isLoading?: boolean;
}
