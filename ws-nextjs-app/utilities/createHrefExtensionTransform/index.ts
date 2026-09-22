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
  const ignoreAttribute = `data-ignore-${extension}`; // to delete?
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

  return (html: string) => {
    let modifiedHtml = html;

    try {
      const anchorTags = modifiedHtml.match(/<a[^>]*>/g) || [];

      anchorTags.forEach(tag => {
        const ignoreFlag = tag?.includes(`${ignoreAttribute}="true"`);
        const href = tag?.match(/href="([^"]*)"/)?.[1];
        const hrefWithExtension = addExtension(href);

        if (href && hrefWithExtension && !ignoreFlag) {
          modifiedHtml = modifiedHtml.replace(
            tag,
            tag.replace(href, hrefWithExtension),
          );
        }
      });
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      (() => {})();
    }

    return modifiedHtml;
  };
};
