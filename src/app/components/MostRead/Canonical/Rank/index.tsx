import React from 'react';
import {
  Burmese,
  Bengali,
  EasternArabic,
  Nepali,
  WesternArabic,
} from '../../../../legacy/psammead/psammead-locales/src/numerals';
import { Services } from '../../../../models/types/global';
import { ColumnLayout, MostReadRankProps, Size } from '../../types';

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

const getColumnClasses = ({
  columnLayout,
  numberOfItems,
  service,
  size,
  listIndex,
}: ColumnCssProps) => {
  // Base classes for most read rank
  let classes = '';
  
  // Add responsive minimum width classes based on column layout
  if (columnLayout === 'oneColumn') {
    classes += 'min-w-[2.5rem] group-0:min-w-[2.75rem] group-1:min-w-[2.75rem] group-2:min-w-[3rem] group-3:min-w-[3rem] ';
  } else if (columnLayout === 'twoColumn') {
    classes += 'min-w-[2.5rem] group-0:min-w-[2.75rem] group-1:min-w-[2.75rem] group-2:min-w-[3rem] group-3:min-w-[3.25rem] ';
  } else {
    classes += 'min-w-[2.5rem] group-0:min-w-[2.75rem] group-1:min-w-[2.75rem] group-2:min-w-[3rem] group-3:min-w-[3.25rem] group-5:min-w-[3.5rem] ';
  }
  
  // Handle double digit adjustments
  if (numberOfItems > 9) {
    classes += 'group-0:min-w-[3.25rem] group-1:min-w-[3.25rem] group-2:min-w-[3.5rem] group-3:min-w-[3.5rem] ';
  }
  
  return classes;
};

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
  const columnClasses = getColumnClasses({
    columnLayout,
    numberOfItems,
    service,
    size,
    listIndex,
  });

  return (
    <div className={columnClasses} dir={dir}>
      <span
        className={`font-serif-light relative text-postbox m-0 p-0 ${size === 'small' ? 'text-trafalgar' : 'text-foolscap'} ${service === 'japanese' ? 'tracking-[-0.5rem]' : ''}`}
      >
        {rank}
      </span>
    </div>
  );
};

export default MostReadRank;
