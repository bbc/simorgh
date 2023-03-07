import {
  buildArticleATIParams,
  buildArticleATIUrl,
} from './article/buildParams';
import {
  buildTvRadioATIParams,
  buildTvRadioATIUrl,
} from './tvRadioPage/buildParams';
import {
  buildCpsAssetPageATIParams,
  buildCpsAssetPageATIUrl,
} from './cpsAssetPage/buildParams';
import {
  buildMostReadATIParams,
  buildMostReadATIUrl,
} from './mostReadPage/buildParams';
import {
  buildMostWatchedATIParams,
  buildMostWatchedATIUrl,
} from './mostWatchedPage/buildParams';
import {
  buildIndexPageATIParams,
  buildIndexPageATIUrl,
} from './indexPage/buildParams';
import {
  buildTopicPageATIUrl,
  buildTopicPageATIParams,
} from './topicPage/buildParams';

const ARTICLE_MEDIA_ASSET = 'article-media-asset';
const ARTICLE_PHOTO_GALLERY = 'article-photo-gallery';
const ARTICLE_CORRESPONDENT_PIECE = 'article-correspondent';

const pageTypeUrlBuilders = {
  article: buildArticleATIUrl,
  mediaArticle: (data, requestContext, serviceContext) =>
    buildArticleATIUrl(data, requestContext, serviceContext, 'article-sfv'),
  STY: (data, requestContext, serviceContext) =>
    buildCpsAssetPageATIUrl(data, requestContext, serviceContext, 'article'),
  frontPage: buildIndexPageATIUrl,
  media: buildTvRadioATIUrl,
  mostRead: buildMostReadATIUrl,
  mostWatched: buildMostWatchedATIUrl,
  IDX: buildIndexPageATIUrl,
  FIX: buildIndexPageATIUrl,
  TOPIC: buildTopicPageATIUrl,
  MAP: (data, requestContext, serviceContext) =>
    buildCpsAssetPageATIUrl(
      data,
      requestContext,
      serviceContext,
      ARTICLE_MEDIA_ASSET,
    ),
  PGL: (data, requestContext, serviceContext) =>
    buildCpsAssetPageATIUrl(
      data,
      requestContext,
      serviceContext,
      ARTICLE_PHOTO_GALLERY,
    ),
  CSP: (data, requestContext, serviceContext) =>
    buildCpsAssetPageATIUrl(
      data,
      requestContext,
      serviceContext,
      ARTICLE_CORRESPONDENT_PIECE,
    ),
};

const pageTypeParamBuilders = {
  article: buildArticleATIParams,
  mediaArticle: (data, requestContext, serviceContext) =>
    buildArticleATIParams(data, requestContext, serviceContext, 'article-sfv'),
  frontPage: buildIndexPageATIParams,
  media: buildTvRadioATIParams,
  mostRead: buildMostReadATIParams,
  mostWatched: buildMostWatchedATIParams,
  IDX: buildIndexPageATIParams,
  FIX: buildIndexPageATIParams,
  TOPIC: buildTopicPageATIParams,
  MAP: (data, requestContext, serviceContext) =>
    buildCpsAssetPageATIParams(
      data,
      requestContext,
      serviceContext,
      ARTICLE_MEDIA_ASSET,
    ),
  PGL: (data, requestContext, serviceContext) =>
    buildCpsAssetPageATIParams(
      data,
      requestContext,
      serviceContext,
      ARTICLE_PHOTO_GALLERY,
    ),
  CSP: (data, requestContext, serviceContext) =>
    buildCpsAssetPageATIParams(
      data,
      requestContext,
      serviceContext,
      ARTICLE_CORRESPONDENT_PIECE,
    ),
  STY: (data, requestContext, serviceContext) =>
    buildCpsAssetPageATIParams(data, requestContext, serviceContext, 'article'),
};

const createBuilderFactory = (requestContext, pageTypeHandlers) => {
  const { pageType } = requestContext;

  return pageTypeHandlers[pageType];
};

export const buildATIUrl = (data, requestContext, serviceContext) => {
  const buildUrl = createBuilderFactory(requestContext, pageTypeUrlBuilders);

  return buildUrl(data, requestContext, serviceContext);
};

export const buildATIEventTrackingParams = (
  data,
  requestContext,
  serviceContext,
) => {
  try {
    const buildParams = createBuilderFactory(
      requestContext,
      pageTypeParamBuilders,
    );

    return buildParams(data, requestContext, serviceContext);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      `ATI Event Tracking Error: Could not parse tracking values from page data:\n${error.message}`,
    );

    return {};
  }
};

export default buildATIUrl;
