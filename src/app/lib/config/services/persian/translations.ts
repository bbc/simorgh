export default {
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
      title: 'ما سیاست‌های حفظ حریم خصوصی و کوکی‌های خود را به روز کرده‌ایم',
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
      articleAdditionalText: 'محتوای %provider_name%  ممکن است شامل آگهی باشد.',
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
    errorMessage: 'متأسفانه امکان نمایش این بخش از صفحه در موبایل وجود ندارد',
    linkText: 'نسخه کامل و تمامی محتوا را ببینید',
  },
  topStoriesTitle: 'مهمترین خبرها',
  featuresAnalysisTitle: 'گزارش و تحلیل',
  latestMediaTitle: 'تازه ترین',
};
