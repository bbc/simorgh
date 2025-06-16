import { ScrollDirection } from '#app/models/types/portraitVideo';
import { RefObject, useCallback, useEffect, useState } from 'react';
import { PROMO_ITEM_WIDTH_MIN } from './styleUtils';

type UseCheckScrollButtonParameterType = {
  scrollPaneRef: RefObject<HTMLUListElement | null>;
};

export default ({ scrollPaneRef }: UseCheckScrollButtonParameterType) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollButtons = useCallback(() => {
    if (!scrollPaneRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollPaneRef.current;

    const absoluteLeftValue = Math.abs(scrollLeft);
    setCanScrollLeft(absoluteLeftValue > 0);
    setCanScrollRight(absoluteLeftValue + clientWidth + 4 < scrollWidth);
  }, [scrollPaneRef, setCanScrollLeft, setCanScrollRight]);

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

  return { scroll, canScrollLeft, canScrollRight };
};
