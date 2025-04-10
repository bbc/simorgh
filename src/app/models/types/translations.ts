/* eslint-disable camelcase */
export interface Translations {
  pagination?: {
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
  seeAll?: string;
  home: string;
  currentPage: string;
  skipLinkText: string;
  relatedContent: string;
  topicsPath?: string;
  relatedTopics?: string;
  navMenuText: string;
  liteSite?: {
    onboardingMessage: string;
    toMainSite: string;
    informationPage: string;
    informationPageLink: string;
    dataSaving: string;
    articleDataSavingLinkText: string;
    experiment?: Record<string, string>;
  };
  mediaAssetPage: {
    mediaPlayer: string;
    audioPlayer: string;
    videoPlayer: string;
  };
  liveExperiencePage: {
    liveLabel: string;
    liveCoverage: string;
    breaking: string;
    postedAt: string;
    summary: string;
    shareButtonText: string;
    postDateTimeFormat?: string;
    postDateFormat?: string;
  };
  downloads?: {
    instructions?: string;
    title?: string;
  };
  gist?: string;
  error: {
    home?: string;
    currentPage?: string;
    skipLinkText?: string;
    404: TranslationsError;
    500: TranslationsError;
  };
  byline?: {
    author?: string;
    articleInformation?: string;
    listItemImage?: string;
    published?: string;
    reportingFrom?: string;
    role?: string;
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
    noJs?: string;
    contentExpired?: string;
    contentNotYetAvailable?: string;
    audio: string;
    photogallery: string;
    video: string;
    bbc_afrique_radio?: OnDemandRadioTvTranslations;
    bbc_afrique_tv?: OnDemandRadioTvTranslations;
    bbc_arabic_radio?: OnDemandRadioTvTranslations;
    bbc_bangla_radio?: OnDemandRadioTvTranslations;
    bbc_burmese_radio?: OnDemandRadioTvTranslations;
    bbc_burmese_tv?: OnDemandRadioTvTranslations;
    bbc_gahuza_radio?: OnDemandRadioTvTranslations;
    bbc_gujarati_tv?: OnDemandRadioTvTranslations;
    bbc_hausa_radio?: OnDemandRadioTvTranslations;
    bbc_hausa_tv?: OnDemandRadioTvTranslations;
    bbc_hindi_radio?: OnDemandRadioTvTranslations;
    bbc_hindi_tv?: OnDemandRadioTvTranslations;
    bbc_igbo_radio?: OnDemandRadioTvTranslations;
    bbc_kyrgyz_radio?: OnDemandRadioTvTranslations;
    bbc_kyrgyz_tv?: OnDemandRadioTvTranslations;
    bbc_marathi_tv?: OnDemandRadioTvTranslations;
    bbc_nepali_radio?: OnDemandRadioTvTranslations;
    bbc_pashto_radio?: OnDemandRadioTvTranslations;
    bbc_pashto_tv?: OnDemandRadioTvTranslations;
    bbc_persian_radio?: OnDemandRadioTvTranslations;
    bbc_dari_radio?: OnDemandRadioTvTranslations;
    bbc_persian_tv?: OnDemandRadioTvTranslations;
    bbc_pidgin_radio?: OnDemandRadioTvTranslations;
    bbc_sinhala_tv?: OnDemandRadioTvTranslations;
    bbc_somali_radio?: OnDemandRadioTvTranslations;
    bbc_somali_tv?: OnDemandRadioTvTranslations;
    bbc_swahili_radio?: OnDemandRadioTvTranslations;
    bbc_swahili_tv?: OnDemandRadioTvTranslations;
    bbc_tamil_radio?: OnDemandRadioTvTranslations;
    bbc_tamil_tv?: OnDemandRadioTvTranslations;
    bbc_telugu_tv?: OnDemandRadioTvTranslations;
    bbc_uzbek_radio?: OnDemandRadioTvTranslations;
    bbc_uzbek_tv?: OnDemandRadioTvTranslations;
    bbc_yoruba_radio?: OnDemandRadioTvTranslations;
    listen: string;
    watch: string;
    watchMoments?: string;
    listenLive?: string;
    listenNext?: string;
    liveLabel?: string;
    nextLabel?: string;
    previousRadioShow?: string;
    nextRadioShow?: string;
    duration?: string;
    recentEpisodes?: string;
    podcastExternalLinks?: string;
    download?: string;
    closeVideo?: string;
  };
  socialEmbed: {
    caption?: {
      textPrefixVisuallyHidden: string;
      text: string;
      articleText?: string;
      articleAdditionalText?: string;
    };
    fallback?: {
      text: string;
      linkText: string;
      linkTextSuffixVisuallyHidden: string;
      warningText: string;
    };
    skipLink?: {
      text: string;
      endTextVisuallyHidden: string;
    };
    consentBanner?: {
      heading: string;
      body: string;
      button?: string | undefined;
    };
  };
  include?: {
    errorMessage: string;
    linkText: string;
  };
  topStoriesTitle?: string;
  featuresAnalysisTitle?: string;
  latestMediaTitle?: string;
  infoBannerLabel?: string;
  ugc?: Partial<UgcTranslations>;
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

export type UgcTranslations = {
  // No JavaScript
  noJsHeading: string;
  noJsDescription: string;

  // Optional
  optional: string;

  // File upload
  fileUploadLiveRegionText: string;
  fileUploadLiveRegionUpdateText: string;
  fileUploadButton: string;
  fileUploadListHeading: string;
  fileUploadRemoveButton: string;

  // Submit
  submitButton: string;

  // Validation
  errorSummary: string;
  validationRequired: string;
  validationInvalidEmail: string;
  validationInvalidTelephone: string;
  validationFilesNotEnough: string;
  validationFilesTooMany: string;
  validationFilesInvalidType: string;
  validationFilesTooSmall: string;
  validationFilesSizeExceeded: string;
  validationWordLimit: string;
  referenceNumber: string;
  submissionInfoSignedOutMessage: string;
  retentionPeriodDays: string;
  privacyInfoHtml: string;
  emailToHtml: string;
  removalGuidelineText: string;

  // Form Screen
  dataPolicyHeading: string;

  // Uploading Screen
  uploadingHeading: string;
  uploadingDescription: string;

  // Success Screen
  successHeading: string;
  successDescription: string;
  privacyPolicyLinkHref: string;
  privacyPolicyLinkText: string;

  // Error Screen
  errorHeading: string;
  errorDescription: string;

  // Closed Screen
  closedHeading: string;
  closedDescription: string;
};
