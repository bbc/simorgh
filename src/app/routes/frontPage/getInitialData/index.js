import pipe from 'ramda/src/pipe';
import path from 'ramda/src/path';
import fetchPageData from '#app/routes/utils/fetchPageData';
import withRadioSchedule from '#app/routes/utils/withRadioSchedule';
import filterUnknownContentTypes from '#app/routes/utils/sharedDataTransformers/filterUnknownContentTypes';
import filterEmptyGroupItems from '#app/routes/utils/sharedDataTransformers/filterEmptyGroupItems';
import squashTopStories from '#app/routes/utils/sharedDataTransformers/squashTopStories';
import addIdsToGroups from '#app/routes/utils/sharedDataTransformers/addIdsToGroups';
import filterGroupsWithoutStraplines from '#app/routes/utils/sharedDataTransformers/filterGroupsWithoutStraplines';
import constructPageFetchUrl from '#app/routes/utils/constructPageFetchUrl';
import PAGE_TYPES from '#app/routes/utils/constructPageFetchUrl/page-types';
import getAgent from '#server/utilities/getAgent';
import getEnvironment from '#app/routes/utils/getEnvironment';
import handleError from '#app/routes/utils/handleError';
import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';
import nodeLogger from '../../../lib/logger.node';
import { BFF_FETCH_ERROR } from '../../../lib/logger.const';

const logger = nodeLogger(__filename);

const { CPS_ASSET } = PAGE_TYPES;

const transformJson = pipe(
  filterUnknownContentTypes,
  filterEmptyGroupItems,
  addIdsToGroups,
  squashTopStories,
  filterGroupsWithoutStraplines,
);

const getRadioScheduleToggle = path(['frontPageRadioSchedule', 'enabled']);
const getRadioSchedulePosition = path(['frontPageRadioSchedule', 'value']);

export default async ({
  path: pathname,
  service,
  variant,
  pageType,
  toggles,
}) => {
  const env = getEnvironment(pathname);
  const isLocal = !env || env === 'local';

  const agent = !isLocal ? await getAgent() : null;

  const fetchUrl = constructPageFetchUrl({
    pathname,
    pageType: CPS_ASSET, // Legacy Front Pages are curated in CPS and fetched from the BFF using pageType = CPS_ASSET and id = service/front_page
    service,
    variant,
  });

  const optHeaders = { 'ctx-service-env': getEnvironment(pathname) };

  try {
    const pageDataPromise = fetchPageData({
      path: fetchUrl.toString(),
      ...(!isLocal && { agent, optHeaders }),
      pageType,
    });

    const radioScheduleIsEnabled = getRadioScheduleToggle(toggles);
    const radioSchedulePosition = getRadioSchedulePosition(toggles);

    const { json, status } = radioScheduleIsEnabled
      ? await withRadioSchedule({
          pageDataPromise,
          service,
          path: pathname,
        })
      : await pageDataPromise;

    if (!json?.data?.article) {
      throw handleError('Front page data is malformed', 500);
    }

    return {
      status,
      pageData: {
        ...transformJson(json?.data?.article),
        radioScheduleData: json?.radioScheduleData,
        radioSchedulePosition,
        mostRead: json?.data?.secondaryData?.mostRead,
      },
    };
  } catch ({ message, status = getErrorStatusCode() }) {
    logger.error(BFF_FETCH_ERROR, {
      service,
      status,
      pathname,
      message,
    });

    return { error: message, status };
  }
};
