import nodeLogger from '#lib/logger.node';
import {
  MOST_WATCHED_STALE_DATA,
  MOST_READ_STALE_DATA,
} from '#lib/logger.const';
import { isDataStale } from './isDataStale';

const logger = nodeLogger(__filename);

const filterPopularStaleData = ({
  data,
  isAmp,
  path,
  service,
  popularType,
}) => {
  if (!data) {
    return null;
  }
  // The ARES test endpoint for most read/watched renders fixture data, so the data is stale
  const isTest = process.env.SIMORGH_APP_ENV === 'test';
  const logEvent =
    popularType === 'mostRead' ? MOST_READ_STALE_DATA : MOST_WATCHED_STALE_DATA;
  // Do not show most read if lastRecordUpdated is greater than 60min as this means PopAPI has failed twice
  // in succession. This suggests ATI may be having issues, hence risk of stale data.
  if (!isTest && isDataStale(data.lastRecordTimeStamp)) {
    logger.warn(logEvent, {
      message: 'lastRecordTimeStamp is greater than 60min',
      lastRecordTimeStamp: data.lastRecordTimeStamp,
      generated: data.generated,
      service,
      isAmp,
      path,
    });
    return null;
  }

  return data;
};

export default filterPopularStaleData;
