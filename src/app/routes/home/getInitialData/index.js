import pipe from 'ramda/src/pipe';
import path from 'ramda/src/path';
import fetchPageData from '#app/routes/utils/fetchPageData';
import withRadioSchedule from '#app/routes/utils/withRadioSchedule';
import filterUnknownContentTypes from '#app/routes/utils/sharedDataTransformers/filterUnknownContentTypes';
import filterEmptyGroupItems from '#app/routes/utils/sharedDataTransformers/filterEmptyGroupItems';
import squashTopStories from '#app/routes/utils/sharedDataTransformers/squashTopStories';
import addIdsToGroups from '#app/routes/utils/sharedDataTransformers/addIdsToGroups';
import filterGroupsWithoutStraplines from '#app/routes/utils/sharedDataTransformers/filterGroupsWithoutStraplines';
import { getMostReadEndpoint } from '#lib/utilities/getUrlHelpers/getMostReadUrls';
import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';

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
  pageType,
  toggles,
  variant,
}) => {
  try {
    const pageDataPromise = fetchPageData({ path: pathname, pageType });
    const radioScheduleIsEnabled = getRadioScheduleToggle(toggles);
    const radioSchedulePosition = getRadioSchedulePosition(toggles);

    const mostReadUrl = getMostReadEndpoint({ service, variant }).split('.')[0];

    console.log('mostReadUrl', mostReadUrl);

    const { json: mostReadData } = await fetchPageData({
      path: mostReadUrl,
      pageType,
    });

    console.log('mostReadData', mostReadData);

    const { json, status } = radioScheduleIsEnabled
      ? await withRadioSchedule({
          pageDataPromise,
          service,
          path: pathname,
          pageType: 'Home',
        })
      : await pageDataPromise;

    return {
      status,
      pageData: {
        ...transformJson(json),
        radioSchedulePosition,
        mostReadData,
      },
    };
  } catch ({ message, status = getErrorStatusCode() }) {
    return { error: message, status };
  }
};
