import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { devanagariAndGurmukhi } from '@bbc/gel-foundations/scripts';
import { marathi as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/Asia/Kolkata';
import '@bbc/psammead-locales/moment/mr';
import withContext from '../../../contexts/utils/withContext';

export const service = {
  default: {
    lang: `mr`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'Updated',
    atiAnalyticsAppName: 'news-marathi',
    atiAnalyticsProducerId: '59',
    brandName: 'BBC News मराठी',
    product: 'BBC News',
    serviceLocalizedName: 'मराठी',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/marathi.png',
    defaultImageAltText: 'BBC News मराठी',
    dir: `ltr`,
    externalLinkText: ', external',
    imageCaptionOffscreenText: 'Image caption, ',
    videoCaptionOffscreenText: 'Video caption, ',
    audioCaptionOffscreenText: 'Audio caption',
    defaultCaptionOffscreenText: 'Caption, ',
    imageCopyrightOffscreenText: 'Image source, ',
    locale: `mr-IN`,
    datetimeLocale: `mr`,
    service: 'marathi',
    serviceName: 'Marathi',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcnewsmarathi',
    twitterSite: '@bbcnewsmarathi',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    isTrustProjectParticipant: true,
    script: devanagariAndGurmukhi,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'बातम्या',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      seeAll: 'See all',
      home: 'बातम्या',
      currentPage: 'Current page',
      skipLinkText: 'सामग्रीवर जा',
      relatedContent: 'Related content',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      error: {
        404: {
          statusCode: '404',
          title: '404 - पृष्ठ आढळले नाही',
          message:
            'कदाचित आपण वेब पत्त्यामध्ये चुकीने टाईप केल्याने असे होऊ शकते. कृपया पत्ता आणि शब्दलेखन तपासा.',
          solutions: [
            'Double checking the url',
            'Hitting the refresh button in your browser',
            'Searching for this page using the BBC search bar',
          ],
          callToActionFirst: 'Alternatively, please visit the ',
          callToActionLinkText: 'बीबीसी बातम्या मुख्यपृष्ठ',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/marathi',
        },
        500: {
          statusCode: '500',
          title: '500 - त्रुटी',
          message: 'एक त्रुटी आली. कृपया पृष्ठ रीफ्रेश करा',
          solutions: [
            'Hitting the refresh button in your browser',
            'Coming back again later',
          ],
          callToActionFirst: 'Alternatively, please visit the ',
          callToActionLinkText: 'बीबीसी बातम्या मुख्यपृष्ठ',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/marathi',
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
        audio: 'ऑडिओ',
        photogallery: 'प्रतिमा गॅलरी',
        video: 'व्हिडिओ',
        bbc_marathi_tv: {
          title: 'BBC विश्व',
          subtitle:
            'मराठीतल्या पहिल्या डिजिटल बुलेटिनमध्ये पाहा देश-विदेशातल्या ताज्या बातम्या.',
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
        'बीबीसी बाह्य इंटरनेट साइट्सच्या सामग्रीसाठी बीबीसी जबाबदार नाही',
    },
    fonts: [],
    timezone: 'Asia/Kolkata',
    navigation: [
      {
        title: 'बातम्या',
        url: '/marathi',
      },
      {
        title: 'व्हीडिओ',
        url: '/marathi/media/video',
      },
      {
        title: 'लोकप्रिय',
        url: '/marathi/popular/read',
      },
      {
        title: 'भारत',
        url: '/marathi/topics/5a08f030-710f-4168-acee-67294a90fc75',
      },
      {
        title: 'आंतरराष्ट्रीय',
        url: '/marathi/international',
      },
    ],
  },
};

export default withContext(service);
