import getSchedules from '#api/getSchedules';

const getMostRead = () => Promise.resolve({ mostRead: 'most read data' });

const getSecondaryData = async (pageType, service) => {
  const dataByPageType = {
    IDX: { schedules: getSchedules(service), mostRead: getMostRead },
  };

  const secondaryFetches = dataByPageType[pageType] || [];

  const secondaryData = await Promise.all(
    Object.values(secondaryFetches).map(fn => fn()),
  );

  const secondaryDataKeys = Object.keys(secondaryFetches);

  return secondaryData.reduce(
    (processed, result, index) => ({
      ...processed,
      [secondaryDataKeys[index]]: result,
    }),
    {},
  );
};

export default getSecondaryData;
