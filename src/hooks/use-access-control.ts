
import { useUserRole } from "./use-user-role";
import { toast } from "sonner";

export function useAccessControl() {
  const { isPrimary, loading } = useUserRole();

  // Check if user has permission to perform an operation
  const checkPermission = (operation: string): boolean => {
    if (loading) return false;
    
    // All users can view data
    if (operation === 'view') return true;
    
    // Only primary users can perform certain operations
    if (['delete', 'invite'].includes(operation) && isPrimary === false) {
      toast.error("Permissão negada", {
        description: "Apenas o responsável principal pode realizar esta operação."
      });
      return false;
    }
    
    return true;
  };

  return {
    canEdit: true, // All users can edit child data
    canDelete: isPrimary === true,
    canInvite: isPrimary === true,
    canView: true,
    checkPermission,
    isPrimary,
    loading
  };
}
