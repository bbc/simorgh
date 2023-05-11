/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { jsx } from '@emotion/react';
import {
  Burmese,
  Bengali,
  EasternArabic,
  Nepali,
  WesternArabic,
} from '#psammead/psammead-locales/src/numerals';
import { GEL_GROUP_5_SCREEN_WIDTH_MIN } from '#psammead/gel-foundations/src/breakpoints';
import { ColumnLayout, MostReadRankProps, Size } from '../../types';
import styles, { getOneColumnStyles, getTwoColumnStyles } from './index.styles';
import { Services } from '#app/models/types/global';

// For additional spacing for numerals in the right column because of '10' being double digits
const isOnSecondColumn = ({ listIndex, numberOfItems }, supportsGrid) =>
  supportsGrid ? listIndex > Math.ceil(numberOfItems / 2) : listIndex % 2 === 0;

const listHasDoubleDigits = numberOfItems => numberOfItems > 9;

// This checks whether the 2nd column contains a double digit value
const columnIncludesDoubleDigits = (props, supportsGrid) =>
  isOnSecondColumn(props, supportsGrid) &&
  listHasDoubleDigits(props.numberOfItems);

// Ensures the 5th and 10th rank aligns with each other
const isFiveOrTen = ({ listIndex, service, numberOfItems }) => {
  return listIndex === 5 || listIndex === 10
    ? getRankMinWidth({ service, numberOfItems }).group5WithFiveColumns
    : getRankMinWidth({ service, numberOfItems }).group5;
};

const MultiColumnWrapper = styled(TwoColumnWrapper)`
  /* 5 columns of items at viewport 1280px and above */
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    min-width: ${props =>
      listHasDoubleDigits(props.numberOfItems)
        ? isFiveOrTen(props)
        : getRankMinWidth(props).group5};
  }
`;

export const serviceNumerals = service => {
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

interface ColumnStylesProps {
  listIndex: number;
  numberOfItems: number;
  service: Services;
  size: Size;
  columnLayout: ColumnLayout;
}

const getColumnStyles = ({
  columnLayout,
  numberOfItems,
  service,
  size,
  listIndex,
}: ColumnStylesProps) =>
  ({
    oneColumn: getOneColumnStyles({ numberOfItems, service, size }),
    twoColumn: getTwoColumnStyles({
      listIndex,
      numberOfItems,
      service,
      size,
    }),
    multiColumn: MultiColumnWrapper,
  }[columnLayout]);

const MostReadRank = ({
  service,
  listIndex,
  numberOfItems,
  columnLayout = 'multiColumn',
  size,
  isAmp,
}: MostReadRankProps) => {
  const numerals = serviceNumerals(service);
  const rank = isAmp ? listIndex : numerals[listIndex];
  const columnStyles = getColumnStyles({
    columnLayout,
    numberOfItems,
    service,
    size,
    listIndex,
  });

  return (
    <div css={columnStyles}>
      <span
        css={[
          styles.styledSpan,
          size === 'small' ? styles.smallFont : styles.defaultFont,
          service === 'japanese' && styles.japaneseLetterSpacing,
        ]}
      >
        {rank}
      </span>
    </div>
  );
};

export default MostReadRank;
