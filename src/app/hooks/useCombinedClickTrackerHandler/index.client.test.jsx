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
    jest.clearAllMocks();
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
      result.current.onClick({ currentTarget: { href: destination } }),
    ).rejects.toThrow(error);

    expect(navigate).toHaveBeenCalledWith(destination);
  });

  it('preserves onward navigation without an Optimizely provider', async () => {
    const navigate = jest.spyOn(window.location, 'assign');
    const { result } = renderHook(() =>
      useCombinedClickTrackerHandler({ block, url: destination }),
    );

    await result.current.onClick({ target: {} });

    expect(navigate).toHaveBeenCalledWith(destination);
    expect(optimizely.close).not.toHaveBeenCalled();
  });
});
