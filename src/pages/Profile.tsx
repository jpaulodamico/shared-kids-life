
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { SettingsForm } from "@/components/profile/SettingsForm";
import { User, Settings, Users } from "lucide-react";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showEditModal, setShowEditModal] = useState(false);
  
  // Usuário de exemplo
  const currentUser = {
    name: "Ana Oliveira",
    email: "ana.oliveira@gmail.com",
    phone: "(11) 98765-4321",
    address: "Rua das Flores, 123 - São Paulo, SP",
    role: "parent",
    initials: "AO"
  };
  
  // Configurações padrão
  const defaultSettings = {
    emailNotifications: true,
    pushNotifications: true,
    calendarSync: false,
    expenseReminders: true,
    documentSharing: true
  };
  
  // Os outros usuários vinculados à conta (co-pais ou outros responsáveis)
  const linkedUsers = [
    {
      id: 1,
      name: "Ricardo Santos",
      email: "ricardo.santos@gmail.com",
      role: "parent",
      status: "active",
      initials: "RS"
    },
    {
      id: 2,
      name: "Maria Ferreira",
      email: "maria.ferreira@gmail.com",
      role: "guardian",
      status: "pending",
      initials: "MF"
    }
  ];

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
                user={currentUser} 
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Card className="border-none shadow-none bg-muted/50">
                        <CardContent className="p-4">
                          <h4 className="font-medium">Sofia Santos</h4>
                          <p className="text-sm text-muted-foreground">7 anos</p>
                        </CardContent>
                      </Card>
                      <Card className="border-none shadow-none bg-muted/50">
                        <CardContent className="p-4">
                          <h4 className="font-medium">Lucas Santos</h4>
                          <p className="text-sm text-muted-foreground">5 anos</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Relação</h3>
                    <p className="text-sm">Mãe</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Detalhes de Acesso</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Último login: </span>
                        13/05/2025 às 10:45
                      </div>
                      <div>
                        <span className="text-muted-foreground">Dispositivo: </span>
                        iPhone (Safari)
                      </div>
                      <div>
                        <span className="text-muted-foreground">Membro desde: </span>
                        Janeiro de 2025
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-6">
          <SettingsForm defaultValues={defaultSettings} />
        </TabsContent>
        
        <TabsContent value="linked" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Usuários Vinculados</CardTitle>
              <CardDescription>
                Outros responsáveis com acesso às informações das crianças
              </CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
