import latinWithDiacritics from '../../../components/ThemeProvider/fontScripts/latinWithDiacritics';
import '#psammead/moment-timezone-include/tz/Europe/Warsaw';
import '#psammead/psammead-locales/moment/pl-pl';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: 'pl-pl',
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'Updated',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-polska',
    atiAnalyticsProducerId: '999',
    atiAnalyticsProducerName: 'POLSKA',
    chartbeatDomain: 'polska.bbc.co.uk',
    brandName: 'BBC News Polska',
    product: 'BBC News',
    serviceLocalizedName: 'Polska',
    defaultImage:
      'https://static.test.files.bbci.co.uk/ws/simorgh1-preview-assets/public/polska/images/metadata/poster-1024x576.png',
    defaultImageAltText: 'BBC News Polska',
    dir: 'ltr',
    externalLinkText: ', external',
    imageCaptionOffscreenText: 'Image caption, ',
    videoCaptionOffscreenText: 'Video caption, ',
    audioCaptionOffscreenText: 'Audio caption',
    defaultCaptionOffscreenText: 'Caption, ',
    imageCopyrightOffscreenText: 'Image source, ',
    locale: 'pl-pl',
    isoLang: 'pl',
    datetimeLocale: 'pl-pl',
    service: 'polska',
    serviceName: 'Polska',
    languageName: 'Polish',
    twitterCreator: '@BBCNews',
    twitterSite: '@BBCNews',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    isTrustProjectParticipant: true,
    script: latinWithDiacritics,
    manifestPath: '/polska/manifest.json',
    swPath: '/sw.js',
    homePageTitle: 'Home',
    showAdPlaceholder: false,
    showRelatedTopics: true,
    translations: {
      pagination: {
        page: 'Page',
        previousPage: 'Before',
        nextPage: 'Next',
        pageXOfY: 'Page {x} of {y}',
      },
      ads: {
        advertisementLabel: 'Advertisement',
      },
      byline: {
        articleInformation: 'Article information',
        author: 'Author',
        listItemImage: 'Image of author',
        published: 'Publication date',
        reportingFrom: 'Reporting from',
        role: 'Role',
      },
      seeAll: 'See all',
      home: 'Home',
      currentPage: 'Current page',
      skipLinkText: 'Skip to content',
      relatedContent: 'Related content',
      relatedTopics: 'Related topics',
      navMenuText: 'Sections',
      liteSite: {
        onboardingMessage:
          'You’re viewing a text-only version of this website that uses less data. View the main version of the website including all images and videos.',
        toMainSite: 'Take me to the main website',
        informationPage: 'Find out more about this data saving version',
        informationPageLink: '#',
        dataSaving: 'Data saving version',
        articleDataSavingLinkText: 'Data saving version',
      },
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      liveExperiencePage: {
        liveLabel: 'Live',
        liveCoverage: 'Live Coverage',
        breaking: 'Breaking',
        postedAt: 'Posted at',
        summary: 'Summary',
        shareButtonText: 'Share',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'At a glance',
      error: {
        404: {
          statusCode: '404',
          title: 'Page cannot be found',
          message:
            "Sorry, we're unable to bring you the page you're looking for. Please try:",
          solutions: [
            'Double checking the url',
            'Hitting the refresh button in your browser',
          ],
          callToActionFirst: 'Alternatively, please visit the ',
          callToActionLinkText: 'BBC News',
          callToActionLast: ' homepage. ',
          callToActionLinkUrl: 'https://www.bbc.com/polska',
        },
        500: {
          statusCode: '500',
          title: 'Internal server error',
          message:
            "Sorry, we're currently unable to bring you the page you're looking for. Please try:",
          solutions: [
            'Hitting the refresh button in your browser',
            'Coming back again later',
          ],
          callToActionFirst: 'Alternatively, please visit the ',
          callToActionLinkText: 'BBC News Polska',
          callToActionLast: ' homepage. ',
          callToActionLinkUrl: 'https://www.bbc.com/polska',
        },
        home: 'Home',
        currentPage: 'Current page',
        skipLinkText: 'Skip to content',
      },
      consentBanner: {
        privacy: {
          title: "We've updated our Privacy and Cookies Policy",
          description: {
            uk: {
              first:
                "We've made some important changes to our Privacy and Cookies Policy and we want you to know what this means for you and your data.",
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                "We've made some important changes to our Privacy and Cookies Policy and we want you to know what this means for you and your data.",
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'OK',
          reject: "Find out what's changed",
          rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
        },
        cookie: {
          amp: {
            accept: 'Accept data collection and continue',
            reject: 'Reject data collection and continue',
            initial: {
              title: 'Let us know you agree to data collection on AMP',
              description: {
                first: 'We and our partners use technologies, such as ',
                linkText: 'cookies',
                last: ', and collect browsing data to give you the best online experience and to personalise the content and advertising shown to you. Please let us know if you agree.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'Manage my settings',
            },
            manage: {
              title: 'Manage consent settings on AMP pages',
              description: {
                para1:
                  'These settings apply to AMP pages only. You may be asked to set these preferences again when you visit non-AMP BBC pages.',
                para2:
                  'The lightweight mobile page you have visited has been built using Google AMP technology.',
                heading2: 'Strictly necessary data collection',
                para3:
                  'To make our web pages work, we store some limited information on your device without your consent.',
                para4: {
                  text: 'Read more about the essential information we store on your device to make our web pages work.',
                  url: 'https://www.bbc.com/usingthebbc/strictly-necessary-cookies/',
                },
                para5:
                  'We use local storage to store your consent preferences on your device.',
                heading3: 'Optional data collection',
                para6:
                  'When you consent to data collection on AMP pages you are consenting to allow us to display personalised ads that are relevant to you when you are outside of the UK.',
                para7: {
                  text: 'Read more about how we personalise ads in the BBC and our advertising partners.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'You can choose not to receive personalised ads by clicking “Reject data collection and continue” below. Please note that you will still see advertising, but it will not be personalised to you.',
                para9:
                  'You can change these settings by clicking “Ad Choices / Do not sell my info” in the footer at any time.',
              },
            },
          },
          canonical: {
            title: 'Let us know you agree to cookies',
            description: {
              uk: {
                first: 'We use ',
                linkText: 'cookies',
                last: ' to give you the best online experience. Please let us know if you agree to all of these cookies.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'We use ',
                linkText: 'cookies',
                last: ' to give you the best online experience. Please let us know if you agree to all of these cookies.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'Yes, I agree',
            reject: 'No, take me to settings',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'To play this content, please enable JavaScript, or try a different browser',
        contentExpired: 'This content is no longer available',
        audio: 'Audio',
        photogallery: 'Image gallery',
        video: 'Video',
        listen: 'Listen',
        watch: 'Watch',
        liveLabel: 'LIVE',
        nextLabel: 'NEXT',
        previousRadioShow: 'Previous radio show',
        nextRadioShow: 'Next radio show',
        duration: 'Duration',
        contentNotYetAvailable: 'This content is not available yet',
        watchMoments: 'Watch Moments',
        listenLive: 'Listen Live',
        listenNext: 'Listen Next',
        recentEpisodes: 'Recent Episodes',
        podcastExternalLinks: 'This podcast is also available on',
        download: 'Download',
        closeVideo: 'Close',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'Video caption, ',
          text: 'Warning: Third party content may contain adverts',
          articleText:
            'The BBC is not responsible for the content of external sites.',
          articleAdditionalText: '%provider_name% content may contain adverts',
        },
        fallback: {
          text: 'Content is not available',
          linkText: 'View content on %provider_name%',
          linkTextSuffixVisuallyHidden: ', external',
          warningText:
            'The BBC is not responsible for the content of external sites.',
        },
        skipLink: {
          text: 'Skip %provider_name% content',
          endTextVisuallyHidden: 'End of %provider_name% content',
        },
        consentBanner: {
          heading: 'Allow [social_media_site] content?',
          body: "This article contains content provided by [social_media_site].  We ask for your permission before anything is loaded, as they may be using cookies and other technologies.  You may want to read [social_media_site]'s [link] cookie policy [/link] and [link] privacy policy [/link] before accepting. To view this content choose 'accept and continue'.",
          button: 'Accept and continue',
        },
      },
      include: {
        errorMessage:
          'Sorry, we can’t display this part of the story on this lightweight mobile page.',
        linkText: 'View the full version of the page to see all the content.',
      },
      topStoriesTitle: 'Top Stories',
      latestMediaTitle: 'Latest Videos',
      featuresAnalysisTitle: 'More to explore',
      ugc: {
        noJsHeading: 'Sorry, this page cannot be loaded.',
        noJsDescription:
          'To load this page, please enable JavaScript, or try a different browser',
        optional: 'optional',
        fileUploadLiveRegionText: "Update, Here's what you're sending: ",
        fileUploadLiveRegionUpdateText: 'Update, removed ',
        fileUploadButton: 'Choose a file',
        fileUploadListHeading: "Here's what you're sending:",
        fileUploadRemoveButton: 'Remove',
        submitButton: 'Submit',
        errorSummary: 'There’s a problem, please check your:',
        validationRequired: "There's something missing.",
        validationInvalidEmail:
          "That doesn't look right. Please enter a proper email address.",
        validationInvalidTelephone:
          "That doesn't look right. Please enter a proper telephone number.",
        validationFilesNotEnough:
          "There aren't enough files. Please add at least {{minFiles}}",
        validationFilesTooMany:
          'There are too many files. You can add {{maxFiles}}.',
        validationFilesInvalidType:
          "Sorry, we can't use this type of file. Please add {{fileTypes}}.",
        validationFilesTooSmall: 'This file is broken. Try picking another.',
        validationFilesSizeExceeded:
          'Sorry, these files are too big. You can only upload up to 1.2 GB at a time.',
        validationWordLimit: 'Maximum {{wordLimit}} words',
        referenceNumber: 'Reference number',
        submissionInfoSignedOutMessage:
          'You may wish to make a note of these details for your reference.',
        retentionPeriodDays:
          "We'll keep your submission for up to {{days}} days – and if we don't use it we'll then delete it and any other information you sent us.",
        privacyInfoHtml:
          "Don't worry, we protect your information — read the {{privacyInfoLink}} for more details.",
        emailToHtml:
          "If you change your mind and don't want us to use it, just email us at {{emailLink}}. Don't forget the reference number.",
        removalGuidelineText:
          "If you submitted something for a programme or online, we won't be able to remove it once we use it.",
        dataPolicyHeading: 'Our data policy',
        uploadingHeading: 'Uploading',
        uploadingDescription: 'Please wait until it is finished.',
        successHeading: 'Message sent',
        successDescription: 'Thanks for getting in touch.',
        privacyPolicyLinkHref: 'https://www.bbc.com/privacy/',
        privacyPolicyLinkText: 'Privacy Policy',
        errorHeading: 'Sorry, your message could not be sent.',
        errorDescription: 'Please try again later.',
        closedHeading: 'This is now closed',
        closedDescription: 'This closed on {{date}}.',
      },
    },
    mostRead: {
      header: 'Popular Reads',
      lastUpdated: 'Last updated:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    recommendations: {
      header: 'Most read',
      skipLink: {
        text: 'Skip %title% and continue reading',
        endTextVisuallyHidden: 'End of %title%',
      },
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/news/help-41670342',
        text: 'Why you can trust the BBC',
      },
      externalLink: {
        href: 'https://www.bbc.com/editorialguidelines/guidance/feeds-and-links',
        text: 'Read about our approach to external linking.',
      },
      links: [
        {
          href: 'https://www.bbc.com/usingthebbc/terms/',
          text: 'Terms of use',
        },
        {
          href: 'https://www.bbc.com/aboutthebbc',
          text: 'About the BBC',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/privacy/',
          text: 'Privacy Policy',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.com/polska/send/u50853577',
          text: 'Contact the BBC',
        },
        {
          href: 'https://www.bbc.com/ws/languages',
          text: 'BBC News in other languages',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. The BBC is not responsible for the content of external sites.',
    },
    timezone: 'Europe/London',
    navigation: [
      {
        url: 'https://www.bbc.com/polska',
        title: 'News',
        hideOnLiteSite: false,
      },
    ],
  },
};

export default withContext(service);
