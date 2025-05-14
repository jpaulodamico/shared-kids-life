
import React, { useEffect, useRef } from 'react';
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
  const ref = useRef<HTMLDivElement>(null);
  const turnstile = useTurnstile();
  
  useEffect(() => {
    if (ref.current && turnstile) {
      turnstile.render(ref.current, {
        sitekey: siteKey,
        theme: theme,
        callback: onVerify,
        'refresh-expired': 'auto'
      });
    }
    
    return () => {
      turnstile?.reset();
    };
  }, [turnstile, siteKey, theme, onVerify]);

  return (
    <div className="w-full flex justify-center my-2">
      <div ref={ref}></div>
    </div>
  );
};
