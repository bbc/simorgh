import Cookie from 'js-cookie';
import find from 'ramda/src/find';
import propSatisfies from 'ramda/src/propSatisfies';
import includes from 'ramda/src/includes';
import onClient from '../../../lib/utilities/onClient';
import { getReferrer } from '../../../lib/analyticsUtils';
import {
  ARTICLE_PAGE,
  MOST_READ_PAGE,
  MEDIA_ASSET_PAGE,
  PHOTO_GALLERY_PAGE,
  STORY_PAGE,
  TOPIC_PAGE,
  LIVE_PAGE,
  MEDIA_ARTICLE_PAGE,
  LIVE_RADIO_PAGE,
  AUDIO_PAGE,
  TV_PAGE,
} from '../../../routes/utils/pageTypes';
import {
  Environments,
  PageTypes,
  Platforms,
  Services,
} from '../../../models/types/global';
import { MetadataTaggings } from '../../../models/types/metadata';

const ID_COOKIE = 'ckns_sylphid';

export const chartbeatUID = 50924;
export const useCanonical = true;
export const chartbeatSource = '//static.chartbeat.com/js/chartbeat.js';

const capitalize = (s = '') => `${s?.charAt(0).toUpperCase()}${s?.slice(1)}`;

const buildSectionArr = (service: Services, value: string, type: string) => [
  `${capitalize(service)} - ${value}`,
  ...(type ? [`${capitalize(service)} - ${value} - ${type}`] : []),
];

const buildSectionItem = (service: Services | string, type: string) => [
  `${capitalize(service)} - ${type}`,
];

export const getSylphidCookie = () =>
  onClient() ? Cookie.get(ID_COOKIE) : null;

export const getType = (pageType: PageTypes, shorthand = false) => {
  switch (pageType) {
    case ARTICLE_PAGE:
      return shorthand ? 'ART' : 'New Article';
    case MEDIA_ARTICLE_PAGE:
      return 'article-sfv';
    case MEDIA_ASSET_PAGE:
      return 'article-media-asset';
    case LIVE_RADIO_PAGE:
    case AUDIO_PAGE:
      return 'Radio';
    case TV_PAGE:
      return 'TV';
    case MOST_READ_PAGE:
      return 'Most Read';
    case STORY_PAGE:
      return STORY_PAGE;
    case PHOTO_GALLERY_PAGE:
      return PHOTO_GALLERY_PAGE;
    case TOPIC_PAGE:
      return 'Topics';
    case LIVE_PAGE:
      return shorthand ? 'LIV' : 'Live';
    default:
      return pageType;
  }
};

interface SectionsProps {
  service: Services;
  pageType: PageTypes;
  producer?: string;
  chapter?: string;
  sectionName?: string;
  categoryName?: string;
  mediaPageType?: string;
  taggings?: MetadataTaggings;
}

const AUDIO_KEY = 'fe1fbc8a-bb44-4bf8-8b12-52e58c6345a4';
const VIDEO_KEY = 'ffc98bca-8cff-4ee6-9beb-a6ff6ef3ef9f';

const getPrimaryMediaType = (taggings?: MetadataTaggings) => {
  const defaultLabel = 'article-sfv';

  // FIND THE primaryMediaType ELEMENT IN THE LIST OF TAGGINGS
  const primaryMediaTag = find(
    propSatisfies(includes('primaryMediaType'), 'predicate'),
    taggings || [],
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
  sectionName,
  categoryName,
  mediaPageType,
  taggings,
  producer,
  chapter,
}: SectionsProps) => {
  const addProducer =
    producer && producer.toLowerCase() !== service.toLowerCase();
  const type = getType(pageType, true) as string;
  const appendCategory = (name: string) => `${name}-category`;

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
        ...(categoryName
          ? buildSectionItem(service, appendCategory(categoryName))
          : []),
      ].join(', ');
    case LIVE_RADIO_PAGE:
    case AUDIO_PAGE:
    case TV_PAGE:
      return [
        capitalize(service),
        ...(mediaPageType ? buildSectionItem(service, mediaPageType) : []),
        ...(addProducer ? buildSectionArr(service, producer, type) : []),
        ...(chapter ? buildSectionArr(service, chapter, type) : []),
      ].join(', ');
    case MEDIA_ARTICLE_PAGE:
      return [
        capitalize(service),
        buildSectionItem(service, getPrimaryMediaType(taggings)),
        ...(addProducer ? buildSectionArr(service, producer, type) : []),
        ...(chapter ? buildSectionArr(service, chapter, type) : []),
      ].join(', ');
    default:
      return [
        capitalize(service),
        ...(type ? buildSectionItem(service, type) : []),
        ...(addProducer ? buildSectionArr(service, producer, type) : []),
        ...(chapter ? buildSectionArr(service, chapter, type) : []),
      ].join(', ');
  }
};

interface GetTitleProps {
  pageType: PageTypes | 'index';
  title: string;
  brandName?: string;
}

export const getTitle = ({ pageType, title, brandName }: GetTitleProps) => {
  switch (pageType) {
    case MOST_READ_PAGE:
    case TOPIC_PAGE:
    case LIVE_PAGE:
    case LIVE_RADIO_PAGE:
    case AUDIO_PAGE:
    case TV_PAGE:
    case 'index':
      return `${title} - ${brandName}`;
    case ARTICLE_PAGE:
    case MEDIA_ASSET_PAGE:
    case STORY_PAGE:
    case PHOTO_GALLERY_PAGE:
    default:
      return title;
  }
};

export interface GetConfigProps {
  isAmp: boolean;
  platform: Platforms;
  pageType: PageTypes;
  brandName: string;
  env: Environments;
  service: Services;
  chartbeatDomain: string;
  sectionName?: string;
  mediaPageType?: string;
  categoryName?: string;
  title: string;
  authors?: string;
  taggings?: MetadataTaggings;
  contentType?: string;
  producer?: string;
  chapter?: string;
}

export const getConfig = ({
  isAmp,
  platform,
  pageType,
  brandName,
  env,
  service,
  chartbeatDomain,
  mediaPageType,
  sectionName,
  categoryName,
  title,
  authors,
  taggings,
  contentType,
  producer,
  chapter,
}: GetConfigProps) => {
  const referrer = isAmp ? getReferrer(platform) : null;

  const analyticsTitle = getTitle({
    pageType,
    brandName,
    title,
  });

  const domain = env !== 'live' ? 'test.bbc.co.uk' : chartbeatDomain;

  const sections = buildSections({
    service,
    pageType,
    sectionName,
    categoryName,
    mediaPageType,
    taggings,
    producer,
    chapter,
  });

  const cookie = getSylphidCookie();

  const currentPath = onClient() && window.location.pathname;

  const analyticsContentType = contentType || getType(pageType);

  return {
    domain,
    sections,
    uid: chartbeatUID,
    title: analyticsTitle,
    ...(authors && { authors }),
    virtualReferrer: referrer,
    ...(isAmp && { contentType: analyticsContentType }),
    ...(!isAmp && {
      type: analyticsContentType,
      useCanonical,
      path: currentPath,
    }),
    ...(cookie && { idSync: { bbc_hid: cookie } }),
  };
};
