
import React from 'react';
import { useTurnstile } from 'react-turnstile';

interface TurnstileCaptchaProps {
  onVerify: (token: string) => void;
  theme?: 'light' | 'dark';
}

export const TurnstileCaptcha: React.FC<TurnstileCaptchaProps> = ({ 
  onVerify,
  theme = 'light'
}) => {
  const siteKey = import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY || '0x4AAAAAABdKbG9XF0ofwQCl';
  
  const turnstile = useTurnstile({
    siteKey: siteKey,
    options: {
      theme: theme,
      refreshExpired: 'auto',
    },
    callback: (token: string) => {
      onVerify(token);
    },
  });

  return (
    <div className="w-full flex justify-center my-2" ref={turnstile.ref} />
  );
};
