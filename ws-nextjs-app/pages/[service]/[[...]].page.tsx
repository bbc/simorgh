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
import withOptimizelyProvider from '#app/legacy/containers/PageHandlers/withOptimizelyProvider';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import derivePageType from '#nextjs/utilities/derivePageType';
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

const getPageType = ({
  resolvedUrl,
  reqHeaders,
}: {
  resolvedUrl: string;
  reqHeaders: IncomingHttpHeaders;
}) => {
  const pageTypeHeader = reqHeaders['page-type']?.toString()?.toLowerCase();

  const { SIMORGH_APP_ENV } = getEnvConfig();

  switch (SIMORGH_APP_ENV) {
    case 'local': {
      // Use the 'page-type' header if it exists, otherwise derive the page type from the URL
      if (pageTypeHeader) return pageTypeHeader;

      return derivePageType(resolvedUrl);
    }
    default:
      return pageTypeHeader;
  }
};

export const getServerSideProps: GetServerSideProps = async context => {
  const {
    resolvedUrl,
    req: { headers: reqHeaders },
  } = context;

  const { service, variant: variantFromUrl } = context.query as PageDataParams;

  const variant = deriveVariant(variantFromUrl);

  const pageType = getPageType({ resolvedUrl, reqHeaders });

  switch (pageType) {
    case AV_EMBEDS:
      return handleAvRoute(context);
    case ARTICLE_PAGE:
      return handleArticleRoute(context);
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
      pathname: resolvedUrl.split('?')?.[0],
      service,
      status: 404,
      timeOnServer: Date.now(), // TODO: check if needed? See https://github.com/bbc/simorgh/pull/10857/files#r1200274478
      variant,
      ...extractHeaders(reqHeaders),
    },
  };
};

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
    default:
      // Return nothing, 404 is handled in _app.tsx
      return null;
  }
}
