import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { latin } from '@bbc/gel-foundations/scripts';
import { afaanoromoo as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/Africa/Addis_Ababa';

const service = {
  lang: `om`,
  articleAuthor: `https://www.facebook.com/bbcnewsafaanoromoo`,
  articleTimestampPrefix: 'Updated',
  atiAnalyticsAppName: 'news-afaanoromoo',
  atiAnalyticsProducerId: '2',
  brandName: 'BBC News Afaan Oromoo',
  product: 'BBC News Afaan Oromoo',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/afaanoromoo.png',
  defaultImageAltText: 'BBC News Afaan Oromoo',
  dir: `ltr`,
  externalLinkText: ', external',
  imageCaptionOffscreenText: 'Image caption, ',
  videoCaptionOffscreenText: 'Video caption, ',
  audioCaptionOffscreenText: 'Audio caption',
  defaultCaptionOffscreenText: 'Caption, ',
  imageCopyrightOffscreenText: 'Image source, ',
  locale: `om-ET`,
  datetimeLocale: `om-ET`.toLowerCase(),
  service: 'afaanoromoo',
  serviceName: 'News Afaan Oromoo',
  themeColor: `${C_POSTBOX}`,
  twitterCreator: '@BBCAfrica',
  twitterSite: '@BBCAfrica',
  noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
  publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
  script: latin,
  manifestPath: '/manifest.json',
  swPath: '/sw.js',
  frontPageTitle: 'Oduu',
  translations: {
    seeAll: 'Hunda ilaali',
    home: 'Oduu',
    currentPage: 'Current page',
    skipLinkText: 'Qabiyyeetti darbi',
    error: {
      404: {
        statusCode: '404',
        title: 'Fuulli argamuu hin dandeenye',
        message:
          'Dhiifama, fuula ati barbaaddaa jirtu siif fiduu hin dandeenye. maaloo yaali.',
        solutions: [
          'url sna dabalii ilaali',
          'Barbaadduu kee keessaan furtuu haaromsituu cuqaasuu',
          "Bo'aa barbaacha kan BBC fayyadamuun fuula kana barbaaduu",
        ],
        callToActionFirst: 'Akka filannootti, maaloo fuula duraa ',
        callToActionLinkText: 'BBC Afaan Oromoo daawwadhu',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/afaanoromoo',
      },
      500: {
        statusCode: '500',
        title: 'Dogogora keessoo haadhoo',
        message:
          'Dhiifama, fuula ati barbaaddaa jirtu siif fiduu hin dandeenye. maaloo yaali.',
        solutions: [
          'Barbaadduu kee keessaan furtuu haaromsituu cuqaasuu',
          'Ammas gara boodaarra ni deebiya',
        ],
        callToActionFirst: 'Akka filannootti, maaloo fuula duraa ',
        callToActionLinkText: 'BBC Afaan Oromoo daawwadhu',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/afaanoromoo',
      },
    },
    consentBanner: {
      privacy: {
        title: 'Imaammata mateenyaafi kuus-yadannoo keenyaa haaromsiineera.',
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
              "Imaammata mateenyaafi kuus-yaadannoo keenyaarratti jijjirama barbaachisaa muraasa kan taasifne yoo ta'u, kunis siifi daataa keetiif maal jechu akka ta'e akka bartu barbaadna.",
            linkText: null,
            last: null,
            linkUrl: null,
          },
        },
        accept: 'TOLE',
        reject: 'Maaltu akka jijjirame bari',
        rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
      },
      cookie: {
        title: 'Kuus-yaadannoo waliin waliigalu kee haa beeknu',
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
            first: 'Kan nuti ',
            linkText: 'kuus-yaadannoo',
            last:
              ' muuxannoo hunda caaluu toora internetaarratti isiniif kennuuf. Kuus-yaadannoo kan hunda waliin walii galuu kee mee haa barru.',
            linkUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
        },
        accept: 'Eyyee, walii nan gala.',
        reject: 'Lakki, gara bakka itti argamuutti na geessi',
        rejectUrl:
          'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
      },
    },
    media: {
      audio: 'Sagalee',
      photogallery: 'Kuusaa Fakkii',
      video: 'Viidiyoo',
    },
  },
  brandSVG,
  mostRead: {
    header: 'Most read',
    lastUpdated: 'Last updated: ',
  },
  footer: {
    externalLink: {
      href: 'https://www.bbc.co.uk/help/web/links/',
      text: 'Itti dhiyaachuu keenya gara geessituu.',
    },
    links: [
      {
        href: 'https://www.bbc.com/afaanoromoo/institutional-49281861',
        text: 'BBC News maaliif amanuu dandeessa',
      },
      {
        href: 'https://www.bbc.co.uk/usingthebbc/terms/',
        text: 'Haala itti fayyadamaa',
      },
      {
        href: 'https://www.bbc.co.uk/usingthebbc/privacy/',
        text: 'Imaammata mateenyaa',
      },
      {
        href: 'https://www.bbc.com/usingthebbc/cookies/',
        text: 'Kuus-yaadannoo',
      },
      {
        href: 'https://www.bbc.com/afaanoromoo/institutional-42228538',
        text: 'BBC qunnami',
      },
    ],
    copyrightText: "BBC. Qabiyyee iddoola alaatiif BBC'n itti hin gaafatamu.",
  },
  fonts: [],
  navigation: [
    {
      title: 'Oduu',
      url: '/afaanoromoo',
    },
    {
      title: 'Itoophiyaa',
      url: '/afaanoromoo/topics/e986aff5-6b26-4638-b468-371d1d9617b4',
    },
    {
      title: 'Viidiyoo',
      url: '/afaanoromoo/media/video',
    },
    {
      title: 'Jajjaboo',
      url: '/afaanoromoo/popular/read',
    },
  ],
  timezone: 'Africa/Addis_Ababa',
};

export default service;
