
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { User, Settings, Bell } from "lucide-react";

const ProfilePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Perfil</h1>
        <p className="text-muted-foreground">
          Gerencie suas informações e preferências
        </p>
      </div>

      <Tabs defaultValue="personal">
        <TabsList className="mb-6">
          <TabsTrigger value="personal">Informações Pessoais</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informações Pessoais
              </CardTitle>
              <CardDescription>
                Atualize suas informações de perfil
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="text-2xl bg-family-100 text-family-700">
                    MP
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1 text-center sm:text-left">
                  <h3 className="font-medium">Marcos Pereira</h3>
                  <p className="text-sm text-muted-foreground">marcos.pereira@email.com</p>
                  <div className="flex justify-center sm:justify-start gap-2 pt-1">
                    <Button size="sm" variant="outline">Alterar Foto</Button>
                    <Button size="sm" variant="ghost">Remover</Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nome</Label>
                  <Input id="firstName" value="Marcos" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Sobrenome</Label>
                  <Input id="lastName" value="Pereira" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value="marcos.pereira@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" type="tel" value="(11) 98765-4321" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input id="address" value="Rua das Flores, 123 - Jardim Primavera" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input id="city" value="São Paulo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">CEP</Label>
                  <Input id="zipCode" value="01234-567" />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>Salvar Alterações</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
              <CardDescription>
                Altere sua senha e gerencie opções de segurança
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Senha Atual</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">Nova Senha</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <div className="flex justify-end">
                <Button>Alterar Senha</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Configurações de Notificações
              </CardTitle>
              <CardDescription>
                Personalize como e quando deseja receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notificações por Email</h3>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-events">Eventos</Label>
                      <p className="text-xs text-muted-foreground">
                        Receba notificações sobre novos eventos no calendário
                      </p>
                    </div>
                    <Switch id="email-events" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-messages">Mensagens</Label>
                      <p className="text-xs text-muted-foreground">
                        Receba notificações sobre novas mensagens
                      </p>
                    </div>
                    <Switch id="email-messages" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-expenses">Despesas</Label>
                      <p className="text-xs text-muted-foreground">
                        Receba notificações sobre novas despesas
                      </p>
                    </div>
                    <Switch id="email-expenses" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-documents">Documentos</Label>
                      <p className="text-xs text-muted-foreground">
                        Receba notificações sobre novos documentos
                      </p>
                    </div>
                    <Switch id="email-documents" defaultChecked />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notificações por SMS</h3>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sms-events">Eventos</Label>
                      <p className="text-xs text-muted-foreground">
                        Receba notificações sobre novos eventos no calendário
                      </p>
                    </div>
                    <Switch id="sms-events" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sms-messages">Mensagens</Label>
                      <p className="text-xs text-muted-foreground">
                        Receba notificações sobre novas mensagens
                      </p>
                    </div>
                    <Switch id="sms-messages" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sms-expenses">Despesas</Label>
                      <p className="text-xs text-muted-foreground">
                        Receba notificações sobre novas despesas
                      </p>
                    </div>
                    <Switch id="sms-expenses" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sms-documents">Documentos</Label>
                      <p className="text-xs text-muted-foreground">
                        Receba notificações sobre novos documentos
                      </p>
                    </div>
                    <Switch id="sms-documents" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>Salvar Preferências</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configurações do Aplicativo
              </CardTitle>
              <CardDescription>
                Personalize sua experiência com o aplicativo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Interface</h3>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="appearance">Tema Escuro</Label>
                      <p className="text-xs text-muted-foreground">
                        Ative o tema escuro para uma visualização noturna
                      </p>
                    </div>
                    <Switch id="appearance" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="compact">Modo Compacto</Label>
                      <p className="text-xs text-muted-foreground">
                        Reduza o espaçamento entre elementos da interface
                      </p>
                    </div>
                    <Switch id="compact" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Privacidade</h3>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="activity-status">Status de Atividade</Label>
                      <p className="text-xs text-muted-foreground">
                        Mostrar quando você está online para outros usuários
                      </p>
                    </div>
                    <Switch id="activity-status" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="read-receipts">Confirmações de Leitura</Label>
                      <p className="text-xs text-muted-foreground">
                        Mostrar quando você leu mensagens de outros usuários
                      </p>
                    </div>
                    <Switch id="read-receipts" defaultChecked />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Compartilhamento de Dados</h3>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="analytics">Dados de Uso</Label>
                      <p className="text-xs text-muted-foreground">
                        Compartilhar dados de uso para melhorar o aplicativo
                      </p>
                    </div>
                    <Switch id="analytics" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketing">Comunicações de Marketing</Label>
                      <p className="text-xs text-muted-foreground">
                        Receber emails sobre novidades e recursos
                      </p>
                    </div>
                    <Switch id="marketing" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>Salvar Configurações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
