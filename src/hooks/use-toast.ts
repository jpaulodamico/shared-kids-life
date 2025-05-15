
import { useState } from "react";
import { toast as sonnerToast } from "sonner";

export interface ToastProps {
  id?: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
  action?: React.ReactNode;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = ({ title, description, variant, action }: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9);
    
    if (variant === "destructive") {
      sonnerToast.error(title, { description });
    } else if (variant === "success") {
      sonnerToast.success(title, { description });
    } else {
      sonnerToast.info(title, { description });
    }
    
    const newToast = {
      id,
      title,
      description,
      variant,
      action
    };
    
    setToasts(prev => [...prev, newToast]);
    
    return {
      id,
      dismiss: () => setToasts(prev => prev.filter(t => t.id !== id))
    };
  };

  return {
    toast,
    toasts,
    dismiss: (id: string) => setToasts(prev => prev.filter(toast => toast.id !== id))
  };
};

// Export sonnerToast as toast for direct use
export { sonnerToast as toast };

