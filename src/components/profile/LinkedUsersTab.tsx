
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Link } from "lucide-react";

interface LinkedUsersTabProps {
  linkedUsers: Array<{
    id: string;
    email: string;
    name: string;
    initials: string;
    status: string;
  }>;
  onInvite: () => void;
}

export function LinkedUsersTab({ linkedUsers, onInvite }: LinkedUsersTabProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Usuários Vinculados</CardTitle>
          <CardDescription>
            Outros responsáveis com acesso às informações das crianças
          </CardDescription>
        </div>
        <Button onClick={onInvite} variant="outline" size="sm">
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
            <Button onClick={onInvite}>
              <Users className="h-4 w-4 mr-2" />
              Convidar Responsável
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
