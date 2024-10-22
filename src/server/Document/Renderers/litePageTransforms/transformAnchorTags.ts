import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import { Services } from '#app/models/types/global';
import services from '#lib/config/services/loadableConfig';

const SERVICES = Object.keys(services) as Services[];

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

  const url = new URL(href, getEnvConfig().SIMORGH_BASE_URL);

  const extension = url.pathname?.split('.')?.pop() || '';

  const isValidDomain = VALID_DOMAINS.includes(url.hostname);
  const isWsService = SERVICES.includes(
    url.pathname?.split('/')?.[1] as Services,
  );

  const startsWithHash = url.href?.startsWith('#');

  const hasReservedRouteExtension =
    RESERVED_ROUTE_EXTENSIONS.includes(extension);

  const shouldAddLiteExtension =
    isValidDomain &&
    isWsService &&
    !hasReservedRouteExtension &&
    !startsWithHash;

  if (shouldAddLiteExtension) {
    url.pathname += '.lite';

    return url;
  }

  return null;
};

export default (html: string) => {
  let modifiedHtml = html;

  try {
    const anchorTags = modifiedHtml.match(/<a[^>]*>/g) || [];

    anchorTags.forEach(tag => {
      const href = tag?.match(/href="([^"]*)"/)?.[1];
      const urlWithLite = addLiteExtension(href);

      if (href && urlWithLite) {
        modifiedHtml = modifiedHtml.replace(
          tag,
          tag.replace(href, urlWithLite.href),
        );
      }
    });
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    (() => {})();
  }

  return modifiedHtml;
};
