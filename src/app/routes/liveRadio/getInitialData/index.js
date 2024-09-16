import path from 'ramda/src/path';
import withRadioSchedule from '#app/routes/utils/withRadioSchedule';
import fetchPageData from '../../utils/fetchPageData';
import overrideRendererOnTest from '../../utils/overrideRendererOnTest';
import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';
import getRadioService from '../../utils/getRadioService';

const getLanguage = path(['metadata', 'language']);
const getMetaDataId = path(['metadata', 'id']);
const getPromoName = path(['promo', 'name']);
const getPromoSummary = path(['promo', 'summary']);
const getPageTitle = path(['metadata', 'analyticsLabels', 'pageTitle']);
const getContentType = path(['metadata', 'analyticsLabels', 'contentType']);
const getMasterBrand = path(['content', 'blocks', 2, 'externalId']);
const getPageIdentifier = path([
  'metadata',
  'analyticsLabels',
  'pageIdentifier',
]);

const getHeading = path(['content', 'blocks', 0, 'text']);
const getBodySummary = path(['content', 'blocks', 1, 'text']);
const getScheduleToggle = path(['liveRadioSchedule', 'enabled']);

export default async ({ path: pathname, pageType, service, toggles }) => {
  try {
    const liveRadioDataPath = overrideRendererOnTest(pathname);

    const pageDataPromise = fetchPageData({
      path: liveRadioDataPath,
      pageType,
    });

    const scheduleIsEnabled = getScheduleToggle(toggles);

    const { json, status } = scheduleIsEnabled
      ? await withRadioSchedule({
          pageDataPromise,
          service,
          path: pathname,
          radioService: getRadioService({ service, pathname }),
        })
      : await pageDataPromise;

    const getRadioScheduleData = path(['radioScheduleData']);

    const mediaBlock = [
      {
        type: 'liveRadio',
        model: json?.content?.blocks,
      },
    ];

    return {
      status,
      pageData: {
        heading: getHeading(json),
        bodySummary: getBodySummary(json),
        language: getLanguage(json),
        id: getMetaDataId(json),
        name: getPromoName(json),
        summary: getPromoSummary(json),
        pageTitle: getPageTitle(json),
        contentType: getContentType(json),
        pageIdentifier: getPageIdentifier(json),
        masterBrand: getMasterBrand(json),
        radioScheduleData: getRadioScheduleData(json),
        metadata: { type: 'Live Radio' },
        mediaBlock,
      },
    };
  } catch ({ message, status = getErrorStatusCode() }) {
    return { error: message, status };
  }
};
