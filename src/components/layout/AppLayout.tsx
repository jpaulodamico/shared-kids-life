
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { testSupabaseConnection } from "@/lib/supabase";

export function AppLayout() {
  const isMobile = useIsMobile();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [connectionStatus, setConnectionStatus] = useState<{
    checking: boolean;
    connected: boolean;
    error?: string;
  }>({
    checking: true,
    connected: false,
  });

  // Verificar se é o primeiro acesso do usuário
  const welcomeShown = localStorage.getItem("welcomeShown") === "true";

  useEffect(() => {
    const checkConnection = async () => {
      const result = await testSupabaseConnection();
      setConnectionStatus({
        checking: false,
        connected: result.connected,
        error: result.error
      });
    };

    checkConnection();
  }, []);
  
  // Redireciona para a página de boas-vindas se for o primeiro login
  useEffect(() => {
    if (!loading && user && !welcomeShown) {
      navigate("/welcome");
    }
  }, [loading, user, welcomeShown, navigate]);
  
  // Redireciona para a página de autenticação se não houver usuário logado
  if (!loading && !user) {
    return <Navigate to="/auth" replace />;
  }
  
  // Exibe um indicador de carregamento
  if (loading || connectionStatus.checking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Se não estiver conectado ao Supabase, mas não estamos mais verificando
  if (!connectionStatus.connected && !connectionStatus.checking) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <div className="bg-red-50 border border-red-200 rounded-md p-4 max-w-md text-center">
          <h2 className="text-lg font-semibold text-red-700 mb-2">Erro de Conexão com o Supabase</h2>
          <p className="text-red-600 mb-4">{connectionStatus.error || 'Não foi possível conectar ao banco de dados.'}</p>
          <p className="text-sm text-gray-600">
            Verifique se você está conectado corretamente ao Supabase através da 
            integração nativa do Lovable. Clique no botão verde do Supabase no canto superior direito.
          </p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar defaultCollapsed={isMobile} />
        <main className="flex-1 p-4 md:p-6 max-w-full overflow-auto">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
