
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface AppTitleProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export const AppTitle: React.FC<React.PropsWithChildren<AppTitleProps>> = ({ 
  children, 
  className = "", 
  size = "md" 
}) => {
  const { user } = useAuth();
  
  // Determine target based on authentication status
  const target = user ? "/app" : "/";
  
  // Determine appropriate text size based on the size prop
  const sizeClasses = {
    sm: "text-lg font-bold",
    md: "text-2xl font-bold",
    lg: "text-3xl font-bold",
    xl: "text-4xl sm:text-5xl lg:text-6xl font-bold",
  };
  
  return (
    <Link to={target} className={`text-primary hover:text-primary/90 transition-colors ${sizeClasses[size]} ${className}`}>
      {children}
    </Link>
  );
};
