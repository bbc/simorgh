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
import { INDEX_PAGE } from '#app/routes/utils/pageTypes';
import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';

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

export default async ({ path, service, variant, pageType }) => {
  try {
    const pageHasRadioSchedule = await hasRadioSchedule(service, variant);
    const pageDataPromise = fetchPageData({ path, pageType });

    const { json, status } = pageHasRadioSchedule
      ? await withRadioSchedule({
          pageDataPromise,
          service,
          path,
          radioService: 'dari',
          pageType: INDEX_PAGE,
        })
      : await pageDataPromise;

    return {
      status,
      pageData: transformJson(json),
    };
  } catch ({ message, status = getErrorStatusCode() }) {
    return { error: message, status };
  }
};
