import Url from 'url-parse';

import { addOverrideQuery } from '#routes/utils/overrideRendererOnTest';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

export default (href, type, pathname) => {
  const mutator = {
    idt1: '',
    idt2: '/html',
    vj: '',
  };

  const withTrailingHref = href.startsWith('/') ? href : `/${href}`;

  const includeUrl = `${
    getEnvConfig().SIMORGH_INCLUDES_BASE_URL
  }${withTrailingHref}${mutator[type]}`;

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
