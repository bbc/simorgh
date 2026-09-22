import { Services } from '#app/models/types/global';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import SERVICES from '#lib/config/services';
import derivePageType from '#utilities/derivePageType';

const RESTRICTED_ON_SOFT_LAUNCH = ['/ws/languages'];

const VALID_DOMAINS = [
  '/',
  'localhost',
  'www.bbc.com',
  'bbc.com',
  'www.bbcrussian.com',
  'bbcrussian.com',
];

const RESERVED_ROUTE_EXTENSIONS = ['amp', 'app', 'lite'];

const addAppExtension = (href?: string) => {
  if (!href) return null;

  const url = new URL(href, 'http://localhost');

  const extension = url.pathname?.split('.')?.pop() || '';

  const isValidDomain = VALID_DOMAINS.includes(url.hostname);
  const isRestrictedOnSoftLaunch = RESTRICTED_ON_SOFT_LAUNCH.includes(
    url.pathname,
  );
  const isWsService = SERVICES.includes(
    url.pathname?.split('/')?.[1] as Services,
  );
  const isArticlePage = derivePageType(url.pathname) === ARTICLE_PAGE;

  const hasReservedRouteExtension =
    RESERVED_ROUTE_EXTENSIONS.includes(extension);

  const shouldAddAppExtension =
    isValidDomain &&
    isWsService &&
    isArticlePage &&
    !hasReservedRouteExtension &&
    !isRestrictedOnSoftLaunch;

  if (shouldAddAppExtension) {
    url.pathname += '.app';

    if (href.startsWith('/')) {
      return `${url.pathname}${url.search}${url.hash}`;
    }

    return url.toString();
  }

  return null;
};

export default (html: string) => {
  let modifiedHtml = html;

  try {
    const anchorTags = modifiedHtml.match(/<a[^>]*>/g) || [];

    anchorTags.forEach(tag => {
      const ignoreFlag = tag?.includes('data-ignore-app="true"');
      const href = tag?.match(/href="([^"]*)"/)?.[1];
      const urlWithApp = addAppExtension(href);

      if (href && urlWithApp && !ignoreFlag) {
        modifiedHtml = modifiedHtml.replace(tag, tag.replace(href, urlWithApp));
      }
    });
  } catch {
    return modifiedHtml;
  }

  return modifiedHtml;
};
