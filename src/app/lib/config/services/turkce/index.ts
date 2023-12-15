import latinWithDiacritics from '../../../../components/ThemeProvider/fontScripts/latinWithDiacritics';
import '#psammead/moment-timezone-include/tz/Asia/Istanbul';
import withContext from '../../../../contexts/utils/withContext';
import 'moment/locale/tr';
import { DefaultServiceConfig } from '../../../../models/types/serviceConfig';
import translations from './translations';

export const service: DefaultServiceConfig = {
  default: {
    lang: `tr`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'Güncelleme',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-turkce',
    atiAnalyticsProducerId: '92',
    chartbeatDomain: 'turkish.bbc.co.uk', // this is meant to be different to the service name
    brandName: 'BBC News Türkçe',
    product: 'BBC News',
    serviceLocalizedName: 'Türkçe',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/turkce.png',
    defaultImageAltText: 'BBC News Türkçe',
    dir: `ltr`,
    externalLinkText: ', dış',
    imageCaptionOffscreenText: 'Fotoğraf altı yazısı, ',
    videoCaptionOffscreenText: 'Video altyazısı, ',
    audioCaptionOffscreenText: 'Ses dosyası altyazısı, ',
    defaultCaptionOffscreenText: 'Altyazı, ',
    imageCopyrightOffscreenText: 'Kaynak, ',
    locale: `tr-TR`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'tr',
    datetimeLocale: `tr-tr`,
    service: 'turkce',
    serviceName: 'News Türkçe',
    languageName: 'Turkish',
    twitterCreator: '@bbcturkce',
    twitterSite: '@bbcturkce',
    noBylinesPolicy:
      'https://www.bbc.com/turkce/kurumsal-50221017#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/turkce/kurumsal-50221017',
    isTrustProjectParticipant: true,
    script: latinWithDiacritics,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Haberler',
    showAdPlaceholder: true,
    showRelatedTopics: true,
    translations,
    mostRead: {
      header: 'En çok okunanlar',
      lastUpdated: 'Son güncelleme:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'En fazla izlenen içerik',
      numberOfItems: 5,
      hasMostWatched: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    recommendations: {
      hasStoryRecommendations: true,
      skipLink: {
        text: 'Haberin başlığını atlayın ve okumaya devam edin',
        endTextVisuallyHidden: 'Haberin sonu',
      },
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/turkce/kurumsal-50221017',
        text: "Neden BBC'ye güvenebilirsiniz",
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'Link verilen internet sitelerine yaklaşımımız.',
      },
      links: [
        {
          href: 'https://www.bbc.com/turkce/kurumsal-36765772',
          text: 'Kullanım koşulları',
        },
        {
          href: 'https://www.bbc.com/turkce/kurumsal-36765774',
          text: 'Gizlilik politikası',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Çerezler',
        },
        {
          href: 'https://www.bbc.co.uk/turkce/send/u50853841',
          text: "BBC'ye ulaş",
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. BBC, link verilen internet sitelerinin içeriğinden sorumlu değildir.',
    },
    timezone: 'Asia/Istanbul',
    navigation: [
      {
        title: 'Haberler',
        url: '/turkce',
      },
      {
        title: 'Türkiye',
        url: '/turkce/topics/ckdxn2xk95gt',
      },
      {
        title: 'Rusya-Ukrayna Savaşı',
        url: '/turkce/topics/cy0ryl4pvx6t',
      },
      {
        title: 'Ekonomi',
        url: '/turkce/topics/cg726y2k82dt',
      },
      {
        title: 'Sağlık',
        url: '/turkce/topics/cnq68n6wgzdt',
      },
      {
        title: 'Bilim',
        url: '/turkce/topics/c404v74nk56t',
      },
      {
        title: 'Teknoloji',
        url: '/turkce/topics/c2dwqnwkvnqt',
      },
    ],
  },
};

export default withContext(service);
