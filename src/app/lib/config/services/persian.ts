import arabic from '../../../components/ThemeProvider/fontScripts/arabic';
import 'moment/locale/fa';
import '#psammead/moment-timezone-include/tz/GMT';
import jalaali from '../../../legacy/psammead/psammead-calendars/src';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: 'fa',
    product: 'BBC News',
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'به روز شده در',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-persian',
    atiAnalyticsProducerId: '69',
    chartbeatDomain: 'persian.bbc.co.uk',
    brandName: 'BBC News فارسی',
    serviceLocalizedName: 'فارسی',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/persian.png',
    defaultImageAltText: 'BBC News فارسی',
    dir: 'rtl',
    externalLinkText: '، خارجی',
    imageCaptionOffscreenText: 'توضیح تصویر، ',
    videoCaptionOffscreenText: 'توضیح ویدئو، ',
    audioCaptionOffscreenText: 'توضیح صدا، ',
    defaultCaptionOffscreenText: 'توضیح، ',
    imageCopyrightOffscreenText: 'منبع تصویر، ',
    locale: 'fa',
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'fa',
    datetimeLocale: 'fa',
    service: 'persian',
    serviceName: 'Persian',
    languageName: 'Persian',
    altCalendar: jalaali,
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
    showAdPlaceholder: true,
    showRelatedTopics: true,
    podcastPromo: {
      title: 'پادکست',
      brandTitle: 'اسطوره تختی',
      brandDescription:
        'در مجموعه چهار قسمتی «اسطوره تختی» از زندگی شخصی، ورزشی و اجتماعی غلامرضا تختی می‌شنویم.',
      image: {
        src: 'https://ichef.bbci.co.uk/images/ic/$recipe/p0jkc7rj.jpg',
        alt: 'اسطوره تختی',
      },
      linkLabel: {
        text: 'پادکست',
        href: 'https://www.bbc.com/persian/podcasts/p0703hz7',
      },
      skipLink: {
        text: 'از %title% رد شوید و به خواندن ادامه دهید',
        endTextVisuallyHidden: 'پایان %title%',
      },
    },
    translations: {
      pagination: {
        page: 'صفحه',
        previousPage: 'قبلی',
        nextPage: 'بعدی',
        pageXOfY: 'صفحه {x} از {y}',
      },
      ads: {
        advertisementLabel: 'آگهی',
      },
      recommendationTitle: 'مطالب پیشنهادی',
      splitRecommendationTitle: 'مطالب پیشنهادی دیگر',
      seeAll: 'بیشتر',
      home: 'صفحه اول',
      currentPage: 'صفحه فعلی',
      skipLinkText: 'مشاهده محتوا',
      relatedContent: 'مطالب مرتبط',
      relatedTopics: 'موضوعات مرتبط',
      navMenuText: 'صفحه ها',
      mediaAssetPage: {
        mediaPlayer: 'پخش صدا و تصویر',
        audioPlayer: 'پخش صدا',
        videoPlayer: 'پخش ویدیو',
      },
      liveExperiencePage: {
        liveLabel: 'زنده',
        liveCoverage: 'پوشش زنده',
        breaking: 'خبر فوری',
        postedAt: 'به روزشده در',
        summary: 'خلاصه',
        shareButtonText: 'هم‌رسانی',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'خلاصه',
      error: {
        404: {
          statusCode: '۴۰۴',
          title: 'این صفحه پیدا نشد',
          message:
            'متاسفانه صفحه مورد نظر شما را پیدا نمی‌کنیم. لطفا گزینه‌های زیر را امتحان کنید:',
          solutions: [
            'آدرس صفحه مورد نظر را دوباره بررسی کنید',
            'با مرورگر خود صفحه را ریفرش کنید',
            'در نوار جستجوی بی‌بی‌سی دنبال اطلاعات مورد نظرتان بگردید',
          ],
          callToActionFirst: 'برای یافتن اطلاعات مورد نظر به صفحه اصلی ',
          callToActionLinkText: 'BBC News فارسی',
          callToActionLast: ' بروید',
          callToActionLinkUrl: 'https://www.bbc.com/persian',
        },
        500: {
          statusCode: '۵۰۰',
          title: 'خطا در سرور داخلی',
          message:
            'متاسفانه صفحه مورد نظر شما در دسترس نیست. لطفا گزینه‌های زیر را امتحان کنید:',
          solutions: [
            'با مرورگر خود صفحه را ریفرش کنید',
            'بعدا دوباره امتحان کنید',
          ],
          callToActionFirst: 'برای یافتن اطلاعات مورد نظر به صفحه اصلی ',
          callToActionLinkText: 'BBC News فارسی',
          callToActionLast: ' بروید',
          callToActionLinkUrl: 'https://www.bbc.com/persian',
        },
      },
      byline: {
        articleInformation: 'اطلاعات مقاله',
        author: 'نویسنده',
        listItemImage: 'تصویر نویسنده مقاله',
        published: 'منتشر شده در',
        reportingFrom: 'در',
        role: 'شغل',
      },
      consentBanner: {
        privacy: {
          title:
            'ما سیاست‌های حفظ حریم خصوصی و کوکی‌های خود را به روز کرده‌ایم',
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
          rejectUrl: 'https://www.bbc.com/usingthebbc/your-data-matters',
        },
        cookie: {
          amp: {
            accept: 'پذیرش جمع آوری داده ها، و ادامه دادن',
            reject: 'رد کردن جمع آوری داده ها و ادامه دادن',
            initial: {
              title:
                'به ما اطلاع دهید که موافق جمع آوری داده ها در صفحات موبایلی پرشتاب (AMP) هستید',
              description: {
                first:
                  'ما و شریکانمان برای اینکه خدمات آنلاین بهتری به شما ارائه کنیم و محتوای مورد نظرتان را به شما نشان دهیم از تکنولوژی‌هایی مانند ',
                linkText: 'کوکی ها',
                last: ' یا برداشت از داده‌های مرورگر شما استفاده می‌کنیم؛ اگر موافق هستید تایید کنید',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'مدیریت تنظیمات',
            },
            manage: {
              title: 'مدیریت تنظیمات مربوط به رضایت در صفحات AMP',
              description: {
                para1:
                  'این تنظیمات فقط برای صفحات AMP اعمال می شود. هنگامی که از صفحات غیر AMP در بی بی سی بازدید می کنید ممکن است از شما بخواهند که این تنظیمات را دوباره انجام دهید.',
                para2:
                  'صفحه موبایل سبک که از آن بازدید کرده اید با استفاده از فناوری Google AMP ساخته شده است.',
                heading2: 'جمع آوری اطلاعات کاملاً ضروری',
                para3:
                  'برای کار با صفحات وب ما، ما اطلاعات محدودی را بدون رضایت شما در دستگاه شما ذخیره می کنیم.',
                para4: {
                  text: 'درباره اطلاعات اساسی که برای کار با صفحات وب ما در دستگاه شما ذخیره می کنیم بیشتر بخوانید.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
                },
                para5:
                  'ما اطلاعات مربوط به  رضایت یا عدم رضایت شما را به صورت محلی در دستگاهتان  ذخیره می کنیم.',
                heading3: 'جمع آوری اطلاعات اختیاری',
                para6:
                  'وقتی موافقت خود را برای جمع آوری داده ها در صفحات AMP اعلام می کنید، به ما اجازه می دهید تبلیغات شخصی شده مربوط به شما را هنگامی که خارج از بریتانیا هستنید، نمایش دهیم.',
                para7: {
                  text: 'درباره نحوه شخصی سازی تبلیغات در بی بی سی و شرکای تبلیغاتی ما بیشتر بخوانید.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'شما می توانید با کلیک "رد کردن جمع آوری داده ها و ادامه دادن" در زیر، تبلیغات شخصی را دریافت نکنید. لطفاً توجه داشته باشید که همچنان تبلیغات را مشاهده خواهید کرد، اما برای شما شخصی نخواهد شد.',
                para9:
                  'می توانید این تنظیمات را با کلیک کردن روی  "گزینه های مربوط به تبلیغات / اطلاعاتم را نفروشید" در پایین صفحه در هر زمان تغییر دهید."',
              },
            },
          },
          canonical: {
            title: 'آیا با دریافت کوکی‌های ما موافقید؟',
            description: {
              uk: {
                first: 'ما برای بهبود استفاده شما از خدمات بی‌بی‌سی از ',
                linkText: 'کوکی',
                last: ' استفاده می‌کنیم. اگر موافق هستید دریافت کوکی‌ها را تایید کنید',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'ما برای بهبود استفاده شما از خدمات بی‌بی‌سی از ',
                linkText: 'کوکی',
                last: ' استفاده می‌کنیم. اگر موافق هستید دریافت کوکی‌ها را تایید کنید',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'بله، موافقم',
            reject: 'خیر، بازگشت به صفحه تنظیمات',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'برای پخش این فایل لطفا جاوا اسکریپت را فعال یا از یک مرورگر دیگر استفاده کنید.',
        contentExpired: 'این محتوا دیگر قابل دسترس نیست.',
        contentNotYetAvailable: 'این برنامه هم اکنون برای پخش آماده نیست.',
        audio: 'صدا',
        photogallery: 'عکس',
        video: 'ویدیو',
        recentEpisodes: 'برنامه قبلی',
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
        listen: 'بشنوید',
        watch: 'ببینید',
        listenLive: 'بشنوید - زنده',
        listenNext: 'به بعدی گوش کنید',
        liveLabel: 'زنده',
        nextLabel: 'بعدی',
        previousRadioShow: 'برنامه رادیویی قبلی',
        nextRadioShow: 'برنامه رادیویی بعدی',
        duration: 'مدت',
        podcastExternalLinks: 'این پادکست در این زمان قابل دسترس است',
        download: 'دانلود برنامه',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'توضیح ویدیو، ',
          text: 'توضیح: محتوای مربوط به طرف ثالث ممکن است شامل آگهی باشد',
          articleText: 'توضیح: بی بی سی مسئول محتوای سایت های دیگر نیست.',
          articleAdditionalText:
            'محتوای %provider_name%  ممکن است شامل آگهی باشد.',
        },
        fallback: {
          text: 'محتوا در دسترس نیست',
          linkText: 'در %provider_name% بیشتر ببینید',
          linkTextSuffixVisuallyHidden: '، لینک خارجی',
          warningText: 'بی بی سی. بی بی سی مسئول محتوای سایت های دیگر نیست.',
        },
        skipLink: {
          text: 'رد شدن از پست %provider_name%',
          endTextVisuallyHidden: 'پایان پست %provider_name%',
        },
        consentBanner: {
          heading: `اجازه نشان دادن محتوای [social_media_site]  را می دهید؟`,
          body: `این مطلب شامل محتوایی از [social_media_site]  است. قبل از بارگیری این محتوا از شما اجازه می گیریم، زیرا ممکن است این سایت ها از کوکی ها و یا سایر انواع فن آوری استفاده کنند. می توانید سیاست [link]  [social_media_site]  را درباره کوکی ها [/link] و  [link] سیاست مربوط به حفظ حریم خصوصی[/link]  را پیش از موافقت بخوانید. برای دیدن این محتوا روی "موافقت و ادامه"‌کلیک کنید.`,
          button: 'موافقت و ادامه',
        },
      },
      include: {
        errorMessage:
          'متأسفانه امکان نمایش این بخش از صفحه در موبایل وجود ندارد',
        linkText: 'نسخه کامل و تمامی محتوا را ببینید',
      },
      topStoriesTitle: 'مهمترین خبرها',
      featuresAnalysisTitle: 'گزارش و تحلیل',
      latestMediaTitle: 'تازه ترین',
      ugc: {
        // No JavaScript
        noJsHeading: undefined,
        noJsDescription: undefined,

        // Optional
        optional: 'اختیاری',

        // File upload
        fileUploadLiveRegionText: undefined,
        fileUploadLiveRegionUpdateText: undefined,
        fileUploadListHeading: 'مواردی که آپلود می کنید:',
        fileUploadButton: 'انتخاب فایل',
        fileUploadRemoveButton: undefined,

        // Submit button
        submitButton: 'ارسال',

        // Validation
        validationRequired: 'موردی تکمیل نشده است.',
        validationInvalidEmail:
          'به نظر صحیح نیست. یک آدرس ایمیل درست وارد کنید.',
        validationInvalidTelephone: undefined,
        validationFilesNotEnough:
          'فایل ها به تعداد کافی نیست. کمترین تعداد فایل {{minFiles}} است.',
        validationFilesTooMany:
          'تعداد فایل ها زیاد است. حداکثر می توانید {{maxFiles}} فایل اضافه کنید.',
        validationFilesInvalidType:
          'نمی توانیم این نوع فایل را استفاده کنیم. انواع فایل قابل قبول اینها هستند {{fileTypes}}.',
        validationFilesTooSmall:
          'این فایل مشکل دارد. یک فایل دیگر انتخاب کنید.',
        validationFilesSizeExceeded:
          'اندازه فایل ها زیاد است. هر بار حداکثر می توانید ۱/۲ گیگابایت آپلود کنید.',
        validationWordLimit: 'حداکثر {{wordLimit}} واژه',

        // Messaging
        removalGuidelineText:
          'اگر محتوایی را برای استفاده در وبسایت یا برنامه ای ارسال کرده اید، در صورتی که ما از ان محتوا استفاده کرده باشیم دیگرامکان حذف آن موجود نیست.',
        retentionPeriodDays: undefined,
        referenceNumber: 'شماره',
        submissionInfoSignedOutMessage:
          'شاید بخواهید این جزئیات را برای خود یادداشت کنید.',
        privacyInfoHtml:
          'نگران نباشید، ما از اطلاعات شما محافظت می کنیم - برای اطلاعات بیشتر {{privacyInfoLink}} را بخوانید.',
        emailToHtml:
          'اگر نظر خود را تغییر داده اید، به ما ایمیل {{emailLink}} بزنید. شماره را ذکر کنید و به ما بگویید که ما از آن استفاده نکنیم.',

        // Form Screen
        dataPolicyHeading: undefined,

        // Uploading Screen
        uploadingHeading: 'در حال آپلود فایل ها...',
        uploadingDescription: 'لطفا صبر کنید تا کامل شود.',

        // Success Screen
        successHeading: 'پیغام فرستاده شد',
        successDescription: 'از تماس شما سپاسگزاریم.',
        privacyPolicyLinkHref: undefined,
        privacyPolicyLinkText: undefined,

        // Error Screen
        errorHeading: 'امکان آپلود فایل هایتان وجود ندارد.',
        errorDescription: 'دوباره آنها را آپلود کنید.',

        // Closed Screen
        closedHeading: 'امکان ارسال دیگر وجود ندارد.',
        closedDescription: 'امکان ارسال در {{date}} تمام شد.',
      },
    },
    mostRead: {
      header: 'پربیننده‌ترین‌ها',
      lastUpdated: 'به روز شده در',
      numberOfItems: 10,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: true,
      header: 'برنامه‌های رادیو',
      durationLabel: '%duration% المدة الزمنية',
    },
    recommendations: {
      hasStoryRecommendations: true,
      skipLink: {
        text: 'Skip %title% and continue reading',
        endTextVisuallyHidden: 'End of %title%',
      },
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
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'کوکی ها',
        },
        {
          href: 'https://www.bbc.co.uk/persian/send/u50853555',
          text: 'تماس با بی بی سی',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText: 'بی بی سی. بی بی سی مسئول محتوای سایت های دیگر نیست.',
    },
    timezone: 'GMT',
    navigation: [
      {
        title: 'صفحه اول',
        url: '/persian',
      },
      {
        title: 'بحران خاورمیانه',
        url: '/persian/topics/cj31ldvmg1et',
      },
      {
        title: 'انتخابات آمریکا',
        url: '/persian/topics/cj1gj22k6z6t',
      },
      {
        title: 'پخش زنده',
        url: '/persian/media-49522521',
      },
      {
        title: 'ویدیو',
        url: '/persian/topics/c6z7mnr559gt',
      },
      {
        title: 'تلویزیون',
        url: '/persian/tv-and-radio-37434377',
      },
      {
        title: 'ايران',
        url: '/persian/topics/ckdxnwvwwjnt',
      },
      {
        title: 'افغانستان',
        url: '/persian/afghanistan',
      },
      {
        title: 'جهان',
        url: '/persian/topics/c1d8ye58xl8t',
      },
      {
        title: 'هنر',
        url: '/persian/topics/c9wpm0epm45t',
      },
      {
        title: 'ورزش',
        url: '/persian/topics/cnq6879k7yjt',
      },
      {
        title: 'اقتصاد',
        url: '/persian/topics/cl8l9mvlllqt',
      },
      {
        title: 'دانش',
        url: '/persian/topics/ckdxnwr4r1yt',
      },
      {
        title: 'فراتر از خبر',
        url: '/persian/topics/cxr3ex12k6et',
      },
    ],
  },
};

export default withContext(service);
