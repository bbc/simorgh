import nodeLogger from '#lib/logger.node';
import { MOST_READ_STALE_DATA } from '#lib/logger.const';
import { isDataStale } from './isDataStale';
import isLive from '../isLive';

const logger = nodeLogger(__filename);

const filterPopularStaleData = ({ data, isAmp, path = undefined, service }) => {
  if (!data) {
    return null;
  }
  // The local/test data for most read/watched renders fixture data, so the data is stale
  const logEvent = MOST_READ_STALE_DATA;

  // Do not show most read if lastRecordUpdated is greater than 60min as this means PopAPI has failed twice
  // in succession. This suggests ATI may be having issues, hence risk of stale data.
  if (isLive() && isDataStale(data.lastRecordTimeStamp)) {
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
