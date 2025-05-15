
import { useState } from "react";
import { InviteFormFields } from "@/components/profile/invite/InviteFormFields";
import { InviteLinkDisplay } from "@/components/profile/invite/InviteLinkDisplay";
import { useInviteForm } from "@/components/profile/invite/useInviteForm";

interface InviteFormProps {
  onClose?: () => void;
}

export function InviteForm({ onClose }: InviteFormProps) {
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const { form, onSubmit, isSubmitting, inviteCount, inviteLimit, canInviteMore } = useInviteForm({
    onSuccess: (link: string) => {
      setInviteLink(link);
    }
  });

  return (
    <div className="space-y-6 py-2">
      {!inviteLink ? (
        <InviteFormFields 
          form={form}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          onCancel={onClose}
          inviteCount={inviteCount}
          inviteLimit={inviteLimit}
        />
      ) : (
        <InviteLinkDisplay 
          inviteLink={inviteLink}
          onClose={onClose}
        />
      )}
    </div>
  );
}
