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
  MOST_READ_PAGE,
} from '#app/routes/utils/pageTypes';
import {
  isOptimoIdCheck,
  isTipoIdCheck,
  isCpsIdCheck,
  isUgcIdCheck,
  removeRendererExtension,
} from '#app/routes/utils/constructPageFetchUrl';
import SERVICES from '#app/lib/config/services';
import { servicesWithVariants } from '#lib/utilities/variantHandler';

const isHomePagePath = (pathname: string) =>
  SERVICES.some(service => {
    if (pathname === `/${service}` || pathname === `/${service}/`) {
      return true;
    }
    const variants = servicesWithVariants[service];
    if (variants) {
      return variants.some(
        variant =>
          pathname === `/${service}/${variant}` ||
          pathname === `/${service}/${variant}/`,
      );
    }
    return false;
  });

const isOnDemandAudioEpisodeOrBrandPath = (pathname: string) =>
  /\/bbc_[a-z]+_radio\/|\/programmes\//.test(pathname);

const isOnDemandAudioPodcastPath = (pathname: string) =>
  /\/podcasts\//.test(pathname);

const isOnDemandTvPath = (pathname: string) =>
  /\/bbc_[a-z]+_tv\/(?:tv|tv_programmes)\//.test(pathname);

export default function derivePageType(pathname: string): PageTypes {
  const sanitisedPathname = new URL(
    removeRendererExtension(pathname),
    'http://bbc.com',
  ).pathname;

  if (sanitisedPathname.includes('av-embeds')) return AV_EMBEDS;
  if (sanitisedPathname.includes('downloads')) return DOWNLOADS_PAGE;
  if (sanitisedPathname.includes('popular/read')) return MOST_READ_PAGE;

  if (isUgcIdCheck(sanitisedPathname)) return UGC_PAGE;
  if (isTipoIdCheck(sanitisedPathname) && sanitisedPathname.includes('topics'))
    return TOPIC_PAGE;
  if (isTipoIdCheck(sanitisedPathname) && sanitisedPathname.includes('live'))
    return LIVE_PAGE;
  if (isCpsIdCheck(sanitisedPathname) && sanitisedPathname.includes('live'))
    return LIVE_PAGE;
  if (isHomePagePath(sanitisedPathname)) return HOME_PAGE;
  if (isOnDemandAudioEpisodeOrBrandPath(sanitisedPathname)) return AUDIO_PAGE;
  if (isOnDemandAudioPodcastPath(sanitisedPathname)) return AUDIO_PAGE;
  if (isOnDemandTvPath(sanitisedPathname)) return TV_PAGE;
  if (isOptimoIdCheck(sanitisedPathname)) return ARTICLE_PAGE;
  if (isCpsIdCheck(sanitisedPathname)) return ARTICLE_PAGE;

  return UNKNOWN_PAGE;
}
