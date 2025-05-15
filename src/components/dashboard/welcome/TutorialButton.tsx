
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function TutorialButton() {
  const navigate = useNavigate();
  
  return (
    <div className="pt-4">
      <Button onClick={() => navigate("/welcome")} className="mr-4">
        Ver tutorial novamente
      </Button>
    </div>
  );
}
