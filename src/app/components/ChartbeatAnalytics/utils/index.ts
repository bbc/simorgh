import Cookie from 'js-cookie';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import find from 'ramda/src/find';
import propSatisfies from 'ramda/src/propSatisfies';
import includes from 'ramda/src/includes';
import onClient from '../../../lib/utilities/onClient';
import { getPromoHeadline } from '../../../lib/analyticsUtils/article';
import { getPageTitle } from '../../../lib/analyticsUtils/indexPage';
import { getReferrer } from '../../../lib/analyticsUtils';
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
} from '../../../routes/utils/pageTypes';
import {
  Environments,
  PageTypes,
  Platforms,
  Services,
} from '../../../models/types/global';

const ID_COOKIE = 'ckns_sylphid';

export const chartbeatUID = 50924;
export const useCanonical = true;
export const chartbeatSource = '//static.chartbeat.com/js/chartbeat.js';

const capitalize = (s: string) => s?.charAt(0).toUpperCase() + s?.slice(1);

const buildSectionArr = (service: Services, value: string, type: string) => [
  `${capitalize(service)} - ${value}`,
  ...(type ? [`${capitalize(service)} - ${value} - ${type}`] : []),
];

const buildSectionItem = (service: Services | string, type: string) => [
  `${capitalize(service)} - ${type}`,
];

export const getSylphidCookie = () =>
  onClient() ? Cookie.get(ID_COOKIE) : null;

export const getType = (pageType: PageTypes | 'index', shorthand = false) => {
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

type Taggings = {
  predicate: string;
  value: string;
}[];

interface SectionsProps {
  service: Services;
  pageType: PageTypes;
  producer?: string | null;
  chapter?: string | null;
  sectionName?: string;
  categoryName: string;
  mediaPageType: string;
  taggings: Taggings;
}

const AUDIO_KEY = 'fe1fbc8a-bb44-4bf8-8b12-52e58c6345a4';
const VIDEO_KEY = 'ffc98bca-8cff-4ee6-9beb-a6ff6ef3ef9f';
const getPrimaryMediaType = (taggings: Taggings) => {
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
}: SectionsProps) => {
  const addProducer = producer && service !== producer;
  const type = getType(pageType, true) as string;
  const appendCategory = (name: string) => `${name}-category`;

  const mediaSectionLabel: { [key: string]: string } = {
    'On Demand Radio': 'Radio',
    'Live Radio': 'Radio',
    'On Demand TV': 'TV',
    Podcast: 'Podcasts',
  };

  switch (pageType) {
    case STORY_PAGE:
    case MEDIA_ASSET_PAGE:
      return [
        capitalize(service),
        ...(sectionName ? buildSectionItem(service, sectionName) : []),
        buildSectionItem(service, pageType),
        ...(sectionName
          ? buildSectionItem(
              buildSectionItem(service, sectionName).join(', '),
              pageType,
            )
          : []),
        buildSectionItem(service, appendCategory(categoryName)),
      ].join(', ');
    case MEDIA_PAGE:
      return [
        capitalize(service),
        buildSectionItem(service, mediaSectionLabel[mediaPageType]),
        ...(addProducer ? buildSectionArr(service, producer, type) : []),
        ...(chapter ? buildSectionArr(service, chapter, type) : []),
      ].join(', ');
    case MEDIA_ARTICLE_PAGE:
      return [
        capitalize(service),
        ...(pageType
          ? buildSectionItem(service, getPrimaryMediaType(taggings))
          : []),
        ...(addProducer ? buildSectionArr(service, producer, type) : []),
        ...(chapter ? buildSectionArr(service, chapter, type) : []),
      ].join(', ');
    default:
      return [
        capitalize(service),
        ...(pageType ? buildSectionItem(service, type) : []),
        ...(addProducer ? buildSectionArr(service, producer, type) : []),
        ...(chapter ? buildSectionArr(service, chapter, type) : []),
      ].join(', ');
  }
};

const getHeadline = path(['promo', 'headlines', 'headline']);

interface GetTitleProps {
  pageType: PageTypes | 'index';
  pageData: {
    title?: string;
    pageTitle?: string;
    promo?: {
      headlines: {
        headline: string;
      };
    };
  };
  brandName?: string;
  title?: string;
}

export const getTitle = ({
  pageType,
  pageData,
  brandName,
  title,
}: GetTitleProps) => {
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

export interface GetConfigProps {
  isAmp: boolean;
  platform: Platforms;
  pageType: PageTypes;
  data: object;
  brandName: string;
  env: Environments;
  service: Services;
  origin: string;
  previousPath: string | null;
  chartbeatDomain: string;
  mostReadTitle?: string;
  mostWatchedTitle?: string;
}

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
}: GetConfigProps) => {
  const referrer =
    previousPath || isAmp ? getReferrer(platform, origin, previousPath) : null;

  const title = getTitle({
    pageType,
    pageData: data,
    brandName,
    title: pageType === MOST_WATCHED_PAGE ? mostWatchedTitle : mostReadTitle,
  }) as string;
  const domain = env !== 'live' ? 'test.bbc.co.uk' : chartbeatDomain;
  const sectionName = path<string>(
    ['relatedContent', 'section', 'name'],
    data,
  ) as string;
  const categoryName = path(
    ['metadata', 'passport', 'category', 'categoryName'],
    data,
  ) as string;

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
  const type = getType(pageType) as string;
  const contentType = (
    pageType === MEDIA_PAGE ? getTvRadioContentType(data) : type
  ) as string;
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
