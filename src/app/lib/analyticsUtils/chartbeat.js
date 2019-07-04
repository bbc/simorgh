export const chartbeatUID = 50924;

export const useCanonical = true;

export const getSylphidCookie = () => {};

export const domain = service => {
  const serviceLower = service.toLowerCase();

  return serviceLower === 'news' ? 'bbc.co.uk' : `${service}.bbc.co.uk`;
};

const buildProducerArr = ({ service, producer }, type) => [
  `${service} - ${producer}`,
  `${service} - ${producer} - ${type}`,
];

const buildChapterArr = ({ service, chapter }, type) => [
  `${service} - ${chapter}`,
  `${service} - ${chapter} - ${type}`,
];

const buildServiceType = ({ service }, type) => [`${service} - ${type}`];

export const sections = x => {
  const pageType = `ART`;

  const parts = [
    x.service,
    buildServiceType(x, pageType),
    ...(x.producer ? buildProducerArr(x, pageType) : []),
    ...(x.chapter ? buildChapterArr(x, pageType) : []),
  ];

  return parts.join(', ');
};

export const type = pageType =>
  pageType === 'article' ? 'New Article' : 'Index';
