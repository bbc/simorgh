import { useCallback, use, useEffect, useState, RefObject } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { Chevron, ChevronOrientation } from '#app/components/icons';
import styles from './index.styles';
import { PROMO_ITEM_WIDTH_MIN } from '../utils/styleUtils';

const DEFAULT_TRANSLATION = {
  previous: 'Scroll to previous item',
  next: 'Scroll to next item',
};

type ScrollDirection = 'left' | 'right';

type PortraitVideoCarouselNavigationProps = {
  scrollPaneRef: RefObject<HTMLUListElement | null>;
};

export default ({ scrollPaneRef }: PortraitVideoCarouselNavigationProps) => {
  const {
    dir,
    translations: { carousel = DEFAULT_TRANSLATION },
  } = use(ServiceContext);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const { previous: isScrollableLeft, next: isScrollableRight } = carousel;

  const checkScrollButtons = useCallback(() => {
    if (!scrollPaneRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollPaneRef.current;

    const absoluteLeftValue = Math.abs(scrollLeft);
    setCanScrollLeft(absoluteLeftValue > 0);
    setCanScrollRight(absoluteLeftValue + clientWidth + 1 < scrollWidth);
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
