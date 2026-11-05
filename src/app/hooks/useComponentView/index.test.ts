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

  it('uses the latest entry when several are delivered together', () => {
    const { result } = renderHook(() => useComponentView());

    act(() => {
      result.current.ref(document.createElement('div'));
    });

    act(() => {
      observerCallback(
        [
          { intersectionRatio: 1, isIntersecting: true },
          { intersectionRatio: 0, isIntersecting: false },
        ] as IntersectionObserverEntry[],
        observer as unknown as IntersectionObserver,
      );
    });

    expect(result.current.isInView).toBe(false);
  });

  it('does not observe when disabled', () => {
    const { result } = renderHook(() => useComponentView({ enabled: false }));

    act(() => {
      result.current.ref(document.createElement('div'));
    });

    expect(intersectionObserver).not.toHaveBeenCalled();
  });

  it('resets isInView when the element is removed', () => {
    const { result } = renderHook(() => useComponentView());

    act(() => {
      result.current.ref(document.createElement('div'));
    });
    act(() => {
      triggerIntersection({ intersectionRatio: 1 });
    });
    expect(result.current.isInView).toBe(true);

    act(() => {
      result.current.ref(null);
    });

    expect(result.current.isInView).toBe(false);
  });

  it('resets isInView when observation is disabled', () => {
    const { result, rerender } = renderHook(
      ({ enabled }) => useComponentView({ enabled }),
      { initialProps: { enabled: true } },
    );

    act(() => {
      result.current.ref(document.createElement('div'));
    });
    act(() => {
      triggerIntersection({ intersectionRatio: 1 });
    });
    expect(result.current.isInView).toBe(true);

    rerender({ enabled: false });

    expect(result.current.isInView).toBe(false);
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
