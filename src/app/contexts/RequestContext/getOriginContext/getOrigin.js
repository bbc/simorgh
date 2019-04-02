import onClient from '../../../helpers/onClient';

const getOrigin = bbcOrigin => {
  let origin = 'https://www.bbc.co.uk';

  if (bbcOrigin) {
    origin = bbcOrigin;
  } else if (onClient() && window.location.origin) {
    origin = window.location.origin; // eslint-disable-line prefer-destructuring
  }

  return origin;
};

export default getOrigin;
