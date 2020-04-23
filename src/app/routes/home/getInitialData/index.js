import pipe from 'ramda/src/pipe';
import pathOr from 'ramda/src/pathOr';
import fetchPageData from '../../utils/fetchPageData';
import filterUnknownContentTypes from './filterUnknownContentTypes';
import filterEmptyGroupItems from './filterEmptyGroupItems';
import squashTopStories from './squashTopStories';
import addIdsToItems from './addIdsToItems';
import filterGroupsWithoutStraplines from './filterGroupsWithoutStraplines';
import withRadioSchedule from '../../utils/withRadioSchedule';
import getConfig from '../../utils/getConfig';

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

export default async ({ path, service, variant }) => {
  const pageHasRadioSchedule = await hasRadioSchedule(service, variant);
  const pageDataPromise = fetchPageData(path);

  const { json, ...rest } = pageHasRadioSchedule
    ? await withRadioSchedule({ pageDataPromise, service, path })
    : await pageDataPromise;

  return {
    ...rest,
    ...(json && {
      pageData: transformJson(json),
    }),
  };
};
