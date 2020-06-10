import Url from 'url-parse';
import isLive from '#lib/utilities/isLive';

const getQueryString = query => {
  const params = Object.keys(query).map(key => `${key}=${query[key]}`);
  return params.join('&');
};

export const addOverrideQuery = (path, env = 'live') => {
  const url = new Url(path, true);
  const { query } = url;
  const searchString = getQueryString({ ...query, renderer_env: `${env}` });
  const pathName = path ? path.split('?')[0] : path;

  return `${pathName}?${searchString}`;
};

const overrideRendererOnTest = path =>
  isLive() ? path : addOverrideQuery(path);

export default overrideRendererOnTest;
