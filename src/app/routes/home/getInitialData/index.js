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
import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';

const transformJson = pipe(
  filterUnknownContentTypes,
  filterEmptyGroupItems,
  addIdsToItems,
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

  const radioScheduleOnFrontPage = pathOr(
    false,
    ['radioSchedule', 'onFrontPage'],
    config,
  );

  return serviceHasRadioSchedule && radioScheduleOnFrontPage;
};

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

export default async ({ path, service, variant, pageType, toggles }) => {
  try {
    const pageHasRadioSchedule = await hasRadioSchedule(service, variant);
    const pageDataPromise = fetchPageData({ path, pageType });
    const pageHasUsElectionsBanner = pathOr(
      false,
      ['us2020ElectionBanner'],
      toggles,
    );

    const { json, status } = pageHasRadioSchedule
      ? await withRadioSchedule({
          pageDataPromise,
          service,
          path,
          pageType: 'Home',
        })
      : await pageDataPromise;

    return {
      status,
      pageData: {
        ...transformJson(json),
        ...(pageHasUsElectionsBanner
          ? await fetchElectionsOembed(service)
          : null),
      },
    };
  } catch ({ message, status = getErrorStatusCode() }) {
    return { error: message, status };
  }
};
