import Cookie from 'js-cookie';
import onClient from '../../utilities/onClient';

const ID_COOKIE = 'ckns_sylphid';

export const chartbeatUID = 50924;
export const useCanonical = true;
export const chartbeatSource = '//static.chartbeat.com/js/chartbeat.js';

const buildSectionArr = (service, value, type) => [
  `${service} - ${value}`,
  ...(type ? [`${service} - ${value} - ${type}`] : []),
];

const buildServiceType = (service, type) => [`${service} - ${type}`];

const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);

export const getSylphidCookie = () =>
  onClient() ? Cookie.get(ID_COOKIE) : null;

export const getDomain = service => {
  const serviceLower = service.toLowerCase();

  return serviceLower === 'news' ? 'bbc.co.uk' : `${service}.bbc.co.uk`;
};

export const getType = (pageType, shorthand = false) => {
  switch (pageType) {
    case 'frontPage':
    case 'index':
      return shorthand ? 'IDX' : 'Index';
    case 'article':
      return shorthand ? 'ART' : 'New Article';
    default:
      return null;
  }
};

export const buildSections = (service, type, producer, chapter) => {
  const addProducer = producer && service !== producer;
  const serviceCap = capitalize(service);
  const pageType = getType(type, true);

  const parts = [
    serviceCap,
    ...(type ? buildServiceType(serviceCap, pageType) : []),
    ...(addProducer ? buildSectionArr(serviceCap, producer, pageType) : []),
    ...(chapter ? buildSectionArr(serviceCap, chapter, pageType) : []),
  ];

  return parts.join(', ');
};
