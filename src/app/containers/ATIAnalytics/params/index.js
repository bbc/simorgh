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

const pageTypeUrlBuilders = {
  article: buildArticleATIUrl,
  frontPage: buildFrontPageATIUrl,
  media: buildRadioATIUrl,
  MAP: buildCpsAssetPageATIUrl,
};

const pageTypeParamBuilders = {
  article: buildArticleATIParams,
  frontPage: buildFrontPageATIParams,
  media: buildRadioATIParams,
  MAP: buildCpsAssetPageATIParams,
};

const createBuilderFactory = (requestContext, pageTypeHandlers = {}) => {
  const { pageType } = requestContext;

  return pageTypeHandlers[pageType] || (() => null);
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
