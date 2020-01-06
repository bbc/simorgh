import Cookie from 'js-cookie';
import onClient from '../../../lib/utilities/onClient';
import { getPromoHeadline } from '../../../lib/analyticsUtils/article';
import { getPageTitle } from '../../../lib/analyticsUtils/frontpage';
import { getReferrer } from '../../../lib/analyticsUtils';

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

export const getTitle = (pageType, pageData, brandName) => {
  switch (pageType) {
    case 'frontPage':
    case 'index':
      return getPageTitle(pageData, brandName);
    case 'article':
      return getPromoHeadline(pageData);
    default:
      return null;
  }
};

export const getConfig = ({
  isAmp,
  pageType,
  data,
  brandName,
  env,
  service,
  origin,
  previousPath,
}) => {
  const referrer = getReferrer(isAmp, origin, previousPath);
  const title = getTitle(pageType, data, brandName);
  const domain = env !== 'live' ? getDomain('test') : getDomain(service);
  const sections = buildSections(service, pageType);
  const cookie = getSylphidCookie();
  const type = getType(pageType);
  const currentPath = onClient() && window.location.pathname;
  return {
    domain,
    sections,
    uid: chartbeatUID,
    title,
    virtualReferrer: referrer,
    ...(isAmp && { contentType: type }),
    ...(!isAmp && {
      type,
      useCanonical,
      path: currentPath,
    }),
    ...(cookie && { idSync: { bbc_hid: cookie } }),
  };
};
