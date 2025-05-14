
import { toast as sonnerToast } from "sonner";

export interface ToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
}

export const useToast = () => {
  const toast = ({ title, description, variant }: ToastProps) => {
    if (variant === "destructive") {
      sonnerToast.error(title, { description });
    } else if (variant === "success") {
      sonnerToast.success(title, { description });
    } else {
      sonnerToast.info(title, { description });
    }
  };

  return { toast };
};

export const toast = ({ title, description, variant }: ToastProps) => {
  if (variant === "destructive") {
    sonnerToast.error(title, { description });
  } else if (variant === "success") {
    sonnerToast.success(title, { description });
  } else {
    sonnerToast.info(title, { description });
  }
};
