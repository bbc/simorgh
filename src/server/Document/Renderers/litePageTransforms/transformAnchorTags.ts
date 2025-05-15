import { Services } from '#app/models/types/global';
import services from '#lib/config/services/loadableConfig';

const SERVICES = Object.keys(services) as Services[];

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

const addLiteExtension = (href?: string) => {
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

  const hasReservedRouteExtension =
    RESERVED_ROUTE_EXTENSIONS.includes(extension);

  const shouldAddLiteExtension =
    isValidDomain &&
    isWsService &&
    !hasReservedRouteExtension &&
    !isRestrictedOnSoftLaunch;

  if (shouldAddLiteExtension) {
    url.pathname += '.lite';

    // Retain relative path if passed in 'href' starts with a forward slash
    if (href.startsWith('/')) {
      return `${url.pathname}${url.search}${url.hash}`;
    }

    // Else return the full URL
    return url.toString();
  }

  return null;
};

export default (html: string) => {
  let modifiedHtml = html;

  try {
    const anchorTags = modifiedHtml.match(/<a[^>]*>/g) || [];

    anchorTags.forEach(tag => {
      const ignoreFlag = tag?.includes('data-ignore-lite="true"');
      const href = tag?.match(/href="([^"]*)"/)?.[1];
      const urlWithLite = addLiteExtension(href);

      if (href && urlWithLite && !ignoreFlag) {
        modifiedHtml = modifiedHtml.replace(
          tag,
          tag.replace(href, urlWithLite),
        );
      }
    });
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    (() => {})();
  }

  return modifiedHtml;
};
