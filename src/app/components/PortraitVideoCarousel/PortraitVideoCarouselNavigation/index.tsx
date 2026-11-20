import {
  useCallback,
  use,
  useEffect,
  useState,
  RefObject,
  CSSProperties,
  MouseEvent,
} from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { Chevron, ChevronOrientation } from '#app/components/icons';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import styles from './index.module.scss';
import { PROMO_ITEM_WIDTH_MIN } from '../utils/styleUtils';

const DEFAULT_TRANSLATION = {
  previous: 'Scroll to previous item',
  next: 'Scroll to next item',
};

type ScrollDirection = 'left' | 'right';

type PortraitVideoCarouselNavigationProps = {
  scrollPaneRef: RefObject<HTMLUListElement | null>;
  backgroundColor?: string;
  eventTrackingData?: EventTrackingData;
};

export default ({
  scrollPaneRef,
  backgroundColor,
  eventTrackingData,
}: PortraitVideoCarouselNavigationProps) => {
  const {
    dir,
    translations: { carousel = DEFAULT_TRANSLATION },
  } = use(ServiceContext);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const { previous: isScrollableLeft, next: isScrollableRight } = carousel;

  const previousClickTracker = useClickTrackerHandler({
    ...eventTrackingData,
    itemTracker: {
      type: 'portrait-video-carousel-navigation',
      text: 'previous',
      position: 1,
    },
    preventNavigation: true,
  });

  const nextClickTracker = useClickTrackerHandler({
    ...eventTrackingData,
    itemTracker: {
      type: 'portrait-video-carousel-navigation',
      text: 'next',
      position: 2,
    },
    preventNavigation: true,
  });

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

  const handleClick = (
    event: MouseEvent<HTMLButtonElement>,
    buttonTriggered: ScrollDirection,
    clickTracker: ReturnType<typeof useClickTrackerHandler>,
  ) => {
    scroll(buttonTriggered);
    clickTracker?.onClick?.(event);
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

  const overlayStyle: CSSProperties & { '--navigation-background'?: string } =
    backgroundColor ? { '--navigation-background': backgroundColor } : {};

  return (
    <div
      className={styles.buttonGroupOverlay}
      style={overlayStyle}
      aria-hidden="true"
    >
      <div className={styles.buttonGroup}>
        <button
          type="button"
          aria-label={isScrollableLeft}
          onClick={event =>
            handleClick(
              event,
              dir === 'ltr' ? 'left' : 'right',
              previousClickTracker,
            )
          }
          disabled={!canScrollLeft}
          className={styles.navButton}
          tabIndex={-1}
          data-testid="pv-scroll-left"
        >
          <Chevron
            orientation={ChevronOrientation.BACKWARD}
            dir={dir}
            className={styles.icon}
          />
        </button>
        <button
          type="button"
          aria-label={isScrollableRight}
          onClick={event =>
            handleClick(
              event,
              dir === 'ltr' ? 'right' : 'left',
              nextClickTracker,
            )
          }
          disabled={!canScrollRight}
          className={styles.navButton}
          tabIndex={-1}
          data-testid="pv-scroll-right"
        >
          <Chevron
            orientation={ChevronOrientation.FORWARD}
            dir={dir}
            className={styles.icon}
          />
        </button>
      </div>
    </div>
  );
};
