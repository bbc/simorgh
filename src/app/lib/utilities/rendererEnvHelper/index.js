/* eslint-disable camelcase */
import { getQueryParams } from '../urlParser';
import isLive from '../envHelper';

export default url => {
  if (isLive()) {
    return false;
  }

  const { renderer_env } = getQueryParams(url);

  return renderer_env === 'live';
};
