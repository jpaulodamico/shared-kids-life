
import React from 'react';

export const AuthHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-center mb-8">
      <h1 className="text-3xl font-bold text-primary mb-2">CoParent</h1>
      <p className="text-muted-foreground text-center">
        Gerencie a co-parentalidade de forma eficiente e colaborativa.
      </p>
    </div>
  );
};
