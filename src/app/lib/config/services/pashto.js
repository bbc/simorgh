import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { arabic } from '@bbc/gel-foundations/scripts';
import { news as brandSVG } from '@bbc/psammead-assets/svgs';

const service = {
  lang: 'ps',
  product: 'BBC News',
  articleAuthor: 'https://www.facebook.com/bbcnews',
  articleTimestampPrefix: 'تازه',
  atiAnalyticsAppName: 'news-pashto',
  brandName: 'BBC News پښتو',
  serviceLocalizedName: 'پښتو',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/pashto.png',
  defaultImageAltText: 'BBC News پښتو',
  dir: 'rtl',
  externalLinkText: '، بهرنی',
  imageCaptionOffscreenText: '، د عکس تشریح',
  videoCaptionOffscreenText: '، د ویډیو تشریح',
  audioCaptionOffscreenText: '، د غږ تشریح',
  defaultCaptionOffscreenText: '، تشریح',
  imageCopyrightOffscreenText: '، د عکس سرچینه',
  locale: 'ps',
  datetimeLocale: 'ps',
  service: 'pashto',
  serviceName: 'Pashto',
  themeColor: `${C_POSTBOX}`,
  twitterCreator: '@bbcpashto',
  twitterSite: '@bbcpashto',
  noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
  publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
  script: arabic,
  manifestPath: '/manifest.json',
  swPath: '/sw.js',
  translations: {
    error: {
      404: {
        statusCode: '۴۰۴',
        title: 'پاڼه نه موندل کېږي',
        message: 'وبښئ، ستاسې پاڼه نه موندل کېږي. بیا هڅه وکړئ',
        solutions: [
          'لېنک مو یو ځل بیا وګورئ ',
          'په براوزر کې د ریفرش تڼۍ کېکاږئ',
          'دا پاڼه په بي بي سي بار کې ولټوئ',
        ],
        callToActionFirst: 'بله لاره دا ده چې د ',
        callToActionLinkText: 'بي بي سي خبرونو پښتو پاڼې ته ورشئ ',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/pashto',
      },
      500: {
        statusCode: '۵۰۰',
        title: 'په سرور کې د ننه ستونزه ده',
        message: 'وبښئ، دا مهال ستاسې پاڼه نشو موندلی',
        solutions: ['په براوزر کې د ریفرش تڼۍ کېکاږئ', 'وروسته بیا را ستنېږو'],
        callToActionFirst: 'بله لاره دا ده چې د ',
        callToActionLinkText: 'بي بي سي خبرونو پښتو پاڼې ته ورشئ ',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/pashto',
      },
    },
    consentBanner: {
      privacy: {
        title: 'موږ د محرمیت او ډېټا په اړه خپله تګلاره تازه کړې',
        description: {
          uk: {
            first:
              'موږ د محرمیت او ډېټا په اړه خپله تګلاره تازه کړې او غواړو تاسې پوه شئ چې دا ستاسې لپاره څه معنی لري',
            linkText: null,
            last: null,
            linkUrl: null,
          },
          international: {
            first:
              'موږ د محرمیت او ډېټا په اړه خپله تګلاره تازه کړې او غواړو تاسې پوه شئ چې دا ستاسې لپاره څه معنی لري',
            linkText: null,
            last: null,
            linkUrl: null,
          },
        },
        accept: 'اوکې',
        reject: 'دلته وګورئ چې څه بدل شوي',
        rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
      },
      cookie: {
        title: 'راته ووایاست چې ایا غواړئ ډېټا در ولېږل شي',
        description: {
          uk: {
            first: 'موږ ستاسې د اسانۍ لپاره ',
            linkText: 'کوکیز',
            last: ' کاروو. راته ووایاست چې ایا ډېټا در لېږلی شو',
            linkUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
          international: {
            first: 'زموږ ملګري د ',
            linkText: 'کوکیز',
            last:
              ' په څېر تکنالوژي کاروي او د براوزر ډېټا راټولوي. دا هر څه ستاسې د اسانۍ لپآره کېږي. که ورسره موافق یاست نو راته ولیکئ',
            linkUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
        },
        accept: 'هو، موافق یم',
        reject: 'نه، غواړم سېټنګز ته ولاړ شم',
        rejectUrl:
          'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
      },
    },
    media: {
      audio: 'غږ',
      photogallery: 'د عکسونو البوم',
      video: 'ویډیو',
      bbc_pashto_radio: {
        title: 'بي بي سي افغانستان (پښتو خپرونه)',
        subtitle:
          'بي بي سي د افغانستان لپاره کورني، سیمه ییز او نړیوال وروستي او کره خبرونه د هر اړخېزو څېړونو او شننو سره تاسې ته وړاندې کوي. په پښتو او دري ژبو بېلا بېلې سیاسي، اقتصادي، ټولنېزې او روزنیزې خپرونې هر ورځ د سهار له ۵ بجو نه د شپې تر ۱۲ بجو پورې خپروي.',
      },
      bbc_pashto_tv: {
        title: 'نړۍ دا وخت',
        subtitle:
          'د بي بي سي پښتو ټلویزیوني خپرونه چې هره ورځ د افغانستان په شپږ بجو په ژوندۍ بڼه خپرېږي. دلته یې لیدلی شئ.',
      },
    },
  },
  brandSVG,
  footer: {
    externalLink: {
      href: 'https://www.bbc.co.uk/help/web/links/',
      text: 'Read about our approach to external linking.',
    },
    links: [
      {
        href: 'https://www.bbc.com/news/help-41670342',
        text: 'ولې تاسې پر بي بي سي خبرونو باور کولی شئ',
      },
      {
        href: 'https://www.bbc.com/terms',
        text: 'Terms of Use',
      },
      {
        href: 'https://www.bbc.co.uk/aboutthebbc/',
        text: 'About the BBC',
      },
      {
        href: 'https://www.bbc.com/privacy/',
        text: 'Privacy Policy',
      },
      {
        href: 'https://www.bbc.com/usingthebbc/cookies/',
        text: 'Cookies',
      },
      {
        href: 'https://www.bbc.com/accessibility/',
        text: 'Accessibility Help',
      },
      {
        href: 'https://www.bbc.com/contact/',
        text: 'Contact the BBC',
      },
    ],
    copyrightText: 'بی بی سی. بي بي سي د پردېو ویبپاڼو د محتوا مسوله نه ده',
  },
  fonts: [],
};

export default service;
