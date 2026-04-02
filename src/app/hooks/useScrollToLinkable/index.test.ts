import {
  act,
  renderHook,
} from '#app/components/react-testing-library-with-providers';
import useScrollToLinkable from '.';

const createElementWithId = id => {
  const element = document.createElement('article');
  element.setAttribute('id', id);
  document.body.appendChild(element);

  return element;
};

describe('useScrollToLinkable', () => {
  const scrollIntoViewMock = jest.fn();
  const focusMock = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    document.body.innerHTML = '';

    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
    window.HTMLElement.prototype.focus = focusMock;
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should set the element as focusable and focus it after scrolling', () => {
    const element = createElementWithId('post-123');

    const { result } = renderHook(() =>
      useScrollToLinkable({ elementId: 'post-123', isReducedMotion: true }),
    );

    act(() => {
      jest.advanceTimersByTime(1800);
    });

    expect(element.tabIndex).toBe(-1);
    expect(focusMock).toHaveBeenCalledTimes(1);
    expect(result.current.hasScrolled.current).toBe(true);
  });

  it('should scroll to the provided element with smooth behavior by default', () => {
    createElementWithId('post-123');

    renderHook(() =>
      // @ts-expect-error - initentional missing prop for this test
      useScrollToLinkable({ elementId: 'post-123' }),
    );

    expect(scrollIntoViewMock).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(800);
    });

    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('should use auto behavior when reduced motion is enabled', () => {
    createElementWithId('post-123');

    renderHook(() =>
      useScrollToLinkable({ elementId: 'post-123', isReducedMotion: true }),
    );

    act(() => {
      jest.advanceTimersByTime(800);
    });

    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'auto' });
  });

  it('should not scroll when elementId is not provided', () => {
    // @ts-expect-error - initentional missing elementId for this test
    renderHook(() => useScrollToLinkable({}));

    act(() => {
      jest.runAllTimers();
    });

    expect(scrollIntoViewMock).not.toHaveBeenCalled();
    expect(focusMock).not.toHaveBeenCalled();
  });

  it('should not scroll when the element is not in the DOM', () => {
    renderHook(() =>
      useScrollToLinkable({ elementId: 'missing-id', isReducedMotion: true }),
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(scrollIntoViewMock).not.toHaveBeenCalled();
    expect(focusMock).not.toHaveBeenCalled();
  });
});
