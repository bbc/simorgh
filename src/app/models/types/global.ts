export type ServicesWithVariants =
  | 'serbian'
  | 'ukrainian'
  | 'ukchina'
  | 'zhongwen';

export type ServicesWithNoVariants =
  | 'afaanoromoo'
  | 'afrique'
  | 'amharic'
  | 'arabic'
  | 'archive'
  | 'azeri'
  | 'bengali'
  | 'burmese'
  | 'cymrufyw'
  | 'gahuza'
  | 'gujarati'
  | 'hausa'
  | 'hindi'
  | 'igbo'
  | 'indonesia'
  | 'japanese'
  | 'korean'
  | 'kyrgyz'
  | 'marathi'
  | 'mundo'
  | 'naidheachdan'
  | 'nepali'
  | 'news'
  | 'pashto'
  | 'persian'
  | 'pidgin'
  | 'portuguese'
  | 'punjabi'
  | 'russian'
  | 'scotland'
  | 'sport'
  | 'sinhala'
  | 'somali'
  | 'swahili'
  | 'tamil'
  | 'telugu'
  | 'thai'
  | 'tigrinya'
  | 'turkce'
  | 'urdu'
  | 'uzbek'
  | 'vietnamese'
  | 'yoruba';

export type Services = ServicesWithVariants | ServicesWithNoVariants;

export type Variants = 'simp' | 'trad' | 'lat' | 'cyr' | 'default' | 'ru-UA';

export interface DefaultService {
  default: ServiceConfig;
}

export interface ServiceConfig {
  lang: string;
  articleAuthor: string;
  articleTimestampPrefix: string;
  articleTimestampSuffix: string;
  atiAnalyticsAppName: string;
  atiAnalyticsProducerId: string;
  chartbeatDomain: string;
  brandName: string;
  product: string;
  serviceLocalizedName: string;
  defaultImage: string;
  defaultImageAltText: string;
  dir: string;
  externalLinkText: string;
  imageCaptionOffscreenText: string;
  videoCaptionOffscreenText: string;
  audioCaptionOffscreenText: string;
  defaultCaptionOffscreenText: string;
  imageCopyrightOffscreenText: string;
  locale: string;
  isoLang: string;
  datetimeLocale: string;
  service: Services;
  serviceName: string;
  languageName: string;
  themeColor: string;
  twitterCreator: string;
  twitterSite: string;
  noBylinesPolicy: string;
  publishingPrinciples: string;
  isTrustProjectParticipant: boolean;
  script: {
    [key: string]: unknown;
  };
  manifestPath: string;
  swPath: string;
  frontPageTitle: string;
  theming: {
    brandBackgroundColour: string;
    brandLogoColour: string;
    brandForegroundColour: string;
    brandHighlightColour: string;
    brandBorderColour: string;
  };
  showAdPlaceholder: boolean;
  showRelatedTopics: boolean;
  translations: Translations;
  brandSVG: unknown;
  mostRead: MostRead;
  mostWatched: MostWatched;
  radioSchedule: RadioSchedule;
  recommendations: Recommendations;
  footer: Footer;
  fonts?: [];
  navigation?: {
    title: string;
    url: string;
  }[];
  timezone: string;
  liveRadioOverrides: {
    masterBrand: {
      [key: string]: string;
    };
  };
}

export interface Translations {
  pagination: {
    previousPage: string;
    nextPage: string;
    pageXOfY: string;
  };
  ads: {
    advertisementLabel: string;
  };
  seeAll: string;
  home: string;
  currentPage: string;
  skipLinkText: string;
  relatedContent: string;
  relatedTopics: string;
  navMenuText: string;
  mediaAssetPage: {
    mediaPlayer: string;
    audioPlayer: string;
    videoPlayer: string;
  };
  gist: string;
  error: {
    404: TranslationsError;
    500: TranslationsError;
  };
  consentBanner: {
    privacy: {
      title: string;
      description: {
        uk: DescriptionStringBuilder;
        international: DescriptionStringBuilder;
      };
      accept: string;
      reject: string;
      rejectUrl: string;
    };
    cookie: {
      amp: {
        accept: string;
        reject: string;
        initial: {
          title: string;
          description: DescriptionStringBuilder;
          manage: string;
        };
        manage: {
          title: string;
          description: {
            para1: string;
            para2: string;
            heading2: string;
            para3: string;
            para4: {
              text: string;
              url: string;
            };
            para5: string;
            heading3: string;
            para6: string;
            para7: {
              text: string;
              url: string;
            };
            para8: string;
            para9: string;
          };
        };
      };
      canonical: {
        title: string;
        description: {
          uk: DescriptionStringBuilder;
          international: DescriptionStringBuilder;
        };
        accept: string;
        reject: string;
        rejectUrl: string;
      };
    };
  };
  media: {
    noJs: string;
    contentExpired: string;
    contentNotYetAvailable: string;
    audio: string;
    photogallery: string;
    video: string;
    listen: string;
    watch: string;
    listenLive: string;
    listenNext: string;
    liveLabel: string;
    nextLabel: string;
    previousRadioShow: string;
    nextRadioShow: string;
    duration: string;
    recentEpisodes: string;
  };
  socialEmbed: {
    caption: {
      textPrefixVisuallyHidden: string;
      text: string;
      articleText: string;
      articleAdditionalText: string;
    };
    fallback: {
      text: string;
      linkText: string;
      linkTextSuffixVisuallyHidden: string;
      warningText: string;
    };
    skipLink: {
      text: string;
      endTextVisuallyHidden: string;
    };
  };
  include: {
    errorMessage: string;
    linkText: string;
  };
  topStoriesTitle: string;
  featuresAnalysisTitle: string;
}

export interface TranslationsError {
  statusCode: string;
  title: string;
  message: string;
  solutions?: string[];
  callToActionFirst: string;
  callToActionLinkText: string;
  callToActionLast: string;
  callToActionLinkUrl: string;
}

export interface DescriptionStringBuilder {
  first: string;
  linkText?: string | null;
  last?: string | null;
  linkUrl?: string | null;
}

export interface MostRead {
  header: string;
  lastUpdated: string;
  numberOfItems: number;
  hasMostRead: boolean;
}

export interface MostWatched {
  header: string;
  numberOfItems: number;
  hasMostWatched: boolean;
}

export interface RadioSchedule {
  hasRadioSchedule: boolean;
  header: string;
  durationLabel: string;
}

export interface Recommendations {
  hasStoryRecommendations: boolean;
  skipLink?: {
    text: string;
    endTextVisuallyHidden: string;
  };
}

export interface Footer {
  trustProjectLink: {
    href: string;
    text: string;
  };
  externalLink: {
    href: string;
    text: string;
  };
  links?: {
    href: string;
    text: string;
    id?: string | null;
    lang?: string | null;
  }[];
  copyrightText: string;
}
