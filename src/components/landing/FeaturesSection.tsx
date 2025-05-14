
import React from "react";
import { FeatureCard } from "./FeatureCard";
import { Calendar, MessageSquare, Receipt, FileText } from "lucide-react";

export const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Funcionalidades para facilitar sua rotina</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ferramentas simples e intuitivas para gerenciar todos os aspectos da vida dos seus filhos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="flex justify-center items-center">
            <img 
              src="/lovable-uploads/f13608ad-76e6-4dc4-bc3d-c89aabc9a3f7.png" 
              alt="Família usando o aplicativo CoParent juntos" 
              className="rounded-lg shadow-lg max-w-full h-auto max-h-80"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Parentalidade compartilhada simplificada</h3>
            <p className="text-lg text-gray-600 mb-6">
              O CoParent foi desenvolvido para ajudar pais separados a manterem uma comunicação clara e eficiente sobre todos os assuntos relacionados aos seus filhos, mesmo à distância.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">✓</span>
                Comunicação centralizada e organizada
              </li>
              <li className="flex items-center">
                <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">✓</span>
                Acesso compartilhado a informações importantes
              </li>
              <li className="flex items-center">
                <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">✓</span>
                Maior transparência e menos conflitos
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={<Calendar />} 
            title="Calendário Compartilhado" 
            description="Gerencie o tempo com os filhos, compromissos escolares e atividades extracurriculares."
          />
          <FeatureCard 
            icon={<MessageSquare />} 
            title="Mensagens Organizadas" 
            description="Comunique-se de forma eficiente sobre assuntos relacionados aos filhos."
          />
          <FeatureCard 
            icon={<Receipt />} 
            title="Controle de Despesas" 
            description="Registre, compartilhe e divida facilmente os gastos relacionados aos filhos."
          />
          <FeatureCard 
            icon={<FileText />} 
            title="Documentos Importantes" 
            description="Mantenha registros médicos, escolares e outros documentos em um só lugar."
          />
        </div>
      </div>
    </section>
  );
};
