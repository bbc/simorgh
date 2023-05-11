import { css, Theme } from '@emotion/react';
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
import {
  GROUP_0_MAX_WIDTH,
  GROUP_1_ONLY,
  GROUP_2_ONLY,
  GROUP_3_MIN_WIDTH,
  GROUP_5_MIN_WIDTH,
} from '../../../ThemeProvider/mediaQueries';
import { Services } from '../../../../models/types/global';
import { Size } from '../../types';
import { grid } from '../../../../legacy/psammead/psammead-styles/src/detection';

const styles = {
  styledSpan: ({ palette, fontVariants }: Theme) =>
    css({
      position: 'relative',
      color: palette.POSTBOX,
      margin: 0,
      padding: 0,
      ...fontVariants.serifLight,
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

interface OneColumnStylesProps {
  numberOfItems: number;
  service: Services;
  size: Size;
}

const listHasDoubleDigits = numberOfItems => numberOfItems > 9;

const getRankMinWidth = ({
  service,
  numberOfItems,
  size,
}: OneColumnStylesProps) => {
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

const getMinWidthGroup0 = ({
  numberOfItems,
  service,
  size,
}: OneColumnStylesProps) => {
  return listHasDoubleDigits(numberOfItems)
    ? getRankMinWidth({ numberOfItems, service, size }).group0WithOneColumn
    : getRankMinWidth({ numberOfItems, service, size }).group0;
};

const getMinWidthGroup1 = ({
  numberOfItems,
  service,
  size,
}: OneColumnStylesProps) => {
  return listHasDoubleDigits(numberOfItems)
    ? getRankMinWidth({ numberOfItems, service, size }).group1WithOneColumn
    : getRankMinWidth({ numberOfItems, service, size }).group1;
};

const getMinWidthGroup2 = ({
  numberOfItems,
  service,
  size,
}: OneColumnStylesProps) => {
  return listHasDoubleDigits(numberOfItems)
    ? getRankMinWidth({ numberOfItems, service, size }).group2WithOneColumn
    : getRankMinWidth({ numberOfItems, service, size }).group2;
};

const getMinWidthGroup3 = ({
  numberOfItems,
  service,
  size,
}: OneColumnStylesProps) => {
  return listHasDoubleDigits(numberOfItems)
    ? getRankMinWidth({ numberOfItems, service, size }).group3WithOneColumn
    : getRankMinWidth({ numberOfItems, service, size }).group3;
};

const getOneColumnStyles = ({
  numberOfItems,
  service,
  size,
}: OneColumnStylesProps) => {
  return css({
    [GROUP_0_MAX_WIDTH]: {
      minWidth: getMinWidthGroup0({ numberOfItems, service, size }),
    },
    [GROUP_1_ONLY]: {
      minWidth: getMinWidthGroup1({ numberOfItems, service, size }),
    },
    [GROUP_2_ONLY]: {
      minWidth: getMinWidthGroup2({ numberOfItems, service, size }),
    },
    [GROUP_3_MIN_WIDTH]: {
      minWidth: getMinWidthGroup3({ numberOfItems, service, size }),
    },
  });
};

// Not a great name for these props but will change later/ this interface may be unnecessary
interface Props {
  listIndex: number;
  numberOfItems: number;
  supportsGrid: boolean;
}

interface Group3TwoColumnProps extends Props {
  service: Services;
  size: Size;
}

interface TwoColumnStyleProps extends OneColumnStylesProps {
  listIndex: number;
}

const isOnSecondColumn = ({ listIndex, numberOfItems, supportsGrid }: Props) =>
  supportsGrid ? listIndex > Math.ceil(numberOfItems / 2) : listIndex % 2 === 0;

// This checks whether the 2nd column contains a double digit value
const columnIncludesDoubleDigits = ({
  listIndex,
  numberOfItems,
  supportsGrid,
}: Props) =>
  isOnSecondColumn({
    listIndex,
    numberOfItems,
    supportsGrid,
  }) && listHasDoubleDigits(numberOfItems);

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
    ? getRankMinWidth({ numberOfItems, service, size }).group3WithTwoColumns
    : getRankMinWidth({ numberOfItems, service, size }).group3;
};

const getTwoColumnStyles = ({
  listIndex,
  numberOfItems,
  service,
  size,
}: TwoColumnStyleProps) => {
  return [
    getOneColumnStyles({ numberOfItems, service, size }),
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

// Ensures the 5th and 10th rank aligns with each other
const isFiveOrTen = ({
  listIndex,
  service,
  numberOfItems,
  size,
}: TwoColumnStyleProps) => {
  return listIndex === 5 || listIndex === 10
    ? getRankMinWidth({ service, numberOfItems, size }).group5WithFiveColumns
    : getRankMinWidth({ service, numberOfItems, size }).group5;
};

const getMultiColumnStyles = ({
  listIndex,
  numberOfItems,
  service,
  size,
}: TwoColumnStyleProps) => {
  return [
    getTwoColumnStyles({
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
export { getOneColumnStyles, getTwoColumnStyles, getMultiColumnStyles };
