import { Services } from '#app/models/types/global';
import SERVICES from '#lib/config/services';

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

type Config = {
  extension: string;
  isEligiblePath?: (pathname: string) => boolean;
};

export default ({ extension, isEligiblePath = () => true }: Config) => {
  const ignoreAttribute = `data-ignore-${extension}`;

  const addExtension = (href?: string) => {
    if (!href) return null;

    const url = new URL(href, 'http://localhost');

    const currentExtension = url.pathname?.split('.')?.pop() || '';

    const isValidDomain = VALID_DOMAINS.includes(url.hostname);
    const isRestrictedOnSoftLaunch = RESTRICTED_ON_SOFT_LAUNCH.includes(
      url.pathname,
    );
    const isWsService = SERVICES.includes(
      url.pathname?.split('/')?.[1] as Services,
    );
    const hasReservedRouteExtension =
      RESERVED_ROUTE_EXTENSIONS.includes(currentExtension);

    const shouldAddExtension =
      isValidDomain &&
      isWsService &&
      isEligiblePath(url.pathname) &&
      !hasReservedRouteExtension &&
      !isRestrictedOnSoftLaunch;

    if (shouldAddExtension) {
      url.pathname += `.${extension}`;

      // Retain relative path if passed in 'href' starts with a forward slash
      if (href.startsWith('/')) {
        return `${url.pathname}${url.search}${url.hash}`;
      }

      // Else return the full URL
      return url.toString();
    }

    return null;
  };

  const ignoreFlag = `${ignoreAttribute}="true"`;

  const transformTag = (tag: string) => {
    if (tag.includes(ignoreFlag)) return tag;

    const href = tag.match(/href="([^"]*)"/)?.[1];

    try {
      const hrefWithExtension = addExtension(href);

      return href && hrefWithExtension
        ? tag.replace(href, hrefWithExtension)
        : tag;
    } catch {
      // Leave anchors with unparseable hrefs untouched
      return tag;
    }
  };

  // Rewrite every anchor in a single pass over the document, rather than
  // re-scanning and copying the whole HTML string once per anchor.
  return (html: string) => html.replace(/<a[^>]*>/g, transformTag);
};
