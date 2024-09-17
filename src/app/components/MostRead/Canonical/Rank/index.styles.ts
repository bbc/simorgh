import { css, Theme } from '@emotion/react';
import {
  GROUP_0_MAX_WIDTH,
  GROUP_1_ONLY,
  GROUP_2_ONLY,
  GROUP_3_MIN_WIDTH,
  GROUP_5_MIN_WIDTH,
} from '#components/ThemeProvider/mediaQueries';
import { Services } from '#models/types/global';
import { grid } from '#legacy/psammead/psammead-styles/src/detection';
import { Size } from '../../types';
import {
  singleDigitDefault,
  singleDigitMedium,
  singleDigitSmall,
  doubleDigitDefault,
  doubleDigitMedium,
  doubleDigitSmall,
  smallFontServices,
  mediumFontServices,
} from '../../utilities/rankMinWidth';

/**
 * Interface Definitions
 */
interface OneColumnProps {
  numberOfItems: number;
  service: Services;
  size: Size;
}

type RankMinWidthProps = OneColumnProps;

interface HelperFunctionProps {
  listIndex: number | string;
  numberOfItems: number;
  supportsGrid: boolean;
}

interface Group3TwoColumnProps extends HelperFunctionProps {
  service: Services;
  size: Size;
}

interface MultiColumnProps extends OneColumnProps {
  listIndex: number | string;
}

/**
 * Helper Functions
 */
const listHasDoubleDigits = (numberOfItems: number) => numberOfItems > 9;

const getRankMinWidth = ({
  service,
  numberOfItems,
  size,
}: RankMinWidthProps) => {
  const singleDigitMinWidth = {
    default: singleDigitDefault(size),
    medium: singleDigitMedium,
    small: singleDigitSmall,
  };

  const doubleDigitMinWidth = {
    default: doubleDigitDefault(size),
    medium: doubleDigitMedium(size),
    small: doubleDigitSmall,
  };

  const rankMinWidth = listHasDoubleDigits(numberOfItems)
    ? doubleDigitMinWidth
    : singleDigitMinWidth;

  if (mediumFontServices.includes(service)) {
    return rankMinWidth.medium;
  }
  if (smallFontServices.includes(service)) {
    return rankMinWidth.small;
  }
  return rankMinWidth.default;
};

const isOnSecondColumn = ({
  listIndex,
  numberOfItems,
  supportsGrid,
}: HelperFunctionProps) => {
  const index = listIndex as number;
  return supportsGrid ? index > Math.ceil(numberOfItems / 2) : index % 2 === 0;
};

// This checks whether the 2nd column contains a double digit value
const columnIncludesDoubleDigits = ({
  listIndex,
  numberOfItems,
  supportsGrid,
}: HelperFunctionProps) =>
  isOnSecondColumn({
    listIndex,
    numberOfItems,
    supportsGrid,
  }) && listHasDoubleDigits(numberOfItems);

// Ensures the 5th and 10th rank aligns with each other
const isFiveOrTen = ({
  listIndex,
  service,
  numberOfItems,
  size,
}: MultiColumnProps) => {
  return listIndex === 5 || listIndex === 10
    ? // @ts-expect-error error does not affect functionality
      getRankMinWidth({ service, numberOfItems, size }).group5WithFiveColumns
    : getRankMinWidth({ service, numberOfItems, size }).group5;
};

const getGroup3WithTwoColumns = ({
  listIndex,
  numberOfItems,
  supportsGrid,
  service,
  size,
}: Group3TwoColumnProps) => {
  return columnIncludesDoubleDigits({
    listIndex,
    numberOfItems,
    supportsGrid,
  })
    ? // @ts-expect-error error does not affect functionality
      getRankMinWidth({ numberOfItems, service, size }).group3WithTwoColumns
    : getRankMinWidth({ numberOfItems, service, size }).group3;
};

/**
 * Style Definitions
 */
const styles = {
  span: ({ palette, fontVariants }: Theme) =>
    css({
      ...fontVariants.serifLight,
      position: 'relative',
      color: palette.POSTBOX,
      margin: 0,
      padding: 0,
    }),

  smallFont: ({ fontSizes }: Theme) =>
    css({
      ...fontSizes.trafalgar,
    }),

  defaultFont: ({ fontSizes }: Theme) =>
    css({
      ...fontSizes.foolscap,
    }),

  japaneseLetterSpacing: ({ spacings }: Theme) =>
    css({
      letterSpacing: `-${spacings.HALF}rem`,
    }),
};

const getOneColumnCss = ({ numberOfItems, service, size }: OneColumnProps) => {
  return css({
    [GROUP_0_MAX_WIDTH]: {
      minWidth: listHasDoubleDigits(numberOfItems)
        ? // @ts-expect-error error does not affect functionality
          getRankMinWidth({ numberOfItems, service, size }).group0WithOneColumn
        : // @ts-expect-error error does not affect functionality
          getRankMinWidth({ numberOfItems, service, size }).group0,
    },
    [GROUP_1_ONLY]: {
      minWidth: listHasDoubleDigits(numberOfItems)
        ? // @ts-expect-error error does not affect functionality
          getRankMinWidth({ numberOfItems, service, size }).group1WithOneColumn
        : // @ts-expect-error error does not affect functionality
          getRankMinWidth({ numberOfItems, service, size }).group1,
    },
    [GROUP_2_ONLY]: {
      minWidth: listHasDoubleDigits(numberOfItems)
        ? // @ts-expect-error error does not affect functionality
          getRankMinWidth({ numberOfItems, service, size }).group2WithOneColumn
        : // @ts-expect-error error does not affect functionality
          getRankMinWidth({ numberOfItems, service, size }).group2,
    },
    [GROUP_3_MIN_WIDTH]: {
      minWidth: listHasDoubleDigits(numberOfItems)
        ? // @ts-expect-error error does not affect functionality
          getRankMinWidth({ numberOfItems, service, size }).group3WithOneColumn
        : getRankMinWidth({ numberOfItems, service, size }).group3,
    },
  });
};

const getTwoColumnCss = ({
  listIndex,
  numberOfItems,
  service,
  size,
}: MultiColumnProps) => {
  return [
    getOneColumnCss({ numberOfItems, service, size }),
    css({
      [GROUP_3_MIN_WIDTH]: {
        minWidth: getGroup3WithTwoColumns({
          listIndex,
          numberOfItems,
          supportsGrid: false,
          service,
          size,
        }),
      },
      [`@supports (${grid})`]: {
        [GROUP_3_MIN_WIDTH]: {
          minWidth: getGroup3WithTwoColumns({
            listIndex,
            numberOfItems,
            supportsGrid: true,
            service,
            size,
          }),
        },
      },
    }),
  ];
};

const getMultiColumnCss = ({
  listIndex,
  numberOfItems,
  service,
  size,
}: MultiColumnProps) => {
  return [
    getTwoColumnCss({
      listIndex,
      numberOfItems,
      service,
      size,
    }),
    css({
      [GROUP_5_MIN_WIDTH]: {
        minWidth: listHasDoubleDigits(numberOfItems)
          ? isFiveOrTen({ listIndex, service, numberOfItems, size })
          : getRankMinWidth({ service, numberOfItems, size }).group5,
      },
    }),
  ];
};

export default styles;
export { getOneColumnCss, getTwoColumnCss, getMultiColumnCss };
