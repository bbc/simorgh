import { useEffect, useRef } from 'react';
import scrollIntoView from '../helpers/scroll-into-view';

// This is used by the 'scroll' links. It requires the user to have JS enabled.
// Links that end in '#post' do not scroll because the '#post' overrides this logic. I have not worked out how to stop this.
// We can remove this if we don't want our implementation to scroll.
// Refer to the dropbox paper for a link to the PS Web implementation
// @ts-expect-error spike any types
const useScrollToLinkable = ({ post, isReducedMotion }) => {
  const hasScrolled = useRef(null);
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
