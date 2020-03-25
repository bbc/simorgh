import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { arabic } from '@bbc/gel-foundations/scripts';
import { arabic as brandSVG } from '@bbc/psammead-assets/svgs';
import {
  F_NASSIM_ARABIC_REGULAR,
  F_NASSIM_ARABIC_BOLD,
} from '@bbc/psammead-styles/fonts';
import '@bbc/psammead-locales/moment/ar';
import '@bbc/moment-timezone-include/tz/GMT';
import withContext from '../../../contexts/utils/withContext';

export const service = {
  default: {
    ads: {
      hasAds: false,
    },
    lang: 'ar',
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'جدّد في',
    atiAnalyticsAppName: 'news-arabic',
    atiAnalyticsProducerId: '5',
    chartbeatDomain: 'arabic.bbc.co.uk',
    brandName: 'BBC News عربي',
    product: 'BBC News',
    serviceLocalizedName: 'عربي',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/arabic.png',
    defaultImageAltText: 'BBC News عربي',
    dir: 'rtl',
    externalLinkText: ' ،خارجي',
    imageCaptionOffscreenText: ' ،التعليق على الصورة',
    videoCaptionOffscreenText: ' ،التعليق على الفيديو',
    audioCaptionOffscreenText: ' ،التعليق على التسجيل السماعي',
    defaultCaptionOffscreenText: '،التعليق',
    imageCopyrightOffscreenText: ' ،مصدر الصورة',
    locale: 'ar',
    datetimeLocale: 'ar',
    service: 'arabic',
    serviceName: 'Arabic',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@BBCArabic',
    twitterSite: '@BBCArabic',
    noBylinesPolicy:
      'https://www.bbc.com/arabic/institutional-49283069#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/arabic/institutional-49283069',
    isTrustProjectParticipant: true,
    script: arabic,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'الرئيسية',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      seeAll: 'See all',
      home: 'رئيسية',
      currentPage: 'الصفحة الحالية',
      skipLinkText: 'إذهب الى المحتوى',
      relatedContent: 'المزيد حول هذه القصة',
      navMenuText: 'أقسام',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      error: {
        404: {
          statusCode: '404',
          title: 'لم يتسن العثور على الصفحة',
          message:
            'آسفون، لم نتمكن من العثور على الصفحة التي تطلبها. الرجاء حاول:',
          solutions: [
            'أن تتأكد من عنوان الصفحة (url)',
            'أن تنقر زر التجديد (refresh) في برنامج التصفح الذي تستخدمه',
            'أن تبحث عن هذه الصفحة باستخدام خانة البحث الخاصة ببي بي سي',
          ],
          callToActionFirst:
            'كبديل، يرجى زيارة الصفحة الرئيسية لأخبار بي بي سي ',
          callToActionLinkText: 'Arabic',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/arabic',
        },
        500: {
          statusCode: '500',
          title: 'خلل داخلي في الخادم',
          message:
            'آسفون، لم نتمكن من العثور على الصفحة التي تطلبها. الرجاء حاول:',
          solutions: [
            'أن تنقر زر التجديد (refresh) في برنامج التصفح الذي تستخدمه',
            'أن تكرر الطلب بعد فترة',
          ],
          callToActionFirst:
            'كبديل، يرجى زيارة الصفحة الرئيسية لأخبار بي بي سي ',
          callToActionLinkText: 'Arabic',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/arabic',
        },
      },
      consentBanner: {
        privacy: {
          title:
            'لقد حدّثنا تعليماتنا المتعلقة بالخصوصية وبالشروط الخاصة بملفات الإرتباط (الكوكيز)',
          description: {
            uk: {
              first:
                'لقد أدخلنا تغييرات مهمة لتعليماتنا المتعلقة بالخصوصية وللشروط الخاصة بملفات الإرتباط (الكوكيز)، ويهمنا أن تكونوا ملمين بما قد تعني هذه التغييرات بالنسبة لكم ولبياناتكم',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'لقد أدخلنا تغييرات مهمة لتعليماتنا المتعلقة بالخصوصية وللشروط الخاصة بملفات الإرتباط (الكوكيز)، ويهمنا أن تكونوا ملمين بما قد تعني هذه التغييرات بالنسبة لكم ولبياناتكم',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'موافق',
          reject: 'إطلع على التغييرات',
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
        },
        cookie: {
          title: 'أخبرنا عما إذا كنت توافق على تحميل الكوكيز',
          description: {
            uk: {
              first: 'نستخدم ',
              linkText: 'ملفات ارتباط (كوكيز)',
              last:
                ' لمنحك أفضل خدمة رقمية. الرجاء أحطنا علما إذا كنت توافق على تحميل كل هذه الكوكيز.',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            international: {
              first: 'نستخدم نحن وشركاؤنا تقنيات مثل ',
              linkText: 'الكوكيز',
              last:
                '، كما نقوم بجمع معلومات خاصة بالتصفح من أجل توفير أفضل خدمة رقمية ولاضفاء مسحة شخصية للمحتوى والاعلانات الموجهة إليك. الرجاء إعلامنا إذا كنت موافقا على ذلك.',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
          },
          accept: 'نعم، موافق',
          reject: 'كلا، أعدني إلى الإعدادات',
          rejectUrl:
            'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
        },
      },
      media: {
        noJs: 'جهازك لا يدعم تشغيل الفيديو',
        contentExpired: 'هذا المحتوى لم يعد متوفراً',
        audio: 'تسجيل صوتي',
        photogallery: 'معرض الصور',
        video: 'فيديو',
        bbc_arabic_radio: {
          title: 'إذاعة بي بي سي العربية',
          subtitle:
            'خدمة إخبارية على مدار الساعة و برامج حوارية وتفاعلية تناقش قضايا المنطقة والعالم وباقة من البرامج المنوعة من إذاعة بي بي سي',
        },
        listen: 'Listen',
        watch: 'Watch',
        liveLabel: 'مباشر',
        previousRadioShow: 'Previous radio show',
        nextRadioShow: 'Next radio show',
        duration: 'Duration',
      },
    },
    brandSVG,
    mostRead: {
      header: 'الأكثر قراءة',
      lastUpdated: 'آخر تحديث',
      numberOfItems: 10,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: true,
      frequenciesPageUrl:
        '/arabic/institutional/2011/01/000000_frequencies_radio',
      frequenciesPageLabel: 'استقبال البث',
      header: 'أحدث نشرة أخبار',
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/arabic/institutional-49283069',
        text: 'لماذا يمكنك الإعتماد على أخبار بي بي سي',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text: 'سياستنا بخصوص الروابط الخارجية.',
      },
      links: [
        {
          href: 'https://www.bbc.com/arabic/institutional-37731351',
          text: 'شروط الاستخدام',
        },
        {
          href: 'https://www.bbc.com/arabic/institutional-37731352',
          text: 'عن بي بي سي',
        },
        {
          href: 'https://www.bbc.com/arabic/institutional-37731353',
          text: 'سياسة الخصوصية',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.com/arabic/institutional-37731355',
          text: 'اتصل بـ بي بي سي',
        },
        {
          href:
            'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'بي بي سي. بي بي سي ليست مسؤولة عن محتوى المواقع الخارجية.',
    },
    fonts: [F_NASSIM_ARABIC_REGULAR, F_NASSIM_ARABIC_BOLD],
    timezone: 'GMT',
    navigation: [
      {
        title: 'رئيسية',
        url: '/arabic',
      },
      {
        title: 'شرق أوسط',
        url: '/arabic/middleeast',
      },
      {
        title: 'عالم',
        url: '/arabic/world',
      },
      {
        title: 'علوم وتكنولوجيا',
        url: '/arabic/scienceandtech',
      },
      {
        title: 'صحة',
        url: '/arabic/topics/c4794229-7f87-43ce-ac0a-6cfcd6d3cef2',
      },
      {
        title: 'اقتصاد',
        url: '/arabic/business',
      },
      {
        title: 'فنون',
        url: '/arabic/artandculture',
      },
      {
        title: 'رياضة',
        url: '/arabic/sports',
      },
      {
        title: 'مجلة',
        url: '/arabic/magazine',
      },
      {
        title: 'مرأة',
        url: '/arabic/topics/e45cb5f8-3c87-4ebd-ac1c-058e9be22862',
      },
      {
        title: 'فيديو',
        url: '/arabic/media',
      },
      {
        title: 'صحافة',
        url: '/arabic/inthepress',
      },
      {
        title: 'صور',
        url: '/arabic/media/photogalleries',
      },
      {
        title: 'برامجنا',
        url: '/arabic/tv-and-radio-37728883',
      },
      {
        title: 'ترند',
        url: '/arabic/trending',
      },
      {
        title: 'حوارات',
        url: '/arabic/interactivity',
      },
      {
        title: 'ملفات',
        url: '/arabic/in_depth',
      },
    ],
  },
};

export default withContext(service);
