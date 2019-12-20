import { getParsedQueryString } from '../urlParser';
import isLive from '../envHelper';

const hasLiveOverride = url => {
  const params = getParsedQueryString(url);

  return params && !isLive() && params.renderer_env === 'live';
};

export default hasLiveOverride;
