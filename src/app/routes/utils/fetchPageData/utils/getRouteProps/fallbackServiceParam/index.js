import services from '#lib/config/services/serviceList';

export default url => {
  const [service] = url.split('/').filter(Boolean);

  if (service && services.includes(service)) {
    return service;
  }

  return 'news';
};
