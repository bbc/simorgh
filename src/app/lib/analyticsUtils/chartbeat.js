export const chartbeatUID = 50924;

export const useCanonical = true;

export const cknsSylphid = () => {};

export const domain = service => {
  const serviceLower = service.toLowerCase();

  return serviceLower === 'news' ? 'bbc.co.uk' : `${service}.bbc.co.uk`;
};

export const sections = service => {
  const parts = [];

  parts.push(service);

  const pageType = `${service} - ART`;

  parts.push(pageType);

  return parts.join(', ');
};

export const type = pageType =>
  pageType === 'article' ? 'News Article' : 'Index';
