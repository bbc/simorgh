import pathOr from 'ramda/src/pathOr';
import { mostReadRecordIsFresh } from '.';

const getMostReadItemData = record => {
  const cpsHeadline = pathOr(
    null,
    ['promo', 'headlines', 'shortHeadline'],
    record,
  );
  const optimoHeadline = pathOr(
    null,
    [
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
  const cpsLocator = pathOr(null, ['promo', 'locators', 'assetUri'], record);
  const optimoLocator = pathOr(null, ['locators', 'canonicalUrl'], record);
  const cpsTimestamp = pathOr(null, ['promo', 'timestamp'], record);
  const optimoTimestamp = pathOr(null, ['timestamp'], record);

  return {
    id: record.id,
    title: cpsHeadline || optimoHeadline,
    href: cpsLocator || optimoLocator,
    timestamp: cpsTimestamp || optimoTimestamp,
  };
};

const mostReadItems = ({ data, numberOfItems }) => {
  if (!data) {
    return null;
  }
  const records = pathOr([], ['records'], data);

  // The ARES test endpoint for most read renders fixture data, so the data is stale
  const isTest = process.env.SIMORGH_APP_ENV === 'test';

  // Do not show most read if lastRecordUpdated is greater than 35min as this means PopAPI has failed twice
  // in succession. This suggests ATI may be having issues, hence risk of stale data.
  if (isTest || mostReadRecordIsFresh(data.lastRecordTimeStamp)) {
    const items = records
      .map(record => getMostReadItemData(record))
      .filter(record => record.title && record.href)
      .slice(0, numberOfItems);
    return items;
  }
  return null;
};

export default mostReadItems;
