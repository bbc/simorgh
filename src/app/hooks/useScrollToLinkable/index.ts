import { useEffect, useRef } from 'react';

const scrollIntoView = (componentToScrollTo, hasScrolled, isReducedMotion) => {
  if (componentToScrollTo && !hasScrolled.current) {
    componentToScrollTo.scrollIntoView({
      behavior: isReducedMotion ? 'auto' : 'smooth',
    });
    setTimeout(() => {
      // eslint-disable-next-line no-param-reassign
      componentToScrollTo.tabIndex = '-1';
      componentToScrollTo.focus();
      // eslint-disable-next-line no-param-reassign
      hasScrolled.current = true;
    }, 1000);
  }
};

// to do - minifiy to remove scroll
const useScrollToLinkable = ({ elementId, isReducedMotion }) => {
  const hasScrolled = useRef(null);

  useEffect(() => {
    hasScrolled.current = null;
  }, [elementId]);

  useEffect(() => {
    let timer;

    if (elementId) {
      timer = setTimeout(() => {
        const component = document.getElementById(elementId); // to tidy

        scrollIntoView(component, hasScrolled, isReducedMotion);
      }, 800);
    }
    return () => clearTimeout(timer);
  }, [elementId, hasScrolled, isReducedMotion]);

  return { hasScrolled };
};
export default useScrollToLinkable;
