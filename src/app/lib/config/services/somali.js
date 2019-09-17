import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { latin } from '@bbc/gel-foundations/scripts';
import { somali as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/Africa/Mogadishu';

const service = {
  default: {
    lang: `so`,
    articleAuthor: `https://www.facebook.com/bbcsomali`,
    articleTimestampPrefix: 'Waa la cusbooneysiiyay',
    atiAnalyticsAppName: 'news-somali',
    atiAnalyticsProducerId: '83',
    brandName: 'BBC News Somali',
    product: 'BBC News Somali',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/somali.png',
    defaultImageAltText: 'BBC News Somali',
    dir: `ltr`,
    externalLinkText: ', bogag kale',
    imageCaptionOffscreenText: 'Qoraalka sawirka ',
    videoCaptionOffscreenText: 'Qoraalka Muuqaalka ',
    audioCaptionOffscreenText: 'Qoralka Codka ',
    defaultCaptionOffscreenText: 'Qoraal ',
    imageCopyrightOffscreenText: 'Xigashada Sawirka, ',
    locale: `so-SO`,
    datetimeLocale: `so-so`,
    service: 'somali',
    serviceName: 'News Somali',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcsomali',
    twitterSite: '@bbcsomali',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    script: latin,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Somali',
    translations: {
      seeAll: 'Arag dhammaan',
      home: 'War',
      currentPage: 'Bogga hadda',
      skipLinkText: 'U gudub qaybta macluumaadka',
      relatedContent: 'Warar kale oo dheeraad ah oo la xiriira qodobkan',
      error: {
        404: {
          statusCode: '404',
          title: 'Bogga lama heli karo',
          message:
            'Waan ka xunnahay, ma awoodno inaan kuu soo gudbino bogga aad raadineyso. Fadlan iskuday.',
          solutions: [
            'iska xaqiiji url-ka ama linkiga',
            'Guji batanka cusbooneysiinta ee boggaaga',
            'Boggan wax k raadi adigoo adeegsanaya hanaanka raadinta ee BBC',
          ],
          callToActionFirst: 'Taa bedelkeeda, fadlan booqo bogga hore ee ',
          callToActionLinkText: 'BBC News Somali',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/somali',
        },
        500: {
          statusCode: '500',
          title: 'Khalad ka dhacy gudaha server-ka',
          message:
            'Waan ka xunnahay, hadda ma awoodno inaan kuu soo gudbinno bogga aad raadineyso. Fadlan iskuday:',
          solutions: [
            'Guji batanka cusbooneysiinta ee boggaaga',
            'Markale dib ugu soo noqo',
          ],
          callToActionFirst: 'Taa bedelkeeda, fadlan booqo bogga hore ee ',
          callToActionLinkText: 'BBC News Somali',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/somali',
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
        audio: 'Maqal',
        photogallery: 'Albamka sawirrada',
        video: 'Muuqaal',
        bbc_somali_radio: {
          title: 'Raadiyaha BBC Soomaali',
          subtitle:
            'Wararka iyo xaaladda taagan ee dunida oo dhan, faallo, muusig, madadaallo iyo cayaaro.',
        },
        bbc_somali_tv: {
          title: 'Caawa Iyo Caalamka',
          subtitle:
            'Kala soco telefishinka BBC News Somali 30 daqiiqo oo isugu jira warar, wareysiyo & faallooyin ku saabsan Soomaaliya iyo Caalamka',
        },
      },
    },
    brandSVG,
    mostRead: {
      header: 'Ugu akhris badan',
      lastUpdated: 'Markii ugu dambeysay ee la cusbooneysiiyay ',
    },
    footer: {
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text: 'Akhri xogta ku saabsan sida aan u abaarno bogagga dibadda.',
      },
      links: [
        {
          href: 'https://www.bbc.com/news/help-41670342',
          text: 'Sababta aada ku aamini kartid BBC News',
        },
        {
          href: 'https://www.bbc.com/terms',
          text: 'Shuruucda isticmaalka',
        },
        {
          href: 'https://www.bbc.com/privacy/',
          text: 'Shuruucda xogta gaarka ah',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.com/contact/',
          text: 'La xiriir BBC',
        },
      ],
      copyrightText:
        'BBC. BBC masuul kama ahan macluumadka bogagga kale ee dibadda.',
    },
    fonts: [],
    timezone: 'Africa/Mogadishu',
    navigation: [
      {
        title: 'War',
        url: '/somali',
      },
      {
        title: 'Warar dheeraad ah',
        url: '/somali/war',
      },
      {
        title: 'Ganacsi',
        url: '/somali/topics/2f2db234-3c2d-40a4-b4ac-eea661faadd0',
      },
      {
        title: 'Cayaaraha',
        url: '/somali/cayaaraha',
      },
      {
        title: 'Aqoon Guud',
        url: '/somali/aqoon_guud',
      },
      {
        title: 'Maqal',
        url: '/somali/media/audio',
      },
      {
        title: 'Muuqaal',
        url: '/somali/media/video',
      },
      {
        title: 'Barnaamijyada Idaacadda',
        url: '/somali/ka_qayb_gal/programmes',
      },
      {
        title: 'Sawirro',
        url: '/somali/media/photogalleries',
      },
    ],
  },
};

export default service;
