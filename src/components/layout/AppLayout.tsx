
import { Navigate, Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";

export function AppLayout() {
  const isMobile = useIsMobile();
  const { user, loading } = useAuth();
  
  // Redireciona para a página de autenticação se não houver usuário logado
  if (!loading && !user) {
    return <Navigate to="/auth" replace />;
  }
  
  // Exibe um indicador de carregamento
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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
