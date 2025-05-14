/** @jsx jsx */
import { useCallback, useContext, useEffect, useState } from 'react';
import { jsx } from '@emotion/react';
import { NavigationButtonsProp } from '#app/models/types/portraitVideoCarousel';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles, { PROMO_ITEM_WIDTH } from './index.styles';
import { LeftChevron, RightChevron } from '../../icons';

export default ({ scrollPaneRef }: NavigationButtonsProp) => {
  const { dir } = useContext(ServiceContext);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollButtons = useCallback(() => {
    if (!scrollPaneRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollPaneRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  }, [scrollPaneRef]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollPaneRef.current) return;
    const scrollAmount =
      direction === 'left' ? -PROMO_ITEM_WIDTH : PROMO_ITEM_WIDTH;
    scrollPaneRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
    setTimeout(checkScrollButtons, 100);
  };

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
    <div css={styles.buttonGroupOverlay}>
      <div css={styles.buttonGroup}>
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => scroll(dir === 'ltr' ? 'left' : 'right')}
          disabled={!canScrollLeft}
          css={styles.navButton}
          data-testid="pv-left-nav-button"
        >
          <LeftChevron />
        </button>
        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => scroll(dir === 'ltr' ? 'right' : 'left')}
          disabled={!canScrollRight}
          css={styles.navButton}
          data-testid="pv-right-nav-button"
        >
          <RightChevron />
        </button>
      </div>
    </div>
  );
};
