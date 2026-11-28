import useIsPWA from '#app/hooks/useIsPWA';
import {
  renderHook,
  act,
} from '../../components/react-testing-library-with-providers';
import usePWAInstallPrompt from './index';

jest.mock('#app/hooks/useIsPWA');

const mockUseIsPWA = jest.mocked(useIsPWA);
const mockEvent = (outcome: 'accepted' | 'dismissed' = 'accepted') =>
  Object.assign(new Event('beforeinstallprompt', { cancelable: true }), {
    prompt: jest.fn<Promise<void>, []>().mockResolvedValue(undefined),
    userChoice: Promise.resolve({ outcome, platform: 'web' }),
  });

describe('usePWAInstallPrompt', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseIsPWA.mockReturnValue(false);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it.each(['accepted', 'dismissed'] as const)(
    'handles an %s install prompt and consumes the event',
    async outcome => {
      const event = mockEvent(outcome);
      const callbacks = {
        onAccepted: jest.fn(),
        onDismissed: jest.fn(),
        onPromptShown: jest.fn(),
      };
      const { result } = renderHook(() => usePWAInstallPrompt(callbacks));

      expect(result.current.isInstallable).toBe(false);
      act(() => window.dispatchEvent(event));
      expect(event.defaultPrevented).toBe(true);
      expect(result.current.isInstallable).toBe(true);

      await act(async () => result.current.promptInstall());

      expect(event.prompt).toHaveBeenCalledTimes(1);
      expect(callbacks.onPromptShown).toHaveBeenCalledTimes(1);
      expect(callbacks.onAccepted).toHaveBeenCalledTimes(
        outcome === 'accepted' ? 1 : 0,
      );
      expect(callbacks.onDismissed).toHaveBeenCalledTimes(
        outcome === 'dismissed' ? 1 : 0,
      );
      expect(result.current.isInstallable).toBe(false);

      await act(async () => result.current.promptInstall());
      expect(event.prompt).toHaveBeenCalledTimes(1);
    },
  );

  it('does not defer or manually invoke the browser prompt when disabled', async () => {
    const event = mockEvent();
    const { result } = renderHook(() =>
      usePWAInstallPrompt({ deferPrompt: false }),
    );

    act(() => window.dispatchEvent(event));
    expect(result.current.isInstallable).toBe(true);
    expect(event.defaultPrevented).toBe(false);

    await act(async () => result.current.promptInstall());
    expect(event.prompt).not.toHaveBeenCalled();
  });

  it('reports prompt failures while allowing a retry', async () => {
    const event = mockEvent();
    const error = new Error('Prompt failed');
    const onError = jest.fn();
    event.prompt.mockRejectedValueOnce(error);
    const { result } = renderHook(() => usePWAInstallPrompt({ onError }));
    act(() => window.dispatchEvent(event));

    await act(async () => result.current.promptInstall());
    expect(onError).toHaveBeenCalledWith(error);
    expect(result.current.isInstallable).toBe(true);

    await act(async () => result.current.promptInstall());
    expect(event.prompt).toHaveBeenCalledTimes(2);
    expect(result.current.isInstallable).toBe(false);
  });

  it('reports rejected choices and consumes the prompt', async () => {
    const event = mockEvent();
    const error = new Error('Choice unavailable');
    event.userChoice = Promise.reject(error);
    const onError = jest.fn();
    const { result } = renderHook(() => usePWAInstallPrompt({ onError }));
    act(() => window.dispatchEvent(event));

    await act(async () => result.current.promptInstall());
    expect(onError).toHaveBeenCalledWith(error);
    expect(result.current.isInstallable).toBe(false);
  });

  it('does not subscribe when already running as a PWA', () => {
    mockUseIsPWA.mockReturnValue(true);
    const addEventListener = jest.spyOn(window, 'addEventListener');
    const { result } = renderHook(() => usePWAInstallPrompt());

    expect(result.current.isInstallable).toBe(false);
    expect(addEventListener).not.toHaveBeenCalledWith(
      'beforeinstallprompt',
      expect.any(Function),
      expect.anything(),
    );
  });

  it('clears old prompts when display mode changes', async () => {
    const event = mockEvent();
    const { result, rerender } = renderHook(() => usePWAInstallPrompt());
    act(() => window.dispatchEvent(event));
    expect(result.current.isInstallable).toBe(true);

    mockUseIsPWA.mockReturnValue(true);
    rerender();
    expect(result.current.isInstallable).toBe(false);
    mockUseIsPWA.mockReturnValue(false);
    rerender();
    expect(result.current.isInstallable).toBe(false);
    await act(async () => result.current.promptInstall());
    expect(event.prompt).not.toHaveBeenCalled();
  });

  it('keeps the listener stable and removes it on unmount', () => {
    const addEventListener = jest.spyOn(window, 'addEventListener');
    const removeEventListener = jest.spyOn(window, 'removeEventListener');
    const { rerender, unmount } = renderHook(() => usePWAInstallPrompt());
    const listener = addEventListener.mock.calls.find(
      ([name]) => name === 'beforeinstallprompt',
    )?.[1];

    rerender();
    expect(
      addEventListener.mock.calls.filter(
        ([name]) => name === 'beforeinstallprompt',
      ),
    ).toHaveLength(1);

    unmount();
    expect(removeEventListener).toHaveBeenCalledWith(
      'beforeinstallprompt',
      listener,
    );
  });

  it('cancels callbacks when unmounted before the browser prompt resolves', async () => {
    let resolvePrompt!: () => void;
    const event = mockEvent();
    event.prompt.mockReturnValue(
      new Promise<void>(resolve => {
        resolvePrompt = resolve;
      }),
    );
    const callbacks = {
      onPromptShown: jest.fn(),
      onAccepted: jest.fn(),
      onError: jest.fn(),
    };
    const { result, unmount } = renderHook(() =>
      usePWAInstallPrompt(callbacks),
    );
    act(() => window.dispatchEvent(event));
    const pending = result.current.promptInstall();
    unmount();

    await act(async () => {
      resolvePrompt();
      await pending;
    });

    expect(callbacks.onPromptShown).not.toHaveBeenCalled();
    expect(callbacks.onAccepted).not.toHaveBeenCalled();
    expect(callbacks.onError).not.toHaveBeenCalled();
  });

  it('cancels pending user choices on unmount or display mode changes', async () => {
    let resolveChoice!: (choice: {
      outcome: 'accepted' | 'dismissed';
      platform: string;
    }) => void;
    const event = mockEvent();
    event.userChoice = new Promise(resolve => {
      resolveChoice = resolve;
    });
    const onAccepted = jest.fn();
    const { result, rerender } = renderHook(() =>
      usePWAInstallPrompt({ onAccepted }),
    );
    act(() => window.dispatchEvent(event));
    const pending = result.current.promptInstall();
    await act(async () => Promise.resolve());

    mockUseIsPWA.mockReturnValue(true);
    rerender();
    await act(async () => {
      resolveChoice({ outcome: 'accepted', platform: 'web' });
      await pending;
    });

    expect(onAccepted).not.toHaveBeenCalled();
    expect(result.current.isInstallable).toBe(false);
  });
});
