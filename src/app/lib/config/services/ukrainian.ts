import {
  C_POSTBOX,
  C_WHITE,
  C_GHOST,
  C_POSTBOX_30,
} from '../../../legacy/psammead/psammead-styles/src/colours';
import cyrillic from '../../../components/ThemeProvider/fontScripts/cyrillic';
import '#psammead/moment-timezone-include/tz/GMT';
import '#psammead/psammead-locales/moment/uk';
import withContext from '../../../contexts/utils/withContext';
import { UkrainianConfig } from '../../../models/types/serviceConfig';
import { Services } from '../../../models/types/global';

const baseServiceConfig = {
  articleAuthor: `http://www.facebook.com/bbcnews`,
  articleTimestampPrefix: 'Оновлено: ',
  atiAnalyticsAppName: 'news-ukrainian',
  atiAnalyticsProducerId: '94',
  chartbeatDomain: 'ukrainian.bbc.co.uk',
  brandName: 'BBC News Україна',
  product: 'BBC News',
  serviceLocalizedName: 'Україна',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/ukrainian.png',
  defaultImageAltText: 'BBC News Україна',
  dir: `ltr`,
  externalLinkText: ', зовнішнє',
  imageCaptionOffscreenText: 'Підпис до фото, ',
  videoCaptionOffscreenText: 'Підпис до відео, ',
  audioCaptionOffscreenText: 'Підпис до аудіо',
  defaultCaptionOffscreenText: 'Підпис, ',
  imageCopyrightOffscreenText: 'Автор фото, ',
  service: 'ukrainian' as Services,
  serviceName: 'Ukrainian',
  themeColor: `${C_POSTBOX}`,
  twitterCreator: '@BBC_ua',
  twitterSite: '@BBC_ua',
  noBylinesPolicy:
    'https://www.bbc.com/ukrainian/institutional-50170368#authorexpertise',
  publishingPrinciples: 'https://www.bbc.com/ukrainian/institutional-50170368',
  isTrustProjectParticipant: true,
  script: cyrillic,
  manifestPath: '/manifest.json',
  swPath: '/sw.js',
  frontPageTitle: 'Новини',
  theming: {
    brandBackgroundColour: `${C_POSTBOX}`,
    brandLogoColour: `${C_WHITE}`,
    brandForegroundColour: `${C_GHOST}`,
    brandHighlightColour: `${C_WHITE}`,
    brandBorderColour: `${C_POSTBOX_30}`,
  },
  showAdPlaceholder: true,
  showRelatedTopics: true,
  podcastPromo: {
    title: 'подкаст',
    brandTitle: 'Що це було',
    brandDescription: 'Головна історія тижня, яку пояснюють наші журналісти',
    image: {
      src: 'https://ichef.bbci.co.uk/images/ic/$recipe/p09jrvvq.jpg',
      alt: 'Що це було',
    },
    linkLabel: {
      text: 'Випуски',
      href: 'https://www.bbc.com/ukrainian/podcasts/p09jsy3h',
    },
    skipLink: {
      text: 'Пропустити %title% і продовжити',
      endTextVisuallyHidden: 'Кінець %title%',
    },
  },
  mostRead: {
    header: 'Найпопулярніше',
    lastUpdated: 'Останнє оновлення:',
    numberOfItems: 10,
    hasMostRead: true,
    onIdxPage: false,
  },
  mostWatched: {
    header: 'Найпопулярніше',
    numberOfItems: 5,
    hasMostWatched: false,
  },
  radioSchedule: {
    hasRadioSchedule: false,
    onIdxPage: false,
  },
  recommendations: {
    hasStoryRecommendations: false,
  },
  footer: {
    trustProjectLink: {
      href: 'https://www.bbc.com/ukrainian/institutional-50170368',
      text: 'Чому BBC заслуговує на довіру',
    },
    externalLink: {
      href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
      text: 'Ознайомтеся з нашими правилами зовнішніх посилань.',
    },
    links: [
      {
        href: 'https://www.bbc.com/ukrainian/institutional-38144387',
        text: 'Правила користування',
      },
      {
        href: 'https://www.bbc.com/ukrainian/institutional-38144827',
        text: 'Особисті дані',
      },
      {
        href: 'https://www.bbc.com/usingthebbc/cookies/',
        text: 'Cookies',
      },
      {
        href: 'https://www.bbc.co.uk/ukrainian/send/u50853885',
        text: 'Напишіть на ВВС',
      },
      {
        id: 'COOKIE_SETTINGS',
        href: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
        text: 'AdChoices / Do Not Sell My Info',
        lang: 'en-GB',
      },
    ],
    copyrightText: 'BBC. BBC не несе відповідальності за контент інших сайтів.',
  },
  timezone: 'GMT',
  navigation: [
    {
      title: 'Головна',
      url: '/ukrainian',
    },
    {
      title: 'Війна з Росією',
      url: '/ukrainian/topics/czp6w66edqpt',
    },
    {
      title: 'Історії',
      url: '/ukrainian/53725237',
    },
    {
      title: 'Відео',
      url: '/ukrainian/55425840',
    },
    {
      title: 'Книга року BBC',
      url: '/ukrainian/features-50320117',
    },
    {
      title: 'Подкасти',
      url: '/ukrainian/podcasts/p09jsy3h',
    },
  ],
};

export const service: UkrainianConfig = {
  default: {
    ...baseServiceConfig,
    datetimeLocale: 'uk',
    locale: 'uk_UA',
    languageName: 'Ukrainian',
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'uk',
    lang: 'uk',
  },
  'ru-UA': {
    ...baseServiceConfig,
    languageName: 'Russian',
    datetimeLocale: 'ru',
    serviceDatetimeLocale: 'uk',
    locale: 'ru_UA',
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'ru',
    lang: 'ru-UA',
    serviceLang: 'uk',
  },
};

export default withContext(service);
