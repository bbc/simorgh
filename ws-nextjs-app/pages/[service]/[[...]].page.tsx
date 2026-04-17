import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { IncomingHttpHeaders } from 'node:http';

import SERVICES from '#app/lib/config/services';
import logResponseTime from '#server/utilities/logResponseTime';
import {
  AV_EMBEDS,
  ARTICLE_PAGE,
  STORY_PAGE,
  CORRESPONDENT_STORY_PAGE,
  MEDIA_ASSET_PAGE,
  PHOTO_GALLERY_PAGE,
  HOME_PAGE,
  AUDIO_PAGE,
  TV_PAGE,
  LIVE_RADIO_PAGE,
} from '#app/routes/utils/pageTypes';
import { PageTypes } from '#app/models/types/global';
import PageDataParams from '#app/models/types/pageDataParams';
import deriveVariant from '#nextjs/utilities/deriveVariant';
import withOptimizelyProvider from '#app/legacy/containers/PageHandlers/withOptimizelyProvider';
import { HomePageProps } from '#app/pages/HomePage/HomePage';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import derivePageType from '#nextjs/utilities/derivePageType';
import { LiveRadioPageProps } from '#app/pages/LiveRadioPage/types';

// AV Embeds
import withMediaError from '#app/lib/utilities/episodeAvailability/withMediaError';
import { OnDemandTVProps } from '#app/pages/OnDemandTvPage/OnDemandTvPage';
import { NOT_FOUND } from '#app/lib/statusCodes.const';
import handleAvRoute from './av-embeds/handleAvRoute';
import { AvEmbedsPageProps } from './av-embeds/types';
// Articles (Optimo + CPS)
import handleArticleRoute from './articles/handleArticleRoute';
import { ArticlePageProps } from './articles/types';
import handleHomepageRoute from './homepage/handleHomepageRoute';

// On Demand Audio
import handleOnDemandAudioRoute from './onDemandAudio/handleOnDemandAudioRoute';
import { OnDemandAudioProps } from './onDemandAudio/types';
// On Demand TV
import handleOnDemandTvRoute from './onDemandTv/handleOnDemandTvRoute';
// Live Radio
import handleLiveRadioRoute from './liveRadio/handleLiveRadioRoute';

// Dynamic imports of page layouts
const AvEmbedsPageLayout = dynamic(
  () => import('./av-embeds/AvEmbedsPageLayout'),
);
const ArticlePage = dynamic(() => import('#app/pages/ArticlePage/ArticlePage'));
const MediaArticlePage = dynamic(
  () => import('#app/pages/MediaArticlePage/MediaArticlePage'),
);
const HomePage = dynamic(() => import('#app/pages/HomePage/HomePage'));
const OnDemandAudioPage = dynamic(
  () => import('./onDemandAudio/OnDemandAudioLayout'),
);
const OnDemandTvPage = dynamic(
  () => import('#app/pages/OnDemandTvPage/OnDemandTvPage'),
);

const LiveRadioPage = dynamic(
  () => import('#app/pages/LiveRadioPage/LiveRadioPage'),
);

const getPageType = ({
  resolvedUrl,
  reqHeaders,
}: {
  resolvedUrl: string;
  reqHeaders: IncomingHttpHeaders;
}) => {
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
  [AUDIO_PAGE]: handleOnDemandAudioRoute,
  [TV_PAGE]: handleOnDemandTvRoute,
  [LIVE_RADIO_PAGE]: handleLiveRadioRoute,
};

export const getServerSideProps: GetServerSideProps = async context => {
  const {
    resolvedUrl,
    req: { headers: reqHeaders },
  } = context;

  const { service: serviceFromUrl, variant: variantFromUrl } =
    context.query as PageDataParams;

  const service = SERVICES.find(s => serviceFromUrl === s);
  const variant = deriveVariant(variantFromUrl);

  const pageType = getPageType({ resolvedUrl, reqHeaders });

  // If a route handler exists for the derived page type, render that page
  if (ROUTE_HANDLERS?.[pageType]) {
    return ROUTE_HANDLERS[pageType](context);
  }

  logResponseTime({ path: context.resolvedUrl }, context.res, () => null);

  context.res.statusCode = NOT_FOUND;

  return {
    props: {
      pathname: resolvedUrl?.split('?')?.[0],
      service: service || 'news', // Fallback to 'news' to display error page if service cannot be determined from URL
      status: NOT_FOUND,
      timeOnServer: Date.now(), // TODO: check if needed? See https://github.com/bbc/simorgh/pull/10857/files#r1200274478
      variant,
    },
  };
};

type PageProps = {
  pageType?: PageTypes;
} & AvEmbedsPageProps &
  ArticlePageProps &
  HomePageProps &
  OnDemandAudioProps &
  OnDemandTVProps &
  LiveRadioPageProps;

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
    case AUDIO_PAGE:
      return withMediaError(OnDemandAudioPage)({ ...props });
    case TV_PAGE:
      return withMediaError(OnDemandTvPage)({ ...props });
    // TO DO -- Props type
    case LIVE_RADIO_PAGE:
      return withMediaError(LiveRadioPage)({ ...props });
    // Home Page
    case HOME_PAGE:
      return withOptimizelyProvider(HomePage)({ ...props });
    default:
      // Return nothing, 404 is handled in _app.tsx
      return null;
  }
}
