import { useEffect, useRef } from 'react';
import scrollIntoView from '../helpers/scroll-into-view';

// This isn't being used by this implementation since the #post overrides
// #post is hardcoded in the link whereas the Sumary Points should have custom logic.
// @ts-expect-error spike any types
const useScrollToLinkable = ({ post, isReducedMotion }) => {
  const hasScrolled = useRef(null);
  //   don't know what this does
  useEffect(() => {
    hasScrolled.current = null;
  }, [post]);

  useEffect(() => {
    // @ts-expect-error spike any types
    let timer;

    if (post) {
      timer = setTimeout(() => {
        const componentToFocusOn = document.getElementById('post');
        scrollIntoView(componentToFocusOn, hasScrolled, isReducedMotion);
      }, 800);
    }
    // @ts-expect-error spike any types
    return () => clearTimeout(timer);
  }, [post, hasScrolled, isReducedMotion]);

  return { hasScrolled };
};
export default useScrollToLinkable;
