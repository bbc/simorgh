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
  buildIndexPageATIParams,
  buildIndexPageATIUrl,
} from './indexPage/buildParams';

const ARTICLE_MEDIA_ASSET = 'article-media-asset';
const ARTICLE_PHOTO_GALLERY = 'article-photo-gallery';
const ARTICLE_CORRESPONDENT_PIECE = 'article-correspondent';

const pageTypeUrlBuilders = {
  article: buildArticleATIUrl,
  STY: (data, requestContext, serviceContext) =>
    buildCpsAssetPageATIUrl(data, requestContext, serviceContext, 'article'),
  frontPage: buildIndexPageATIUrl,
  media: buildTvRadioATIUrl,
  mostRead: buildMostReadATIUrl,
  IDX: buildIndexPageATIUrl,
  FIX: buildIndexPageATIUrl,
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
  frontPage: buildIndexPageATIParams,
  media: buildTvRadioATIParams,
  mostRead: buildMostReadATIParams,
  IDX: buildIndexPageATIParams,
  FIX: buildIndexPageATIParams,
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
