
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
  // Use the site key from your Cloudflare settings image
  const siteKey = '0x4AAAAAABdKbG9XF0ofwQCl';
  const ref = useRef<HTMLDivElement>(null);
  const turnstile = useTurnstile();
  
  useEffect(() => {
    if (ref.current && turnstile) {
      turnstile.render(ref.current, {
        sitekey: siteKey,
        theme: theme,
        callback: (token: string) => {
          console.log("Turnstile token generated:", token.substring(0, 10) + "...");
          onVerify(token);
        },
        'refresh-expired': 'auto'
      });
    }
    
    return () => {
      if (turnstile) {
        turnstile.reset();
      }
    };
  }, [turnstile, siteKey, theme, onVerify]);

  return (
    <div className="w-full flex justify-center my-2">
      <div ref={ref}></div>
    </div>
  );
};
