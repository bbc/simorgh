import Cookie from 'js-cookie';
import onClient from '../utilities/onClient';

const ID_COOKIE = 'ckns_sylphid';

export const chartbeatUID = 50924;

export const useCanonical = true;

export const getSylphidCookie = () => {
  if (!onClient()) {
    return null;
  }

  return Cookie.get(ID_COOKIE) ? Cookie.get(ID_COOKIE) : null;
};

export const domain = service => {
  const serviceLower = service.toLowerCase();

  return serviceLower === 'news' ? 'bbc.co.uk' : `${service}.bbc.co.uk`;
};

const buildSectionArr = (service, value, type) => [
  `${service} - ${value}`,
  `${service} - ${value} - ${type}`,
];

const buildServiceType = (service, type) => `${service} - ${type}`;

export const sections = (service, type, producer, chapter) => {
  const pageType = type === 'article' ? 'ART' : 'IDX';

  const parts = [
    service,
    buildServiceType(service, pageType),
    ...(producer ? buildSectionArr(service, producer, pageType) : []),
    ...(chapter ? buildSectionArr(service, chapter, pageType) : []),
  ];

  return parts.join(', ');
};

export const type = pageType =>
  pageType === 'article' ? 'New Article' : 'Index';
