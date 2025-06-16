/** @jsx jsx */
import { useCallback, useContext, useEffect, useState } from 'react';
import { jsx } from '@emotion/react';
import {
  ScrollDirection,
  PortraitVideoCarouselNavigationProps,
} from '#app/models/types/portraitVideo';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { Chevron, ChevronOrientation } from '#app/components/icons';
import styles from './index.styles';
import useScrollUtil from '../utils/useScrollUtil';

const DEFAULT_TRANSLATION = {
  previous: 'Scroll to previous item',
  next: 'Scroll to next item',
};

export default ({ scrollPaneRef }: PortraitVideoCarouselNavigationProps) => {
  const {
    dir,
    translations: { carousel = DEFAULT_TRANSLATION },
  } = useContext(ServiceContext);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const { checkScrollButtons, scroll } = useScrollUtil({
    scrollPaneRef,
    setCanScrollLeft,
    setCanScrollRight,
  });

  const { previous: isScrollableLeft, next: isScrollableRight } = carousel;

  useEffect(() => {
    const scrollElement = scrollPaneRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScrollButtons);
    }
    checkScrollButtons();
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', checkScrollButtons);
      }
    };
  }, [checkScrollButtons, scrollPaneRef]);

  return (
    <div css={styles.buttonGroupOverlay} aria-hidden="true">
      <div css={styles.buttonGroup}>
        <button
          type="button"
          aria-label={isScrollableLeft}
          onClick={() => scroll(dir === 'ltr' ? 'left' : 'right')}
          disabled={!canScrollLeft}
          css={styles.navButton}
          tabIndex={-1}
          data-testid="pv-scroll-left"
        >
          <Chevron orientation={ChevronOrientation.BACKWARD} dir={dir} />
        </button>
        <button
          type="button"
          aria-label={isScrollableRight}
          onClick={() => scroll(dir === 'ltr' ? 'right' : 'left')}
          disabled={!canScrollRight}
          css={styles.navButton}
          tabIndex={-1}
          data-testid="pv-scroll-right"
        >
          <Chevron orientation={ChevronOrientation.FORWARD} dir={dir} />
        </button>
      </div>
    </div>
  );
};
