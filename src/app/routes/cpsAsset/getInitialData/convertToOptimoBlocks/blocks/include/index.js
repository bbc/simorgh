import 'isomorphic-fetch';
import Url from 'url-parse';
import {
  INCLUDE_ERROR,
  INCLUDE_FETCH_ERROR,
  INCLUDE_MISSING_URL,
  INCLUDE_REQUEST_RECEIVED,
  INCLUDE_UNSUPPORTED,
} from '#lib/logger.const';
import nodeLogger from '#lib/logger.node';
import { addOverrideQuery } from '#app/routes/utils/overrideRendererOnTest';

const logger = nodeLogger(__filename);

const buildIncludeUrl = (href, type, pathname) => {
  const resolvers = {
    idt1: '',
    idt2: '/html',
    vj: '',
  };

  const withTrailingHref = href.startsWith('/') ? href : `/${href}`;

  const includeUrl = `${process.env.SIMORGH_INCLUDES_BASE_URL}${withTrailingHref}${resolvers[type]}`;

  const currentRendererEnv = new Url(pathname, true).query.renderer_env;

  let includeUrlWithParam = '';

  switch (currentRendererEnv) {
    case 'test':
      includeUrlWithParam = addOverrideQuery(includeUrl, 'test');
      break;
    case 'live':
      includeUrlWithParam = addOverrideQuery(includeUrl, 'live');
      break;
    default:
      return includeUrl;
  }
  return includeUrlWithParam;
};

const fetchMarkup = async url => {
  try {
    /* The timeout value here is arbitrary and subject to change. It's purpose is to ensure that pending promises do not delay page rendering on the server.
      Using isomorphic-fetch means we use window.fetch, which does not have a timeout option, on the client and node-fetch, which does, on the server.
    */
    const res = await fetch(url, { timeout: 3000 });
    if (res.status !== 200) {
      logger.error(INCLUDE_FETCH_ERROR, {
        status: res.status,
        url,
      });
      return null;
    }
    const html = await res.text();
    logger.info(INCLUDE_REQUEST_RECEIVED, {
      url,
    });
    return html;
  } catch (error) {
    logger.error(INCLUDE_ERROR, {
      error: error.toString(),
      url,
    });
    return null;
  }
};

const convertInclude = async (includeBlock, ...restParams) => {
  const supportedTypes = {
    indepthtoolkit: 'idt1',
    idt2: 'idt2',
    include: 'vj',
    'news/special': 'vj',
    'market-data': 'vj',
    'smallprox/include': 'vj',
  };

  const { href, type, ...rest } = includeBlock;

  // Here pathname is passed as a prop specifically for CPS includes
  // This will most likely change in issue #6784 so it is temporary for now
  const pathname = restParams[2];

  if (!href) {
    logger.error(INCLUDE_MISSING_URL, includeBlock);
    return null;
  }

  // This determines if the href has a leading '/'
  const hrefTypePostion = () => (href.indexOf('/') === 0 ? 1 : 0);

  // This checks if the supportedType is in the correct position of the href
  const hrefIsSupported = () => supportedType =>
    href.startsWith(supportedType, hrefTypePostion());

  // This extracts the type from the href
  const typeExtraction = Object.keys(supportedTypes).find(
    hrefIsSupported(href),
  );

  // This determines if the type is supported and returns the include type name
  const includeType = supportedTypes[typeExtraction];
  if (!includeType) {
    logger.info(INCLUDE_UNSUPPORTED, {
      type,
      url: href,
    });
    return null;
  }

  return {
    type,
    model: {
      href,
      html: await fetchMarkup(buildIncludeUrl(href, includeType, pathname)),
      type: includeType,
      ...rest,
    },
  };
};

export default convertInclude;
