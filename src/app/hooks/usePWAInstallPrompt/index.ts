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
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const promptSession = useRef({ active: true });
  const isPWA = useIsPWA();

  if (isPWA && installPrompt) setInstallPrompt(null);

  useEffect(() => {
    const session = { active: true };
    promptSession.current = session;
    if (isPWA) return undefined;

    const handleBeforeInstallPrompt = (event: Event) => {
      if (deferPrompt) event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };
    window.addEventListener(
      'beforeinstallprompt',
      handleBeforeInstallPrompt as EventListener,
      {
        once: true,
      },
    );
    return () => {
      session.active = false;
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt as EventListener,
      );
    };
  }, [deferPrompt, isPWA]);

  const promptInstall = async () => {
    if (!deferPrompt || !installPrompt || isPWA) return;
    const session = promptSession.current;
    try {
      await installPrompt.prompt();
      if (!session.active) return;
      onPromptShown?.();
    } catch (error) {
      if (session.active) onError?.(error);
      return;
    }

    try {
      const result = await installPrompt.userChoice;
      if (!session.active) return;
      if (result.outcome === 'accepted') onAccepted?.();
      else onDismissed?.();
    } catch (error) {
      if (session.active) onError?.(error);
    } finally {
      if (session.active) setInstallPrompt(null);
    }
  };

  return {
    isInstallable: !isPWA && installPrompt !== null,
    promptInstall,
  };
};

export default usePWAInstallPrompt;
