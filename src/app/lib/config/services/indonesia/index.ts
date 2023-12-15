import latin from '../../../../components/ThemeProvider/fontScripts/latin';
import '#psammead/moment-timezone-include/tz/Asia/Jakarta';
import 'moment/locale/id';
import withContext from '../../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../../models/types/serviceConfig';
import translations from './translations';

export const service: DefaultServiceConfig = {
  default: {
    lang: `id`,
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'Diperbarui',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-indonesia',
    atiAnalyticsProducerId: '54',
    chartbeatDomain: 'indonesian.bbc.co.uk', // this is meant to be different to the service name
    brandName: 'BBC News Indonesia',
    product: 'BBC News',
    serviceLocalizedName: 'Indonesia',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/indonesia.png',
    defaultImageAltText: 'BBC News Indonesia',
    dir: `ltr`,
    externalLinkText: ', eksternal',
    imageCaptionOffscreenText: 'Keterangan gambar, ',
    videoCaptionOffscreenText: 'Keterangan video, ',
    audioCaptionOffscreenText: 'Keterangan audio,',
    defaultCaptionOffscreenText: 'Keterangan, ',
    imageCopyrightOffscreenText: 'Sumber gambar, ',
    locale: `id-ID`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'id',
    datetimeLocale: `id`,
    service: 'indonesia',
    serviceName: 'Indonesia',
    languageName: 'Indonesian',
    twitterCreator: '@bbcindonesia',
    twitterSite: '@bbcindonesia',
    noBylinesPolicy:
      'https://www.bbc.com/indonesia/institutional-49283175#authorexpertise',
    publishingPrinciples:
      'https://www.bbc.com/indonesia/institutional-49283175',
    isTrustProjectParticipant: true,
    script: latin,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Berita',
    showAdPlaceholder: true,
    showRelatedTopics: true,
    podcastPromo: {
      title: 'Podcast',
      brandTitle: 'Investigasi: Skandal Adopsi',
      brandDescription:
        'Investigasi untuk menyibak tabir adopsi ilegal dari Indonesia ke Belanda di masa lalu',
      image: {
        src: 'https://ichef.bbci.co.uk/images/ic/448xn/p0btnm4z.jpg',
        alt: 'Investigasi: Skandal Adopsi',
      },
      linkLabel: {
        text: 'Episode',
        href: 'https://www.bbc.com/indonesia/podcasts/p0btnmzx',
      },
      skipLink: {
        text: 'Lewati %title% dan lanjutkan membaca',
        endTextVisuallyHidden: 'Akhir dari %title%',
      },
    },
    translations,
    mostRead: {
      header: 'Paling banyak dibaca',
      lastUpdated: 'Terakhir diperbarui:',
      numberOfItems: 5,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'Terpopuler',
      numberOfItems: 5,
      hasMostWatched: true,
    },
    radioSchedule: {
      hasRadioSchedule: true,
      header: 'Siaran radio',
      durationLabel: 'Durasi %duration%',
    },
    recommendations: {
      hasStoryRecommendations: true,
      skipLink: {
        text: 'Lewatkan %title% dan terus membaca',
        endTextVisuallyHidden: 'Akhir dari %title%',
      },
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/indonesia/institutional-49283175',
        text: 'Alasan Anda dapat mempercayai BBC News',
      },
      externalLink: {
        href: 'https://www.bbc.com/indonesia/institutional/2011/02/000001_links',
        text: 'Baca tentang peraturan baru terkait link eksternal.',
      },
      links: [
        {
          href: 'https://www.bbc.com/indonesia/institutional-37818421',
          text: 'Peraturan Penggunaan',
        },
        {
          href: 'https://www.bbc.com/indonesia/institutional-37818424',
          text: 'Mengenai BBC',
        },
        {
          href: 'https://www.bbc.com/indonesia/institutional-37818425',
          text: 'Kebijakan tentang Privasi',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.co.uk/indonesia/send/u50853401',
          text: 'Hubungi BBC',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. BBC tidak bertanggung jawab atas konten dari situs eksternal.',
    },
    navigation: [
      {
        title: 'Berita',
        url: '/indonesia',
      },
      {
        title: 'Pemilu 2024',
        url: '/indonesia/topics/ck0mgrlgyplt',
      },
      {
        title: 'Indonesia',
        url: '/indonesia/topics/cjgn7k8yx4gt',
      },
      {
        title: 'Dunia',
        url: '/indonesia/topics/cyz8evpl224t',
      },
      {
        title: 'Viral',
        url: '/indonesia/topics/cn5w7g2nq6dt',
      },
      {
        title: 'Liputan Mendalam',
        url: '/indonesia/laporan-khusus-51267199',
      },
      {
        title: 'Majalah',
        url: '/indonesia/majalah-51456120',
      },
    ],
    timezone: 'Asia/Jakarta',
  },
};

export default withContext(service);
