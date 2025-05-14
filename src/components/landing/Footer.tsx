
import React from "react";
import { Link } from "react-router-dom";
import { AppTitle } from "@/components/ui/app-title";

export const Footer = () => {
  return (
    <footer className="py-12 bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/d45e8800-b655-4bbb-b6f1-a16187642158.png" 
                alt="CoParent Logo" 
                className="h-10 w-auto mr-2"
              />
              <AppTitle size="md">CoParent</AppTitle>
            </div>
            <p className="text-gray-600">
              Facilitando a gestão compartilhada da vida das crianças desde 2023.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Recursos</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary">Calendário</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Despesas</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Documentos</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Mensagens</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Empresa</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary">Sobre nós</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Blog</a></li>
              <li><Link to="/privacy-policy" className="text-gray-600 hover:text-primary">Privacidade</Link></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Termos de uso</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Contato</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary">Suporte</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Ajuda</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Feedback</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
          <p>© 2025 <AppTitle size="sm" className="inline">CoParent</AppTitle>. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
