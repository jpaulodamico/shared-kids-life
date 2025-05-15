
import React from "react";
import { StepCard } from "./StepCard";

export function PrimaryUserSteps() {
  return (
    <>
      <StepCard
        stepNumber={1}
        title="Complete seu perfil"
        description="Adicione suas informações pessoais para facilitar a identificação"
        buttonText="Ir para Perfil"
        navigateTo="/app/profile"
      />
      
      <StepCard
        stepNumber={2}
        title="Adicione crianças"
        description="Cadastre os perfis das crianças com informações importantes"
        buttonText="Adicionar Crianças"
        navigateTo="/app/children"
      />
      
      <StepCard
        stepNumber={3}
        title="Convide responsáveis"
        description="Convide outros pais ou responsáveis para compartilhar o gerenciamento"
        buttonText="Convidar Pessoas"
        navigateTo="/app/profile"
      />
    </>
  );
}
