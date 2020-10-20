import pipe from 'ramda/src/pipe';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import fetchPageData from '#app/routes/utils/fetchPageData';
import withRadioSchedule from '#app/routes/utils/withRadioSchedule';
import filterUnknownContentTypes from '#app/routes/utils/sharedDataTransformers/filterUnknownContentTypes';
import filterEmptyGroupItems from '#app/routes/utils/sharedDataTransformers/filterEmptyGroupItems';
import squashTopStories from '#app/routes/utils/sharedDataTransformers/squashTopStories';
import addIdsToItems from '#app/routes/utils/sharedDataTransformers/addIdsToItems';
import filterGroupsWithoutStraplines from '#app/routes/utils/sharedDataTransformers/filterGroupsWithoutStraplines';
import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';

const transformJson = pipe(
  filterUnknownContentTypes,
  filterEmptyGroupItems,
  addIdsToItems,
  squashTopStories,
  filterGroupsWithoutStraplines,
);

const getRadioScheduleToggle = path(['frontPageRadioSchedule', 'enabled']);
const getRadioSchedulePosition = path(['frontPageRadioSchedule', 'value']);

const fetchElectionsOembed = async service => {
  const usElectionOembedPath = `/${service}/election/us2020/results/oembed`;

  try {
    const { json, status } = await fetchPageData({
      path: usElectionOembedPath,
    });

    if (json && status === 200) {
      return { usElectionOembed: json };
    }
  } catch (error) {
    return {};
  }

  return null;
};

export default async ({ path: pathname, service, pageType, toggles }) => {
  try {
    const pageDataPromise = fetchPageData({ path: pathname, pageType });
    const radioScheduleIsEnabled = getRadioScheduleToggle(toggles);
    const radioSchedulePosition = getRadioSchedulePosition(toggles);
    const pageHasUsElectionsBanner = pathOr(
      false,
      ['us2020ElectionBanner'],
      toggles,
    );

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
        ...(pageHasUsElectionsBanner
          ? await fetchElectionsOembed(service)
          : null),
      },
    };
  } catch ({ message, status = getErrorStatusCode() }) {
    console.log(message);
    return { error: message, status };
  }
};
