import get from '../../helpers/json/deepGet';
import getOrigin from './getOriginContext/getOrigin';
import getEnv from './getOriginContext/getEnv';
import getHref from './getOriginContext/getHref';
import getReferer from './getOriginContext/getReferer';

const getArticleID = articleData => {
  const aresID = get(['metadata', 'id'], articleData);
  return aresID ? aresID.split(':').pop() : 'unknown';
};

const getOriginContext = (bbcOrigin, service, articleData) => {
  const origin = getOrigin(bbcOrigin);
  const env = getEnv(origin);
  const articleId = getArticleID(articleData);
  const href = getHref(origin, service, articleId);
  const referrer = getReferer();

  return {
    origin,
    isUK: origin.includes('.com'),
    env,
    href,
    referrer,
  };
};

export default getOriginContext;
