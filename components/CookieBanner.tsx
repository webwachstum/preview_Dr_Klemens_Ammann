import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import { Button } from './Button';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consented = localStorage.getItem('cookie-consent');
    if (!consented) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-fade-in-up">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl shadow-slate-900/10 border border-slate-200 p-6 md:flex items-center gap-6">
        <div className="hidden md:flex p-4 bg-medical-50 text-medical-700 rounded-xl shrink-0">
          <Cookie size={24} />
        </div>
        
        <div className="flex-grow mb-4 md:mb-0">
          <h3 className="font-display font-bold text-slate-900 mb-1">Datenschutz & Cookies</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten. 
            Durch die Nutzung der Website stimmen Sie der Verwendung von Cookies zu.
          </p>
        </div>

        <div className="flex gap-3 shrink-0">
          <Button variant="ghost" size="sm" onClick={() => setIsVisible(false)}>
            Ablehnen
          </Button>
          <Button variant="primary" size="sm" onClick={handleAccept}>
            Akzeptieren
          </Button>
        </div>
      </div>
    </div>
  );
};