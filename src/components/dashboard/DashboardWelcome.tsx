
import React from "react";
import { WelcomeTitle } from "./welcome/WelcomeTitle";
import { PrimaryUserSteps } from "./welcome/PrimaryUserSteps";
import { SecondaryUserSteps } from "./welcome/SecondaryUserSteps";
import { TutorialButton } from "./welcome/TutorialButton";

interface DashboardWelcomeProps {
  isPrimary: boolean;
}

export const DashboardWelcome = ({ isPrimary }: DashboardWelcomeProps) => {
  return (
    <div className="bg-muted/40 rounded-lg p-8 text-center space-y-6">
      <WelcomeTitle title="Primeiros passos para iniciar sua experiência" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {isPrimary ? (
          <PrimaryUserSteps />
        ) : (
          <SecondaryUserSteps />
        )}
      </div>
      
      {isPrimary && <TutorialButton />}
    </div>
  );
};
