import SERVICES from '#lib/config/services';

export default url => {
  const [service] = url.split('/').filter(Boolean);

  if (service && SERVICES.includes(service)) {
    return service;
  }

  return 'news';
};
