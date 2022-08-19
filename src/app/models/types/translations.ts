/* eslint-disable camelcase */
export interface Translations {
  pagination: {
    page?: string;
    previousPage: string;
    nextPage: string;
    pageXOfY: string;
  };
  ads: {
    advertisementLabel: string;
  };
  recommendationTitle?: string;
  splitRecommendationTitle?: string;
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
    bbc_afrique_radio?: OnDemandRadioTvTranslations;
    bbc_afrique_tv?: OnDemandRadioTvTranslations;
    bbc_arabic_radio?: OnDemandRadioTvTranslations;
    listen: string;
    watch: string;
    listenLive: string;
    listenNext?: string;
    liveLabel: string;
    nextLabel: string;
    previousRadioShow: string;
    nextRadioShow: string;
    duration: string;
    recentEpisodes: string;
    podcastExternalLinks?: string;
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

export type OnDemandRadioTvTranslations = {
  title?: string;
  subtitle?: string;
};
