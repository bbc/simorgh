import Url from 'url-parse';
import services from '#lib/config/services/loadableConfig';

export const fallbackAmpParam = url => {
  const { pathname } = new Url(url, true);
  const ampRegex = /\.amp$/;
  return ampRegex.test(pathname);
};

export const fallbackServiceParam = url => {
  const [service] = url.split('/').filter(Boolean);

  if (service && Object.keys(services).includes(service)) {
    return service;
  }

  return 'news';
};
