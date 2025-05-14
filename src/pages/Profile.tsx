
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { SettingsForm } from "@/components/profile/SettingsForm";
import { User, Settings, Users, Link } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useChildren } from "@/hooks/use-supabase-data";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EditProfileForm } from "@/components/profile/EditProfileForm";
import { InviteForm } from "@/components/profile/InviteForm";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showEditModal, setShowEditModal] = useState(false);
  const { user } = useAuth();
  const { children } = useChildren();
  const [profileData, setProfileData] = useState({
    name: "",
    email: user?.email || "",
    phone: "",
    address: "",
    role: "parent",
    initials: "",
    first_name: "",
    last_name: ""
  });
  const [linkedUsers, setLinkedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  
  // Buscar dados do perfil do usuário
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
          setProfileData({
            name: fullName || user.email?.split('@')[0] || "",
            email: data.email || user.email || "",
            phone: data.phone || "",
            address: data.address || "",
            role: "parent",
            initials: getInitials(fullName || user.email?.split('@')[0] || ""),
            first_name: data.first_name || "",
            last_name: data.last_name || ""
          });
        }
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      } finally {
        setLoading(false);
      }
    };
    
    // Buscar usuários vinculados
    const fetchLinkedUsers = async () => {
      if (!user) return;
      
      try {
        // Buscar convites enviados
        const { data, error } = await supabase
          .from('invites')
          .select('*')
          .eq('inviter_id', user.id);
          
        if (error) throw error;
        
        if (data) {
          // Formatar dados dos usuários vinculados
          const formatted = data.map(invite => ({
            id: invite.id,
            email: invite.email,
            name: invite.email.split('@')[0],
            initials: getInitials(invite.email.split('@')[0]),
            status: invite.status
          }));
          
          setLinkedUsers(formatted);
        }
      } catch (error) {
        console.error("Erro ao buscar usuários vinculados:", error);
      }
    };
    
    fetchProfileData();
    fetchLinkedUsers();
  }, [user]);
  
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const handleProfileUpdate = () => {
    setShowEditModal(false);
    // Recarregar os dados do perfil
    if (user) {
      const fetchProfileData = async () => {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
            
          if (error) throw error;
          
          if (data) {
            const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
            setProfileData({
              name: fullName || user.email?.split('@')[0] || "",
              email: data.email || user.email || "",
              phone: data.phone || "",
              address: data.address || "",
              role: "parent",
              initials: getInitials(fullName || user.email?.split('@')[0] || ""),
              first_name: data.first_name || "",
              last_name: data.last_name || ""
            });
          }
        } catch (error) {
          console.error("Erro ao buscar perfil:", error);
        }
      };
      
      fetchProfileData();
    }
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <ProfileCard 
                user={profileData} 
                onEdit={() => setShowEditModal(true)} 
              />
            </div>
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Adicionais</CardTitle>
                  <CardDescription>
                    Dados complementares do seu perfil
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Crianças Vinculadas</h3>
                    {children.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {children.map(child => (
                          <Card key={child.id} className="border-none shadow-none bg-muted/50">
                            <CardContent className="p-4">
                              <h4 className="font-medium">{child.name}</h4>
                              <p className="text-sm text-muted-foreground">{child.age} anos</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center p-4 bg-muted/40 rounded-md">
                        <p className="text-muted-foreground">Nenhuma criança vinculada.</p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Relação</h3>
                    <p className="text-sm">Responsável Principal</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Detalhes de Acesso</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Último login: </span>
                        {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString('pt-BR') : 'Não disponível'}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Dispositivo: </span>
                        {navigator.userAgent.includes('iPhone') ? 'iPhone' : navigator.userAgent.includes('Android') ? 'Android' : 'Computador'}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Membro desde: </span>
                        {user?.created_at ? new Date(user.created_at).toLocaleDateString('pt-BR', {month: 'long', year: 'numeric'}) : 'Não disponível'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Usuários Vinculados</CardTitle>
                <CardDescription>
                  Outros responsáveis com acesso às informações das crianças
                </CardDescription>
              </div>
              <Button onClick={() => setShowInviteDialog(true)} variant="outline" size="sm">
                <Link className="h-4 w-4 mr-2" />
                Convidar Responsável
              </Button>
            </CardHeader>
            <CardContent>
              {linkedUsers.length > 0 ? (
                <div className="space-y-4">
                  {linkedUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-family-100 text-family-700 flex items-center justify-center font-medium">
                          {user.initials}
                        </div>
                        <div>
                          <h3 className="font-medium">{user.name}</h3>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${
                          user.status === 'active' 
                            ? 'bg-accent-green-100 text-accent-green-700' 
                            : 'bg-warm-100 text-warm-700'
                        }`}>
                          {user.status === 'active' ? 'Ativo' : 'Pendente'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <Users className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
                  <p className="text-muted-foreground mb-4">
                    Nenhum outro responsável vinculado.
                  </p>
                  <p className="text-sm text-muted-foreground/70 max-w-md mx-auto mb-6">
                    Convide outros responsáveis para compartilhar o acesso às informações
                    das crianças. Cada responsável terá seu próprio acesso para visualizar
                    e atualizar dados.
                  </p>
                  <Button onClick={() => setShowInviteDialog(true)}>
                    <Users className="h-4 w-4 mr-2" />
                    Convidar Responsável
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Modal de edição de perfil */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar Perfil</DialogTitle>
          </DialogHeader>
          <EditProfileForm 
            defaultValues={{
              first_name: profileData.first_name,
              last_name: profileData.last_name,
              phone: profileData.phone,
              address: profileData.address
            }}
            onSuccess={handleProfileUpdate}
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
    </div>
  );
};

export default ProfilePage;
