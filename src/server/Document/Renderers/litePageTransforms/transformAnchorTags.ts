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

const isValidHref = (href: string) => {
  const url = new URL(href, 'http://localhost');

  const extension = url?.pathname?.split('.')?.pop() || '';
  const startsWithHash = href?.startsWith('#');

  const hasReservedRouteExtension =
    RESERVED_ROUTE_EXTENSIONS.includes(extension);

  const isValidDomain = VALID_DOMAINS.includes(url.hostname);
  const isWsService = SERVICES.includes(
    url?.pathname?.split('/')?.[1] as Services,
  );

  return (
    isValidDomain &&
    isWsService &&
    !hasReservedRouteExtension &&
    !startsWithHash
  );
};

export default (html: string) => {
  let modifiedHtml = html;

  try {
    const anchorTags = modifiedHtml.match(/<a[^>]*>/g) || [];

    anchorTags.forEach(tag => {
      const href = tag?.match(/href="([^"]*)"/)?.[1];
      if (href && isValidHref(href)) {
        modifiedHtml = modifiedHtml.replace(
          tag,
          tag.replace(href, `${href}.lite`),
        );
      }
    });
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    (() => {})();
  }

  return modifiedHtml;
};
