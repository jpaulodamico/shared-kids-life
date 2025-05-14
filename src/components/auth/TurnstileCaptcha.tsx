
import React from 'react';

interface TurnstileCaptchaProps {
  onVerify: (token: string) => void;
  theme?: 'light' | 'dark';
}

export const TurnstileCaptcha: React.FC<TurnstileCaptchaProps> = ({ onVerify }) => {
  // Empty component - Cloudflare Turnstile has been removed
  // Automatically pass a dummy token to not block the auth flow
  React.useEffect(() => {
    onVerify("disabled");
  }, [onVerify]);
  
  return null;
};
