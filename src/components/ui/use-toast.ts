
import { toast as sonnerToast } from "sonner";

// Re-export the toast function from sonner
export { sonnerToast as toast };

// Also export a compatible toast function with the same API as the old useToast
export const useToast = () => {
  return {
    toast: ({ title, description, variant }: { 
      title?: string; 
      description?: string; 
      variant?: "default" | "destructive" | "success" 
    }) => {
      if (variant === "destructive") {
        sonnerToast.error(title, { description });
      } else if (variant === "success") {
        sonnerToast.success(title, { description });
      } else {
        sonnerToast.info(title, { description });
      }
    }
  };
};
