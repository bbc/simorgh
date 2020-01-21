import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { cyrillicAndLatin } from '@bbc/gel-foundations/scripts';
import { indonesia as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/Asia/Jakarta';
import 'moment/locale/id';
import withContext from '../../../contexts/utils/withContext';

export const service = {
  default: {
    lang: `id`,
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'Diperbarui',
    atiAnalyticsAppName: 'news-indonesia',
    atiAnalyticsProducerId: '54',
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
    datetimeLocale: `id`,
    service: 'indonesia',
    serviceName: 'Indonesia',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcindonesia',
    twitterSite: '@bbcindonesia',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    isTrustProjectParticipant: true,
    script: cyrillicAndLatin,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Berita',
    hasRadioSchedule: false,
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      seeAll: 'Lihat semua',
      home: 'Berita',
      currentPage: 'Halaman saat ini',
      skipLinkText: 'Langsung ke konten',
      relatedContent: 'Berita terkait',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
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
          callToActionLinkText: 'BBC News Indonesia.',
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
          callToActionLinkText: 'BBC News Indonesia.',
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
                'Kami melakukan sejumlah perubahan penting terkait Kebijakan Privasi dan Cookies dan kami ingin memberitahu Anda, apa arti langkah ini bagi Anda dan data Anda.',
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
              first: 'Kami menggunakan ',
              linkText: 'cookies',
              last:
                ' untuk memberikan Anda pengalaman daring terbaik. Mohon beritahu kami, bila Anda setuju dengan semua cookies ini.',
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
        listen: 'Listen',
        watch: 'Watch',
        liveLabel: 'LANGSUNG',
        previousRadioShow: 'Previous radio show',
        nextRadioShow: 'Next radio show',
        duration: 'Duration',
      },
    },
    brandSVG,
    mostRead: {
      header: 'Paling banyak dibaca',
      lastUpdated: 'Terakhir diperbarui: ',
      numberOfItems: 5,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/news/help-41670342',
        text: 'Alasan Anda dapat mempercayai BBC News',
      },
      externalLink: {
        href:
          'https://www.bbc.com/indonesia/institutional/2011/02/000001_links',
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
          href: 'https://www.bbc.co.uk/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.com/indonesia/institutional-37818427',
          text: 'Hubungi BBC',
        },
      ],
      copyrightText:
        'BBC. BBC tidak bertanggung jawab atas konten dari situs eksternal.',
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
    navigationSection: 'Kategori',
    timezone: 'Asia/Jakarta',
  },
};

export default withContext(service);
