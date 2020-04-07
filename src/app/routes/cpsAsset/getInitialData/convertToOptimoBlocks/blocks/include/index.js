import 'isomorphic-fetch';
import nodeLogger from '#lib/logger.node';

const logger = nodeLogger(__filename);

const buildIncludeUrl = (href, type) => {
  const resolvers = {
    idt1: '',
    idt2: '/html',
    vj: '',
  };

  const withTrailingHref = href.startsWith('/') ? href : `/${href}`;

  return `${process.env.SIMORGH_INCLUDES_ENDPOINT}${withTrailingHref}${resolvers[type]}`;
};

const fetchMarkup = async (url) => {
  try {
    /* The timeout value here is arbitrary and subject to change. It's purpose is to ensure that pending promises do not delay page rendering on the server.
      Using isomorphic-fetch means we use window.fetch, which does not have a timeout option, on the client and node-fetch, which does, on the server.
    */
    const res = await fetch(url, { timeout: 3000 });
    if (res.status !== 200) {
      throw new Error(`Failed to fetch include at: ${url}`);
    } else {
      const html = await res.text();
      return html;
    }
  } catch (e) {
    logger.error(
      JSON.stringify(
        {
          event: 'include_fetch_error',
          message: e,
        },
        null,
        2,
      ),
    );
    return null;
  }
};

const convertInclude = async ({ href, type, ...rest }) => {
  const supportedTypes = {
    indepthtoolkit: 'idt1',
    idt2: 'idt2',
    include: 'vj',
  };

  // This determines if the href has a leading '/'
  const hrefTypePostion = () => (href.indexOf('/') === 0 ? 1 : 0);

  // This checks if the supportedType is in the correct position of the href
  const hrefIsSupported = () => (supportedType) =>
    href && href.startsWith(supportedType, hrefTypePostion());

  // This extracts the type from the href
  const typeExtraction = Object.keys(supportedTypes).find(
    hrefIsSupported(href),
  );

  // This determines if the type is supported and returns the include type name
  const includeType = supportedTypes[typeExtraction];

  if (!includeType) {
    return null;
  }

  return {
    type,
    model: {
      href,
      html: await fetchMarkup(buildIncludeUrl(href, includeType)),
      type: includeType,
      ...rest,
    },
  };
};

export default convertInclude;
