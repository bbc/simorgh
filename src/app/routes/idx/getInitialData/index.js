import pathOr from 'ramda/src/pathOr';
import pipe from 'ramda/src/pipe';
import filterUnknownContentTypes from '#app/routes/utils/sharedDataTransformers/filterUnknownContentTypes';
import filterEmptyGroupItems from '#app/routes/utils/sharedDataTransformers/filterEmptyGroupItems';
import squashTopStories from '#app/routes/utils/sharedDataTransformers/squashTopStories';
import addIdsToGroups from '#app/routes/utils/sharedDataTransformers/addIdsToGroups';
import filterGroupsWithoutStraplines from '#app/routes/utils/sharedDataTransformers/filterGroupsWithoutStraplines';
import getConfig from '#app/routes/utils/getConfig';
import withRadioSchedule from '#app/routes/utils/withRadioSchedule';
import { CPS_ASSET } from '#app/routes/utils/pageTypes';
import handleError from '#app/routes/utils/handleError';
import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';
import fetchDataFromBFF from '../../utils/fetchDataFromBFF';
import { BFF_FETCH_ERROR } from '../../../lib/logger.const';
import nodeLogger from '../../../lib/logger.node';

const logger = nodeLogger(__filename);

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

export default async ({ path: pathname, service, variant }) => {
  try {
    const pageDataPromise = fetchDataFromBFF({
      pathname,
      service,
      variant,
      pageType: CPS_ASSET,
    });

    const pageHasRadioSchedule = await hasRadioSchedule(service, variant);

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
    logger.error(BFF_FETCH_ERROR, {
      service,
      status,
      pathname,
      message,
    });

    return { error: message, status };
  }
};
