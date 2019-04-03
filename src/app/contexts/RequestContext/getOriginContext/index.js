import getOrigin from './getOrigin';
import getEnv from './getEnv';
import getHref from './getHref';
import getReferrer from './getReferrer';
import getArticleId from './getArticleId';

const getOriginContext = (bbcOrigin, service, articleData) => {
  const origin = getOrigin(bbcOrigin);
  const env = getEnv(origin);
  const articleId = getArticleId(articleData);
  const href = getHref(origin, service, articleId);
  const referrer = getReferrer();

  const isUK = !origin.includes('.com');

  return {
    origin,
    isUK,
    env,
    href,
    referrer,
  };
};

export default getOriginContext;
