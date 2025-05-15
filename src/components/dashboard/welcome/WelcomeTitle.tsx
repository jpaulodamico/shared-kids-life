
import React from "react";

interface WelcomeTitleProps {
  title: string;
}

export function WelcomeTitle({ title }: WelcomeTitleProps) {
  return (
    <h2 className="text-xl font-semibold text-center">{title}</h2>
  );
}
