import { useContext } from 'react';
import { getPublishedDatetime } from '@lib/analyticsUtils';
import {
  getLanguage,
  getContentId,
  getPageIdentifier,
  getPromoHeadline,
  getThingAttributes,
} from '@lib/analyticsUtils/article';
import atiPageViewParams from '../../atiUrl';
import { ServiceContext } from '../../../../contexts/ServiceContext';
import { RequestContext } from '../../../../contexts/RequestContext';

const ArticleAtiParams = articleData => {
  const { platform, isUK, statsDestination, previousPath, origin } = useContext(
    RequestContext,
  );
  const { atiAnalyticsAppName, atiAnalyticsProducerId, service } = useContext(
    ServiceContext,
  );

  return atiPageViewParams({
    appName: atiAnalyticsAppName,
    contentId: getContentId(articleData),
    contentType: 'article',
    language: getLanguage(articleData),
    ldpThingIds: getThingAttributes('thingId', articleData),
    ldpThingLabels: getThingAttributes('thingLabel', articleData),
    pageIdentifier: getPageIdentifier(service, articleData),
    pageTitle: getPromoHeadline(articleData),
    producerId: atiAnalyticsProducerId,
    timePublished: getPublishedDatetime('firstPublished', articleData),
    timeUpdated: getPublishedDatetime('lastPublished', articleData),
    isUK,
    platform,
    service,
    statsDestination,
    previousPath,
    origin,
  });
};

export default ArticleAtiParams;
