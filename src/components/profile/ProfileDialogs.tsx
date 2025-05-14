
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EditProfileForm } from "./EditProfileForm";
import { InviteForm } from "./InviteForm";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ProfileDialogsProps {
  showEditModal: boolean;
  showInviteDialog: boolean;
  setShowEditModal: (show: boolean) => void;
  setShowInviteDialog: (show: boolean) => void;
  defaultValues: {
    first_name: string;
    last_name: string;
    phone: string;
    address: string;
  };
  onProfileUpdate: () => void;
  isPrimary?: boolean;
}

export function ProfileDialogs({
  showEditModal,
  showInviteDialog,
  setShowEditModal,
  setShowInviteDialog,
  defaultValues,
  onProfileUpdate,
  isPrimary
}: ProfileDialogsProps) {
  return (
    <>
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Perfil</DialogTitle>
          </DialogHeader>
          <EditProfileForm 
            defaultValues={defaultValues} 
            onSuccess={onProfileUpdate}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Convidar Responsável</DialogTitle>
          </DialogHeader>
          {isPrimary === false && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Apenas o responsável principal pode enviar convites para outros responsáveis.
              </AlertDescription>
            </Alert>
          )}
          {isPrimary !== false && <InviteForm onClose={() => setShowInviteDialog(false)} />}
        </DialogContent>
      </Dialog>
    </>
  );
}
