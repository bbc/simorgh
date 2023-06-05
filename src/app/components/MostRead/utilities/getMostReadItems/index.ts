import pathOr from 'ramda/src/pathOr';
import { Services } from '../../../../models/types/global';
import {
  OptimoMostReadRecord,
  CPSMostReadRecord,
  MostReadData,
} from '../../types';

const getOptimoItemData = (record: OptimoMostReadRecord) => {
  const optimoHeadline = pathOr(
    null,
    [
      'promo',
      'headlines',
      'promoHeadline',
      'blocks',
      0,
      'model',
      'blocks',
      0,
      'model',
      'text',
    ],
    record,
  );
  const optimoLocator = pathOr(
    null,
    ['promo', 'locators', 'canonicalUrl'],
    record,
  );
  const optimoTimestamp = pathOr(null, ['promo', 'timestamp'], record);
  return {
    id: record.id,
    title: optimoHeadline,
    href: optimoLocator,
    timestamp: optimoTimestamp,
  };
};

const getCpsItemData = (record: CPSMostReadRecord) => {
  const cpsHeadline = pathOr(
    null,
    ['promo', 'headlines', 'shortHeadline'],
    record,
  );
  const cpsLocator = pathOr(null, ['promo', 'locators', 'assetUri'], record);
  const cpsTimestamp = pathOr(null, ['promo', 'timestamp'], record);

  return {
    id: record.id,
    title: cpsHeadline,
    href: cpsLocator,
    timestamp: cpsTimestamp,
  };
};

interface GetMostReadItemsProps {
  isAmp?: boolean;
  numberOfItems: number;
  service: Services;
  data: MostReadData;
}

const mostReadItems = ({ data, numberOfItems }: GetMostReadItemsProps) => {
  if (!data) {
    return null;
  }

  const records = pathOr([], ['records'], data).slice(0, numberOfItems);

  return records.map((record: CPSMostReadRecord | OptimoMostReadRecord) => {
    const mostReadItemData =
      record.promo.type === 'optimo'
        ? getOptimoItemData(record as OptimoMostReadRecord)
        : getCpsItemData(record as CPSMostReadRecord);

    return mostReadItemData;
  });
};

export default mostReadItems;
