import {
  buildArticleATIParams,
  buildArticleATIUrl,
} from './article/buildParams';
import {
  buildFrontPageATIParams,
  buildFrontPageATIUrl,
} from './frontpage/buildParams';
import { buildRadioATIParams, buildRadioATIUrl } from './radioPage/buildParams';
import {
  buildCpsAssetPageATIParams,
  buildCpsAssetPageATIUrl,
} from './cpsAssetPage/buildParams';

const ARTICLE_MEDIA_ASSET = 'article-media-asset';
const ARTICLE_PHOTO_GALLERY = 'article-photo-gallery';

const pageTypeUrlBuilders = {
  article: buildArticleATIUrl,
  frontPage: buildFrontPageATIUrl,
  media: buildRadioATIUrl,
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
};

const pageTypeParamBuilders = {
  article: buildArticleATIParams,
  frontPage: buildFrontPageATIParams,
  media: buildRadioATIParams,
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
};

const createBuilderFactory = (requestContext, pageTypeHandlers) => {
  const { pageType } = requestContext;

  return pageTypeHandlers[pageType];
};

export const buildATIUrl = (data, requestContext, serviceContext) => {
  const buildUrl = createBuilderFactory(requestContext, pageTypeUrlBuilders);

  return buildUrl(data, requestContext, serviceContext);
};

export const buildATIClickParams = (data, requestContext, serviceContext) => {
  const buildParams = createBuilderFactory(
    requestContext,
    pageTypeParamBuilders,
  );

  return buildParams(data, requestContext, serviceContext);
};

export default buildATIUrl;
