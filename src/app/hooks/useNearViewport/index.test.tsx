import {
  act,
  renderHook,
  waitFor,
} from '#app/components/react-testing-library-with-providers';
import useNearViewport from '.';

const ELEMENT_ID = 'viewport-target';

let intersectionObserverCallback: IntersectionObserverCallback | undefined;
let mockDisconnect = jest.fn();

const triggerIntersectionObserver = (isIntersecting = true) => {
  const callback = intersectionObserverCallback;

  if (!callback) return;

  act(() => {
    callback(
      [{ isIntersecting } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
  });
};

const createIntersectionObserverMock = () =>
  jest.fn(callback => {
    intersectionObserverCallback = callback;
    mockDisconnect = jest.fn();

    return {
      observe: jest.fn(),
      disconnect: mockDisconnect,
      unobserve: jest.fn(),
      takeRecords: jest.fn(),
    };
  });

describe('useNearViewport', () => {
  beforeEach(() => {
    intersectionObserverCallback = undefined;

    global.IntersectionObserver =
      createIntersectionObserverMock() as unknown as typeof IntersectionObserver;
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  it('returns true when the element intersects the viewport', async () => {
    const element = document.createElement('div');
    element.id = ELEMENT_ID;
    document.body.appendChild(element);

    const { result } = renderHook(() =>
      useNearViewport({
        elementId: ELEMENT_ID,
        rootMargin: '200px 0px',
      }),
    );

    expect(result.current).toBe(false);
    expect(global.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      { rootMargin: '200px 0px' },
    );

    triggerIntersectionObserver(true);

    await waitFor(() => expect(result.current).toBe(true));
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('does not create an observer when target element is missing', () => {
    const { result } = renderHook(() =>
      useNearViewport({
        elementId: ELEMENT_ID,
      }),
    );

    expect(result.current).toBe(false);
    expect(global.IntersectionObserver).not.toHaveBeenCalled();
  });
});
