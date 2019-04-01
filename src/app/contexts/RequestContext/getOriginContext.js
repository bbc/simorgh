import get from '../../helpers/json/deepGet';
import onClient from '../../helpers/onClient';

const getArticleID = articleData => {
  const aresID = get(['metadata', 'id'], articleData);
  return aresID ? aresID.split(':').pop() : 'unknown';
};

const getOrigin = bbcOrigin => {
  let origin = 'https://www.bbc.co.uk';

  if (bbcOrigin) {
    origin = bbcOrigin;
  } else if (onClient() && window.location.origin) {
    origin = window.location.origin; // eslint-disable-line prefer-destructuring
  }

  return origin;
};

const getOriginContext = (bbcOrigin, service, articleData) => {
  const origin = getOrigin(bbcOrigin);
  let href = `${origin}/${service}/${getArticleID(articleData)}`;
  let isUK = true;
  let referrer = null;
  let env = 'live';

  if (onClient()) {
    if (window.location.href) {
      href = window.location.href; // eslint-disable-line prefer-destructuring
    }

    if (document.referrer) {
      referrer = document.referrer; // eslint-disable-line prefer-destructuring
    }
  }

  if (origin.includes('.stage.')) {
    env = 'stage';
  }

  if (origin.includes('.test.')) {
    env = 'test';
  }

  if (origin.includes('localhost')) {
    env = 'local';
  }

  if (origin.includes('.com')) {
    isUK = false;
  }

  return {
    origin,
    isUK,
    env,
    href,
    referrer,
  };
};

export default getOriginContext;
