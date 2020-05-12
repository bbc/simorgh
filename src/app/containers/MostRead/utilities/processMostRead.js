import pathOr from 'ramda/src/pathOr';
import nodeLogger from '#lib/logger.node';
import { mostReadRecordIsFresh } from '.';
import { INSUFFICIENT_DATA_TO_RENDER_ITEM } from '#lib/logger.const';

const logger = nodeLogger(__filename);

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
    const items = [];
    for (let i = 0; i < records.length; i += 1) {
      const mostReadItemData = getMostReadItemData(records[i]);
      const { href, title } = mostReadItemData;
      if (href && title) {
        items.push(mostReadItemData);
      } else {
        logger.info(
          JSON.stringify(
            {
              event: INSUFFICIENT_DATA_TO_RENDER_ITEM,
              message: 'Most read item is missing title or link',
            },
            null,
            2,
          ),
        );
      }

      if (items.length === numberOfItems) {
        break;
      }
    }
    return items;
  }
  return null;
};

export default mostReadItems;
