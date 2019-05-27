import { atiPageViewParams } from '../atiUrl';
import {
  getPageIdentifier,
  getOptimoUrn,
  getLanguage,
  getPromoHeadline,
  getPublishedDatetime,
  getThingAttributes,
} from '../../../lib/analyticsUtils/article';

const atiQueryParamsAmpArticle = ({ articleData, platform, isUK, service }) =>
  atiPageViewParams({
    contentType: 'article',
    language: getLanguage(articleData),
    ldpThingIds: getThingAttributes('thingId', articleData),
    ldpThingLabels: getThingAttributes('thingLabel', articleData),
    optimoUrn: getOptimoUrn(articleData),
    pageIdentifier: getPageIdentifier(service, articleData),
    pageTitle: getPromoHeadline(articleData),
    timePublished: getPublishedDatetime('firstPublished', articleData),
    timeUpdated: getPublishedDatetime('lastPublished', articleData),
    isUK,
    platform,
    service,
  });

export default atiQueryParamsAmpArticle;
