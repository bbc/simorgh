import onClient from '../../../helpers/onClient';

const getReferrer = () => {
  if (onClient() && document.referrer) {
    return document.referrer;
  }

  return null;
};

export default getReferrer;
