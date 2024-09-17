/** @jsx jsx */
import { jsx } from '@emotion/react';
import {
  Burmese,
  Bengali,
  EasternArabic,
  Nepali,
  WesternArabic,
} from '#legacy/psammead/psammead-locales/src/numerals';
import { Services } from '#models/types/global';
import { ColumnLayout, MostReadRankProps, Size } from '../../types';
import styles, {
  getOneColumnCss,
  getTwoColumnCss,
  getMultiColumnCss,
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

interface ColumnCssProps {
  listIndex: number | string;
  numberOfItems: number;
  service: Services;
  size: Size;
  columnLayout: ColumnLayout;
}

const getColumnCss = ({
  columnLayout,
  numberOfItems,
  service,
  size,
  listIndex,
}: ColumnCssProps) =>
  ({
    oneColumn: getOneColumnCss({ numberOfItems, service, size }),
    twoColumn: getTwoColumnCss({
      listIndex,
      numberOfItems,
      service,
      size,
    }),
    multiColumn: getMultiColumnCss({
      listIndex,
      numberOfItems,
      service,
      size,
    }),
  })[columnLayout];

const MostReadRank = ({
  service,
  listIndex,
  numberOfItems,
  columnLayout = 'multiColumn',
  size,
  isAmp,
  dir,
}: MostReadRankProps) => {
  const numerals = serviceNumerals(service);
  const rank = isAmp ? listIndex : numerals[listIndex];
  const columnCss = getColumnCss({
    columnLayout,
    numberOfItems,
    service,
    size,
    listIndex,
  });

  return (
    <div css={columnCss} dir={dir}>
      <span
        css={[
          styles.span,
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
