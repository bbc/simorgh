import pipe from 'ramda/src/pipe';
import pathOr from 'ramda/src/pathOr';
import fetchPageData from '#app/routes/utils/fetchPageData';
import withRadioSchedule from '#app/routes/utils/withRadioSchedule';
import getConfig from '#app/routes/utils/getConfig';
import filterUnknownContentTypes from '#app/routes/utils/sharedDataTransformers/filterUnknownContentTypes';
import filterEmptyGroupItems from '#app/routes/utils/sharedDataTransformers/filterEmptyGroupItems';
import squashTopStories from '#app/routes/utils/sharedDataTransformers/squashTopStories';
import addIdsToItems from '#app/routes/utils/sharedDataTransformers/addIdsToItems';
import filterGroupsWithoutStraplines from '#app/routes/utils/sharedDataTransformers/filterGroupsWithoutStraplines';
import nodeLogger from '#lib/logger.node';
import { CONFIG_FETCH_ERROR } from '#lib/logger.const';
import constructTogglesEndpoint from '../utils/constructTogglesEndpoint';

const logger = nodeLogger(__filename);

const transformJson = pipe(
  filterUnknownContentTypes,
  filterEmptyGroupItems,
  addIdsToItems,
  squashTopStories,
  filterGroupsWithoutStraplines,
);

const getSimorghConfig = async (service, origin) => {
  try {
    const url = constructTogglesEndpoint(service, origin);
    const response = await fetch(url, {
      headers: {
        origin,
      },
    });
    if (!response.ok) {
      throw new Error(
        `Unexpected response (HTTP status code ${response.status}) when requesting ${url}`,
      );
    }

    return response.json();
  } catch (error) {
    logger.error(CONFIG_FETCH_ERROR, {
      error: error.toString(),
    });
    return null;
  }
};

export const hasRadioSchedule = async (service, variant) => {
  const config = await getConfig(service, variant);

  const serviceHasRadioSchedule = pathOr(
    false,
    ['radioSchedule', 'hasRadioSchedule'],
    config,
  );

  const radioScheduleOnFrontPage = pathOr(
    false,
    ['radioSchedule', 'onFrontPage'],
    config,
  );

  return serviceHasRadioSchedule && radioScheduleOnFrontPage;
};

export default async ({ path, service, variant }) => {
  const pageHasRadioSchedule = await hasRadioSchedule(service, variant);
  const pageDataPromise = fetchPageData(path);
  const simorghConfig = await getSimorghConfig(
    service,
    // TODO: get the bbcOrigin
    'https://www.test.bbc.com',
  );

  const { json, ...rest } = pageHasRadioSchedule
    ? await withRadioSchedule({ pageDataPromise, service, path })
    : await pageDataPromise;

  return {
    ...rest,
    ...(json && {
      pageData: transformJson(json),
      simorghConfig,
    }),
  };
};
