
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogIn, UserPlus } from "lucide-react";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { AuthFooter } from "@/components/auth/AuthFooter";
import { AuthTabs } from "@/components/auth/AuthTabs";

const AuthPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading } = useAuth();
  
  // Get tab from URL parameter or default to "login"
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(tabParam === "register" ? "register" : "login");
  
  console.log("Auth page loaded. Active tab:", activeTab);
  
  // Update activeTab when search parameters change
  useEffect(() => {
    const newTab = searchParams.get("tab");
    if (newTab === "register" || newTab === "login") {
      console.log("Updating active tab to:", newTab);
      setActiveTab(newTab);
    }
  }, [searchParams]);
  
  // Redirect if user is already authenticated
  useEffect(() => {
    if (user && !loading) {
      console.log("User is authenticated, redirecting to /app");
      navigate("/app");
    }
  }, [user, loading, navigate]);

  // If loading, show spinner
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/50 p-4">
      <div className="w-full max-w-md">
        <AuthHeader />
        
        <Card className="w-full">
          <AuthTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </Card>

        <AuthFooter />
      </div>
    </div>
  );
};

export default AuthPage;
