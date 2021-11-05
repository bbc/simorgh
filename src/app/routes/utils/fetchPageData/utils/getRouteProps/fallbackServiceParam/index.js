import services from '#lib/config/services/loadableConfig';

export default url => {
  const [service] = url.split('/').filter(Boolean);

  if (service && Object.keys(services).includes(service)) {
    return service;
  }

  return 'news';
};
