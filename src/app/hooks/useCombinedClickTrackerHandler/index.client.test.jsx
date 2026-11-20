import { OptimizelyProvider } from '@optimizely/react-sdk';
import {
  renderHook,
  act,
} from '#app/components/react-testing-library-with-providers';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
import useCombinedClickTrackerHandler from '.';

jest.mock('#hooks/useClickTrackerHandler', () => jest.fn());

const destination = 'https://www.bbc.com/pidgin/articles/c0000000000o';
const block = { componentName: 'top-stories' };
const trackClick = jest.fn();
const optimizely = {
  close: jest.fn(),
  user: { id: 'test-user', attributes: {} },
};

const wrapper = ({ children }) => (
  <OptimizelyProvider optimizely={optimizely} isServerSide>
    {children}
  </OptimizelyProvider>
);

describe('useCombinedClickTrackerHandler', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    useClickTrackerHandler.mockReturnValue({ onClick: trackClick });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('flushes Optimizely after tracking and before navigating from a nested link target', async () => {
    const { promise, resolve } = Promise.withResolvers();
    optimizely.close.mockReturnValue(promise);
    const navigate = jest.spyOn(window.location, 'assign');
    const { result } = renderHook(
      () => useCombinedClickTrackerHandler({ block }),
      { wrapper },
    );
    const event = {
      button: 0,
      currentTarget: { href: destination },
      target: {},
    };

    const click = result.current.onClick(event);
    await act(async () => {
      await Promise.resolve();
    });

    expect(trackClick).toHaveBeenCalledWith(event);
    expect(optimizely.close).toHaveBeenCalledTimes(1);
    expect(trackClick.mock.invocationCallOrder[0]).toBeLessThan(
      optimizely.close.mock.invocationCallOrder[0],
    );
    expect(navigate).not.toHaveBeenCalled();

    await act(async () => {
      resolve();
      await click;
    });

    expect(navigate).toHaveBeenCalledWith(destination);
    expect(useClickTrackerHandler).toHaveBeenCalledWith({
      ...block,
      preventNavigation: true,
    });
  });

  it('still navigates if the SDK flush rejects, without suppressing the error', async () => {
    const error = new Error('Optimizely flush failed');
    optimizely.close.mockRejectedValue(error);
    const navigate = jest.spyOn(window.location, 'assign');
    const { result } = renderHook(
      () => useCombinedClickTrackerHandler({ block }),
      { wrapper },
    );

    await expect(
      result.current.onClick({
        button: 0,
        currentTarget: { href: destination },
      }),
    ).rejects.toThrow(error);

    expect(navigate).toHaveBeenCalledWith(destination);
  });

  it('preserves onward navigation without an Optimizely provider', async () => {
    const navigate = jest.spyOn(window.location, 'assign');
    const { result } = renderHook(() =>
      useCombinedClickTrackerHandler({ block, url: destination }),
    );

    await result.current.onClick({ button: 0, target: {} });

    expect(navigate).toHaveBeenCalledWith(destination);
    expect(optimizely.close).not.toHaveBeenCalled();
  });

  it.each([
    ['Ctrl-click', { ctrlKey: true }],
    ['Cmd-click', { metaKey: true }],
    ['Shift-click', { shiftKey: true }],
    ['Alt-click', { altKey: true }],
    ['Ctrl+Shift-click', { ctrlKey: true, shiftKey: true }],
    ['Cmd+Shift-click', { metaKey: true, shiftKey: true }],
    ['middle-click', { button: 1 }],
    ['right-click', { button: 2 }],
  ])('leaves %s on a nested headline to the browser', async (_, modifiers) => {
    const navigate = jest.spyOn(window.location, 'assign');
    const { result } = renderHook(
      () => useCombinedClickTrackerHandler({ block }),
      { wrapper },
    );
    const event = {
      button: 0,
      currentTarget: { href: destination },
      target: document.createElement('span'),
      preventDefault: jest.fn(),
      ...modifiers,
    };

    await result.current.onClick(event);

    expect(trackClick).not.toHaveBeenCalled();
    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(optimizely.close).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
  });

  it.each(['_blank', '_parent', '_top', 'other-window'])(
    'leaves links targeting %s to the browser',
    async target => {
      const navigate = jest.spyOn(window.location, 'assign');
      const { result } = renderHook(
        () => useCombinedClickTrackerHandler({ block }),
        { wrapper },
      );

      await result.current.onClick({
        button: 0,
        currentTarget: { href: destination, target },
      });

      expect(trackClick).not.toHaveBeenCalled();
      expect(optimizely.close).not.toHaveBeenCalled();
      expect(navigate).not.toHaveBeenCalled();
    },
  );

  it('leaves download links to the browser', async () => {
    const navigate = jest.spyOn(window.location, 'assign');
    const link = document.createElement('a');
    link.href = destination;
    link.setAttribute('download', '');
    const { result } = renderHook(
      () => useCombinedClickTrackerHandler({ block }),
      { wrapper },
    );

    await result.current.onClick({ button: 0, currentTarget: link });

    expect(trackClick).not.toHaveBeenCalled();
    expect(optimizely.close).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
  });

  it.each([
    ['keyboard activation', { button: 0, detail: 0 }],
    ['touch-generated click', { button: 0, pointerType: 'touch' }],
  ])('preserves same-tab %s', async (_, activation) => {
    const navigate = jest.spyOn(window.location, 'assign');
    const { result } = renderHook(
      () => useCombinedClickTrackerHandler({ block }),
      { wrapper },
    );

    await result.current.onClick({
      ...activation,
      currentTarget: { href: destination, target: '_self' },
    });

    expect(trackClick).toHaveBeenCalledTimes(1);
    expect(optimizely.close).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith(destination);
  });
});
