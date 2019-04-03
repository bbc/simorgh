import onClient from '../../../helpers/onClient';

const getHref = (origin, service, optimoId) => {
  if (onClient() && window.location.href) {
    return window.location.href;
  }

  if (origin && service && optimoId) {
    return `${origin}/${service}/articles/${optimoId}`;
  }

  return null;
};

export default getHref;
