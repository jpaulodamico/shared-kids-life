
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Link, Shield } from "lucide-react";
import { useGuardians } from "@/hooks/use-guardians";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserRole } from "@/hooks/use-user-role";

interface LinkedUsersTabProps {
  onInvite: () => void;
}

export function LinkedUsersTab({ onInvite }: LinkedUsersTabProps) {
  const { guardians, loading: loadingGuardians } = useGuardians();
  const { isPrimary, loading: loadingRole } = useUserRole();
  
  const loading = loadingGuardians || loadingRole;

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Filter out the current user from the guardians list
  const linkedUsers = guardians.filter(g => !g.isPrimary || guardians.length === 1);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Usuários Vinculados</CardTitle>
          <CardDescription>
            Outros responsáveis com acesso às informações das crianças
          </CardDescription>
        </div>
        {isPrimary && (
          <Button onClick={onInvite} variant="outline" size="sm">
            <Link className="h-4 w-4 mr-2" />
            Convidar Responsável
          </Button>
        )}
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
                    <h3 className="font-medium">
                      {user.first_name ? `${user.first_name} ${user.last_name || ''}` : user.email}
                    </h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${
                    user.isPrimary 
                      ? 'bg-family-100 text-family-700' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <Shield className="h-3 w-3 mr-1" />
                    {user.isPrimary ? 'Responsável Principal' : 'Responsável Convidado'}
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
            {isPrimary && (
              <Button onClick={onInvite}>
                <Users className="h-4 w-4 mr-2" />
                Convidar Responsável
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
