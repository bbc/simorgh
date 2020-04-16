import Url from 'url-parse';
import isLive from '#lib/utilities/isLive';

export const addOverrideQuery = (path) => {
  const url = new Url(path);
  const { query } = url;
  const searchParams = new URLSearchParams(query);
  searchParams.set('renderer_env', 'live');
  const searchString = searchParams.toString();
  const pathName = path ? path.split('?')[0] : path;

  return `${pathName}?${searchString}`;
};

const overrideRendererOnTest = (path) =>
  isLive() ? path : addOverrideQuery(path);

export default overrideRendererOnTest;
