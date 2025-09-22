import { PageTypes } from '#app/models/types/global';
import {
  ARTICLE_PAGE,
  AV_EMBEDS,
  DOWNLOADS_PAGE,
  LIVE_PAGE,
  UGC_PAGE,
} from '#app/routes/utils/pageTypes';
import {
  isOptimoIdCheck,
  isCpsIdCheck,
} from '#app/routes/utils/constructPageFetchUrl';

export default function derivePageType(
  pathname: string,
): PageTypes | 'Unknown' {
  const sanitisedPathname = new URL(pathname, 'http://bbc.com').pathname;

  if (sanitisedPathname.includes('live')) return LIVE_PAGE;
  if (sanitisedPathname.includes('send')) return UGC_PAGE;
  if (sanitisedPathname.includes('av-embeds')) return AV_EMBEDS;
  if (sanitisedPathname.includes('downloads')) return DOWNLOADS_PAGE;
  if (isOptimoIdCheck(sanitisedPathname)) return ARTICLE_PAGE;
  if (isCpsIdCheck(sanitisedPathname)) return ARTICLE_PAGE;

  return 'Unknown';
}
