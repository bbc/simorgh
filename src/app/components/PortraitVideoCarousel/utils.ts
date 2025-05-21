export const PROMO_ITEM_WIDTH_MIN = 147;
export const NAVIGATION_BUTTON_RATIO = 0.5;
export const PROMO_PEEK_RATIO = 0.33;
export const NAVIGATION_BUFFER = '1px';

export const calculateWidth = ({
  itemCount,
  gapWidth = 0,
  navButtonAffordance = false,
}: {
  itemCount: number;
  gapWidth?: number;
  navButtonAffordance?: boolean;
}) =>
  `calc((100% / ${itemCount + (navButtonAffordance ? NAVIGATION_BUTTON_RATIO : PROMO_PEEK_RATIO)}) - ${gapWidth}rem)`;
