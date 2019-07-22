import { useContext } from 'react';
import atiPageViewParams from '../../atiUrl';
import { ServiceContext } from '../../../../contexts/ServiceContext';
import { RequestContext } from '../../../../contexts/RequestContext';

import { getPublishedDatetime } from '../../../../lib/analyticsUtils';
import {
  getLanguage,
  getContentId,
  getPageIdentifier,
  getPromoHeadline,
  getThingAttributes,
} from '../../../../lib/analyticsUtils/article';

const ArticleAtiParams = articleData => {
  const { platform, isUK, statsDestination, previousPath, origin } = useContext(
    RequestContext,
  );
  const { atiAnalyticsAppName, service } = useContext(ServiceContext);

  return atiPageViewParams({
    appName: atiAnalyticsAppName,
    contentId: getContentId(articleData),
    contentType: 'article',
    language: getLanguage(articleData),
    ldpThingIds: getThingAttributes('thingId', articleData),
    ldpThingLabels: getThingAttributes('thingLabel', articleData),
    pageIdentifier: getPageIdentifier(service, articleData),
    pageTitle: getPromoHeadline(articleData),
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
