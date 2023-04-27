import {
  HOME_PAGE,
  STORY_PAGE,
  MEDIA_ASSET_PAGE,
  CORRESPONDENT_STORY_PAGE,
  ARTICLE_PAGE,
  FRONT_PAGE,
  TOPIC_PAGE,
  MEDIA_ARTICLE_PAGE,
  FEATURE_INDEX_PAGE,
  MOST_READ_PAGE,
  MOST_WATCHED_PAGE,
  INDEX_PAGE,
  PHOTO_GALLERY_PAGE,
  MEDIA_PAGE,
  ERROR_PAGE,
} from '../../../routes/utils/pageTypes';
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
import { RequestContextProps } from '../../../contexts/RequestContext';
import { ServiceConfig } from '../../../models/types/serviceConfig';
import { PageData, ATIPageTrackingProps } from '../types';
import { PageTypes } from '../../../models/types/global';

const ARTICLE_MEDIA_ASSET = 'article-media-asset';
const ARTICLE_PHOTO_GALLERY = 'article-photo-gallery';
const ARTICLE_CORRESPONDENT_PIECE = 'article-correspondent';
const ARTICLE_SHORT_FORM_VIDEO = 'article-sfv';

const pageTypeUrlBuilders = {
  [ARTICLE_PAGE]: buildArticleATIUrl,
  [MEDIA_ARTICLE_PAGE]: (
    data: PageData,
    requestContext: RequestContextProps,
    serviceContext: ServiceConfig,
  ) =>
    buildArticleATIUrl(
      data,
      requestContext,
      serviceContext,
      ARTICLE_SHORT_FORM_VIDEO,
    ),
  [STORY_PAGE]: (
    data: PageData,
    requestContext: RequestContextProps,
    serviceContext: ServiceConfig,
  ) =>
    buildCpsAssetPageATIUrl(data, requestContext, serviceContext, ARTICLE_PAGE),
  [FRONT_PAGE]: buildIndexPageATIUrl,
  [MEDIA_PAGE]: buildTvRadioATIUrl,
  [MOST_READ_PAGE]: buildMostReadATIUrl,
  [MOST_WATCHED_PAGE]: buildMostWatchedATIUrl,
  [INDEX_PAGE]: buildIndexPageATIUrl,
  [FEATURE_INDEX_PAGE]: buildIndexPageATIUrl,
  [TOPIC_PAGE]: buildTopicPageATIUrl,
  [MEDIA_ASSET_PAGE]: (
    data: PageData,
    requestContext: RequestContextProps,
    serviceContext: ServiceConfig,
  ) =>
    buildCpsAssetPageATIUrl(
      data,
      requestContext,
      serviceContext,
      ARTICLE_MEDIA_ASSET,
    ),
  [PHOTO_GALLERY_PAGE]: (
    data: PageData,
    requestContext: RequestContextProps,
    serviceContext: ServiceConfig,
  ) =>
    buildCpsAssetPageATIUrl(
      data,
      requestContext,
      serviceContext,
      ARTICLE_PHOTO_GALLERY,
    ),
  [CORRESPONDENT_STORY_PAGE]: (
    data: PageData,
    requestContext: RequestContextProps,
    serviceContext: ServiceConfig,
  ) =>
    buildCpsAssetPageATIUrl(
      data,
      requestContext,
      serviceContext,
      ARTICLE_CORRESPONDENT_PIECE,
    ),
  [HOME_PAGE]: buildIndexPageATIUrl,
  [ERROR_PAGE]: () => null,
};

const pageTypeParamBuilders = {
  [ARTICLE_PAGE]: buildArticleATIParams,
  [MEDIA_ARTICLE_PAGE]: (
    data: PageData,
    requestContext: RequestContextProps,
    serviceContext: ServiceConfig,
  ) =>
    buildArticleATIParams(data, requestContext, serviceContext, 'article-sfv'),
  [FRONT_PAGE]: buildIndexPageATIParams,
  [MEDIA_PAGE]: buildTvRadioATIParams,
  [MOST_READ_PAGE]: buildMostReadATIParams,
  [MOST_WATCHED_PAGE]: buildMostWatchedATIParams,
  [INDEX_PAGE]: buildIndexPageATIParams,
  [FEATURE_INDEX_PAGE]: buildIndexPageATIParams,
  [TOPIC_PAGE]: buildTopicPageATIParams,
  [MEDIA_ASSET_PAGE]: (
    data: PageData,
    requestContext: RequestContextProps,
    serviceContext: ServiceConfig,
  ) =>
    buildCpsAssetPageATIParams(
      data,
      requestContext,
      serviceContext,
      ARTICLE_MEDIA_ASSET,
    ),
  [PHOTO_GALLERY_PAGE]: (
    data: PageData,
    requestContext: RequestContextProps,
    serviceContext: ServiceConfig,
  ) =>
    buildCpsAssetPageATIParams(
      data,
      requestContext,
      serviceContext,
      ARTICLE_PHOTO_GALLERY,
    ),
  [CORRESPONDENT_STORY_PAGE]: (
    data: PageData,
    requestContext: RequestContextProps,
    serviceContext: ServiceConfig,
  ) =>
    buildCpsAssetPageATIParams(
      data,
      requestContext,
      serviceContext,
      ARTICLE_CORRESPONDENT_PIECE,
    ),
  [STORY_PAGE]: (
    data: PageData,
    requestContext: RequestContextProps,
    serviceContext: ServiceConfig,
  ) =>
    buildCpsAssetPageATIParams(data, requestContext, serviceContext, 'article'),
  [HOME_PAGE]: buildIndexPageATIParams,
  [ERROR_PAGE]: () => null,
};

type BuilderFunction = {
  (
    data: PageData,
    requestContext: RequestContextProps,
    serviceContext: ServiceConfig,
    contentType?: string,
  ): string | ATIPageTrackingProps | null;
};

type PageTypeHandlers = {
  [key in PageTypes]: BuilderFunction;
};

const createBuilderFactory = (
  requestContext: RequestContextProps,
  pageTypeHandlers: PageTypeHandlers,
) => {
  const { pageType } = requestContext;

  return pageTypeHandlers[pageType];
};

export const buildATIUrl = (
  data: PageData,
  requestContext: RequestContextProps,
  serviceContext: ServiceConfig,
) => {
  const buildUrl = createBuilderFactory(requestContext, pageTypeUrlBuilders);

  return buildUrl(data, requestContext, serviceContext);
};

export const buildATIEventTrackingParams = (
  data: PageData,
  requestContext: RequestContextProps,
  serviceContext: ServiceConfig,
) => {
  try {
    const buildParams = createBuilderFactory(
      requestContext,
      pageTypeParamBuilders,
    );

    return buildParams(data, requestContext, serviceContext);
  } catch (error: unknown) {
    const { message } = error as Error;

    // eslint-disable-next-line no-console
    console.error(
      `ATI Event Tracking Error: Could not parse tracking values from page data:\n${message}`,
    );

    return {};
  }
};

export default buildATIUrl;
