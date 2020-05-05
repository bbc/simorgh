import pathOr from 'ramda/src/pathOr';
import fetchPageData from '../../utils/fetchPageData';

import getConfig from '../../utils/getConfig';

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
  // const pageHasRadioSchedule = await hasRadioSchedule(service, variant);
  // const pageDataPromise = fetchPageData(path);

  // const { json, ...rest } = pageHasRadioSchedule
  //   ? await withRadioSchedule({ pageDataPromise, service, path })
  //   : await pageDataPromise;

  const dataToFetch = {
    urls: [
      {
        key: 'pageData',
        preProcess: 'frontPageProcessor',
        src: 'https://www.bbc.com/pidgin.json',
      },
      {
        key: 'mostRead',
        src: 'https://bbc.com/pidgin/mostread.json',
      },
    ],
  };

  const { json, ...rest } = await fetchPageData(
    'https://m755qg2f8g.execute-api.us-east-1.amazonaws.com/Prod/data',
    {
      method: 'POST',
      headers: {
        'Accept-Encoding': 'gzip',
      },
      body: JSON.stringify(dataToFetch),
    },
  );

  return {
    ...rest,
    data: { ...json },
  };
};
