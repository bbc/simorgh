import pixelsToRem from '#app/utilities/pixelsToRem';
import { Theme } from '@emotion/react';

export const PROMO_ITEM_WIDTH_MIN = 147;
export const NAVIGATION_BUTTON_RATIO = 0.5;
export const PROMO_PEEK_RATIO = 0.33;

// If container exceeds width then apply styles
export const MAIN_CONTENT_MIN_WIDTH_CONTAINER_QUERY = `@container (min-width: ${pixelsToRem(1008)}rem)`;

export const calculatePromoWidth = ({
  fitForNItems,
  gapWidth = 0,
  navButtonAffordance = false,
}: {
  fitForNItems: number;
  gapWidth?: number;
  navButtonAffordance?: boolean;
}) =>
  `calc((100% / ${fitForNItems + (navButtonAffordance ? NAVIGATION_BUTTON_RATIO : PROMO_PEEK_RATIO)}) - ${gapWidth}rem)`;

const calculateNavContainerWidth = (fitForNItems: number) =>
  `calc(${calculatePromoWidth({ fitForNItems, navButtonAffordance: true })} * ${NAVIGATION_BUTTON_RATIO})`;

export const calculateVariedNavContainerWidths = ({
  mq,
  display,
  widthParameter = 'width',
}: {
  mq: Theme['mq'];
  display: string;
  widthParameter?: string;
}) => ({
  [mq.GROUP_3_MIN_WIDTH]: {
    [mq.POINTER]: {
      display,
      [widthParameter]: calculateNavContainerWidth(3),
    },
  },
  [mq.GROUP_4_MIN_WIDTH]: {
    [MAIN_CONTENT_MIN_WIDTH_CONTAINER_QUERY]: {
      display,
      [widthParameter]: calculateNavContainerWidth(4),
    },
  },
  [mq.GROUP_5_MIN_WIDTH]: {
    [MAIN_CONTENT_MIN_WIDTH_CONTAINER_QUERY]: {
      display,
      [widthParameter]: calculateNavContainerWidth(5),
    },
  },
});
