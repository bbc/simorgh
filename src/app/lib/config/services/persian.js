import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { persian as brandSVG } from '@bbc/psammead-assets/svgs';
import { arabic } from '@bbc/gel-foundations/scripts';
import {
  F_NASSIM_PERSIAN_REGULAR,
  F_NASSIM_PERSIAN_BOLD,
} from '@bbc/psammead-styles/fonts';
import 'moment/locale/fa';
import '@bbc/moment-timezone-include/tz/GMT';
import { jalaali } from '@bbc/psammead-calendars';
import withContext from '../../../contexts/utils/withContext';

export const service = {
  default: {
    ads: {
      hasAds: false,
    },
    lang: 'fa',
    product: 'BBC News',
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'به روز شده در',
    atiAnalyticsAppName: 'news-persian',
    atiAnalyticsProducerId: '69',
    chartbeatDomain: 'persian.bbc.co.uk',
    brandName: 'BBC News فارسی',
    serviceLocalizedName: 'فارسی',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/persian.png',
    defaultImageAltText: 'BBC News فارسی',
    dir: 'rtl',
    externalLinkText: '، لینک خارجی',
    imageCaptionOffscreenText: '،توضیح تصویر',
    videoCaptionOffscreenText: '،توضیح ویدئو',
    audioCaptionOffscreenText: '،توضیح صدا',
    defaultCaptionOffscreenText: '،توضیح',
    imageCopyrightOffscreenText: '،منبع تصویر',
    locale: 'fa',
    datetimeLocale: 'fa',
    service: 'persian',
    serviceName: 'Persian',
    altCalendar: jalaali,
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcpersian',
    twitterSite: '@bbcpersian',
    noBylinesPolicy:
      'https://www.bbc.com/persian/institutional-49283091#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/persian/institutional-49283091',
    isTrustProjectParticipant: true,
    script: arabic,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'صفحه اول',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      seeAll: 'See all',
      home: 'صفحه اول',
      currentPage: 'Current page',
      skipLinkText: 'مشاهده محتوا',
      relatedContent: 'مطالب مرتبط',
      navMenuText: 'صفحه ها',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      error: {
        404: {
          statusCode: '۴۰۴',
          title: 'این صفحه پیدا نشد',
          message:
            'متاسفانه صفحه مورد نظر شما را پیدا نمی‌کنیم. لطفا گزینه‌های زیر را امتحان کنید:',
          solutions: [
            'آدرس صفحه مورد نظر را دوباره بررسی کنید',
            'با مرورگر خود صفحه را ریفرش (Refresh) کنید',
            'در نوار جستجوی بی‌بی‌سی دنبال اطلاعات مورد نظرتان بگردید',
          ],
          callToActionFirst: 'برای یافتن اطلاعات مورد نظر به ',
          callToActionLinkText: 'صفحه اصلی بی‌بی‌سی فارسی',
          callToActionLast: ' بروید',
          callToActionLinkUrl: 'https://www.bbc.com/persian',
        },
        500: {
          statusCode: '۵۰۰',
          title: 'خطا در سرور داخلی',
          message:
            'متاسفانه صفحه مورد نظر شما در دسترس نیست. لطفا گزینه‌های زیر را امتحان کنید:',
          solutions: [
            'با مرورگر خود صفحه را ریفرش (Refresh) کنید',
            'بعدا دوباره امتحان کنید',
          ],
          callToActionFirst: 'برای یافتن اطلاعات مورد نظر به ',
          callToActionLinkText: 'صفحه اصلی بی‌بی‌سی فارسی',
          callToActionLast: ' بروید',
          callToActionLinkUrl: 'https://www.bbc.com/persian',
        },
      },
      consentBanner: {
        privacy: {
          title:
            'ما سیاست‌های حفظ حریم خصوصی و کوکی‌های (Cookies) خود را به روز کرده‌ایم',
          description: {
            uk: {
              first:
                'ما تغییرات مهمی در سیاست‌های حفظ حریم خصوصی و کوکی‌هایمان ایجاد کرده‌ایم و می‌خواهیم شما بدانید این تغییرات برای شما و اطلاعات مربوط به شما به چه معنی است',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'ما تغییرات مهمی در سیاست‌های حفظ حریم خصوصی و کوکی‌هایمان ایجاد کرده‌ایم و می‌خواهیم شما بدانید این تغییرات برای شما و اطلاعات مربوط به شما به چه معنی است',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'تایید',
          reject: 'ببنید چه تغییراتی ایجاد شده است',
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
        },
        cookie: {
          title: 'آیا با دریافت کوکی‌های ما (Cookies) موافقید؟',
          description: {
            uk: {
              first: 'ما برای بهبود استفاده شما از خدمات بی‌بی‌سی از ',
              linkText: 'کوکی',
              last:
                ' استفاده می‌کنیم. اگر موافق هستید دریافت کوکی‌ها را تایید کنید',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            international: {
              first:
                'ما و شریکانمان برای اینکه خدمات آنلاین بهتری به شما ارائه کنیم و محتوای مورد نظرتان را به شما نشان دهیم از تکنولوژی‌هایی مانند ',
              linkText: 'کوکی‌ها',
              last:
                ' یا برداشت از داده‌های مرورگر شما استفاده می‌کنیم؛ اگر موافق هستید تایید کنید',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
          },
          accept: 'بله، موافقم',
          reject: 'خیر، بازگشت به صفحه تنظیمات',
          rejectUrl:
            'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
        },
      },
      media: {
        noJs: 'پخش این فایل در دستگاه شما پشتیبانی نمی شود.',
        contentExpired: 'این محتوا دیگر قابل دسترس نیست.',
        audio: 'صدا',
        photogallery: 'عکس',
        video: 'ویدیو',
        bbc_persian_radio: {
          title: 'رادیو فارسی بی‌بی‌سی',
          subtitle:
            'مجله خبری بخش فارسی رادیو بی‌بی‌سی را هر روز از ساعت ۶ تا ۸ صبح به وقت تهران (۲:۳۰ تا ۴:۳۰ به وقت گرینیچ) بشنوید. این برنامه شامل تازه‌ترین خبرهای روز ایران و جهان، به همراه گزارش، گفت وگو و تحلیل و تفسیر درباره رویدادهای ایران، منطقه و جهان است.',
        },
        bbc_dari_radio: {
          title: 'بی بی سی افغانستان (برنامه های دری)',
          subtitle:
            'بی بی سی برای افغانستان تازه ترین و دقیق ترین خبرهای افغانستان ، منطقه و جهان را با تحلیل های همه جانبه ارایه می کند. برنامه های مختلف سیاسی، اجتماعی، فرهنگی و آموزشی از ساعت پنج صبح تا دوازده شب به زبان های دری و پشتو از بی بی سی برای افغانستان.',
        },
        bbc_persian_tv: {
          title: '۶٠ دقیقه',
          subtitle:
            'برنامه خبری-تحلیلی یک ساعته که تصویری روشن و ساده از رویدادهای پیچیده جهان ارائه می‌کند.',
        },
        listen: 'Listen',
        watch: 'تماشا کنید',
        liveLabel: 'زنده',
        nextLabel: 'NEXT',
        previousRadioShow: 'Previous radio show',
        nextRadioShow: 'Next radio show',
        duration: 'Duration',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'توضیح ویدئو، ',
          text: 'هشدار: محتوای مربوط به طرف ثالث ممکن است شامل آگهی باشد',
        },
        fallback: {
          text: 'محتوا در دسترس نیست',
          linkText: 'در %provider_name% بیشتر ببینید',
          linkTextSuffixVisuallyHidden: '، لینک خارجی',
          warningText: ' بی بی سی. بی بی سی مسئول محتوای سایت های دیگر نیست.',
        },
        skipLink: {
          text: 'بگذر از پست %provider_name%',
          endTextVisuallyHidden: 'پایان پست %provider_name%',
        },
      },
    },
    brandSVG,
    mostRead: {
      header: 'پربیننده‌ترین‌ها',
      lastUpdated: 'به روز شده در',
      numberOfItems: 10,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: true,
      onFrontPage: true,
      frontPagePosition: '',
      header: 'برنامه‌های رادیو',
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/persian/institutional-49283091',
        text: 'چرا می‌توانید به بی‌بی‌سی اطمینان کنید؟',
      },
      externalLink: {
        href: 'https://www.bbc.com/persian/institutional/2011/04/000001_links',
        text: 'سیاست ما درباره لینک دادن به سایت های دیگر.',
      },
      links: [
        {
          href: 'https://www.bbc.com/persian/institutional-37474133',
          text: 'شرایط استفاده',
        },
        {
          href: 'https://www.bbc.com/persian/institutional-37474136',
          text: 'درباره بی بی سی',
        },
        {
          href: 'https://www.bbc.com/persian/institutional-37540067',
          text: 'سیاست حفظ حریم خصوصی',
        },
        {
          href: 'https://www.bbc.co.uk/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.com/persian/institutional-37542244',
          text: 'تماس با بی بی سی',
        },
        {
          href:
            'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText: 'بی بی سی. بی بی سی مسئول محتوای سایت های دیگر نیست.',
    },
    timezone: 'GMT',
    fonts: [F_NASSIM_PERSIAN_REGULAR, F_NASSIM_PERSIAN_BOLD],
    navigation: [
      {
        title: 'صفحه اول',
        url: '/persian',
      },
      {
        title: 'ویروس کرونا',
        url: '/persian/science-52004647',
      },
      {
        title: 'پخش زنده',
        url: '/persian/media-49522521',
      },
      {
        title: 'ویدیو',
        url: '/persian/media/video',
      },
      {
        title: 'تلویزیون',
        url: '/persian/tv-and-radio-37434377',
      },
      {
        title: 'رادیو',
        url: '/persian/tv-and-radio-37434376',
      },
      {
        title: 'ايران',
        url: '/persian/iran',
      },
      {
        title: 'افغانستان',
        url: '/persian/afghanistan',
      },
      {
        title: 'جهان',
        url: '/persian/world',
      },
      {
        title: 'هنر',
        url: '/persian/arts',
      },
      {
        title: 'ورزش',
        url: '/persian/sport',
      },
      {
        title: 'اقتصاد',
        url: '/persian/business',
      },
      {
        title: 'دانش',
        url: '/persian/science',
      },
      {
        title: 'شما',
        url: '/persian/interactivity',
      },
      {
        title: 'ناظران می‌گویند',
        url: '/persian/blogs/viewpoints',
      },
      {
        title: 'صفحات ویژه',
        url: '/persian/world-37434378',
      },
      {
        title: 'وبلاگ‌ها',
        url: '/persian/services/2012/01/000000_blogs_list',
      },
      {
        title: 'آموزش زبان انگلیسی',
        url: '/persian/learningenglish',
      },
    ],
  },
};

export default withContext(service);
