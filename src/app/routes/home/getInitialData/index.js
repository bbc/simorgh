import pipe from 'ramda/src/pipe';
import fetchPageData from '../../utils/fetchPageData';
import filterUnknownContentTypes from './filterUnknownContentTypes';
import filterEmptyGroupItems from './filterEmptyGroupItems';
import squashTopStories from './squashTopStories';
import addIdsToItems from './addIdsToItems';
import filterGroupsWithoutStraplines from './filterGroupsWithoutStraplines';

const transformJson = pipe(
  filterUnknownContentTypes,
  filterEmptyGroupItems,
  addIdsToItems,
  squashTopStories,
  filterGroupsWithoutStraplines,
);

const servicesWithRadioSchedules = [
  'afrique',
  'arabic',
  'hausa',
  'korean',
  'pashto',
  'persian',
  'somali',
  'swahili',
];

export default async (path, service) => {
  const radioSchedulesUrl = `${process.env.SIMORGH_BASE_URL}/${service}/bbc_${service}_radio/schedule.json`;

  const [{ json, ...rest }, radioSchedulesData] = await Promise.all([
    fetchPageData(path),
    fetchPageData(radioSchedulesUrl, true),
  ]);

  return {
    ...rest,
    ...(json && {
      pageData: transformJson(json),
      ssrData: { radioSchedulesUrl: radioSchedulesData },
    }),
  };
};
