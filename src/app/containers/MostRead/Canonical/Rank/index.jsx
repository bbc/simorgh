import React from 'react';
import { shape, string, oneOf, number, bool } from 'prop-types';
import styled from '@emotion/styled';
import { getFoolscap, getTrafalgar } from '@bbc/gel-foundations/typography';
import {
  Burmese,
  Bengali,
  EasternArabic,
  Nepali,
  WesternArabic,
} from '@bbc/psammead-locales/numerals';
import { GEL_SPACING_HLF } from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_1_SCREEN_WIDTH_MIN,
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
  GEL_GROUP_0_SCREEN_WIDTH_MAX,
} from '@bbc/gel-foundations/breakpoints';
import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import { grid } from '@bbc/psammead-styles/detection';
import { getSerifLight } from '@bbc/psammead-styles/font-styles';
import {
  doubleDigitDefault,
  doubleDigitMedium,
  doubleDigitSmall,
  singleDigitDefault,
  singleDigitMedium,
  singleDigitSmall,
  mediumFontServices,
  smallFontServices,
} from '../../utilities/rankMinWidth';

// For additional spacing for numerals in the right column because of '10' being double digits
const isOnSecondColumn = ({ listIndex, numberOfItems }, supportsGrid) =>
  supportsGrid ? listIndex > Math.ceil(numberOfItems / 2) : listIndex % 2 === 0;

const listHasDoubleDigits = numberOfItems => numberOfItems > 9;

// This checks whether the 2nd column contains a double digit value
const columnIncludesDoubleDigits = (props, supportsGrid) =>
  isOnSecondColumn(props, supportsGrid) &&
  listHasDoubleDigits(props.numberOfItems);

// Returns a min width for the rank wrapper depending on if the list contains 10 items
// and if the numeral is considered medium/small.
const getRankMinWidth = ({ service, numberOfItems, size }) => {
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

// Ensures the 5th and 10th rank aligns with each other
const isFiveOrTen = ({ listIndex, service, numberOfItems }) => {
  return listIndex === 5 || listIndex === 10
    ? getRankMinWidth({ service, numberOfItems }).group5WithFiveColumns
    : getRankMinWidth({ service, numberOfItems }).group5;
};

const OneColumnWrapper = styled.div`
  @media (max-width: ${GEL_GROUP_0_SCREEN_WIDTH_MAX}) {
    min-width: ${props =>
      listHasDoubleDigits(props.numberOfItems)
        ? getRankMinWidth(props).group0WithOneColumn
        : getRankMinWidth(props).group0};
  }
  @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX}) {
    min-width: ${props =>
      listHasDoubleDigits(props.numberOfItems)
        ? getRankMinWidth(props).group1WithOneColumn
        : getRankMinWidth(props).group1};
  }
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    min-width: ${props =>
      listHasDoubleDigits(props.numberOfItems)
        ? getRankMinWidth(props).group2WithOneColumn
        : getRankMinWidth(props).group2};
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    min-width: ${props =>
      listHasDoubleDigits(props.numberOfItems)
        ? getRankMinWidth(props).group3WithOneColumn
        : getRankMinWidth(props).group3};
  }
`;

const TwoColumnWrapper = styled(OneColumnWrapper)`
  /* 2 columns of items at viewport 1007px and above */
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    min-width: ${props =>
      columnIncludesDoubleDigits(props, false)
        ? getRankMinWidth(props).group3WithTwoColumns
        : getRankMinWidth(props).group3};
  }
  /* different number order for when css grid is supported  */
  @supports (${grid}) {
    @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
      min-width: ${props =>
        columnIncludesDoubleDigits(props, true)
          ? getRankMinWidth(props).group3WithTwoColumns
          : getRankMinWidth(props).group3};
    }
  }
`;

const MultiColumnWrapper = styled(TwoColumnWrapper)`
  /* 5 columns of items at viewport 1280px and above */
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    min-width: ${props =>
      listHasDoubleDigits(props.numberOfItems)
        ? isFiveOrTen(props)
        : getRankMinWidth(props).group5};
  }
`;

const StyledSpan = styled.span`
  ${({ service }) => getSerifLight(service)}
  ${({ script, size }) =>
    script && size === 'small' ? getTrafalgar(script) : getFoolscap(script)}
  position: relative;
  color: ${C_POSTBOX};
  margin: 0; /* Reset */
  padding: 0;
  /* reduce the letter spacing of Japanese numerals */
  ${({ service }) =>
    service === 'japanese' && `letter-spacing: -${GEL_SPACING_HLF}`}
`;

const serviceNumerals = service => {
  const servicesNonWesternNumerals = {
    bengali: Bengali,
    burmese: Burmese,
    nepali: Nepali,
    pashto: EasternArabic,
    persian: EasternArabic,
  };
  return servicesNonWesternNumerals[service]
    ? servicesNonWesternNumerals[service]
    : WesternArabic;
};

const getColumnWrapper = columnWrapper =>
  ({
    oneColumn: OneColumnWrapper,
    twoColumn: TwoColumnWrapper,
    multiColumn: MultiColumnWrapper,
  }[columnWrapper]);

const MostReadRank = ({
  service,
  script,
  listIndex,
  numberOfItems,
  dir,
  columnLayout,
  size,
  isAmp,
}) => {
  const numerals = serviceNumerals(service);
  const rank = isAmp ? listIndex : numerals[listIndex];
  const RankWrapper = getColumnWrapper(columnLayout);

  return (
    <RankWrapper
      listIndex={listIndex}
      service={service}
      numberOfItems={numberOfItems}
      dir={dir}
      size={size}
    >
      <StyledSpan service={service} script={script} size={size}>
        {rank}
      </StyledSpan>
    </RankWrapper>
  );
};

MostReadRank.propTypes = {
  service: string.isRequired,
  script: shape(scriptPropType).isRequired,
  listIndex: oneOf(number, string).isRequired,
  numberOfItems: number.isRequired,
  dir: oneOf(['rtl', 'ltr']),
  columnLayout: oneOf([
    'oneColumn',
    'twoColumn',
    'multiColumn',
    'ampOneColumn',
  ]),
  size: oneOf(['default', 'small']),
  isAmp: bool,
};

MostReadRank.defaultProps = {
  dir: 'ltr',
  columnLayout: 'multiColumn',
  size: 'default',
  isAmp: false,
};

export default MostReadRank;
