import { ScrollDirection } from '#app/models/types/portraitVideo';
import { Dispatch, RefObject, SetStateAction, useCallback } from 'react';
import { PROMO_ITEM_WIDTH_MIN } from './styleUtils';

type UseCheckScrollButtonParameterType = {
  scrollPaneRef: RefObject<HTMLUListElement | null>;
  setCanScrollLeft: Dispatch<SetStateAction<boolean>>;
  setCanScrollRight: Dispatch<SetStateAction<boolean>>;
};

export default ({
  scrollPaneRef,
  setCanScrollLeft,
  setCanScrollRight,
}: UseCheckScrollButtonParameterType) => {
  if (!scrollPaneRef?.current) {
    return { checkScrollButtons: () => null, scroll: () => null };
  }

  const checkScrollButtons = useCallback(() => {
    if (!scrollPaneRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollPaneRef.current;

    const absoluteLeftValue = Math.abs(scrollLeft);
    setCanScrollLeft(absoluteLeftValue > 0);
    setCanScrollRight(absoluteLeftValue + clientWidth + 1 < scrollWidth);
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

  return { checkScrollButtons, scroll };
};
