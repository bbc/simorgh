import { PageTypes } from '#app/models/types/global';
import {
  ARTICLE_PAGE,
  AV_EMBEDS,
  DOWNLOADS_PAGE,
  LIVE_PAGE,
  UGC_PAGE,
  HOME_PAGE,
  UNKNOWN_PAGE,
  TOPIC_PAGE,
  AUDIO_PAGE,
  TV_PAGE,
} from '#app/routes/utils/pageTypes';
import {
  isOptimoIdCheck,
  isCpsIdCheck,
  removeRendererExtension,
} from '#app/routes/utils/constructPageFetchUrl';
import SERVICES from '#app/lib/config/services';

const SERVICES_WITH_VARIANTS = {
  serbian: ['lat', 'cyr'],
  ukchina: ['simp', 'trad'],
  uzbek: ['lat', 'cyr'],
  zhongwen: ['simp', 'trad'],
  ukrainian: ['lat', 'cyr'],
};

const ON_DEMAND_TV_PATH_SEGMENTS = ['tv', 'tv_programmes'];

const isHomePagePath = (pathname: string) =>
  SERVICES.some(service => {
    if (pathname === `/${service}` || pathname === `/${service}/`) {
      return true;
    }
    const variants = SERVICES_WITH_VARIANTS[service];
    if (variants) {
      return variants.some(
        variant =>
          pathname === `/${service}/${variant}` ||
          pathname === `/${service}/${variant}/`,
      );
    }
    return false;
  });

const isOnDemandTvPath = (pathname: string) => {
  const pathnameSegments = pathname.split('/').filter(Boolean);
  // gets the service id and route segment right before the media id
  const [serviceIdSegment, brandEpisodeSegment] = pathnameSegments.slice(
    -3,
    -1,
  );

  if (!serviceIdSegment || !brandEpisodeSegment) {
    return false;
  }

  // checks the path still matches an on demand tv route shape
  const hasOnDemandTvServiceId = /^bbc_[a-z]+_tv$/.test(serviceIdSegment);
  const hasOnDemandTvSegment =
    ON_DEMAND_TV_PATH_SEGMENTS.includes(brandEpisodeSegment);

  return hasOnDemandTvServiceId && hasOnDemandTvSegment;
};

export default function derivePageType(pathname: string): PageTypes {
  const sanitisedPathname = new URL(
    removeRendererExtension(pathname),
    'http://bbc.com',
  ).pathname;

  if (isHomePagePath(sanitisedPathname)) return HOME_PAGE;
  if (sanitisedPathname.includes('live')) return LIVE_PAGE;
  if (sanitisedPathname.includes('send')) return UGC_PAGE;
  if (sanitisedPathname.includes('av-embeds')) return AV_EMBEDS;
  if (sanitisedPathname.includes('downloads')) return DOWNLOADS_PAGE;
  if (sanitisedPathname.includes('topics')) return TOPIC_PAGE;
  if (sanitisedPathname.includes('podcast')) return AUDIO_PAGE;
  if (sanitisedPathname.includes('radio')) return AUDIO_PAGE;
  // this catches both tv brands and tv episodes
  if (isOnDemandTvPath(sanitisedPathname)) return TV_PAGE;
  if (isOptimoIdCheck(sanitisedPathname)) return ARTICLE_PAGE;
  if (isCpsIdCheck(sanitisedPathname)) return ARTICLE_PAGE;

  return UNKNOWN_PAGE;
}
