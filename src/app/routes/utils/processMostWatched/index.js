import pathOr from 'ramda/src/pathOr';
import nodeLogger from '#lib/logger.node';
import { MOST_WATCHED_PROCESS_ERROR } from '#lib/logger.const';
import filterPopularStaleData from '#app/lib/utilities/filterPopularStaleData';

const logger = nodeLogger(__filename);

const processToggles = ({ toggles, service, path, page }) => {
  try {
    const { mostPopularMedia, mostPopularMediaPage } = toggles;
    const { enabled, value } =
      page === 'MAP' ? mostPopularMedia : mostPopularMediaPage;

    const numberOfItems = parseInt(value, 10);

    if (Number.isNaN(numberOfItems)) {
      throw Error('Invalid number of items');
    }

    return { enabled, numberOfItems };
  } catch (e) {
    logger.warn(MOST_WATCHED_PROCESS_ERROR, {
      message: e.message,
      service,
      path,
    });
    return { enabled: false, numberOfItems: 10 };
  }
};

const processMostWatched = ({ data, path, service, toggles, page }) => {
  if (!data || !data.mostWatched) {
    return data;
  }

  const { mostWatched } = data;
  const { enabled, numberOfItems } = processToggles({
    toggles,
    service,
    path,
    page,
  });
  const filteredData = filterPopularStaleData({
    data: mostWatched,
    path,
    service,
    popularType: 'mostWatched',
  });

  if (!filteredData || !enabled) {
    return { ...data, mostWatched: null };
  }

  const records = pathOr([], ['records'], filteredData);
  const processedRecords = records
    .slice(0, numberOfItems)
    .sort((a, b) => a.rank - b.rank)
    .map(item => item.promo);

  return { ...data, mostWatched: processedRecords };
};

export default processMostWatched;
