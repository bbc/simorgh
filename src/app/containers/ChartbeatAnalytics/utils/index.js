import Cookie from 'js-cookie';
import path from 'ramda/src/path';
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

const buildSectionItem = (service, type) => [`${service} - ${type}`];

const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);

export const getSylphidCookie = () =>
  onClient() ? Cookie.get(ID_COOKIE) : null;

export const getType = (pageType, shorthand = false) => {
  switch (pageType) {
    case 'frontPage':
    case 'index':
      return shorthand ? 'IDX' : 'Index';
    case 'article':
      return shorthand ? 'ART' : 'New Article';
    case 'MAP':
      return 'article-media-asset';
    case 'media':
      return 'Live Radio';
    case 'mostRead':
      return 'Most Read';
    default:
      return null;
  }
};

export const buildSections = ({
  service,
  pageType,
  producer,
  chapter,
  sectionName,
  categoryName,
}) => {
  const addProducer = producer && service !== producer;
  const serviceCap = capitalize(service);
  const type = getType(pageType, true);
  const appendCategory = name => `${name}-category`;

  switch (pageType) {
    case 'MAP':
      return [
        serviceCap,
        buildSectionItem(serviceCap, sectionName),
        buildSectionItem(serviceCap, pageType),
        buildSectionItem(buildSectionItem(serviceCap, sectionName), pageType),
        buildSectionItem(serviceCap, appendCategory(categoryName)),
      ].join(', ');
    case 'media':
      return [
        serviceCap,
        buildSectionItem(serviceCap, ''),
        buildSectionItem(serviceCap, 'unknown'),
        buildSectionItem(serviceCap, 'unknown'),
        buildSectionItem(serviceCap, 'unknown'),
      ].join(', ');
    default:
      return [
        serviceCap,
        ...(pageType ? buildSectionItem(serviceCap, type) : []),
        ...(addProducer ? buildSectionArr(serviceCap, producer, type) : []),
        ...(chapter ? buildSectionArr(serviceCap, chapter, type) : []),
      ].join(', ');
  }
};

export const getTitle = (pageType, pageData, brandName) => {
  switch (pageType) {
    case 'frontPage':
    case 'index':
      return getPageTitle(pageData, brandName);
    case 'article':
      return getPromoHeadline(pageData);
    case 'MAP':
      return path(['promo', 'headlines', 'headline'], pageData);
    case 'media':
      return path(['name'], pageData);
    default:
      return null;
  }
};

export const getConfig = ({
  isAmp,
  platform,
  pageType,
  data,
  brandName,
  env,
  service,
  origin,
  previousPath,
  chartbeatDomain,
}) => {
  const referrer = getReferrer(platform, origin, previousPath);
  const title = getTitle(pageType, data, brandName);
  const domain = env !== 'live' ? 'test.bbc.co.uk' : chartbeatDomain;
  const sectionName = path(['relatedContent', 'section', 'name'], data);
  const categoryName = path(
    ['metadata', 'passport', 'category', 'categoryName'],
    data,
  );
  const sections = buildSections({
    service,
    pageType,
    sectionName,
    categoryName,
  });
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
