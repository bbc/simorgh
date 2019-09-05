import { buildArticleATIParams } from './article/buildParams';
import { buildFrontPageATIParams } from './frontpage/buildParams';
import { buildMediaATIParams } from './media/buildParams';

export const buildATIParams = (data, requestContext, serviceContext) => {
  const { pageType } = requestContext;

  const pageTypeHandlers = {
    article: buildArticleATIParams,
    frontPage: buildFrontPageATIParams,
    media: buildMediaATIParams,
  };

  const isValidPageType = Object.keys(pageTypeHandlers).includes(pageType);
  if (!isValidPageType) {
    return null;
  }

  return pageTypeHandlers[pageType](data, requestContext, serviceContext);
};

export default buildATIParams;
