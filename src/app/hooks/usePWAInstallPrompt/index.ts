import { useRef, useEffect, useState } from 'react';
import useIsPWA from '#app/hooks/useIsPWA';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

const usePWAInstallPrompt = () => {
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const isPWA = useIsPWA();

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (isPWA) {
      setIsInstallable(false);
      return undefined;
    }
    const handleBeforeInstallPrompt = (event: Event) => {
      if (typeof event.preventDefault === 'function') event.preventDefault();
      deferredPrompt.current = event as BeforeInstallPromptEvent;
      setIsInstallable(true);
    };
    window.addEventListener(
      'beforeinstallprompt',
      handleBeforeInstallPrompt as EventListener,
      {
        once: true,
      },
    );
    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt as EventListener,
      );
    };
  }, [isPWA]);

  const promptInstall = () => {
    if (!deferredPrompt.current) return;
    deferredPrompt.current.prompt();
    deferredPrompt.current.userChoice.finally(() => {
      deferredPrompt.current = null;
      setIsInstallable(false);
    });
  };

  return {
    isInstallable,
    promptInstall,
  };
};

export default usePWAInstallPrompt;
