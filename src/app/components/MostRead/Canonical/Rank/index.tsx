/** @jsx jsx */
import { jsx } from '@emotion/react';
import {
  Burmese,
  Bengali,
  EasternArabic,
  Nepali,
  WesternArabic,
} from '../../../../legacy/psammead/psammead-locales/src/numerals';
import { Services } from '../../../../models/types/global';
import { ColumnLayout, MostReadRankProps, Size } from '../../types';
import styles, {
  getMultiColumnStyles,
  getOneColumnStyles,
  getTwoColumnStyles,
} from './index.styles';

export const serviceNumerals = (service: Services) => {
  const servicesNonWesternNumerals = {
    bengali: Bengali,
    burmese: Burmese,
    nepali: Nepali,
    pashto: EasternArabic,
    persian: EasternArabic,
  };
  // @ts-expect-error Only a subset of services have non-western numerals
  return servicesNonWesternNumerals[service] || WesternArabic;
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
    multiColumn: getMultiColumnStyles({
      listIndex,
      numberOfItems,
      service,
      size,
    }),
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
