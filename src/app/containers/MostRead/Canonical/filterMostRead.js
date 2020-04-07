import pathOr from 'ramda/src/pathOr';
import { mostReadRecordIsFresh } from '../utilities';

// The ARES test endpoint for most read renders fixture data, so the data is stale
const isTest = process.env.SIMORGH_APP_ENV === 'test';

const mostReadItems = ({ data, numberOfItems }) => {
  if (!data) {
    return null;
  }

  const records = pathOr([], ['records'], data);

  // Do not show most read if lastRecordUpdated is greater than 35min as this means PopAPI has failed twice
  // in succession. This suggests ATI may be having issues, hence risk of stale data.
  if (isTest || mostReadRecordIsFresh(data.lastRecordTimeStamp)) {
    return records
      .slice(0, numberOfItems)
      .map(({ id, promo: { headlines, locators, timestamp } }) => ({
        id,
        title: headlines.shortHeadline,
        href: locators.assetUri,
        timestamp,
      }));
  }
  return null;
};

export default mostReadItems;
