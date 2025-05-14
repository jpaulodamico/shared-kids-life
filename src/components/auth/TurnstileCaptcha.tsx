
import React from 'react';
import { Turnstile } from 'react-turnstile';

interface TurnstileCaptchaProps {
  onVerify: (token: string) => void;
  theme?: 'light' | 'dark';
}

export const TurnstileCaptcha: React.FC<TurnstileCaptchaProps> = ({ 
  onVerify,
  theme = 'light'
}) => {
  return (
    <div className="w-full flex justify-center my-2">
      <Turnstile
        sitekey={import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY || ''}
        onVerify={onVerify}
        theme={theme}
        refreshExpired="auto"
      />
    </div>
  );
};
