import {
  C_POSTBOX,
  C_WHITE,
  C_GHOST,
  C_POSTBOX_30,
} from '../../../legacy/psammead/psammead-styles/src/colours';
import '#psammead/moment-timezone-include/tz/Asia/Baku';
import '#psammead/psammead-locales/moment/az';
import latinWithDiacritics from '../../../components/ThemeProvider/fontScripts/latinWithDiacritics';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: `az`,
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'Yeniləndi',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-azeri',
    atiAnalyticsProducerId: '6',
    chartbeatDomain: 'azeri.bbc.co.uk',
    brandName: 'BBC News Azərbaycanca',
    product: 'BBC News',
    serviceLocalizedName: 'Azərbaycanca',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/azeri.png',
    defaultImageAltText: 'BBC News Azərbaycanca',
    dir: `ltr`,
    externalLinkText: ', BBC-dən kənar',
    imageCaptionOffscreenText: 'Şəklin alt yazısı, ',
    videoCaptionOffscreenText: 'Videonun alt yazısı, ',
    audioCaptionOffscreenText: 'Audionun alt yazısı, ',
    defaultCaptionOffscreenText: 'Altyazı, ',
    imageCopyrightOffscreenText: 'Şəklin mənbəyi, ',
    locale: `az-AZ`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'az',
    datetimeLocale: `az`,
    service: 'azeri',
    serviceName: 'Azərbaycanca',
    languageName: 'Azerbaijani',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcazeri',
    twitterSite: '@bbcazeri',
    noBylinesPolicy:
      'https://www.bbc.com/azeri/institutional-49283479#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/azeri/institutional-49283479',
    isTrustProjectParticipant: true,
    script: latinWithDiacritics,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Xəbərlər, Qaynar Xəbərlər, Analiz, Video',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
      brandForegroundColour: `${C_GHOST}`,
      brandHighlightColour: `${C_WHITE}`,
      brandBorderColour: `${C_POSTBOX_30}`,
    },
    showAdPlaceholder: true,
    showRelatedTopics: true,
    mostRead: {
      header: 'Ən çox oxunan',
      lastUpdated: 'Ən son yeniləmə:',
      numberOfItems: 5,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'Ən çox baxılanlar',
      numberOfItems: 10,
      hasMostWatched: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    recommendations: {
      hasStoryRecommendations: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/azeri/institutional-49283479',
        text: 'BBC News-a niyə etibar etməlisiniz',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'Bizim kənar keçidlərə dair yanaşmamız barədə oxuyun.',
      },
      links: [
        {
          href: 'https://www.bbc.com/azeri/institutional-37131047',
          text: 'İstifadə qaydaları',
        },
        {
          href: 'https://www.bbc.com/azeri/institutional-37131049',
          text: 'BBC haqqında',
        },
        {
          href: 'https://www.bbc.com/azeri/institutional-37131051',
          text: 'Məxfilik siyasəti',
        },
        {
          href: 'https://www.bbc.co.uk/privacy/cookies/managing/cookie-settings.html',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.co.uk/azeri/send/u50853225',
          text: 'BBC ilə Əlaqə',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText: 'BBC. BBC kənar saytların məzmununa məsul deyil.',
    },
    timezone: 'Asia/baku',
    navigation: [
      {
        title: 'Xəbərlər',
        url: '/azeri',
      },
      {
        title: 'Azərbaycan',
        url: '/azeri/topics/c7zp571g7y7t',
      },
      {
        title: 'Region',
        url: '/azeri/topics/czpveq9ll8pt',
      },
      {
        title: 'Beynəlxalq',
        url: '/azeri/topics/cde15l4vn02t',
      },
      {
        title: 'Video',
        url: '/azeri/media/video',
      },
    ],
  },
};

export default withContext(service);
