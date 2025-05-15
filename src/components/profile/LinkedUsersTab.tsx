
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Link, Shield, Clock, CheckCircle, XCircle, AlertCircle, User } from "lucide-react";
import { useGuardians } from "@/hooks/use-guardians";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserRole } from "@/hooks/use-user-role";
import { useLinkedUsers } from "@/hooks/use-linked-users";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface LinkedUsersTabProps {
  onInvite: () => void;
}

export function LinkedUsersTab({ onInvite }: LinkedUsersTabProps) {
  const { guardians, loading: loadingGuardians } = useGuardians();
  const { linkedUsers, loading: loadingInvites } = useLinkedUsers();
  const { isPrimary, loading: loadingRole } = useUserRole();
  
  const loading = loadingGuardians || loadingRole || loadingInvites;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pendente':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'Aceito':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Expirado':
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
      case 'Rejeitado':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Aceito':
        return 'bg-green-100 text-green-800';
      case 'Expirado':
        return 'bg-gray-100 text-gray-800';
      case 'Rejeitado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
  const linkedGuardians = guardians.filter(g => !g.isPrimary || guardians.length === 1);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Usuários Vinculados</CardTitle>
          <CardDescription>
            Gerencie os responsáveis com acesso às informações das crianças
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
        <Tabs defaultValue="guardians">
          <TabsList className="mb-4">
            <TabsTrigger value="guardians">Responsáveis Ativos</TabsTrigger>
            <TabsTrigger value="invites">Histórico de Convites</TabsTrigger>
          </TabsList>
          
          <TabsContent value="guardians">
            {linkedGuardians.length > 0 ? (
              <div className="space-y-4">
                {linkedGuardians.map((user) => (
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
          </TabsContent>
          
          <TabsContent value="invites">
            {linkedUsers.length > 0 ? (
              <Table>
                <TableCaption>Histórico de convites enviados</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Data do Convite</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {linkedUsers.map((invite) => (
                    <TableRow key={invite.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                            {invite.initials}
                          </div>
                          <div>
                            <p className="font-medium">{invite.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{invite.formatted_date}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className={`flex items-center gap-1 ${getStatusClass(invite.status)}`}>
                          {getStatusIcon(invite.status)}
                          {invite.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="py-8 text-center">
                <User className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
                <p className="text-muted-foreground mb-4">
                  Nenhum convite enviado ainda.
                </p>
                <p className="text-sm text-muted-foreground/70 max-w-md mx-auto mb-6">
                  Convide outros responsáveis para compartilhar o acesso às informações
                  das crianças. Você poderá acompanhar o status dos convites aqui.
                </p>
                {isPrimary && (
                  <Button onClick={onInvite}>
                    <Link className="h-4 w-4 mr-2" />
                    Convidar Responsável
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
