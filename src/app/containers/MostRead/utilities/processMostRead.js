import pathOr from 'ramda/src/pathOr';
import nodeLogger from '#lib/logger.node';
import { mostReadRecordIsFresh } from '.';
import {
  MOST_READ_DATA_INCOMPLETE,
  MOST_READ_STALE_DATA,
} from '#lib/logger.const';

const logger = nodeLogger(__filename);

const getOptimoItemData = record => {
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

const getCpsItemData = record => {
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

const mostReadItems = ({ data, isAmp, numberOfItems, service }) => {
  if (!data) {
    return null;
  }
  const records = pathOr([], ['records'], data);

  // The ARES test endpoint for most read renders fixture data, so the data is stale
  const isTest = process.env.SIMORGH_APP_ENV === 'test';

  // Do not show most read if lastRecordUpdated is greater than 60min as this means PopAPI has failed twice
  // in succession. This suggests ATI may be having issues, hence risk of stale data.
  if (isTest || mostReadRecordIsFresh(data.lastRecordTimeStamp)) {
    const items = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const record of records) {
      const mostReadItemData =
        record.promo.type === 'optimo'
          ? getOptimoItemData(record)
          : getCpsItemData(record);
      const { href, title } = mostReadItemData;

      if (href && title) {
        items.push(mostReadItemData);
      } else {
        logger.warn(MOST_READ_DATA_INCOMPLETE, {
          service,
          title,
          url: href,
        });
      }

      if (items.length === numberOfItems) {
        break;
      }
    }
    return items;
  }

  logger.warn(MOST_READ_STALE_DATA, {
    message: 'lastRecordTimeStamp is greater than 60min',
    lastRecordTimeStamp: data.lastRecordTimeStamp,
    service,
    isAmp,
  });
  return null;
};

export default mostReadItems;
