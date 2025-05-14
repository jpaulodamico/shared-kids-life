
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { 
  Calendar, 
  MessageSquare, 
  DollarSign, 
  FileText, 
  User, 
  Home,
  Users,
  Menu,
  X
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

// Menu items for navigation
const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    path: "/",
  },
  {
    title: "Calendário",
    icon: Calendar,
    path: "/calendar",
  },
  {
    title: "Mensagens",
    icon: MessageSquare,
    path: "/messages",
  },
  {
    title: "Despesas",
    icon: DollarSign,
    path: "/expenses",
  },
  {
    title: "Documentos",
    icon: FileText,
    path: "/documents",
  },
  {
    title: "Crianças",
    icon: Users,
    path: "/children",
  },
  {
    title: "Perfil",
    icon: User,
    path: "/profile",
  },
];

export function AppSidebar({ defaultCollapsed = false }) {
  const isMobile = useIsMobile();
  const sidebar = useSidebar();
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  
  // Set initial collapsed state based on prop
  useEffect(() => {
    setCollapsed(defaultCollapsed);
  }, [defaultCollapsed]);

  return (
    <Sidebar 
      className={cn(
        "transition-all duration-300",
        collapsed && !isMobile ? "w-[80px]" : "w-[280px]"
      )}
    >
      <SidebarHeader className="flex items-center justify-between h-16 px-4">
        {!collapsed && (
          <div className="flex items-center">
            <span className="text-2xl font-bold text-white">CoParent</span>
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 text-white rounded-md hover:bg-sidebar-accent"
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
                          isActive
                            ? "bg-sidebar-accent text-white"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                        )
                      }
                    >
                      <item.icon size={20} />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
