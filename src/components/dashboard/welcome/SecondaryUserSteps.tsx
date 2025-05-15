
import React from "react";
import { StepCard } from "./StepCard";

export function SecondaryUserSteps() {
  return (
    <div className="md:col-span-2">
      <StepCard
        stepNumber={2}
        title="Aguarde convite para crianças"
        description="O responsável principal precisa vincular você a uma criança para que você tenha acesso completo"
        buttonText="Ver Responsáveis"
        navigateTo="/app/guardians"
      />
    </div>
  );
}
