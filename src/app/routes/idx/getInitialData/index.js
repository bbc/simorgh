import pathOr from 'ramda/src/path';
import fetchPageData from '#app/routes/utils/fetchPageData';
import getConfig from '../../utils/getConfig';
import withRadioSchedule from '../../utils/withRadioSchedule';

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

export default async ({ path, service, variant }) => {
  const pageHasRadioSchedule = await hasRadioSchedule(service, variant);
  const pageDataPromise = fetchPageData(path);

  const { json, ...rest } = pageHasRadioSchedule
    ? await withRadioSchedule({
        pageDataPromise,
        service,
        path,
        radioService: 'dari',
      })
    : await pageDataPromise;

  return {
    ...rest,
    ...(json && {
      pageData: json,
    }),
  };
};
