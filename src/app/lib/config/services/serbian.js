import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import {
  latinDiacritics,
  cyrillicAndLatin,
} from '@bbc/gel-foundations/scripts';
import { serbian as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/GMT';
import '@bbc/psammead-locales/moment/sr-cyrl';
import '@bbc/psammead-locales/moment/sr';
import withContext from '../../../contexts/utils/withContext';

const baseServiceConfig = {
  articleAuthor: `https://www.facebook.com/BBCNewsnasrpskom`,
  articleTimestampPrefix: 'Ажурирано:',
  atiAnalyticsAppName: 'news-serbian',
  atiAnalyticsProducerId: '81',
  brandName: 'BBC News na srpskom',
  product: 'BBC News',
  serviceLocalizedName: 'na srpskom',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/serbian.png',
  defaultImageAltText: 'BBC News na srpskom',
  dir: `ltr`,
  externalLinkText: ', спољна страница',
  imageCaptionOffscreenText: 'Потпис испод фотографије, ',
  videoCaptionOffscreenText: 'Потпис испод видеа, ',
  audioCaptionOffscreenText: 'Потпис испод аудио записа',
  defaultCaptionOffscreenText: 'потпис [caption], ',
  imageCopyrightOffscreenText: 'Аутор фотографије, ',
  service: 'serbian',
  serviceName: 'News na srpskom',
  themeColor: `${C_POSTBOX}`,
  twitterCreator: '@bbcnasrpskom',
  twitterSite: '@bbcnasrpskom',
  noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
  publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
  isTrustProjectParticipant: true,
  manifestPath: '/manifest.json',
  swPath: '/sw.js',
  frontPageTitle: 'Početna strana',
  theming: {
    brandBackgroundColour: `${C_POSTBOX}`,
    brandLogoColour: `${C_WHITE}`,
  },
  translations: {
    seeAll: 'Погледајте све',
    home: 'Главна страница',
    currentPage: 'Отворена страница',
    skipLinkText: 'Пређите на садржај',
    relatedContent: 'Повезано',
    mediaAssetPage: {
      mediaPlayer: 'Медиа плејер',
      audioPlayer: 'Аудио плејер',
      videoPlayer: 'Видео плејер',
    },
    error: {
      404: {
        statusCode: '404',
        title: '404 - Stranica nije pronađena',
        message:
          'Razlog može biti što ste veb-adresu uneli pogrešno. Proverite adresu i da li ima grešaka u kucanju.',
        solutions: [
          'Проверите још једном интернет адресу',
          'Притисните тастер за освежавање у вашем претраживачу',
          'Потражите ову страницу користећи ББЦ поље за претрагу',
        ],
        callToActionFirst: 'Молимо вас да посетите славну страницу ',
        callToActionLinkText: 'BBC News на српском',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/serbian',
      },
      500: {
        statusCode: '500',
        title: '500 - Greška',
        message: 'Došlo je do greške. Osvežite stranicu',
        solutions: [
          'Притисните тастер за освежавање у вашем претраживачу',
          'Посетите касније страницу',
        ],
        callToActionFirst: 'Молимо вас да посетите славну страницу ',
        callToActionLinkText: 'BBC News на српском',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/serbian',
      },
    },
    consentBanner: {
      privacy: {
        title: 'Освежили смо нашу политику приватности и колачића',
        description: {
          uk: {
            first:
              'Увели смо важне промене у нашу политику приватности и колачића и хоћемо да знате шта то значи за вас и ваше податке',
            linkText: null,
            last: null,
            linkUrl: null,
          },
          international: {
            first:
              'Увели смо важне промене у нашу политику приватности и колачића и хоћемо да знате шта то значи за вас и ваше податке',
            linkText: null,
            last: null,
            linkUrl: null,
          },
        },
        accept: 'OK',
        reject: 'Сазнајте шта се променило',
        rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
      },
      cookie: {
        title: 'Обавестите нас да ли се слажете са коришћењем колачића',
        description: {
          uk: {
            first: 'Користимо ',
            linkText: 'колачиће',
            last:
              ' да бисмо вам пружили најбоље искуство на интернету. Молимо вас да нас обавестите да ли се слажете са употребом свих колачића.',
            linkUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
          international: {
            first: 'Ми и наши партнери користимо технологије, попут ',
            linkText: 'колачића',
            last:
              ', и прикупљамо податке претраживача да бисмо вам понудили најквалитетније искуство на интернету и персонализовали садржај и огласе који вам се приказују. Молимо вас да нас обавестите да ли се слажете.',
            linkUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
        },
        accept: 'Да, слажем се',
        reject: 'Не, вратите ме на подешавања',
        rejectUrl:
          'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
      },
    },
    media: {
      audio: 'Zvuk',
      photogallery: 'Galerija slika',
      video: 'Video',
      listen: 'Listen',
      watch: 'Watch',
      liveLabel: 'УЖИВО',
      previousRadioShow: 'Previous radio show',
      nextRadioShow: 'Next radio show',
      duration: 'Duration',
    },
  },
  brandSVG,
  mostRead: {
    header: 'Најчитаније',
    lastUpdated: 'Последњи пут ажурирано: ',
  },
  footer: {
    trustProjectLink: {
      href: 'https://www.bbc.com/news/help-41670342',
      text: 'Зашто ББЦ заслужује ваше поверење',
    },
    externalLink: {
      href: 'https://www.bbc.co.uk/help/web/links/',
      text: 'Read about our approach to external linking.',
    },
    links: [
      {
        href: 'https://www.bbc.com/terms',
        text: 'Правила коришћења',
      },
      {
        href: 'https://www.bbc.co.uk/aboutthebbc/',
        text: 'О ББЦ-ју',
      },
      {
        href: 'https://www.bbc.com/privacy/',
        text: 'Правила приватности',
      },
      {
        href: 'https://www.bbc.com/usingthebbc/cookies/',
        text: 'Колачићи',
      },
      {
        href: 'https://www.bbc.com/serbian/cyr/institutional-43543431',
        text: 'Контактирајте ББЦ',
      },
    ],
    copyrightText:
      'BBC. BBC nije odgovoran za sadržaj sajtova sa spoljnih linkova',
  },
  fonts: [],
  timezone: 'GMT',
};

export const service = {
  lat: {
    ...baseServiceConfig,
    lang: `sr-latn`,
    locale: `sr-latn`,
    script: latinDiacritics,
    datetimeLocale: `sr`,
    scriptLinkText: 'Ћир',
    scriptLinkOffscreenText: 'Cyrillic',
    scriptLinkVariant: 'cyr',
    navigation: [
      {
        title: 'Početna strana',
        url: '/serbian/lat',
      },
      {
        title: 'Srbija',
        url: '/serbian/lat/1791445f-977a-4e6d-b490-51f84bb4fc52',
      },
      {
        title: 'Balkan',
        url: '/serbian/lat/balkan',
      },
      {
        title: 'Svet',
        url: '/serbian/lat/svet',
      },
      {
        title: 'Video',
        url: '/serbian/lat/media/video',
      },
      {
        title: 'Najpopularnije',
        url: '/serbian/lat/popular/read',
      },
    ],
    navigationSection: 'Odeljci',
  },
  cyr: {
    ...baseServiceConfig,
    lang: `sr-cyrl`,
    locale: `sr-cyrl`,
    script: cyrillicAndLatin,
    datetimeLocale: `sr-cyrl`,
    scriptLinkText: 'Lat',
    scriptLinkOffscreenText: 'Latin',
    scriptLinkVariant: 'lat',
    navigation: [
      {
        title: 'Почетна страна',
        url: '/serbian/cyr',
      },
      {
        title: 'Србија',
        url: '/serbian/cyr/1791445f-977a-4e6d-b490-51f84bb4fc52',
      },
      {
        title: 'Балкан',
        url: '/serbian/cyr/balkan',
      },
      {
        title: 'Свет',
        url: '/serbian/cyr/svet',
      },
      {
        title: 'Видео',
        url: '/serbian/cyr/media/video',
      },
      {
        title: 'Најпопуларније',
        url: '/serbian/cyr/popular/read',
      },
    ],
    navigationSection: 'Одељци',
  },
};

export default withContext(service);
