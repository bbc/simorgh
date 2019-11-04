import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { devanagariAndGurmukhi } from '@bbc/gel-foundations/scripts';
import { telugu as brandSVG } from '@bbc/psammead-assets/svgs';
import { F_MALLANNA_REGULAR } from '@bbc/psammead-styles/fonts';
import '@bbc/moment-timezone-include/tz/Asia/Kolkata';
import withContext from '../../../contexts/utils/withContext';
import 'moment/locale/te';

export const service = {
  default: {
    lang: `te`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'Updated',
    atiAnalyticsAppName: 'news-telugu',
    atiAnalyticsProducerId: '89',
    brandName: 'BBC News తెలుగు',
    product: 'BBC News',
    serviceLocalizedName: 'తెలుగు',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/telugu.png',
    defaultImageAltText: 'BBC News తెలుగు',
    dir: `ltr`,
    externalLinkText: ', external',
    imageCaptionOffscreenText: 'Image caption, ',
    videoCaptionOffscreenText: 'Video caption, ',
    audioCaptionOffscreenText: 'Audio caption',
    defaultCaptionOffscreenText: 'Caption, ',
    imageCopyrightOffscreenText: 'Image source, ',
    locale: `te-IN`,
    datetimeLocale: `te-in`,
    service: 'telugu',
    serviceName: 'Telugu',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcnewstelugu',
    twitterSite: '@bbcnewstelugu',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    isTrustProjectParticipant: true,
    script: devanagariAndGurmukhi,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'వార్తలు',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      seeAll: 'See all',
      home: 'వార్తలు',
      currentPage: 'Current page',
      skipLinkText: 'కంటెంట్‌కు దాటవేయండి',
      relatedContent: 'Related content',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      error: {
        404: {
          statusCode: '404',
          title: '404 - పేజీ కనుగొనబడలేదు',
          message:
            'మీరు వెబ్ చిరునామాను తప్పుగా టైప్ చేసినందున ఇలా జరిగి ఉండవచ్చు. దయచేసి చిరునామాను సరిచూసుకోండి మరియు అక్షరదోషాలు ఉంటే దిద్దండి.',
          solutions: [
            'Double checking the url',
            'Hitting the refresh button in your browser',
            'Searching for this page using the BBC search bar',
          ],
          callToActionFirst: 'Alternatively, please visit the ',
          callToActionLinkText: 'BBC వార్తల హోమ్ పేజీ',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/telugu',
        },
        500: {
          statusCode: '500',
          title: '500 - దోషం',
          message: 'ఒక దోషం ఉంది. దయచేసి పేజీని రిఫ్రెష్ చేయండి.',
          solutions: [
            'Hitting the refresh button in your browser',
            'Coming back again later',
          ],
          callToActionFirst: 'Alternatively, please visit the ',
          callToActionLinkText: 'BBC వార్తల హోమ్ పేజీ',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/telugu',
        },
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
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
        },
        cookie: {
          title: 'Let us know you agree to cookies',
          description: {
            uk: {
              first: 'We use ',
              linkText: 'cookies',
              last:
                ' to give you the best online experience. Please let us know if you agree to all of these cookies.',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            international: {
              first: 'We and our partners use technologies, such as ',
              linkText: 'cookies',
              last:
                ', and collect browsing data to give you the best online experience and to personalise the content and advertising shown to you. Please let us know if you agree.',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
          },
          accept: 'Yes, I agree',
          reject: 'No, take me to settings',
          rejectUrl:
            'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
        },
      },
      media: {
        audio: 'ఆడియో',
        photogallery: 'చిత్రశాల',
        video: 'వీడియో',
        bbc_telugu_tv: {
          title: 'ప్రపంచం',
          subtitle:
            'తాజా అంతర్జాతీయ జాతీయ వార్తా విశేషాలు, విశ్లేషణ కోసం బీబీసి ప్రపంచం చూస్తూ ఉండండి.',
        },
      },
    },
    brandSVG,
    mostRead: {
      header: 'Most read',
      lastUpdated: 'Last updated: ',
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/news/help-41670342',
        text: 'Why you can trust the BBC',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text: 'Read about our approach to external linking.',
      },
      links: [
        {
          href: 'https://www.bbc.com/terms',
          text: 'Terms of Use',
        },
        {
          href: 'https://www.bbc.com/privacy/',
          text: 'Privacy Policy',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.com/contact/',
          text: 'Contact the BBC',
        },
      ],
      copyrightText:
        'BBC. బయటి ఇంటర్నెట్ సైట్‌లలోని కంటెంట్‌కు BBC బాధ్యత వహించదు',
    },
    fonts: [F_MALLANNA_REGULAR],
    timezone: 'Asia/Kolkata',
    navigation: [
      {
        title: 'వార్తలు',
        url: '/telugu',
      },
      {
        title: 'వీడియో',
        url: '/telugu/media/video',
      },
      {
        title: 'ఎక్కువ మంది చదివినవి',
        url: '/telugu/popular/read',
      },
      {
        title: 'జాతీయం',
        url: '/telugu/topics/5a08f030-710f-4168-acee-67294a90fc75',
      },
      {
        title: 'అంతర్జాతీయం',
        url: '/telugu/international',
      },
    ],
  },
};

export default withContext(service);
