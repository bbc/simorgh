import pathOr from 'ramda/src/pathOr';
import nodeLogger from '#lib/logger.node';
import { MOST_WATCHED_PROCESS_ERROR } from '#lib/logger.const';
import filterPopularStaleData from '#app/lib/utilities/filterPopularStaleData';

const logger = nodeLogger(__filename);

const processMostWatched = ({ data, path, service, toggles }) => {
  if (!data) {
    return data;
  }

  const { mostWatched } = data;

  if (!mostWatched) {
    return data;
  }

  const defaultToggle = {
    enabled: false,
    value: `{"numberOfItems": 10}`,
  };

  const { mostWatched: mostWatchedToggle } = toggles;
  if (!mostWatchedToggle) {
    logger.warn(MOST_WATCHED_PROCESS_ERROR, {
      message: 'Invalid most watched toggle',
      service,
      path,
    });
  }

  const { enabled, value } = mostWatchedToggle || defaultToggle;
  let numberOfItems = 10;

  try {
    const parsedValue = JSON.parse(value);
    numberOfItems = parsedValue.numberOfItems;
  } catch (e) {
    logger.warn(MOST_WATCHED_PROCESS_ERROR, {
      message: e.message,
      service,
      path,
    });
  }

  if (!enabled) {
    return { ...data, mostWatched: null };
  }
  const filteredData = filterPopularStaleData({
    data: mostWatched,
    path,
    service,
    popularType: 'mostWatched',
  });

  if (!filteredData) {
    return null;
  }

  const records = pathOr([], ['records'], filteredData);
  const processedRecords = records
    .slice(0, numberOfItems)
    .sort((a, b) => a.rank - b.rank)
    .map(item => item.promo);

  return { ...data, mostWatched: processedRecords };
};

export default processMostWatched;
