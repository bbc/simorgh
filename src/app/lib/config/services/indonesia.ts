import latin from '../../../components/ThemeProvider/fontScripts/latin';
import '#psammead/moment-timezone-include/tz/Asia/Jakarta';
import 'moment/locale/id';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: `id`,
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'Diperbarui',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-indonesia',
    atiAnalyticsProducerId: '54',
    atiAnalyticsProducerName: 'INDONESIAN',
    useReverb: true,
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
    manifestPath: '/indonesia/manifest.json',
    swPath: '/sw.js',
    homePageTitle: 'Berita',
    showAdPlaceholder: true,
    showRelatedTopics: true,
    googleSiteVerification: 'D-aEHUiyVaMoUJXjVRbDVkxS0dLTMUZLD3dLPTnWO4Q',
    podcastPromo: {
      title: 'Whatsapp',
      brandTitle: 'Akun resmi kami di WhatsApp',
      brandDescription:
        'Liputan mendalam BBC News Indonesia langsung di WhatsApp Anda.',
      image: {
        src: 'https://ichef.bbci.co.uk/images/ic/$recipe/p0jtrf6c.png',
        alt: 'BBC News Indonesia - Kini hadir di',
      },
      linkLabel: {
        text: 'Klik di sini',
        href: 'https://whatsapp.com/channel/0029VafUgPX42DcbVwVCgZ3x',
      },
      skipLink: {
        text: 'Lewati %title% dan lanjutkan membaca',
        endTextVisuallyHidden: 'Akhir dari %title%',
      },
    },
    translations: {
      pagination: {
        previousPage: 'Sebelum',
        nextPage: 'Berikut',
        pageXOfY: 'Page {x} dari {y}',
      },
      ads: {
        advertisementLabel: 'Iklan',
      },
      recommendationTitle: 'Artikel-artikel yang direkomendasikan',
      splitRecommendationTitle: 'Artikel-artikel lainnya yang direkomendasikan',
      seeAll: 'Lihat semua',
      home: 'Berita',
      currentPage: 'Halaman saat ini',
      skipLinkText: 'Langsung ke konten',
      relatedContent: 'Berita terkait',
      relatedTopics: 'Topik terkait',
      navMenuText: 'Kategori',
      mediaAssetPage: {
        mediaPlayer: 'Pemutar Media',
        audioPlayer: 'Pemutar Audio',
        videoPlayer: 'Pemutar Video',
      },
      liveExperiencePage: {
        liveLabel: 'Langsung',
        liveCoverage: 'Liputan langsung',
        breaking: 'Terbaru',
        postedAt: 'Diterbitkan di',
        summary: 'Rangkuman',
        shareButtonText: 'Kirim',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'Rangkuman',
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
      byline: {
        articleInformation: 'Informasi artikel',
        author: 'Penulis',
        listItemImage: 'Daftar isi, gambar',
        published: 'Telah diterbitkan',
        reportingFrom: 'Melaporkan dari',
        role: 'Peranan',
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
          rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
        },
        cookie: {
          amp: {
            accept: 'Terima pengambilan data dan lanjutkan',
            reject: 'Tolak pengambilan data dan lanjutkan',
            initial: {
              title:
                'Beri tahu kami Anda jika setuju dengan pengambilan data melalui AMP.',
              description: {
                first:
                  'Kami dan para mitra kami menggunakan teknologi, seperti ',
                linkText: 'cookies',
                last: ', dan mengumpulkan data rambanan untuk memberikan Anda pengalaman daring terbaik dengan konten dan iklan yang ditampilkan disesuaikan dengan keperluan Anda. Mohon beritahu kami bila Anda setuju.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'Atur pengaturan saya',
            },
            manage: {
              title: 'Atur persetujuan pengaturan di halaman AMP',
              description: {
                para1:
                  'Pengaturan itu berlaku pada halaman AMP saja. Anda mungkin akan ditanya lagi untuk mengatur preferensi ketika Anda mengunjungi halaman non-AMP BBC.',
                para2:
                  'Halaman ponsel yang Anda kunjungi dibuat dengan menggunakan teknologi AMP Google',
                heading2: 'Pengambilan data sangat diperlukan',
                para3:
                  'Agar situs kami tetap berjalan, kami menyimpan sejumlah informasi terbatas dalam perangkat Anda tanpa persetujuan Anda.',
                para4: {
                  text: 'Baca lebih jauh tentang informasi penting yang kami simpan di perangkat Anda untuk memastikan situs kami berjalan.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
                },
                para5:
                  'Kami menggunakan penyimpanan lokal untuk menyimpan preferensi yang Anda pilih dalam perangkat Anda.',
                heading3: 'Pengambilan data opsional',
                para6:
                  'Bila Anda menyetujui pengambilan data pada halaman AMP, Anda mengizinkan kami menampilkan preferensi iklan Anda, yang relevan bagi Anda bila Anda berada di luar Inggris.',
                para7: {
                  text: 'Baca lebih lanjut bagaimana kami menyesuaikan iklan di BBC dan mitra-mira iklan kami.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'Anda dapat memilih untuk tidak menerima iklan yang disesuaikan dengan pilihan Anda dengan mengeklik "Tolak pengambilan data dan lanjutkan" di bawah ini. Anda tetap dapat melihat iklan, namun tak sesuai dengan pilihan Anda.',
                para9:
                  'Anda dapat mengubah pengaturan dengan mengeklik "Pilihan iklan/Jangan sebarkan informasi saya" di catatan kaki, kapan saja.',
              },
            },
          },
          canonical: {
            title: 'Tolong beritahu kami apakah Anda setuju dengan cookies',
            description: {
              uk: {
                first: 'Kami menggunakan ',
                linkText: 'cookies',
                last: ' untuk memberikan Anda pengalaman daring terbaik. Mohon beritahu kami, bila Anda setuju dengan semua cookies ini.',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'Kami menggunakan ',
                linkText: 'cookies',
                last: ' untuk memberikan Anda pengalaman daring terbaik. Mohon beritahu kami, bila Anda setuju dengan semua cookies ini.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'Ya, saya setuju',
            reject: 'Tidak, tampilkan pengaturan',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'Untuk memutar video ini, aktifkan JavaScript atau coba di mesin pencari lain',
        contentExpired: 'Konten ini sudah tidak tersedia lagi.',
        contentNotYetAvailable: 'Program ini belum tersedia.',
        audio: 'Audio',
        photogallery: 'Galeri Foto',
        video: 'Video',
        listen: 'Dengar',
        watch: 'Tonton',
        watchMoments: 'Saksikan juga',
        listenLive: 'Mendengarkan langsung',
        listenNext: 'Dengar yang berikut',
        liveLabel: 'LANGSUNG',
        nextLabel: 'BERIKUTNYA',
        previousRadioShow: 'Siaran radio sebelumnya',
        nextRadioShow: 'Siaran radio berikutnya',
        duration: 'Durasi',
        recentEpisodes: 'Siaran sebelumnya',
        podcastExternalLinks: 'Podcast ini juga tersedia di',
        download: 'Unduh episode',
        closeVideo: 'Keluar',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'Keterangan video, ',
          text: 'Peringatan: Konten pihak ketiga mungkin berisi iklan',
          articleText:
            'Peringatan: BBC tidak bertanggung jawab atas konten situs eksternal',
          articleAdditionalText: 'Konten %provider_name% mungkin memuat iklan',
        },
        fallback: {
          text: 'Konten tidak tersedia',
          linkText: 'Lihat lebih banyak di %provider_name%',
          linkTextSuffixVisuallyHidden: ', eksternal',
          warningText:
            'BBC tidak bertanggung jawab atas konten dari situs eksternal',
        },
        skipLink: {
          text: 'Hentikan %provider_name% pesan',
          endTextVisuallyHidden: 'Lompati %provider_name% pesan',
        },
        consentBanner: {
          heading: `Izinkan konten [social_media_site]?`,
          body: `Artikel ini memuat konten yang disediakan [social_media_site]. Kami meminta izin Anda sebelum ada yang dimunculkan mengingat situs itu mungkin menggunakan cookies dan teknologi lain. Anda dapat membaca [social_media_site] [link] kebijakan cookie [/link] dan [link] kebijakan privasi [/link] sebelum menerima. Untuk melihat konten ini, pilihlah 'terima dan lanjutkan'. `,
          button: 'Terima dan lanjutkan',
        },
      },
      include: {
        errorMessage:
          'Maaf, kami tidak dapat menampilkan bagian dari berita ini dalam versi ramah mobile',
        linkText: 'Lihat versi lengkap di laman untuk melihat seluruh konten',
      },
      topStoriesTitle: 'Berita Utama',
      featuresAnalysisTitle: 'Majalah',
      latestMediaTitle: 'Terbaru',
    },
    mostRead: {
      header: 'Paling banyak dibaca',
      lastUpdated: 'Terakhir diperbarui:',
      numberOfItems: 5,
      hasMostRead: true,
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
          href: 'https://www.bbc.com/ws/languages',
          text: 'BC News dalam bahasa-bahasa lain',
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
        url: '/indonesia/topics/cw9qgeqd18zt',
      },
      {
        title: 'Majalah',
        url: '/indonesia/topics/cpxrqmrkeg8t',
      },
    ],
    timezone: 'Asia/Jakarta',
  },
};

export default withContext(service);
