import arabic from '../../../components/ThemeProvider/fontScripts/arabic';
import '#psammead/psammead-locales/moment/fa-af';
import '#psammead/moment-timezone-include/tz/Asia/Kabul';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: 'prs',
    product: 'BBC News',
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'به روز شده در',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-dari',
    atiAnalyticsProducerId: '142',
    atiAnalyticsProducerName: 'DARI',
    useReverb: true,
    chartbeatDomain: 'dari.bbc.co.uk',
    brandName: 'BBC News دری',
    serviceLocalizedName: 'دری',
    defaultImage:
      'https://static.files.bbci.co.uk/ws/simorgh-assets/public/dari/images/metadata/poster-1024x576.png',
    defaultImageAltText: 'BBC News دری',
    dir: 'rtl',
    externalLinkText: '، خارجی',
    imageCaptionOffscreenText: 'توضیح تصویر، ',
    videoCaptionOffscreenText: 'توضیح ویدئو، ',
    audioCaptionOffscreenText: 'توضیح صدا، ',
    defaultCaptionOffscreenText: 'توضیح، ',
    imageCopyrightOffscreenText: 'منبع تصویر، ',
    locale: 'fa-af',
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'fa-af',
    datetimeLocale: 'fa-af',
    service: 'dari',
    serviceName: 'Dari',
    languageName: 'Dari',
    twitterCreator: '@bbcafghanistan',
    twitterSite: '@bbcafghanistan',
    noBylinesPolicy: 'https://www.bbc.com/dari/articles/c8jpnremrrvo',
    publishingPrinciples: 'https://www.bbc.com/dari/articles/c8jpnremrrvo',
    isTrustProjectParticipant: true,
    script: arabic,
    manifestPath: '/dari/manifest.json',
    swPath: '/sw.js',
    homePageTitle: 'صفحه اول',
    showAdPlaceholder: true,
    showRelatedTopics: true,
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
      seeAll: 'بیشتر',
      home: 'صفحه اول',
      currentPage: 'صفحه فعلی',
      skipLinkText: 'مشاهده محتوا',
      relatedContent: 'مطالب مرتبط',
      relatedTopics: 'موضوعات مرتبط',
      moreOnThis: '',
      navMenuText: 'صفحه ها',
      liteSite: {
        onboardingMessage: `شما در حال مشاهده نسخه متنی وب‌سایت بی‌بی‌سی هستید که از داده کمتری استفاده می‌کند. نسخه اصلی وب‌سایت را که شامل تمام تصاویر و ویدیوهاست، مشاهده کنید.`,
        toMainSite: 'بازگشت به وب‌سایت یا نسخه اصلی',
        informationPage:
          'اطلاعات بیشتر درباره نسخه لایت که برای مصرف کمتر حجم داده‌هاست',
        informationPageLink: 'https://www.bbc.com/dari/articles/cp3dzx3z929o',
        dataSaving: 'مشاهده نسخه متنی (بدون عکس یا ویدیو) از این مطلب',
        articleDataSavingLinkText:
          'مشاهده نسخه متنی (بدون عکس یا ویدیو) از این مطلب',
      },
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
          callToActionLinkText: 'BBC News دری',
          callToActionLast: ' بروید',
          callToActionLinkUrl: 'https://www.bbc.com/dari',
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
          callToActionLinkText: 'BBC News دری',
          callToActionLast: ' بروید',
          callToActionLinkUrl: 'https://www.bbc.com/dari',
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
          rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
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
        bbc_dari_radio: {
          title: 'برنامه‌های رادیو بی‌بی‌سی‌دری',
          subtitle:
            'برنامه‌های رادیویی بی‌بی‌سی‌دری تازه‌ترین و دقیق‌ترین خبرهای افغانستان، منطقه و جهان را با تحلیل‌ همه‌جانبه ارائه می‌کند. برنامه‌های خبری، اجتماعی، فرهنگی و آموزشی از ساعت پنج صبح تا دوازده شب به وقت افغانستان به دری و پشتو روی امواج اف‌ام، موج متوسط و امواج کوتاه.',
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
        closeVideo: 'خروج',
        endOfContentClose: 'پایان این محتوا. خروج',
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
        retentionPeriodDays:
          'اطلاعات ارسالی شما تا {{days}} روز نگهداری خواهد شد و در صورتی که مورد استفاده قرار نگیرد، همراه با سایر اطلاعات ارسالی، حذف خواهد شد.',
        referenceNumber: 'شماره',
        submissionInfoSignedOutMessage:
          'شاید بخواهید این جزئیات را برای خود یادداشت کنید.',
        privacyInfoHtml:
          'نگران نباشید، ما از اطلاعات شما محافظت می کنیم - برای اطلاعات بیشتر {{privacyInfoLink}} را بخوانید.',
        emailToHtml:
          'اگر نظر خود را تغییر داده اید، به ما ایمیل {{emailLink}} بزنید. شماره را ذکر کنید و به ما بگویید که ما از آن استفاده نکنیم.',

        // Form Screen
        dataPolicyHeading: 'سیاست حفظ حریم خصوصی',

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
      header: 'مطالب پرخواننده',
      lastUpdated: 'به روز شده در',
      numberOfItems: 5,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: true,
      header: 'برنامه‌های رادیو',
      durationLabel: '%duration% المدة الزمنية',
    },
    recommendations: {
      header: 'پربیننده‌ترین‌ها',
      skipLink: {
        text: 'Skip %title% and continue reading',
        endTextVisuallyHidden: 'End of %title%',
      },
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/dari/articles/c8jpnremrrvo',
        text: 'چرا می‌توانید به بی‌بی‌سی اطمینان کنید؟',
      },
      externalLink: {
        href: 'https://www.bbc.com/editorialguidelines/guidance/links-and-feeds',
        text: 'سیاست ما درباره لینک دادن به سایت های دیگر.',
      },
      links: [
        {
          href: 'https://www.bbc.com/dari/articles/cy85mvgyr23o',
          text: 'شرایط استفاده',
        },
        {
          href: 'https://www.bbc.com/dari/articles/cjeyjknpvn5o',
          text: 'در باره بی‌بی‌سی',
        },
        {
          href: 'https://www.bbc.com/dari/articles/cq5860pd7q3o',
          text: 'سیاست حفظ حریم خصوصی',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'کوکی ها',
        },
        {
          href: 'https://www.bbc.com/dari/send/u214757345',
          text: 'تماس با بی‌بی‌سی',
        },
        {
          href: 'https://www.bbc.com/ws/languages',
          text: 'اخبار به زبان‌های دیگر',
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
    timezone: 'Asia/Kabul',
    navigation: [
      {
        title: 'صفحه اول',
        url: '/dari',
      },
      {
        title: 'پخش زنده رادیو',
        url: '/dari/bbc_dari_radio/liveradio',
      },
      {
        title: 'افغانستان',
        url: '/dari/topics/c78n1x1x3jet',
      },
      {
        title: 'منطقه',
        url: '/dari/topics/cx2den5q88lt',
      },
      {
        title: 'جهان',
        url: '/dari/topics/c70rj4d7rert',
      },
      {
        title: 'ورزش',
        url: '/dari/topics/c24r373gngzt',
      },
      {
        title: 'ساینس',
        url: '/dari/topics/clyl797dek3t',
      },
      {
        title: 'برنامه‌های رادیویی',
        url: '/dari/topics/cd9zd279j4kt',
      },
    ],
  },
};

export default withContext(service);
