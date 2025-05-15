
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface StepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  buttonText: string;
  navigateTo: string;
}

export function StepCard({ 
  stepNumber, 
  title, 
  description, 
  buttonText, 
  navigateTo 
}: StepCardProps) {
  const navigate = useNavigate();
  
  const handleNavigation = () => {
    console.log(`Navigating to: ${navigateTo}`);
    navigate(navigateTo);
  };
  
  return (
    <div className="flex flex-col items-center p-4 bg-background rounded-lg shadow-sm">
      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
        {stepNumber}
      </div>
      <h3 className="font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">
        {description}
      </p>
      <Button onClick={handleNavigation} variant="outline" className="mt-auto">
        {buttonText}
      </Button>
    </div>
  );
}
