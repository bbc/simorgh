import { useRef, useEffect, useState } from 'react';
import useIsPWA from '#app/hooks/useIsPWA';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

interface UsePWAInstallPromptCallbacks {
  onAccepted?: () => void;
  onDismissed?: () => void;
  onError?: (error: unknown) => void;
  onPromptShown?: () => void;
  deferPrompt?: boolean;
}

const usePWAInstallPrompt = ({
  onAccepted,
  onDismissed,
  onError,
  onPromptShown,
  deferPrompt = true,
}: UsePWAInstallPromptCallbacks = {}) => {
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const isPWA = useIsPWA();

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (isPWA) {
      (async () => setIsInstallable(false))();

      return undefined;
    }
    const handleBeforeInstallPrompt = (event: Event) => {
      if (deferPrompt) {
        event?.preventDefault();
        deferredPrompt.current = event as BeforeInstallPromptEvent;
      }
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
  }, [deferPrompt, isPWA]);

  const promptInstall = async () => {
    if (!deferredPrompt.current) return;
    try {
      await deferredPrompt.current.prompt();
      onPromptShown?.();
      deferredPrompt.current.userChoice
        .then(result => {
          if (result.outcome === 'accepted') {
            onAccepted?.();
          } else {
            onDismissed?.();
          }
        })
        .catch(error => {
          onError?.(error);
        })
        .finally(() => {
          deferredPrompt.current = null;
          setIsInstallable(false);
        });
    } catch (error) {
      onError?.(error);
    }
  };

  return {
    isInstallable,
    promptInstall,
  };
};

export default usePWAInstallPrompt;
