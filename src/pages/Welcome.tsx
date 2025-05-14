
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Calendar, MessageSquare, DollarSign, FileText, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useEffect } from "react";

const WelcomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Se o usuário não estiver autenticado, redireciona para a página de login
  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const handleContinue = () => {
    // Salva no localStorage que o usuário já viu a tela de boas-vindas
    localStorage.setItem("welcomeShown", "true");
    
    toast.success("Bem-vindo ao CoParent!", {
      description: "Agora você pode começar a usar todas as funcionalidades do aplicativo."
    });
    
    // Navegue para a página principal após marcar como visto
    navigate("/app");
  };

  // Get user's first name from email
  const firstName = user?.email ? user.email.split('@')[0] : '';

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8 bg-muted/30">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Bem-vindo ao CoParent!</h1>
          <p className="text-muted-foreground text-lg">
            {firstName && `Olá ${firstName}, `}
            estamos felizes por você estar aqui. Vamos conhecer a plataforma!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-family-500" />
                Calendário Compartilhado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Organize eventos, consultas médicas, atividades escolares e compromissos importantes. 
                Todos os responsáveis ficam informados sobre a programação das crianças.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-accent-green-500" />
                Mensagens
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Comunique-se de forma organizada sobre assuntos relacionados às crianças.
                Mantenha todas as conversas importantes em um lugar seguro.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-warm-500" />
                Controle de Despesas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Registre e compartilhe gastos relacionados às crianças.
                Acompanhe despesas médicas, escolares, atividades e muito mais.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                Documentos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Armazene documentos importantes como boletins escolares, 
                receitas médicas, autorizações e outros documentos relevantes.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Perfis das Crianças
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Gerencie informações importantes sobre cada criança, como alergias,
                medicamentos, contatos de emergência, horários de atividades e preferências.
                Use o seletor de criança no painel principal para alternar entre diferentes perfis.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center pt-6">
          <Button onClick={handleContinue} size="lg" className="cursor-pointer">
            Continuar para o Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
