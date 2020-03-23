import pipe from 'ramda/src/pipe';
import fetchPageData from '../../utils/fetchPageData';
import filterUnknownContentTypes from './filterUnknownContentTypes';
import filterEmptyGroupItems from './filterEmptyGroupItems';
import squashTopStories from './squashTopStories';
import addIdsToItems from './addIdsToItems';
import filterGroupsWithoutStraplines from './filterGroupsWithoutStraplines';

const transformJson = pipe(
  filterUnknownContentTypes,
  filterEmptyGroupItems,
  addIdsToItems,
  squashTopStories,
  filterGroupsWithoutStraplines,
);

export default async (path, service) => {
  const ssrDataSources = [
    `${process.env.SIMORGH_BASE_URL}/${service}/bbc_${service}_radio/schedule.json`, // whack this in config and use in both server and client
    // could also add most read in here
    // and any more data you need
  ];

  const { json, ...rest } = await fetchPageData(path);
  const ssrDataPayloads = await Promise.all(
    ssrDataSources.map(endpoint => fetchPageData(endpoint, false)),
  );

  const ssrData = ssrDataSources.reduce(
    (obj, curr, index) => ({ ...obj, [curr]: ssrDataPayloads[index] }),
    {},
  );

  return {
    ...rest,
    ...(json && {
      pageData: transformJson(json),
      ssrData, // the massive ares payload is all still going to be plonked onto the page. process it upfront on the server?
    }),
  };
};
