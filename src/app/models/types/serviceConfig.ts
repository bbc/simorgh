import {
  Services,
  ServicesWithNoVariants,
  SerbianService,
  ChineseService,
  ZhongwenService,
  UkrainianService,
  UzbekService,
  Direction,
} from './global';
import { Translations } from './translations';

export type DefaultServiceConfig = {
  [key in ServicesWithNoVariants['variant']]: ServiceConfig;
};

export type SerbianConfig = {
  [key in SerbianService['variant']]: ServiceConfig;
};

export type ChineseConfig = {
  [key in ChineseService['variant']]: ServiceConfig;
};

export type ZhongwenConfig = {
  [key in ZhongwenService['variant']]: ServiceConfig;
};

export type UkrainianConfig = {
  [key in UkrainianService['variant']]: ServiceConfig;
};

export type UzbekConfig = {
  [key in UzbekService['variant']]: ServiceConfig;
};

export type ServiceConfig = {
  lang: string;
  articleAuthor: string;
  articleTimestampPrefix?: string;
  articleTimestampSuffix?: string;
  atiAnalyticsAppName: string;
  atiAnalyticsProducerId: string;
  chartbeatDomain: string;
  brandName: string;
  product: string;
  serviceLocalizedName?: string;
  defaultImage: string;
  defaultImageAltText: string;
  dir: Direction;
  externalLinkText: string;
  imageCaptionOffscreenText: string;
  videoCaptionOffscreenText: string;
  audioCaptionOffscreenText: string;
  defaultCaptionOffscreenText: string;
  imageCopyrightOffscreenText: string;
  locale: string;
  isoLang?: string | null;
  datetimeLocale: string;
  serviceDatetimeLocale?: string;
  service: Services;
  serviceName: string;
  serviceLang?: string;
  languageName: string;
  altCalendar?: {
    formatDate: (gregorianMoment: unknown) => string | null;
  };
  twitterCreator: string;
  twitterSite: string;
  noBylinesPolicy?: string | null;
  publishingPrinciples?: string | null;
  isTrustProjectParticipant: boolean;
  script: object;
  manifestPath: string;
  swPath?: string;
  frontPageTitle: string;
  passportHomes?: string[];
  iTunesAppId?: number;
  showAdPlaceholder: boolean;
  showRelatedTopics: boolean;
  podcastPromo?: PodcastPromo;
  disclaimer?: {
    para1: {
      text: string;
      url: string;
      isExternal: boolean;
    };
    para2: string;
  };
  translations: Translations;
  mostRead: MostRead;
  mostWatched: MostWatched;
  radioSchedule?: RadioSchedule;
  recommendations?: Recommendations;
  footer: Footer;
  fonts?: ((baseUrlOverride: string) => string)[];
  navigation?: {
    title: string;
    url: string;
  }[];
  scriptLink?: {
    text: string;
    variant: string;
  };
  timezone: string;
  liveRadioOverrides?: {
    masterBrand: {
      [key: string]: string;
    };
  };
  googleSiteVerification?: string;
};

export type PodcastPromo = {
  title: string;
  brandTitle: string;
  brandDescription: string;
  image: {
    src: string;
    alt: string;
  };
  linkLabel: {
    text: string;
    href: string;
  };
  skipLink?: {
    text: string;
    endTextVisuallyHidden: string;
  };
};

export interface MostRead {
  header: string;
  lastUpdated: string;
  numberOfItems: number;
  hasMostRead: boolean;
}

export interface MostWatched {
  header: string;
  numberOfItems?: number;
  hasMostWatched: boolean;
}

export interface RadioSchedule {
  hasRadioSchedule?: boolean;
  frequenciesPageUrl?: string;
  frequenciesPageLabel?: string;
  header?: string;
  durationLabel?: string;
}

export interface Recommendations {
  hasStoryRecommendations: boolean;
  skipLink?: {
    text: string;
    endTextVisuallyHidden: string;
  };
}

export interface FooterLink {
  href: string;
  text: string;
  id?: string | null;
  lang?: string;
}

export interface Footer {
  trustProjectLink?: FooterLink;
  externalLink?: FooterLink;
  links?: FooterLink[];
  copyrightText?: string;
  collectiveNewsroomText?: string;
}
