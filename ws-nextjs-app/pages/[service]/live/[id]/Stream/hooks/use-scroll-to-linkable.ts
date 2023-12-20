import { useEffect, useRef } from 'react';
import scrollIntoView from '../helpers/scroll-into-view';

// @ts-expect-error spike any types
const useScrollToLinkable = ({ post, isReducedMotion }) => {
  console.log("I'm calling the useScrollToLinkable hook");
  console.log("I'm the post in the hook", post);
  const hasScrolled = useRef(null);
  useEffect(() => {
    hasScrolled.current = null;
  }, [post]);

  useEffect(() => {
    // @ts-expect-error spike any types
    let timer;

    if (post) {
      timer = setTimeout(() => {
        const backToLatestComponent = document.getElementById('post');

        scrollIntoView(backToLatestComponent, hasScrolled, isReducedMotion);
      }, 800);
    }
    // @ts-expect-error spike any types
    return () => clearTimeout(timer);
  }, [post, hasScrolled, isReducedMotion]);

  return { hasScrolled };
};
export default useScrollToLinkable;
