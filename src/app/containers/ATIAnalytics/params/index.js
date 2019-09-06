import {
  buildArticleATIParams,
  buildArticleATIUrl,
} from './article/buildParams';
import {
  buildFrontPageATIParams,
  buildFrontPageATIUrl,
} from './frontpage/buildParams';
import { buildMediaATIParams, buildMediaATIUrl } from './media/buildParams';

const pageTypeUrlBuilders = {
  article: buildArticleATIUrl,
  frontPage: buildFrontPageATIUrl,
  media: buildMediaATIUrl,
};

const pageTypeParamBuilders = {
  article: buildArticleATIParams,
  frontPage: buildFrontPageATIParams,
  media: buildMediaATIParams,
};

export const createBuilderFactory = (requestContext, pageTypeHandlers = {}) => {
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
