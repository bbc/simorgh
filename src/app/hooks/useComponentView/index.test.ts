import {
  act,
  renderHook,
} from '#app/components/react-testing-library-with-providers';
import useComponentView from '.';

type MockObserver = {
  observe: jest.Mock;
  disconnect: jest.Mock;
};

const originalIntersectionObserver = global.IntersectionObserver;
let observerCallback: IntersectionObserverCallback;
let observer: MockObserver;

const intersectionObserver = jest.fn(
  (callback: IntersectionObserverCallback) => {
    observerCallback = callback;
    observer = {
      observe: jest.fn(),
      disconnect: jest.fn(),
    };

    return observer as unknown as IntersectionObserver;
  },
);

const triggerIntersection = ({
  intersectionRatio,
  isIntersecting = true,
}: {
  intersectionRatio: number;
  isIntersecting?: boolean;
}) => {
  observerCallback(
    [
      {
        intersectionRatio,
        isIntersecting,
      } as IntersectionObserverEntry,
    ],
    observer as unknown as IntersectionObserver,
  );
};

describe('useComponentView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.IntersectionObserver = intersectionObserver;
  });

  afterEach(() => {
    global.IntersectionObserver = originalIntersectionObserver;
  });

  it('reports whether the element meets the visibility threshold', () => {
    const { result } = renderHook(() => useComponentView());
    const element = document.createElement('div');

    act(() => {
      result.current.ref(element);
    });

    expect(intersectionObserver).toHaveBeenCalledWith(expect.any(Function), {
      threshold: [0.5],
    });
    expect(observer.observe).toHaveBeenCalledWith(element);

    act(() => {
      triggerIntersection({ intersectionRatio: 0.5 });
    });
    expect(result.current.isInView).toBe(true);

    act(() => {
      triggerIntersection({ intersectionRatio: 0.49 });
    });
    expect(result.current.isInView).toBe(false);
  });

  it('requires an intersecting entry even when its ratio meets the threshold', () => {
    const { result } = renderHook(() => useComponentView());
    const element = document.createElement('div');

    act(() => {
      result.current.ref(element);
      triggerIntersection({ intersectionRatio: 0.5, isIntersecting: false });
    });

    expect(result.current.isInView).toBe(false);
  });

  it('supports a custom visibility threshold', () => {
    const { result } = renderHook(() => useComponentView({ threshold: 0.75 }));
    const element = document.createElement('div');

    act(() => {
      result.current.ref(element);
    });

    act(() => {
      triggerIntersection({ intersectionRatio: 0.75 });
    });

    expect(result.current.isInView).toBe(true);
  });

  it('does not observe when disabled', () => {
    renderHook(() => useComponentView({ enabled: false }));

    expect(intersectionObserver).not.toHaveBeenCalled();
  });

  it('disconnects when observation is disabled or the hook unmounts', () => {
    const { result, rerender, unmount } = renderHook(
      ({ enabled }) => useComponentView({ enabled }),
      { initialProps: { enabled: true } },
    );
    const element = document.createElement('div');

    act(() => {
      result.current.ref(element);
    });

    rerender({ enabled: false });
    expect(observer.disconnect).toHaveBeenCalledTimes(1);

    unmount();
    expect(observer.disconnect).toHaveBeenCalledTimes(1);
  });

  it('does not fail when IntersectionObserver is unavailable', () => {
    global.IntersectionObserver =
      undefined as unknown as typeof IntersectionObserver;

    const { result } = renderHook(() => useComponentView());

    expect(() => {
      act(() => {
        result.current.ref(document.createElement('div'));
      });
    }).not.toThrow();
  });
});
