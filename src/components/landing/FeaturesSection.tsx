
import React from "react";
import { FeatureCard } from "./FeatureCard";
import { Calendar, Users, MessageCircle, BookOpen, Heart, Shield } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: <Calendar className="text-primary" />,
      title: "Calendário Compartilhado",
      description: "Organize compromissos, visitas e atividades em um calendário sincronizado para ambos os responsáveis."
    },
    {
      icon: <Users className="text-primary" />,
      title: "Perfis das Crianças",
      description: "Mantenha informações importantes como documentos médicos, atividades escolares e preferências dos seus filhos."
    },
    {
      icon: <MessageCircle className="text-primary" />,
      title: "Comunicação Focada",
      description: "Troque mensagens de forma organizada e relacionada aos assuntos dos seus filhos."
    },
    {
      icon: <BookOpen className="text-primary" />,
      title: "Documentos Importantes",
      description: "Armazene e compartilhe documentos escolares, médicos e legais em um local seguro."
    },
    {
      icon: <Heart className="text-accent" />,
      title: "Despesas Compartilhadas",
      description: "Gerencie e divida as despesas dos filhos com transparência e sem conflitos."
    },
    {
      icon: <Shield className="text-accent" />,
      title: "Segurança e Privacidade",
      description: "Seus dados estão protegidos e acessíveis apenas para os responsáveis autorizados."
    }
  ];

  return (
    <section className="py-16 bg-muted/30 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Por que escolher o CoParent?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Criamos a solução completa que pais e mães separados precisam para uma gestão compartilhada harmoniosa da vida de seus filhos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
