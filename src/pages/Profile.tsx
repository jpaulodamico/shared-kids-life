
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Settings, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { SettingsForm } from "@/components/profile/SettingsForm";
import { ProfileTab } from "@/components/profile/ProfileTab";
import { LinkedUsersTab } from "@/components/profile/LinkedUsersTab";
import { ProfileDialogs } from "@/components/profile/ProfileDialogs";
import { useProfileData } from "@/hooks/use-profile-data";
import { useLinkedUsers } from "@/hooks/use-linked-users";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const { user } = useAuth();
  const { profileData, refreshProfileData } = useProfileData();
  const { linkedUsers } = useLinkedUsers();

  const handleProfileUpdate = () => {
    setShowEditModal(false);
    refreshProfileData();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Perfil</h1>
        <p className="text-muted-foreground">
          Gerencie suas informações pessoais e configurações
        </p>
      </div>
      
      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="profile" className="flex items-center gap-1">
            <User className="h-4 w-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            Configurações
          </TabsTrigger>
          <TabsTrigger value="linked" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            Usuários Vinculados
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="mt-6">
          <ProfileTab 
            profileData={profileData}
            onEdit={() => setShowEditModal(true)}
            user={user}
          />
        </TabsContent>
        
        <TabsContent value="settings" className="mt-6">
          <SettingsForm defaultValues={{
            emailNotifications: true,
            pushNotifications: true,
            calendarSync: false,
            expenseReminders: true,
            documentSharing: true
          }} />
        </TabsContent>
        
        <TabsContent value="linked" className="mt-6">
          <LinkedUsersTab 
            linkedUsers={linkedUsers}
            onInvite={() => setShowInviteDialog(true)}
          />
        </TabsContent>
      </Tabs>
      
      <ProfileDialogs
        showEditModal={showEditModal}
        showInviteDialog={showInviteDialog}
        setShowEditModal={setShowEditModal}
        setShowInviteDialog={setShowInviteDialog}
        defaultValues={{
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          phone: profileData.phone,
          address: profileData.address
        }}
        onProfileUpdate={handleProfileUpdate}
      />
    </div>
  );
};

export default ProfilePage;
