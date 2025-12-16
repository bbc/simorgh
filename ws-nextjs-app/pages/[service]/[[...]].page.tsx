import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { IncomingHttpHeaders } from 'node:http';

import logResponseTime from '#server/utilities/logResponseTime';
import {
  AV_EMBEDS,
  ARTICLE_PAGE,
  STORY_PAGE,
  CORRESPONDENT_STORY_PAGE,
  MEDIA_ASSET_PAGE,
  PHOTO_GALLERY_PAGE,
  HOME_PAGE,
} from '#app/routes/utils/pageTypes';
import { PageTypes } from '#app/models/types/global';
import PageDataParams from '#app/models/types/pageDataParams';
import deriveVariant from '#nextjs/utilities/deriveVariant';
import withOptimizelyProvider from '#app/legacy/containers/PageHandlers/withOptimizelyProvider';
import { HomePageProps } from '#app/pages/HomePage/HomePage';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import derivePageType from '#nextjs/utilities/derivePageType';

// AV Embeds
import handleAvRoute from './av-embeds/handleAvRoute';
import { AvEmbedsPageProps } from './av-embeds/types';
// Articles (Optimo + CPS)
import handleArticleRoute from './articles/handleArticleRoute';
import { ArticlePageProps } from './articles/types';
import handleHomepageRoute from './homepage/handleHomepageRoute';

// Dynamic imports of page layouts
const AvEmbedsPageLayout = dynamic(
  () => import('./av-embeds/AvEmbedsPageLayout'),
);
const ArticlePage = dynamic(() => import('#app/pages/ArticlePage/ArticlePage'));
const MediaArticlePage = dynamic(
  () => import('#app/pages/MediaArticlePage/MediaArticlePage'),
);
const HomePage = dynamic(() => import('#app/pages/HomePage/HomePage'));

const getPageType = ({
  resolvedUrl,
  reqHeaders,
}: {
  resolvedUrl: string;
  reqHeaders: IncomingHttpHeaders;
}) => {
  // TODO: Exception for av-embeds that should be removed once final av-embeds route has page-type header
  if (resolvedUrl?.includes('av-embeds')) return AV_EMBEDS;

  const pageTypeHeader = reqHeaders['page-type']?.toString() as PageTypes;

  const { SIMORGH_APP_ENV } = getEnvConfig();

  switch (SIMORGH_APP_ENV) {
    // In local development, use the 'page-type' header if it exists,
    // otherwise derive the page-type from the URL
    case 'local': {
      if (pageTypeHeader) return pageTypeHeader;

      return derivePageType(resolvedUrl);
    }
    // In all other environments, always derive the page-type from the 'page-type' header
    default:
      return pageTypeHeader;
  }
};

const ROUTE_HANDLERS = {
  [AV_EMBEDS]: handleAvRoute,
  [ARTICLE_PAGE]: handleArticleRoute,
  [HOME_PAGE]: handleHomepageRoute,
};

export const getServerSideProps: GetServerSideProps = async context => {
  const {
    resolvedUrl,
    req: { headers: reqHeaders },
  } = context;

  const { service, variant: variantFromUrl } = context.query as PageDataParams;

  const variant = deriveVariant(variantFromUrl);

  const pageType = getPageType({ resolvedUrl, reqHeaders });

  // If a route handler exists for the derived page type, render that page
  if (ROUTE_HANDLERS?.[pageType]) {
    return ROUTE_HANDLERS[pageType](context);
  }

  logResponseTime({ path: context.resolvedUrl }, context.res, () => null);

  context.res.statusCode = 404;

  return {
    props: {
      pathname: resolvedUrl?.split('?')?.[0],
      service,
      status: 404,
      timeOnServer: Date.now(), // TODO: check if needed? See https://github.com/bbc/simorgh/pull/10857/files#r1200274478
      variant,
    },
  };
};

type PageProps = {
  pageType?: PageTypes;
} & AvEmbedsPageProps &
  ArticlePageProps &
  HomePageProps;

export default function PageTypeToRender({ pageType, ...props }: PageProps) {
  switch (pageType) {
    // AV Embeds
    case AV_EMBEDS:
      return <AvEmbedsPageLayout {...props} />;
    // Article Pages (Cymrufyw and Naidheachdan - erthyglau & sgeulachdan AMP + CPS + Legacy TC2 assets)
    case ARTICLE_PAGE:
    case STORY_PAGE:
    case CORRESPONDENT_STORY_PAGE:
    case PHOTO_GALLERY_PAGE:
      return withOptimizelyProvider(ArticlePage)({ ...props });
    // Media Article Pages (CPS + Legacy TC2 assets)
    case MEDIA_ASSET_PAGE:
      return <MediaArticlePage {...props} />;
    case HOME_PAGE:
      return <HomePage {...props} />;
    default:
      // Return nothing, 404 is handled in _app.tsx
      return null;
  }
}
