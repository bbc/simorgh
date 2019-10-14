import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { buildATIPageTrackPath } from '../../atiUrl';
import { getPublishedDatetime } from '../../../../lib/analyticsUtils';

export const buildCPSATIParams = (pageData, requestContext, serviceContext) => {
  const { platform, statsDestination } = requestContext;
  const {
    atiAnalyticsAppName,
    atiAnalyticsProducerId,
    service,
  } = serviceContext;

  const { metadata, promo } = pageData;

  return {
    appName: atiAnalyticsAppName,
    contentId: metadata.id,
    contentType: 'article-media-asset',
    language: metadata.language,
    pageIdentifier: path(['analyticsLabels', 'counterName'], metadata),
    pageTitle: path(['headlines', 'headline'], promo),

    // Will be second part of counter name, eg 'pidgin.news.media_asset.49529724' -> 'news'
    // TODO: new url param - what is the URL key?
    chapter1: pathOr(
      '.Unknown',
      ['analyticsLabels', 'counterName'],
      metadata,
    ).split('.')[1],

    timePublished: getPublishedDatetime('firstPublished', pageData),
    timeUpdated: getPublishedDatetime('lastPublished', pageData),
    category: '', // TODO - new URL param - needs analysis - what is URL key? can be multiple?
    campaign: '', // TODO - new URL param - needs analysis - what is URL key? can be multiple?
    producerId: atiAnalyticsProducerId,
    statsDestination,
    platform,
    service,
  };
};

export const buildCPSATIUrl = (pageData, requestContext, serviceContext) => {
  return buildATIPageTrackPath(
    buildCPSATIParams(pageData, requestContext, serviceContext),
  );
};
