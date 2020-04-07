import { mostReadRecordIsFresh } from '../utilities';

const isTest = process.env.SIMORGH_APP_ENV === 'test';

const mostReadItems = ({ data, numberOfItems }) => {
  if (isTest || mostReadRecordIsFresh(data.lastRecordTimeStamp)) {
    return data.records
      .slice(0, numberOfItems)
      .map(({ id, promo: { headlines, locators, timestamp } }) => ({
        id,
        title: headlines.shortHeadline,
        href: locators.assetUri,
        timestamp,
      }));
  }
  return [];
};

export default mostReadItems;
