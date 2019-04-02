import onClient from '../../../helpers/onClient';

const getHref = (origin, service, optimoId) => {
  if (onClient() && window.location.href) {
    return window.location.href; // eslint-disable-line prefer-destructuring
  }

  return `${origin}/${service}/${optimoId}`;
};

export default getHref;
