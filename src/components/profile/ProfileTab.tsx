
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { useChildren } from "@/hooks/use-supabase-data";

interface ProfileTabProps {
  profileData: {
    name: string;
    email: string;
    phone: string;
    address: string;
    role: string;
    initials: string;
    first_name: string;
    last_name: string;
  };
  onEdit: () => void;
  user: any;
}

export function ProfileTab({ profileData, onEdit, user }: ProfileTabProps) {
  const { children } = useChildren();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <ProfileCard 
          user={profileData} 
          onEdit={onEdit} 
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
  );
}
