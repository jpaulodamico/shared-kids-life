
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { testSupabaseConnection } from "@/lib/supabase";
import { useUserRole } from "@/hooks/use-user-role";
import { Shield } from "lucide-react";
import { toast } from "sonner";
import { useProfileComplete } from "@/hooks/use-profile-complete";

export function AppLayout() {
  const isMobile = useIsMobile();
  const { user, loading, isNewUser } = useAuth();
  const { isPrimary, loading: loadingRole } = useUserRole();
  const { isProfileComplete, loading: loadingProfile } = useProfileComplete();
  const navigate = useNavigate();
  const [connectionStatus, setConnectionStatus] = useState<{
    checking: boolean;
    connected: boolean;
    error?: string;
  }>({
    checking: true,
    connected: false,
  });
  
  const [roleNotified, setRoleNotified] = useState(false);

  // Check if welcome page should be shown
  const shouldShowWelcome = 
    user && !loading && (
      isNewUser || 
      (!isProfileComplete && !localStorage.getItem("welcomeShown"))
    );

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
  
  // Show a toast notification when role is determined
  useEffect(() => {
    if (!loadingRole && isPrimary === false && !roleNotified && user) {
      toast("Acesso de Responsável Convidado", {
        description: "Você está acessando como um responsável convidado. Algumas funcionalidades são limitadas.",
        icon: <Shield className="h-4 w-4 text-family-700" />,
        duration: 6000,
      });
      setRoleNotified(true);
    }
  }, [loadingRole, isPrimary, roleNotified, user]);
  
  // Redirect to welcome page if needed
  useEffect(() => {
    if (shouldShowWelcome) {
      console.log("User should see welcome page, redirecting...");
      console.log({
        isNewUser,
        isProfileComplete,
        welcomeShown: localStorage.getItem("welcomeShown"),
        isPrimary
      });
      navigate("/welcome");
    }
  }, [shouldShowWelcome, navigate]);
  
  // Redirect to auth page if no user
  if (!loading && !user) {
    return <Navigate to="/auth" replace />;
  }
  
  // Show loading indicator
  if (loading || connectionStatus.checking || loadingProfile || loadingRole) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show error if not connected to Supabase
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
