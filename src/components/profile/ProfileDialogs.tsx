
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EditProfileForm } from "@/components/profile/EditProfileForm";
import { InviteForm } from "@/components/profile/InviteForm";

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
}

export function ProfileDialogs({ 
  showEditModal, 
  showInviteDialog, 
  setShowEditModal, 
  setShowInviteDialog, 
  defaultValues, 
  onProfileUpdate 
}: ProfileDialogsProps) {
  return (
    <>
      {/* Modal de edição de perfil */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar Perfil</DialogTitle>
          </DialogHeader>
          <EditProfileForm 
            defaultValues={defaultValues}
            onSuccess={onProfileUpdate}
          />
        </DialogContent>
      </Dialog>
      
      {/* Modal de convite de responsável */}
      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Convidar Responsável</DialogTitle>
          </DialogHeader>
          <InviteForm />
        </DialogContent>
      </Dialog>
    </>
  );
}
