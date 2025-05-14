
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Shield, AlertCircle, UserRound } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGuardians } from "@/hooks/use-guardians";
import { useUserRole } from "@/hooks/use-user-role";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function GuardiansPage() {
  const { guardians, loading: loadingGuardians } = useGuardians();
  const { isPrimary, loading: loadingRole } = useUserRole();

  const loading = loadingGuardians || loadingRole;

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-10 w-1/3 mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {[1, 2].map(i => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Responsáveis</h1>
        <p className="text-muted-foreground">
          Visualize todos os responsáveis vinculados às crianças
        </p>
      </div>
      
      {!isPrimary && (
        <Alert className="bg-family-50 border-family-200 text-family-700">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Você está visualizando como um responsável convidado. 
            Algumas ações poderão ter limitações.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-6">
        {guardians.map((guardian) => (
          <Card key={guardian.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    {guardian.avatar_url ? (
                      <AvatarImage src={guardian.avatar_url} alt={`${guardian.first_name} ${guardian.last_name}`} />
                    ) : (
                      <AvatarFallback className="bg-family-100 text-family-700">
                        {guardian.initials}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <CardTitle>
                      {guardian.first_name ? `${guardian.first_name} ${guardian.last_name || ''}` : guardian.email}
                    </CardTitle>
                    <CardDescription>{guardian.email}</CardDescription>
                  </div>
                </div>
                {guardian.isPrimary && (
                  <Badge className="bg-family-100 text-family-700 hover:bg-family-200">
                    <Shield className="h-3 w-3 mr-1" />
                    Responsável Principal
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 mr-2" />
                  {guardian.phone || 'Telefone não informado'}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 mr-2" />
                  {guardian.email}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {guardians.length === 0 && (
          <div className="text-center py-12 bg-muted/40 rounded-lg">
            <UserRound className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-1">Nenhum responsável encontrado</h3>
            <p className="text-muted-foreground">
              Adicione crianças para convidar responsáveis
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
