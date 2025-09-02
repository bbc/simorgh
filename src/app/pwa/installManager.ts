export type InstallSignals = {
  canInstall: boolean;
  prompt: (() => Promise<'accepted' | 'dismissed'>) | null;
};

// types
// Minimal shape of the BeforeInstallPromptEvent (not yet in TS libdom)
export type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

// Deferred event holder scoped module-wide for simplicity in spike
let deferredPromptEvent: BeforeInstallPromptEvent | null = null;
let canInstallFlag = false;

export const initInstallCapture = (onAvailable: () => void) => {
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPromptEvent = e as BeforeInstallPromptEvent;
    canInstallFlag = true;
    onAvailable();
  });
};

export const getInstallSignals = (): InstallSignals => {
  const prompt = deferredPromptEvent
    ? async () => {
        try {
          const ev = deferredPromptEvent as BeforeInstallPromptEvent;
          await ev.prompt();
          const choice = await ev.userChoice;
          // reset after use
          deferredPromptEvent = null;
          canInstallFlag = false;
          return choice.outcome as 'accepted' | 'dismissed';
        } catch (_) {
          deferredPromptEvent = null;
          canInstallFlag = false;
          return 'dismissed';
        }
      }
    : null;
  return { canInstall: canInstallFlag, prompt };
};
