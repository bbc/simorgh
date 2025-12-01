import {
  renderHook,
  act,
} from '../../components/react-testing-library-with-providers';
import usePWAInstallPrompt from './index';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

const mockEvent = (): BeforeInstallPromptEvent => {
  return {
    preventDefault: jest.fn(),
    prompt: jest.fn().mockResolvedValue(undefined),
    userChoice: Promise.resolve({ outcome: 'accepted', platform: 'web' }),
  } as unknown as BeforeInstallPromptEvent;
};

describe('usePWAInstallPrompt', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    Object.defineProperty(window.navigator, 'standalone', {
      value: false,
      writable: true,
    });
  });

  it('should not show banner if window is undefined', () => {
    const originalWindow = global.window;
    // @ts-expect-error: deleting global.window to simulate undefined window in test
    delete global.window;
    const { result } = renderHook(() => usePWAInstallPrompt());
    expect(result.current.isPwaPromoBannerVisible).toBe(false);
    global.window = originalWindow;
  });

  it('should not show banner if in standalone/PWA mode', () => {
    (window.matchMedia as jest.Mock).mockReturnValue({ matches: true });
    const { result } = renderHook(() => usePWAInstallPrompt());
    expect(result.current.isPwaPromoBannerVisible).toBe(false);
  });

  it('should show banner if installable and not dismissed', () => {
    const mock = mockEvent();
    const customEvent = new CustomEvent('beforeinstallprompt');
    Object.assign(customEvent, mock);

    const { result } = renderHook(() => usePWAInstallPrompt());

    act(() => {
      window.dispatchEvent(customEvent);
    });

    expect(result.current.isPwaPromoBannerVisible).toBe(true);
  });

  it('should hide banner after dismissBanner is called', () => {
    const { result } = renderHook(() => usePWAInstallPrompt());
    act(() => {
      result.current.dismissBanner();
    });
    expect(result.current.isPwaPromoBannerVisible).toBe(false);
  });

  it('should increment dismissals in localStorage when banner is dismissed', () => {
    const { result } = renderHook(() => usePWAInstallPrompt());
    act(() => {
      result.current.dismissBanner();
    });
    expect(
      Number(localStorage.getItem('pwa_promotionalBanner_dismissals')),
    ).toBe(1);
  });

  it('should call prompt and handle userChoice on promptInstall', async () => {
    const event = mockEvent();
    const { result } = renderHook(() => usePWAInstallPrompt());

    act(() => {
      const customEvent = new CustomEvent('beforeinstallprompt', {
        detail: event,
      });
      Object.assign(customEvent, event);
      window.dispatchEvent(customEvent);
    });

    await act(async () => {
      result.current.promptInstall();
      await event.userChoice;
    });

    expect(event.prompt).toHaveBeenCalled();
  });

  it('should not show banner if dismissed max times', () => {
    localStorage.setItem('pwa_promotionalBanner_dismissals', '3');
    const { result } = renderHook(() => usePWAInstallPrompt());
    expect(result.current.isPwaPromoBannerVisible).toBe(false);
  });

  it('should not show banner if dismissed recently', () => {
    localStorage.setItem('pwa_promotionalBanner_dismissals', '1');
    localStorage.setItem(
      'pwa_promotionalBanner_last_dismissed',
      `${Date.now()}`,
    );
    const { result } = renderHook(() => usePWAInstallPrompt());
    expect(result.current.isPwaPromoBannerVisible).toBe(false);
  });
});
