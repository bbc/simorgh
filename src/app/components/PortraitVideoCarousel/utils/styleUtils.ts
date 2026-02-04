import pixelsToRem from '#app/utilities/pixelsToRem';
import { Theme } from '@emotion/react';

export const PROMO_ITEM_WIDTH_MIN = 147;
export const NAVIGATION_BUTTON_RATIO = 0.5;
export const PROMO_PEEK_RATIO = 0.33;

// If container exceeds width then apply styles
export const getContainerQuery = (mainContentMinWidth: number) =>
  `@container (min-width: ${pixelsToRem(mainContentMinWidth)}rem)`;

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
  gridWidths,
}: {
  mq: Theme['mq'];
  display: string;
  widthParameter?: string;
  gridWidths: Theme['gridWidths'];
}) => ({
  [mq.GROUP_3_MIN_WIDTH]: {
    [mq.POINTER]: {
      display,
      [widthParameter]: calculateNavContainerWidth(3),
    },
  },
  [mq.GROUP_4_MIN_WIDTH]: {
    [getContainerQuery(gridWidths[900])]: {
      display,
      [widthParameter]: calculateNavContainerWidth(4),
    },
  },
  [mq.GROUP_5_MIN_WIDTH]: {
    [getContainerQuery(gridWidths[1008])]: {
      display,
      [widthParameter]: calculateNavContainerWidth(5),
    },
  },
});
