import pathOr from 'ramda/src/pathOr';
import nodeLogger from '#lib/logger.node';
import filterPopularStaleData from '#app/lib/utilities/filterPopularStaleData';
import { MOST_READ_DATA_INCOMPLETE } from '#lib/logger.const';

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

  const filteredData = filterPopularStaleData({
    data,
    isAmp,
    service,
    popularType: 'mostRead',
  });
  const records = pathOr([], ['records'], filteredData);

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
};

export default mostReadItems;
