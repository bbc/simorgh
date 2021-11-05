import pipe from 'ramda/src/pipe';
import path from 'ramda/src/path';
import fetchPageData from '#app/routes/utils/fetchPageData';
import withRadioSchedule from '#app/routes/utils/withRadioSchedule';
import filterUnknownContentTypes from '#app/routes/utils/sharedDataTransformers/filterUnknownContentTypes';
import filterEmptyGroupItems from '#app/routes/utils/sharedDataTransformers/filterEmptyGroupItems';
import squashTopStories from '#app/routes/utils/sharedDataTransformers/squashTopStories';
import addIdsToGroups from '#app/routes/utils/sharedDataTransformers/addIdsToGroups';
import filterGroupsWithoutStraplines from '#app/routes/utils/sharedDataTransformers/filterGroupsWithoutStraplines';
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

export default async ({ path: pathname, service, pageType, toggles }) => {
  try {
    const pageDataPromise = fetchPageData({ path: pathname, pageType });
    const radioScheduleIsEnabled = getRadioScheduleToggle(toggles);
    const radioSchedulePosition = getRadioSchedulePosition(toggles);

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
      },
    };
  } catch ({ message, status = getErrorStatusCode() }) {
    return { error: message, status };
  }
};
