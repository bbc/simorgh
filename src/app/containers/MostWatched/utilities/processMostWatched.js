import pathOr from 'ramda/src/pathOr';
import filterPopularStaleData from '#app/lib/utilities/filterPopularStaleData';

const processMostWatchedData = ({ data, isAmp, numberOfItems, service }) => {
  if (!data) {
    return [];
  }
  const filteredData = filterPopularStaleData({
    data,
    isAmp,
    service,
    popularType: 'mostWatched',
  });
  const records = pathOr([], ['records'], filteredData);
  return records.slice(0, numberOfItems).map(item => item.promo);
};

export default processMostWatchedData;
