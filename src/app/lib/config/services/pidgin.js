import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { pidgin as brandSVG } from '@bbc/psammead-assets/svgs';
import { cyrillicAndLatin } from '@bbc/gel-foundations/scripts';
import '@bbc/psammead-locales/moment/pcm';
import '@bbc/moment-timezone-include/tz/Africa/Lagos';
import withContext from '../../../contexts/utils/withContext';

export const service = {
  default: {
    ads: {
      hasAds: false,
      advertisementLabel: 'Tori we dem pay for',
    },
    lang: 'pcm',
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'New Informate',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-pidgin',
    atiAnalyticsProducerId: '70',
    chartbeatDomain: 'pidgin.bbc.co.uk',
    brandName: 'BBC News Pidgin',
    product: 'BBC News',
    serviceLocalizedName: 'Pidgin',
    locale: 'pcm',
    // there is no valid ISO 639-1 code for Pidgin
    isoLang: null,
    datetimeLocale: 'pcm',
    service: 'pidgin',
    serviceName: 'Pidgin',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/pidgin.png',
    defaultImageAltText: 'BBC News Pidgin',
    dir: 'ltr',
    externalLinkText: ', outside',
    imageCaptionOffscreenText: 'Wetin we call dis foto, ',
    videoCaptionOffscreenText: 'Wetin we call dis Video, ',
    audioCaptionOffscreenText: 'Wetin we call dis Audio, ',
    defaultCaptionOffscreenText: 'Wetin we call am, ',
    imageCopyrightOffscreenText: 'Wia dis foto come from, ',
    brandSVG,
    script: cyrillicAndLatin,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Domot',
    fonts: [],
    noBylinesPolicy:
      'https://www.bbc.com/pidgin/institutional-48528766#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/pidgin/institutional-48528766',
    isTrustProjectParticipant: true,
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@BBCNews', // to be updated
    twitterSite: '@BBCNews', // to be updated
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      seeAll: 'See everitin',
      home: 'Home',
      currentPage: 'Page where you dey',
      skipLinkText: 'Waka go wetin de inside',
      relatedContent: 'Another thing we de for inside dis tori',
      navMenuText: 'Plenti seshon',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      error: {
        404: {
          statusCode: '404',
          title: 'Dem no see page',
          message:
            'Sorry, we no go bring you di page you dey look for. Abeg try:',
          solutions: [
            'Check di url again',
            'Press di refresh button for your browser',
            'Search for dis page using di BBC search bar',
          ],
          callToActionFirst: 'Or, abeg visit di ',
          callToActionLinkText: 'BBC News Pidgin',
          callToActionLast: ' homepage.',
          callToActionLinkUrl: 'https://www.bbc.com/pidgin',
        },
        500: {
          statusCode: '500',
          title: 'Mistake',
          message:
            'Sorry, we no dey available for now to bring you di page you dey look for. Abeg try:',
          solutions: [
            'Press di refresh button for your browser',
            'To come back again afta now',
          ],
          callToActionFirst: 'Or, abeg visit di ',
          callToActionLinkText: 'BBC News Pidgin',
          callToActionLast: ' homepage.',
          callToActionLinkUrl: 'https://www.bbc.com/pidgin',
        },
      },
      consentBanner: {
        privacy: {
          title: 'We don update our Privacy and Cookies Policy',
          description: {
            uk: {
              first:
                'We don make some important changes to our Privacy and Cookies Policy and we wan make you know wetin dis one mean for you and your personal infomation.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'We don make some important changes to our Privacy and Cookies Policy and we wan make you know wetin dis one mean for you and your personal infomation.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'OK',
          reject: 'Find out wetin don change',
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
        },
        cookie: {
          title: 'Let us know say you agree to cookies',
          description: {
            uk: {
              first: 'We use ',
              linkText: 'cookies',
              last:
                ' to give you di best online experience. Abeg let us know if you gree to all od dif cookies dem.',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            international: {
              first: 'We and our partners use technologies, like ',
              linkText: 'cookies',
              last:
                ', and collect browsing information to give you di best online experience and to make wetin dey inside personal and wetin pipo dey advertise appear for you. Abeg let us know if you agree.',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
          },
          accept: 'Yes, I agree',
          reject: 'No, cari me go settings',
          rejectUrl:
            'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
        },
      },
      media: {
        noJs: 'Dem no support media player for your device',
        contentExpired: 'Dis thing no dey again',
        contentNotYetAvailable:
          'De thing wey de here never ready for you to play.',
        audio: 'Audio',
        photogallery: 'Image gallery',
        video: 'Video',
        bbc_pidgin_radio: {
          title: 'Placeholder title',
          subtitle: 'Placeholder subtitle',
        },
        listen: 'Make you listen',
        watch: 'Look',
        liveLabel: 'AS E DE HAPPEN',
        nextLabel: 'NEXT',
        previousRadioShow: 'Previous radio show',
        nextRadioShow: 'Next radio show',
        duration: 'Duration',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'Wetin we call dis Video, ',
          text: 'Warning: Third party content may contain adverts',
        },
        fallback: {
          text: 'Content is not available',
          linkText: 'View content on %provider_name%',
          linkTextSuffixVisuallyHidden: ', outside',
          warningText: 'De external site no concern BBC.',
        },
        skipLink: {
          text: 'Skip %provider_name% post',
          endTextVisuallyHidden: 'End of %provider_name% post',
        },
      },
      topStoriesTitle: 'Top Tori',
      featuresAnalysisTitle: 'Informate me',
    },
    mostRead: {
      header: 'De one we dem de read well well',
      lastUpdated: 'De one we dem update for:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    recommendations: {
      hasStoryRecommendations: false,
    },
    navigation: [
      {
        title: 'Home',
        url: '/pidgin',
      },
      {
        title: 'Nigeria',
        url: '/pidgin/topics/3d5d5e30-dd50-4041-96d5-c970b20005b9',
      },
      {
        title: 'Africa',
        url: '/pidgin/topics/d2c2ba68-f9ad-4185-a6d1-7f6437256735',
      },
      {
        title: 'World',
        url: '/pidgin/world',
      },
      {
        title: 'Video',
        url: '/pidgin/media/video',
      },
      {
        title: 'Sport',
        url: '/pidgin/topics/4063f80f-cccc-44c8-9449-5ca44e4c8592',
      },
      {
        title: 'Entertainment',
        url: '/pidgin/topics/1c3b60a9-14eb-484b-a750-9f5b1aeaac31',
      },
      {
        title: 'Most popular',
        url: '/pidgin/popular/read',
      },
    ],
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/pidgin/institutional-48528766',
        text: 'Why you fit trust BBC News',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text: 'De way wey we de take go external link.',
      },
      links: [
        {
          href: 'https://www.bbc.co.uk/usingthebbc/terms/',
          text: 'How dem dey take use am',
        },
        {
          href: 'https://www.bbc.co.uk/aboutthebbc',
          text: 'As e concern BBC',
        },
        {
          href: 'https://www.bbc.co.uk/usingthebbc/privacy/',
          text: 'Privacy Policy',
        },
        {
          href: 'https://www.bbc.co.uk/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.com/pidgin/institutional-42188215',
          text: 'Call BBC',
        },
        {
          href:
            'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText: 'BBC. De external site no concern BBC.',
    },
    timezone: 'Africa/Lagos',
  },
};

export default withContext(service);
