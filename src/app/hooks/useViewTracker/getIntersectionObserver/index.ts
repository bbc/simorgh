const MIN_VIEWED_PERCENT = 0.5;

type ComponentViewStateSetter = (componentHasComeIntoView: boolean) => void;

type InitObserverParams = {
  threshold?: number;
  componentViewStateSetter: ComponentViewStateSetter;
};

const initObserver = async ({
  threshold = MIN_VIEWED_PERCENT,
  componentViewStateSetter,
}: InitObserverParams) => {
  if (typeof window.IntersectionObserver === 'undefined') {
    // Polyfill IntersectionObserver, e.g. for IE11
    await import('intersection-observer');
  }

  const callback = (elements: IntersectionObserverEntry[]) => {
    const someElementsAreInView = elements.some(
      element => element.isIntersecting,
    );

    componentViewStateSetter(someElementsAreInView);
  };

  const options = {
    threshold: [threshold],
  };

  return new IntersectionObserver(callback, options);
};

export default initObserver;
