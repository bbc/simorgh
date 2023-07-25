import pathOr from 'ramda/src/pathOr';
import pipe from 'ramda/src/pipe';
import fetchPageData from '#app/routes/utils/fetchPageData';
import filterUnknownContentTypes from '#app/routes/utils/sharedDataTransformers/filterUnknownContentTypes';
import filterEmptyGroupItems from '#app/routes/utils/sharedDataTransformers/filterEmptyGroupItems';
import squashTopStories from '#app/routes/utils/sharedDataTransformers/squashTopStories';
import addIdsToGroups from '#app/routes/utils/sharedDataTransformers/addIdsToGroups';
import filterGroupsWithoutStraplines from '#app/routes/utils/sharedDataTransformers/filterGroupsWithoutStraplines';
import getConfig from '#app/routes/utils/getConfig';
import withRadioSchedule from '#app/routes/utils/withRadioSchedule';
import getEnvironment from '#app/routes/utils/getEnvironment';
import getAgent from '#server/utilities/getAgent';
import constructPageFetchUrl from '#app/routes/utils/constructPageFetchUrl';
import PAGE_TYPES from '#app/routes/utils/constructPageFetchUrl/page-types';
import handleError from '#app/routes/utils/handleError';
import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';

const { CPS_ASSET } = PAGE_TYPES;

const transformJson = pipe(
  filterUnknownContentTypes,
  filterEmptyGroupItems,
  addIdsToGroups,
  squashTopStories,
  filterGroupsWithoutStraplines,
);

export const hasRadioSchedule = async (service, variant) => {
  const config = await getConfig(service, variant);

  const serviceHasRadioSchedule = pathOr(
    false,
    ['radioSchedule', 'hasRadioSchedule'],
    config,
  );

  const radioScheduleOnIdx = pathOr(
    false,
    ['radioSchedule', 'onIdxPage'],
    config,
  );

  return serviceHasRadioSchedule && radioScheduleOnIdx;
};

export default async ({ path: pathname, service, variant, pageType }) => {
  try {
    const env = getEnvironment(pathname);
    const isLocal = !env || env === 'local';

    const agent = !isLocal ? await getAgent() : null;

    const fetchUrl = constructPageFetchUrl({
      pathname,
      pageType: CPS_ASSET,
      service,
      variant,
    });

    const optHeaders = { 'ctx-service-env': getEnvironment(pathname) };
    const pageHasRadioSchedule = await hasRadioSchedule(service, variant);
    const pageDataPromise = fetchPageData({
      path: fetchUrl.toString(),
      ...(!isLocal && { agent, optHeaders }),
      pageType,
    });

    const { json, status } = pageHasRadioSchedule
      ? await withRadioSchedule({
          pageDataPromise,
          service,
          path: pathname,
          radioService: 'dari',
        })
      : await pageDataPromise;

    if (!json?.data?.article) {
      throw handleError('IDX page data is malformed', 500);
    }

    return {
      status,
      pageData: {
        ...transformJson(json?.data?.article),
        radioScheduleData: json?.radioScheduleData,
        mostRead: json?.data?.secondaryData?.mostRead,
      },
    };
  } catch ({ message, status = getErrorStatusCode() }) {
    return { error: message, status };
  }
};
