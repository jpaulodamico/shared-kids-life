
import React from 'react';
import { Link } from "react-router-dom";

export const AuthFooter: React.FC = () => {
  return (
    <div className="mt-6 text-center text-xs text-muted-foreground">
      Ao criar uma conta ou fazer login, você concorda com nossa{" "}
      <Link to="/privacy-policy" className="text-primary hover:underline">
        Política de Privacidade
      </Link>
    </div>
  );
};
