import services from '#lib/config/services/loadableConfig';

export const fallbackAmpParam = url => {
  const ampRegex = /\.amp$/;
  return ampRegex.test(url);
};

export const fallbackServiceParam = url => {
  const [service] = url.split('/').filter(Boolean);

  if (service && Object.keys(services).includes(service)) {
    return service;
  }

  return 'news';
};
