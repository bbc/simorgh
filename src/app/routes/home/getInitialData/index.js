import pipe from 'ramda/src/pipe';
import pathOr from 'ramda/src/pathOr';
import { getRadioScheduleEndpoint } from '#lib/utilities/getRadioSchedulesUrls';
import serviceConfigs from '#server/utilities/serviceConfigs'; // or we could just have an array of services.
import { getQueryString } from '#lib/utilities/urlParser';
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
  const { SIMORGH_APP_ENV, SIMORGH_BASE_URL } = process.env;
  const config = serviceConfigs[service];

  const hasRadioSchedule = pathOr(
    false,
    ['default', 'radioSchedule', 'hasRadioSchedule'],
    config,
  );

  if (!hasRadioSchedule) {
    const { json, ...rest } = await fetchPageData(path);

    return {
      ...rest,
      ...(json && {
        pageData: transformJson(json),
      }),
    };
  }

  const radioSchedulesUrl = getRadioScheduleEndpoint({
    baseUrl: SIMORGH_BASE_URL,
    service,
    env: SIMORGH_APP_ENV,
    queryString: getQueryString(path),
  });

  const [{ json, ...rest }, radioSchedulesData] = await Promise.all([
    fetchPageData(path),
    fetchPageData(radioSchedulesUrl, true),
  ]);

  return {
    ...rest,
    ...(json && {
      pageData: transformJson(json),
      ssrData: {
        [radioSchedulesUrl]: radioSchedulesData && radioSchedulesData.json,
      },
    }),
  };
};
