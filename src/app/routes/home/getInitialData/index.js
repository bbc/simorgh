import pipe from 'ramda/src/pipe';
import { pathOr } from 'ramda';
import { getRadioScheduleEndpoint } from '#lib/utilities/getRadioSchedulesUrls';
import fetchPageData, { fetchData } from '../../utils/fetchPageData';
import filterUnknownContentTypes from './filterUnknownContentTypes';
import filterEmptyGroupItems from './filterEmptyGroupItems';
import squashTopStories from './squashTopStories';
import addIdsToItems from './addIdsToItems';
import filterGroupsWithoutStraplines from './filterGroupsWithoutStraplines';
import { getQueryString } from '#lib/utilities/urlParser';
import processRadioSchedule from '#containers/RadioSchedule/utilities/processRadioSchedule';

const transformJson = pipe(
  filterUnknownContentTypes,
  filterEmptyGroupItems,
  addIdsToItems,
  squashTopStories,
  filterGroupsWithoutStraplines,
);

export default async ({ path, service, variant = 'default' }) => {
  // should we think of a resusable pattern for using config outside of our react app?
  // such as const config = await getConfig(service, variant);
  const { service: config } = await import(`#lib/config/services/${service}`);

  // checklist
  // import config for the current service (without bloating the bundle size to 2MB) /
  // only fetch radio schedule data if:
  //   radio schedules is toggled on for this environment.
  //   the page requires radio schedule data. /
  // if it does, fetch that data /
  // if we successfully fetch that data, process it (so we don't add 5,500 lines of JSON to the window) and merge into pageData /
  // if we don't successfully fetch the data, don't try and merge it into page data. /
  // make this reusable for other page types that need radio schedules data.
  // find a way to deal with config imports in tests

  const hasRadioSchedule = pathOr(
    false,
    [variant, 'radioSchedule', 'hasRadioSchedule'],
    config,
  );

  const radioScheduleOnFrontPage = pathOr(
    false,
    [variant, 'radioSchedule', 'onFrontPage'],
    config,
  );

  const { json, ...rest } = await fetchPageData(path);

  if (!(hasRadioSchedule && radioScheduleOnFrontPage)) {
    return {
      ...rest,
      ...(json && {
        pageData: {
          ...transformJson(json),
        },
      }),
    };
  }

  const { SIMORGH_APP_ENV, SIMORGH_BASE_URL } = process.env;

  const radioSchedulesUrl = getRadioScheduleEndpoint({
    service,
    env: SIMORGH_APP_ENV,
    queryString: getQueryString(path),
  });

  // add the base url in the above function rather than concatenting here
  // do this in parallel with the page data fetching instead of afterwards.
  const radioSchedulesResponse = await fetchData(
    `${SIMORGH_BASE_URL}${radioSchedulesUrl}`,
  );

  const radioScheduleData = processRadioSchedule(
    radioSchedulesResponse.json,
    service,
    Date.now(),
  );

  return {
    ...rest,
    ...(json && {
      pageData: {
        ...transformJson(json),
        radioScheduleData,
      },
    }),
  };
};
