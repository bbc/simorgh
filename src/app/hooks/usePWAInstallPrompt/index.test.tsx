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

    expect(event.prompt).toHaveBeenCalledTimes(1);
  });
});
