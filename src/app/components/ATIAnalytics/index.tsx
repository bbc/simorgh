import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '../../contexts/ServiceContext';
import CanonicalATIAnalytics from './canonical';
import AmpATIAnalytics from './amp';
import { buildArticleATIUrl } from './params/article/buildParams';
import { buildTvRadioATIUrl } from './params/tvRadioPage/buildParams';
import { buildCpsAssetPageATIUrl } from './params/cpsAssetPage/buildParams';
import { buildMostReadATIUrl } from './params/mostReadPage/buildParams';
import { buildMostWatchedATIUrl } from './params/mostWatchedPage/buildParams';
import { buildIndexPageATIUrl } from './params/indexPage/buildParams';
import { buildTopicPageATIUrl } from './params/topicPage/buildParams';
import {
  ARTICLE_PAGE,
  MEDIA_ARTICLE_PAGE,
  FRONT_PAGE,
  MEDIA_PAGE,
  MOST_READ_PAGE,
  MOST_WATCHED_PAGE,
  INDEX_PAGE,
  FEATURE_INDEX_PAGE,
  TOPIC_PAGE,
  MEDIA_ASSET_PAGE,
  PHOTO_GALLERY_PAGE,
  STORY_PAGE,
  CORRESPONDENT_STORY_PAGE,
  ERROR_PAGE,
  HOME_PAGE,
} from '../../routes/utils/pageTypes';

const ATIAnalytics = ({ data }: { data: unknown }) => {
  const requestContext = useContext(RequestContext);
  const serviceContext = useContext(ServiceContext);
  const { pageType, isAmp } = requestContext;

  const pageTypeHandlers = {
    [ARTICLE_PAGE]: buildArticleATIUrl,
    [MEDIA_ARTICLE_PAGE]: () =>
      buildArticleATIUrl(data, requestContext, serviceContext, 'article-sfv'),
    [FRONT_PAGE]: buildIndexPageATIUrl,
    [MEDIA_PAGE]: buildTvRadioATIUrl,
    [MOST_READ_PAGE]: buildMostReadATIUrl,
    [MOST_WATCHED_PAGE]: buildMostWatchedATIUrl,
    [INDEX_PAGE]: buildIndexPageATIUrl,
    [FEATURE_INDEX_PAGE]: buildIndexPageATIUrl,
    [TOPIC_PAGE]: buildTopicPageATIUrl,
    [MEDIA_ASSET_PAGE]: () =>
      buildCpsAssetPageATIUrl(
        data,
        requestContext,
        serviceContext,
        'article-media-asset',
      ),
    [PHOTO_GALLERY_PAGE]: () =>
      buildCpsAssetPageATIUrl(
        data,
        requestContext,
        serviceContext,
        'article-photo-gallery',
      ),
    [STORY_PAGE]: () =>
      buildCpsAssetPageATIUrl(data, requestContext, serviceContext, 'article'),
    [CORRESPONDENT_STORY_PAGE]: () =>
      buildCpsAssetPageATIUrl(
        data,
        requestContext,
        serviceContext,
        'article-correspondent',
      ),
    [ERROR_PAGE]: () => null,
    [HOME_PAGE]: () => null,
  };

  const pageviewParams = pageTypeHandlers[pageType](
    data,
    requestContext,
    serviceContext,
  );

  if (!pageviewParams) {
    return null;
  }

  return isAmp ? (
    <AmpATIAnalytics pageviewParams={pageviewParams} />
  ) : (
    <CanonicalATIAnalytics pageviewParams={pageviewParams} />
  );
};

export default ATIAnalytics;
