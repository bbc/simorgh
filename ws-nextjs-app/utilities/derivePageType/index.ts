import { PageTypes } from '#app/models/types/global';
import {
  ARTICLE_PAGE,
  AV_EMBEDS,
  DOWNLOADS_PAGE,
  LIVE_PAGE,
  UGC_PAGE,
  HOME_PAGE,
  UNKNOWN_PAGE,
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
  if (isOptimoIdCheck(sanitisedPathname)) return ARTICLE_PAGE;
  if (isCpsIdCheck(sanitisedPathname)) return ARTICLE_PAGE;

  return UNKNOWN_PAGE;
}
