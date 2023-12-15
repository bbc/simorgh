import latinWithDiacritics from '../../../../components/ThemeProvider/fontScripts/latinWithDiacritics';
import cyrillic from '../../../../components/ThemeProvider/fontScripts/cyrillic';
import '#psammead/moment-timezone-include/tz/GMT';
import '#psammead/psammead-locales/moment/sr-cyrl';
import '#psammead/psammead-locales/moment/sr';
import withContext from '../../../../contexts/utils/withContext';
import { SerbianConfig } from '../../../../models/types/serviceConfig';
import { Direction, Services } from '../../../../models/types/global';
import { latTranslations, cyrTranslations } from './translations';

const baseServiceConfig = {
  articleAuthor: 'https://www.facebook.com/bbcnews',
  atiAnalyticsAppName: 'news-serbian',
  atiAnalyticsProducerId: '81',
  chartbeatDomain: 'serbian.bbc.co.uk',
  product: 'BBC News',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/serbian.png',
  dir: 'ltr' as Direction,
  service: 'serbian' as Services,
  languageName: 'Serbian',
  twitterCreator: '@bbcnasrpskom',
  twitterSite: '@bbcnasrpskom',
  isTrustProjectParticipant: true,
  manifestPath: '/manifest.json',
  swPath: '/sw.js',
  radioSchedule: {
    hasRadioSchedule: false,
  },
  recommendations: {
    hasStoryRecommendations: false,
  },
  showAdPlaceholder: false,
  showRelatedTopics: true,
  timezone: 'GMT',
};

export const service: SerbianConfig = {
  lat: {
    ...baseServiceConfig,

    articleTimestampPrefix: 'Ažurirano',
    articleTimestampSuffix: '',
    brandName: 'BBC News na srpskom',
    datetimeLocale: `sr`,
    externalLinkText: ', spoljna',
    frontPageTitle: 'Glavna stranica',
    lang: `sr-latn`,
    locale: `sr-latn`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'sr-Latn',
    noBylinesPolicy:
      'https://www.bbc.com/serbian/lat/institutional-50173730#authorexpertise',
    publishingPrinciples:
      'https://www.bbc.com/serbian/lat/institutional-50173730',
    script: latinWithDiacritics,
    serviceLocalizedName: 'na srpskom',
    serviceName: 'News na srpskom',
    defaultImageAltText: 'BBC News na srpskom',
    defaultCaptionOffscreenText: 'Potpis, ',
    audioCaptionOffscreenText: 'Potpis ispod audio zapisa, ',
    videoCaptionOffscreenText: 'Potpis ispod videa, ',
    imageCaptionOffscreenText: 'Potpis ispod fotografije, ',
    imageCopyrightOffscreenText: 'Autor fotografije, ',
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/serbian/lat/institutional-50173730',
        text: 'Zašto BBC zaslužuje vaše poverenje',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'Pročitajte naša pravila o linkovanju drugih sajtova.',
      },
      links: [
        {
          href: 'https://www.bbc.com/terms',
          text: 'Pravila korišćenja',
        },
        {
          href: 'https://www.bbc.co.uk/aboutthebbc/',
          text: 'O BBC-ju',
        },
        {
          href: 'https://www.bbc.com/privacy/',
          text: 'Pravila privatnosti',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Kolačići',
        },
        {
          href: 'https://www.bbc.co.uk/serbian/send/u50853665',
          text: 'Kontaktirajte BBC',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText: 'BBC. BBC nije odgovoran za sadržaj drugih sajtova.',
    },
    mostRead: {
      header: 'Najčitanije',
      lastUpdated: 'Poslednji put ažurirano ',
      numberOfItems: 10,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'Najgledanije',
      numberOfItems: 10,
      hasMostWatched: true,
    },
    navigation: [
      {
        title: 'Početna strana',
        url: '/serbian/lat',
      },
      {
        title: 'Ukrajina',
        url: '/serbian/lat/topics/c5wzvzzz5vrt',
      },
      {
        title: 'Srbija',
        url: '/serbian/lat/topics/cr50vdy9q6wt',
      },
      {
        title: 'Balkan',
        url: '/serbian/lat/topics/c06g87137jgt',
      },
      {
        title: 'Svet',
        url: '/serbian/lat/topics/c2lej05e1eqt',
      },
      {
        title: 'Video',
        url: '/serbian/lat/topics/c44vyp5g049t',
      },
      {
        title: 'Najpopularnije',
        url: '/serbian/lat/popular/read',
      },
    ],
    scriptLink: {
      text: 'Ћир',
      variant: 'cyr',
    },
    translations: { ...latTranslations },
  },
  cyr: {
    ...baseServiceConfig,
    articleTimestampPrefix: 'Ажурирано',
    articleTimestampSuffix: '',
    brandName: 'BBC News на српском',
    datetimeLocale: `sr-cyrl`,
    externalLinkText: ', спољна',
    frontPageTitle: 'Главна страница',
    lang: `sr-cyrl`,
    locale: `sr-cyrl`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'sr-Cyrl',
    noBylinesPolicy:
      'https://www.bbc.com/serbian/cyr/institutional-50173730#authorexpertise',
    publishingPrinciples:
      'https://www.bbc.com/serbian/cyr/institutional-50173730',
    script: cyrillic,
    serviceLocalizedName: 'на српском',
    serviceName: 'News на српском',
    defaultImageAltText: 'ББЦ News на српском',
    defaultCaptionOffscreenText: 'Потпис, ',
    audioCaptionOffscreenText: 'Потпис испод аудио записа, ',
    videoCaptionOffscreenText: 'Потпис испод видеа, ',
    imageCaptionOffscreenText: 'Потпис испод фотографије, ',
    imageCopyrightOffscreenText: 'Аутор фотографије, ',
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/serbian/cyr/institutional-50173730',
        text: 'Зашто ББЦ заслужује ваше поверење',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'Прочитајте наша правила о линковању других сајтова.',
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
          href: 'https://www.bbc.co.uk/serbian/send/u50853665',
          text: 'Контактирајте ББЦ',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText: 'BBC. ББЦ није одговоран за садржај других сајтова.',
    },
    mostRead: {
      header: 'Најчитаније',
      lastUpdated: 'Последњи пут ажурирано:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'Најгледаније',
      numberOfItems: 5,
      hasMostWatched: true,
    },
    navigation: [
      {
        title: 'Почетна страна',
        url: '/serbian/cyr',
      },
      {
        title: 'Украјина',
        url: '/serbian/cyr/topics/cqwvxvvw9qrt',
      },
      {
        title: 'Србија',
        url: '/serbian/cyr/topics/cvjp1d3k9dvt',
      },
      {
        title: 'Балкан',
        url: '/serbian/cyr/topics/c8y9k0k2pvvt',
      },
      {
        title: 'Свет',
        url: '/serbian/cyr/topics/c3m1x951mljt',
      },
      {
        title: 'Видео',
        url: '/serbian/cyr/topics/crg7kj2ejj2t',
      },
      {
        title: 'Најпопуларније',
        url: '/serbian/cyr/popular/read',
      },
    ],
    scriptLink: {
      text: 'Lat',
      variant: 'lat',
    },
    translations: { ...cyrTranslations },
  },
};

export default withContext(service);
