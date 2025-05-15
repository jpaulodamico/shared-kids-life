
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { InviteForm } from "@/components/profile/InviteForm";
import { EditProfileForm } from "@/components/profile/EditProfileForm";

interface ProfileDialogsProps {
  showEditProfile: boolean;
  onCloseEditProfile: () => void;
  showInviteUser: boolean;
  onCloseInviteUser: () => void;
  onInviteSuccess: () => void; // Nova prop para atualizar a lista
}

export function ProfileDialogs({
  showEditProfile,
  onCloseEditProfile,
  showInviteUser,
  onCloseInviteUser,
  onInviteSuccess
}: ProfileDialogsProps) {
  return (
    <>
      <Dialog open={showEditProfile} onOpenChange={onCloseEditProfile}>
        <DialogContent className="sm:max-w-[475px]">
          <EditProfileForm onClose={onCloseEditProfile} />
        </DialogContent>
      </Dialog>

      <Dialog open={showInviteUser} onOpenChange={onCloseInviteUser}>
        <DialogContent className="sm:max-w-[475px]">
          <InviteForm 
            onClose={onCloseInviteUser}
            onSuccess={onInviteSuccess} 
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
