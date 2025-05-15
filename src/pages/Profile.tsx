
import { useState } from "react";
import { ProfileTab } from "@/components/profile/ProfileTab";
import { LinkedUsersTab } from "@/components/profile/LinkedUsersTab";
import { SettingsForm } from "@/components/profile/SettingsForm";
import { ProfileDialogs } from "@/components/profile/ProfileDialogs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLinkedUsers } from "@/hooks/use-linked-users";

export default function ProfilePage() {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showInviteUser, setShowInviteUser] = useState(false);
  const { refreshLinkedUsers } = useLinkedUsers();
  
  const handleOpenEditProfile = () => setShowEditProfile(true);
  const handleCloseEditProfile = () => setShowEditProfile(false);
  
  const handleOpenInviteUser = () => setShowInviteUser(true);
  const handleCloseInviteUser = () => setShowInviteUser(false);
  
  const handleInviteSuccess = () => {
    // Atualizar a lista de convites quando um novo convite for enviado
    refreshLinkedUsers();
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Perfil</h1>
        <p className="text-muted-foreground">
          Gerencie seu perfil e controle os usuários vinculados
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="users">Usuários Vinculados</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-4">
          <ProfileTab onEdit={handleOpenEditProfile} />
        </TabsContent>
        
        <TabsContent value="users">
          <LinkedUsersTab onInvite={handleOpenInviteUser} />
        </TabsContent>
        
        <TabsContent value="settings">
          <SettingsForm />
        </TabsContent>
      </Tabs>
      
      <ProfileDialogs 
        showEditProfile={showEditProfile}
        onCloseEditProfile={handleCloseEditProfile}
        showInviteUser={showInviteUser}
        onCloseInviteUser={handleCloseInviteUser}
        onInviteSuccess={handleInviteSuccess}
      />
    </div>
  );
}
