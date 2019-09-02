import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { latin } from '@bbc/gel-foundations/scripts';
import { indonesia as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/Asia/Jakarta';

const service = {
  lang: `id`,
  articleAuthor: `https://www.facebook.com/pages/BBC-Indonesia/10150118096995434`,
  articleTimestampPrefix: 'Updated',
  atiAnalyticsAppName: 'news-indonesia',
  atiAnalyticsProducerId: '54',
  brandName: 'BBC News Indonesia',
  product: 'BBC News Indonesia',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/indonesia.png',
  defaultImageAltText: 'BBC News Indonesia',
  dir: `ltr`,
  externalLinkText: ', external',
  imageCaptionOffscreenText: 'Image caption, ',
  videoCaptionOffscreenText: 'Video caption, ',
  audioCaptionOffscreenText: 'Audio caption',
  defaultCaptionOffscreenText: 'Caption, ',
  imageCopyrightOffscreenText: 'Image source, ',
  locale: `id-ID`,
  datetimeLocale: `id-ID`.toLowerCase(),
  service: 'indonesia',
  serviceName: 'News Indonesia',
  themeColor: `${C_POSTBOX}`,
  twitterCreator: '@bbcindonesia',
  twitterSite: '@bbcindonesia',
  noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
  publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
  script: latin,
  manifestPath: '/manifest.json',
  swPath: '/sw.js',
  frontPageTitle: 'Berita',
  translations: {
    seeAll: 'Lihat semua',
    home: 'Berita',
    currentPage: 'Current page',
    skipLinkText: 'Langsung ke konten',
    error: {
      404: {
        statusCode: '404',
        title: 'Halaman tidak dapat ditemukan',
        message:
          'Maaf, kami tidak dapat menampilkan halaman yang Anda cari. Mohon coba:',
        solutions: [
          'Periksa kembali tautan',
          'Klik tombol perbarui di peramban Anda',
          'Cari halaman ini dengan menggunakan tombol pencari di BBC',
        ],
        callToActionFirst: 'Sebagai alternatif, coba klik ',
        callToActionLinkText: 'Berita.',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/indonesia',
      },
      500: {
        statusCode: '500',
        title: 'Kesalahan internal jaringan komputer',
        message:
          'Maaf, kami tidak dapat menampilkan halaman yang Anda cari. Mohon coba:',
        solutions: [
          'Klik tombol perbarui di peramban Anda',
          'Telusuri lagi nanti',
        ],
        callToActionFirst: 'Sebagai alternatif, coba klik ',
        callToActionLinkText: 'Berita.',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/indonesia',
      },
    },
    consentBanner: {
      privacy: {
        title: 'Kami telah memperbarui Kebijakan Privasi dan Cookies kami',
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
              'Kami melakukan sejumlah perubahan penting terkait Kebijakan Privasi dan Cookies dan kami ingin memberitahu Anda, apa arti langkah ini bagi Anda dan data Anda.',
            linkText: null,
            last: null,
            linkUrl: null,
          },
        },
        accept: 'OKE',
        reject: 'Coba lihat apa yang berubah',
        rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
      },
      cookie: {
        title: 'Tolong beritahu kami apakah Anda setuju dengan cookies',
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
            first: 'Kami dan para mitra kami menggunakan teknologi, seperti ',
            linkText: 'cookies',
            last:
              ', dan mengumpulkan data rambanan untuk memberikan Anda pengalaman daring terbaik dengan konten dan iklan yang ditampilkan disesuaikan dengan keperluan Anda. Mohon beritahu kami bila Anda setuju.',
            linkUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
        },
        accept: 'Ya, saya setuju',
        reject: 'Tidak, tampilkan pengaturan',
        rejectUrl:
          'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
      },
    },
    media: {
      audio: 'Audio',
      photogallery: 'Galeri Foto',
      video: 'Video',
    },
  },
  brandSVG,
  mostRead: {
    header: 'Most read',
    lastUpdated: 'Last updated: ',
  },
  footer: {
    externalLink: {
      href: 'https://www.bbc.com/indonesia/institutional/2011/02/000001_links',
      text: 'Baca tentang peraturan baru terkait link eksternal.',
    },
    links: [
      {
        href: 'https://www.bbc.com/indonesia/institutional-49283175',
        text: 'Alasan Anda dapat mempercayai BBC News',
      },
      {
        href: 'https://www.bbc.com/indonesia/institutional-37818421',
        text: 'Peraturan Penggunaan',
      },
      {
        href: 'https://www.bbc.com/indonesia/institutional-37818425/',
        text: 'Kebijakan tentang Privasi',
      },
      {
        href:
          'https://www.bbc.co.uk/privacy/cookies/managing/cookie-settings.html',
        text: 'Cookies',
      },
      {
        href: 'https://www.bbc.com/indonesia/institutional-37818427',
        text: 'Hubungi BBC',
      },
    ],
    copyrightText:
      'Copyright © 2019 BBC. BBC tidak bertanggung jawab atas isi situs dari luar.',
  },
  fonts: [],
  navigation: [
    {
      title: 'Berita',
      url: '/indonesia',
    },
    {
      title: 'Dunia',
      url: '/indonesia/dunia',
    },
    {
      title: 'Indonesia',
      url: '/indonesia/indonesia',
    },
    {
      title: 'Olahraga',
      url: '/indonesia/olahraga',
    },
    {
      title: 'Majalah',
      url: '/indonesia/majalah',
    },
    {
      title: '#TrenSosial',
      url: '/indonesia/trensosial',
    },
    {
      title: 'Video',
      url: '/indonesia/media/video',
    },
    {
      title: 'Audio',
      url: '/indonesia/media/audio',
    },
    {
      title: 'Galeri',
      url: '/indonesia/media/photogalleries',
    },
    {
      title: 'Karangan khas',
      url: '/indonesia/karangan_khas',
    },
    {
      title: 'Laporan khusus',
      url: '/indonesia/in_depth',
    },
    {
      title: 'Belajar Bahasa Inggris',
      url: '/indonesia/bahasa_inggris',
    },
  ],
  timezone: 'Asia/Jakarta',
};

export default service;
