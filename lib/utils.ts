import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getErrorMessage(
  error: unknown,
  { message }: { message: string },
): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "object" && error !== null) {
    const errObj = error as Record<string, unknown>;

    if (errObj.response && typeof errObj.response === "object") {
      const response = errObj.response as Record<string, unknown>;

      if (typeof response.status === "number" && response.status < 500) {
        if (response.data && typeof response.data === "object") {
          const data = response.data as Record<string, unknown>;

          if (typeof data.message === "string") {
            return data.message;
          }
        }
        return `Error: ${response.status}`;
      }
    }

    if (errObj.message && typeof errObj.message === "string") {
      return errObj.message;
    }
  }

  return message ?? "Oops! Something went wrong, please try again later.";
}
