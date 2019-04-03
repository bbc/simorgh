import onClient from '../../../helpers/onClient';

const getOrigin = bbcOrigin => {
  if (bbcOrigin) {
    return bbcOrigin;
  }

  if (onClient() && window.location.origin) {
    return window.location.origin;
  }

  return 'https://www.bbc.co.uk';
};

export default getOrigin;
