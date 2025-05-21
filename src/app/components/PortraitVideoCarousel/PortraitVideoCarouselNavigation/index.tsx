/** @jsx jsx */
import { useCallback, useContext, useEffect, useState } from 'react';
import { jsx } from '@emotion/react';
import {
  ScrollDirection,
  PortraitVideoCarouselNavigationProps,
} from '#app/models/types/portraitVideo';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles from './index.styles';
import { LeftChevron, RightChevron } from '../../icons';
import { PROMO_ITEM_WIDTH_MIN } from '../utils';

const defaultTranslations = {
  scrollLeft: 'Scroll left',
  scrollRight: 'Scroll right',
};

export default ({ scrollPaneRef }: PortraitVideoCarouselNavigationProps) => {
  const {
    dir,
    translations: { carousel = defaultTranslations },
  } = useContext(ServiceContext);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const { scrollLeft: scrollLeftAria, scrollRight: scrollRightAria } = carousel;

  const checkScrollButtons = useCallback(() => {
    if (!scrollPaneRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollPaneRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  }, [scrollPaneRef]);

  const scroll = (buttonTriggered: ScrollDirection) => {
    if (!scrollPaneRef.current) return;
    const scrollAmount =
      buttonTriggered === 'left' ? -PROMO_ITEM_WIDTH_MIN : PROMO_ITEM_WIDTH_MIN;
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
          aria-label={scrollLeftAria}
          onClick={() => scroll(dir === 'ltr' ? 'left' : 'right')}
          disabled={!canScrollLeft}
          css={styles.navButton}
          data-testid="pv-scroll-left"
        >
          <LeftChevron />
        </button>
        <button
          type="button"
          aria-label={scrollRightAria}
          onClick={() => scroll(dir === 'ltr' ? 'right' : 'left')}
          disabled={!canScrollRight}
          css={styles.navButton}
          data-testid="pv-scroll-right"
        >
          <RightChevron />
        </button>
      </div>
    </div>
  );
};
