import React from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import logResponseTime from '#server/utilities/logResponseTime';
import extractHeaders from '#server/utilities/extractHeaders';
import getPathExtension from '#app/utilities/getPathExtension';
import {
  AV_EMBEDS,
  ARTICLE_PAGE,
  STORY_PAGE,
  CORRESPONDENT_STORY_PAGE,
  MEDIA_ASSET_PAGE,
  PHOTO_GALLERY_PAGE,
} from '#app/routes/utils/pageTypes';
import { PageTypes } from '#app/models/types/global';
// AV Embeds
import PageDataParams from '#app/models/types/pageDataParams';
import deriveVariant from '#nextjs/utilities/deriveVariant';
import { IncomingHttpHeaders } from 'node:http';
import handleAvRoute from './av-embeds/handleAvRoute';
import { AvEmbedsPageProps } from './av-embeds/types';
// Articles (Optimo + CPS)
import handleArticleRoute from './articles/handleArticleRoute';
import { ArticlePageProps } from './articles/types';

// Dynamic imports of page layouts
const AvEmbedsPageLayout = dynamic(
  () => import('./av-embeds/AvEmbedsPageLayout'),
);
const ArticlePage = dynamic(() => import('#app/pages/ArticlePage/ArticlePage'));
const MediaArticlePage = dynamic(
  () => import('#app/pages/MediaArticlePage/MediaArticlePage'),
);

type PageProps = {
  pageType?: PageTypes;
} & AvEmbedsPageProps &
  ArticlePageProps;

export default function PageTypeToRender({ pageType, ...rest }: PageProps) {
  switch (pageType) {
    // AV Embeds
    case AV_EMBEDS:
      return <AvEmbedsPageLayout {...rest} />;
    // Article Pages (CPS + Legacy TC2 assets)
    case STORY_PAGE:
    case CORRESPONDENT_STORY_PAGE:
    case PHOTO_GALLERY_PAGE:
      return <ArticlePage {...rest} />;
    // Media Article Pages (CPS + Legacy TC2 assets)
    case MEDIA_ASSET_PAGE:
      return <MediaArticlePage {...rest} />;
    default:
      // Return nothing, 404 is handled in _app.tsx
      return null;
  }
}

const getPageTypeFromHeaders = (headers: IncomingHttpHeaders) => {
  // TODO: 'pagetype' header is for testing purposes only
  const pageTypeHeader = headers.pagetype?.toString()?.toLowerCase();

  switch (pageTypeHeader) {
    case AV_EMBEDS?.toLowerCase():
      return AV_EMBEDS;
    case ARTICLE_PAGE:
      return ARTICLE_PAGE;
    default:
      return null;
  }
};

export const getServerSideProps: GetServerSideProps = async context => {
  const {
    resolvedUrl,
    req: { headers: reqHeaders },
  } = context;

  const { service, variant: variantFromUrl } = context.query as PageDataParams;

  const variant = deriveVariant(variantFromUrl);

  // Determine the page type
  const pageType = getPageTypeFromHeaders(reqHeaders);

  switch (pageType) {
    case AV_EMBEDS:
      return handleAvRoute(context);
    // (CPS + Legacy TC2 articles)
    case ARTICLE_PAGE:
      return handleArticleRoute(context);
    // Default break out and return 404 below
    default:
      break;
  }

  const { isAmp, isApp, isLite } = getPathExtension(resolvedUrl);

  logResponseTime({ path: context.resolvedUrl }, context.res, () => null);

  context.res.statusCode = 404;

  return {
    props: {
      isApp,
      isAmp,
      isLite,
      isNextJs: true,
      service,
      status: 404,
      timeOnServer: Date.now(), // TODO: check if needed? See https://github.com/bbc/simorgh/pull/10857/files#r1200274478
      variant,
      ...extractHeaders(reqHeaders),
    },
  };
};
