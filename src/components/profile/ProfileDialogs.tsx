
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { InviteForm } from "@/components/profile/InviteForm";
import { EditProfileForm } from "@/components/profile/EditProfileForm";
import { useProfileData } from "@/hooks/use-profile-data";

interface ProfileDialogsProps {
  showEditProfile: boolean;
  onCloseEditProfile: () => void;
  showInviteUser: boolean;
  onCloseInviteUser: () => void;
  onInviteSuccess: () => void;
  onProfileUpdated: () => void;
}

export function ProfileDialogs({
  showEditProfile,
  onCloseEditProfile,
  showInviteUser,
  onCloseInviteUser,
  onInviteSuccess,
  onProfileUpdated
}: ProfileDialogsProps) {
  const { profileData } = useProfileData();
  
  const defaultValues = {
    first_name: profileData.first_name,
    last_name: profileData.last_name,
    phone: profileData.phone || '',
    address: profileData.address || '',
  };

  return (
    <>
      <Dialog open={showEditProfile} onOpenChange={onCloseEditProfile}>
        <DialogContent className="sm:max-w-[475px]">
          <EditProfileForm 
            defaultValues={defaultValues}
            onSuccess={onProfileUpdated}
          />
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
