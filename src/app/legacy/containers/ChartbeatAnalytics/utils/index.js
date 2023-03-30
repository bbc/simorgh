import Cookie from 'js-cookie';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import find from 'ramda/src/find';
import propSatisfies from 'ramda/src/propSatisfies';
import includes from 'ramda/src/includes';
import onClient from '#lib/utilities/onClient';
import { getPromoHeadline } from '#lib/analyticsUtils/article';
import { getPageTitle } from '#lib/analyticsUtils/indexPage';
import { getReferrer } from '#lib/analyticsUtils';
import {
  ARTICLE_PAGE,
  FRONT_PAGE,
  MEDIA_PAGE,
  MOST_READ_PAGE,
  MOST_WATCHED_PAGE,
  INDEX_PAGE,
  FEATURE_INDEX_PAGE,
  MEDIA_ASSET_PAGE,
  PHOTO_GALLERY_PAGE,
  STORY_PAGE,
  TOPIC_PAGE,
  LIVE_PAGE,
  MEDIA_ARTICLE_PAGE,
} from '#app/routes/utils/pageTypes';

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
    case FRONT_PAGE:
    case INDEX_PAGE:
    case 'index':
      return shorthand ? INDEX_PAGE : 'Index';
    case ARTICLE_PAGE:
      return shorthand ? 'ART' : 'New Article';
    case MEDIA_ARTICLE_PAGE:
      return 'article-sfv';
    case MEDIA_ASSET_PAGE:
      return 'article-media-asset';
    case MEDIA_PAGE:
      return 'Radio';
    case MOST_READ_PAGE:
      return 'Most Read';
    case MOST_WATCHED_PAGE:
      return 'Most Watched';
    case STORY_PAGE:
      return STORY_PAGE;
    case PHOTO_GALLERY_PAGE:
      return PHOTO_GALLERY_PAGE;
    case FEATURE_INDEX_PAGE:
      return FEATURE_INDEX_PAGE;
    case TOPIC_PAGE:
      return 'Topics';
    case LIVE_PAGE:
      return 'Live';
    default:
      return null;
  }
};

const AUDIO_KEY = 'fe1fbc8a-bb44-4bf8-8b12-52e58c6345a4';
const VIDEO_KEY = 'ffc98bca-8cff-4ee6-9beb-a6ff6ef3ef9f';
const getPrimaryMediaType = taggings => {
  const defaultLabel = 'article-sfv';
  // FIND THE primaryMediaType ELEMENT IN THE LIST OF TAGGINGS
  const primaryMediaTag = find(
    propSatisfies(includes('primaryMediaType'), 'predicate'),
    taggings,
  );

  if (!primaryMediaTag) {
    return defaultLabel;
  }

  const isAudio = propSatisfies(includes(AUDIO_KEY), 'value', primaryMediaTag);
  const isVideo = propSatisfies(includes(VIDEO_KEY), 'value', primaryMediaTag);

  if (isAudio) return 'audio';
  if (isVideo) return 'video';
  return defaultLabel;
};

export const buildSections = ({
  service,
  pageType,
  producer,
  chapter,
  sectionName,
  categoryName,
  mediaPageType,
  taggings,
}) => {
  const addProducer = producer && service !== producer;
  const serviceCap = capitalize(service);
  const type = getType(pageType, true);
  const appendCategory = name => `${name}-category`;

  const mediaSectionLabel = {
    'On Demand Radio': 'Radio',
    'Live Radio': 'Radio',
    'On Demand TV': 'TV',
    Podcast: 'Podcasts',
  };

  switch (pageType) {
    case STORY_PAGE:
    case MEDIA_ASSET_PAGE:
      return [
        serviceCap,
        buildSectionItem(serviceCap, sectionName),
        buildSectionItem(serviceCap, pageType),
        buildSectionItem(buildSectionItem(serviceCap, sectionName), pageType),
        buildSectionItem(serviceCap, appendCategory(categoryName)),
      ].join(', ');
    case MEDIA_PAGE:
      return [
        serviceCap,
        buildSectionItem(serviceCap, mediaSectionLabel[mediaPageType]),
        ...(addProducer ? buildSectionArr(serviceCap, producer, type) : []),
        ...(chapter ? buildSectionArr(serviceCap, chapter, type) : []),
      ].join(', ');
    case MEDIA_ARTICLE_PAGE:
      return [
        serviceCap,
        ...(pageType
          ? buildSectionItem(serviceCap, getPrimaryMediaType(taggings))
          : []),
        ...(addProducer ? buildSectionArr(serviceCap, producer, type) : []),
        ...(chapter ? buildSectionArr(serviceCap, chapter, type) : []),
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

const getHeadline = path(['promo', 'headlines', 'headline']);

export const getTitle = ({ pageType, pageData, brandName, title }) => {
  switch (pageType) {
    case FRONT_PAGE:
    case INDEX_PAGE:
    case FEATURE_INDEX_PAGE:
    case 'index':
      return getPageTitle(pageData, brandName);
    case ARTICLE_PAGE:
      return getPromoHeadline(pageData);
    case MEDIA_ASSET_PAGE:
    case STORY_PAGE:
    case PHOTO_GALLERY_PAGE:
      return getHeadline(pageData);
    case MEDIA_PAGE:
      return path(['pageTitle'], pageData);
    case MOST_READ_PAGE:
    case MOST_WATCHED_PAGE:
      return `${title} - ${brandName}`;
    case TOPIC_PAGE:
      return `${pageData?.title} - ${brandName}`;
    case LIVE_PAGE:
      return `${pageData?.title} - ${brandName}`;
    default:
      return null;
  }
};

const getTvRadioContentType = path(['contentType']);

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
  mostReadTitle,
  mostWatchedTitle,
}) => {
  const referrer =
    previousPath || isAmp ? getReferrer(platform, origin, previousPath) : null;

  const title = getTitle({
    pageType,
    pageData: data,
    brandName,
    title: pageType === MOST_WATCHED_PAGE ? mostWatchedTitle : mostReadTitle,
  });
  const domain = env !== 'live' ? 'test.bbc.co.uk' : chartbeatDomain;
  const sectionName = path(['relatedContent', 'section', 'name'], data);
  const categoryName = path(
    ['metadata', 'passport', 'category', 'categoryName'],
    data,
  );

  const mediaPageType = pathOr('', ['metadata', 'type'], data);
  const taggings = pathOr([], ['metadata', 'passport', 'taggings'], data);
  const sections = buildSections({
    service,
    pageType,
    sectionName,
    categoryName,
    mediaPageType,
    taggings,
  });
  const cookie = getSylphidCookie();
  const type = getType(pageType);
  const contentType =
    pageType === MEDIA_PAGE ? getTvRadioContentType(data) : type;
  const currentPath = onClient() && window.location.pathname;
  return {
    domain,
    sections,
    uid: chartbeatUID,
    title,
    virtualReferrer: referrer,
    ...(isAmp && { contentType }),
    ...(!isAmp && {
      type: contentType,
      useCanonical,
      path: currentPath,
    }),
    ...(cookie && { idSync: { bbc_hid: cookie } }),
  };
};
