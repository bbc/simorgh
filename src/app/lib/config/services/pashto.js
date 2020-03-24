import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { arabic } from '@bbc/gel-foundations/scripts';
import { pashto as brandSVG } from '@bbc/psammead-assets/svgs';
import {
  F_NASSIM_PASHTO_REGULAR,
  F_NASSIM_PASHTO_BOLD,
} from '@bbc/psammead-styles/fonts';
import '@bbc/psammead-locales/moment/ps';
import '@bbc/moment-timezone-include/tz/GMT';
import { jalaali } from '@bbc/psammead-calendars';
import withContext from '../../../contexts/utils/withContext';

export const service = {
  default: {
    ads: {
      hasAds: false,
    },
    lang: 'ps',
    product: 'BBC News',
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'تازه',
    atiAnalyticsAppName: 'news-pashto',
    atiAnalyticsProducerId: '68',
    brandName: 'BBC News پښتو',
    chartbeatDomain: 'pashto.bbc.co.uk',
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
    altCalendar: jalaali,
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcpashto',
    twitterSite: '@bbcpashto',
    noBylinesPolicy:
      'https://www.bbc.com/pashto/institutional-49283007#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/pashto/institutional-49283007',
    isTrustProjectParticipant: true,
    script: arabic,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'کور پاڼه',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      seeAll: 'See all',
      home: 'کور پاڼه',
      currentPage: 'اوسنۍ پاڼه',
      skipLinkText: 'مطلب ته ورشئ',
      relatedContent: 'اسی بارے میں',
      navMenuText: 'برخې',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
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
          solutions: [
            'په براوزر کې د ریفرش تڼۍ کېکاږئ',
            'وروسته بیا را ستنېږو',
          ],
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
        noJs: 'په دې وسیله کې د غږ اوريدل او ویډیو لیدنه شونې نه ده.',
        contentExpired: 'دغه فایل نور د لاسرسي وړ نه دی.',
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
        listen: 'Listen',
        watch: 'و یې ګورئ',
        liveLabel: 'ژوندۍ',
        previousRadioShow: 'Previous radio show',
        nextRadioShow: 'Next radio show',
        duration: 'Duration',
      },
    },
    brandSVG,
    mostRead: {
      header: 'ډېر لوستل شوي',
      lastUpdated: 'د خپرېدو نیټه',
      numberOfItems: 10,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: true,
      frequenciesPageUrl: '/pashto/institutional/2012/03/000001_frequencies',
      frequenciesPageLabel: 'راديويي څپې',
      header: 'تازه خبرونه واورئ',
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/pashto/institutional-49283007',
        text: 'ولې تاسې پر بي بي سي خبرونو باور کولی شئ',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text: 'د نورو ویبپاڼو لینکولو په اړه زموږ تګلاره.',
      },
      links: [
        {
          href: 'https://www.bbc.com/pashto/institutional-37620701',
          text: 'د کارولو شرايط',
        },
        {
          href: 'https://www.bbc.com/pashto/institutional-37622761',
          text: 'د بي بي سي‌ په اړه',
        },
        {
          href: 'https://www.bbc.com/pashto/institutional-37622762',
          text: 'د محرميت تگلاره',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'کوکيز',
        },
        {
          href: 'https://www.bbc.co.uk/pashto/institutional-37622768',
          text: 'زموږ سره اړیکي',
        },
        {
          href:
            'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText: 'بي بي سي. بي بي‌ سي‌ د نورو ویبپاڼو د محتوا مسوله نه ده.',
    },
    fonts: [F_NASSIM_PASHTO_REGULAR, F_NASSIM_PASHTO_BOLD],
    timezone: 'GMT',
    navigation: [
      {
        title: 'کور پاڼه',
        url: '/pashto',
      },
      {
        title: 'افغانستان',
        url: '/pashto/afghanistan',
      },
      {
        title: 'پښتونخوا',
        url: '/pashto/pakhtunkhwa',
      },
      {
        title: 'نړۍ',
        url: '/pashto/world',
      },
      {
        title: 'ښځې',
        url: '/pashto/topics/e45cb5f8-3c87-4ebd-ac1c-058e9be22862',
      },
      {
        title: 'لوبې',
        url: '/pashto/sport',
      },
      {
        title: 'ويډيوګانې',
        url: '/pashto/media/video',
      },
      {
        title: 'انځورونه',
        url: '/pashto/media/photogalleries',
      },
      {
        title: 'ځانګړې پاڼې',
        url: '/pashto/in_depth',
      },
      {
        title: 'کالم',
        url: '/pashto/columns',
      },
    ],
  },
};

export default withContext(service);
