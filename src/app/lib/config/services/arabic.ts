import arabic from '../../../components/ThemeProvider/fontScripts/arabic';
import '#psammead/psammead-locales/moment/ar';
import '#psammead/moment-timezone-include/tz/GMT';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: 'ar',
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'آخر تحديث',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-arabic',
    atiAnalyticsProducerId: '5',
    chartbeatDomain: 'arabic.bbc.co.uk',
    brandName: 'BBC News عربي',
    product: 'BBC News',
    serviceLocalizedName: 'عربي',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/arabic.png',
    defaultImageAltText: 'BBC News عربي',
    dir: 'rtl',
    externalLinkText: '، خارجي ',
    imageCaptionOffscreenText: 'التعليق على الصورة، ',
    videoCaptionOffscreenText: 'التعليق على الفيديو، ',
    audioCaptionOffscreenText: 'التعليق على التسجيل الصوتي، ',
    defaultCaptionOffscreenText: 'التعليق، ',
    imageCopyrightOffscreenText: 'صدر الصورة، ',
    locale: 'ar',
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'ar',
    datetimeLocale: 'ar',
    service: 'arabic',
    serviceName: 'Arabic',
    languageName: 'Arabic',
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
    iTunesAppId: 558497376,
    showAdPlaceholder: true,
    showRelatedTopics: true,
    googleSiteVerification: 'D-aEHUiyVaMoUJXjVRbDVkxS0dLTMUZLD3dLPTnWO4Q',
    podcastPromo: {
      title: 'يستحق الانتباه',
      brandTitle: 'يستحق الانتباه',
      brandDescription:
        'شرح معمق لقصة بارزة من أخباراليوم، لمساعدتك على فهم أهم الأحداث حولك وأثرها على حياتك',
      image: {
        src: 'https://ichef.bbci.co.uk/images/ic/$recipe/p0h6dt4s.jpg',
        alt: 'يستحق الانتباه',
      },
      linkLabel: {
        text: 'الحلقات',
        href: 'https://www.bbc.com/arabic/podcasts/p0h6d6nm',
      },
      skipLink: {
        text: 'تخطى %title% وواصل القراءة',
        endTextVisuallyHidden: '%title% نهاية',
      },
    },
    translations: {
      pagination: {
        page: 'صفحة',
        previousPage: 'السابق',
        nextPage: 'التالي',
        pageXOfY: 'صفحة {x} من {y}',
      },
      ads: {
        advertisementLabel: 'إعلان',
      },
      recommendationTitle: 'قصص مقترحة',
      splitRecommendationTitle: 'مزيد من القصص المقترحة',
      seeAll: 'المزيد',
      home: 'الرئيسية',
      currentPage: 'الصفحة الحالية',
      skipLinkText: 'إذهب الى المحتوى',
      relatedContent: 'المزيد حول هذه القصة',
      relatedTopics: 'كلمات مفتاحية',
      navMenuText: 'أقسام',
      mediaAssetPage: {
        mediaPlayer: 'مشغل وسائط',
        audioPlayer: 'مشغل ملف صوتي',
        videoPlayer: 'مشغل فيديو',
      },
      liveExperiencePage: {
        liveLabel: 'مباشر',
        liveCoverage: 'تغطية مباشرة',
        breaking: 'عاجل',
        postedAt: 'توقيت النشر',
        summary: 'ملخص',
        shareButtonText: 'شارك',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'ملخص',
      error: {
        404: {
          statusCode: '404',
          title: 'لم يتسن العثور على الصفحة',
          message:
            'للأسف، لم نتمكن من العثور على الصفحة التي تطلبها. الرجاء حاول:',
          solutions: [
            'التأكد من عنوان الصفحة (url)',
            'نقر زر التجديد (refresh) في برنامج التصفح الذي تستخدمه',
            'البحث عن هذه الصفحة باستخدام خانة البحث الخاصة ببي بي سي',
          ],
          callToActionFirst: 'كبديل، يرجى زيارة الصفحة الرئيسية لأخبار ',
          callToActionLinkText: 'BBC News عربي',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/arabic',
        },
        500: {
          statusCode: '500',
          title: 'خلل داخلي في الخادم',
          message:
            'للأسف، لم نتمكن من العثور على الصفحة التي تطلبها. الرجاء حاول:',
          solutions: [
            'نقر زر التجديد (refresh) في برنامج التصفح الذي تستخدمه',
            'تكرار الطلب بعد فترة',
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
            'لقد حدّثنا سياستنا المتعلقة بالخصوصية وبالشروط الخاصة بملفات الارتباط Cookies',
          description: {
            uk: {
              first:
                'لقد أدخلنا تغييرات مهمة على سياستنا المتعلقة بالخصوصية وعلى الشروط الخاصة بملفات الارتباط Cookies، ويهمنا أن تكونوا ملمين بما قد تعني هذه التغييرات بالنسبة لكم ولبياناتكم',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'لقد أدخلنا تغييرات مهمة على سياستنا المتعلقة بالخصوصية وعلى الشروط الخاصة بملفات الارتباط Cookies، ويهمنا أن تكونوا ملمين بما قد تعني هذه التغييرات بالنسبة لكم ولبياناتكم',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'موافق',
          reject: 'إطلع على التغييرات',
          rejectUrl: 'https://www.bbc.com/usingthebbc/your-data-matters',
        },
        cookie: {
          amp: {
            accept: 'وافق على جمع المعلومات واستمر',
            reject: 'رفض جمع المعلومات واستمر',
            initial: {
              title: 'أعلمونا بموافقتكم على جمع المعلومات من خلال AMP',
              description: {
                first: 'نستخدم نحن وشركاؤنا تقنيات مثل ',
                linkText: 'ملفات الارتباط',
                last: '، كما نقوم بجمع معلومات خاصة بالتصفح من أجل توفير أفضل خدمة رقمية ولجعل المحتوى والاعلانات، الموجهة إليك، شخصية. الرجاء إعلامنا إذا كنت موافقا على ذلك.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'ادارة خياراتي',
            },
            manage: {
              title: 'ادارة خيارات الموافقة في صفحات AMP',
              description: {
                para1:
                  'تسري هذه الاعدادات على صفحات AMP فقط. قد يطلب منكم اعادة تحديد الاعدادات عند زيارتكم صفحات بي بي سي غير الخاضعة لـ AMP.',
                para2:
                  'الصفحة خفيفة الوزن والمخصصة للأجهزة المحمولة التي زرتموها انتجت باستخدام تقنية غوغل للـ AMP.',
                heading2: 'جمع المعلومات ضروري جدا ولابد منه',
                para3:
                  'لأجل ضمان عمل صفحاتنا بشكل سلس ومقبول، نقوم بخزن بعض المعلومات المحدودة على أجهزتكم دون الحصول على موافقتكم.',
                para4: {
                  text: 'إقرأوا المزيد عن المعلومات الضرورية والحيوية التي نقوم بخزنها على أجهزتكم من أجل ضمان عمل صفحاتنا بشكل جيد.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
                },
                para5: 'نقوم بخزن أفضلياتكم التي صرحتم بها في أجهزتكم.',
                heading3: 'شروط اختيارية لجمع المعلومات',
                para6:
                  'في حال موافقتكم على جمع معلوماتكم من خلال صفحات AMP، فإنكم توافقون على إظهار إعلانات موجهة بشكل شخصي لها علاقة باهتماماتكم عندما تتصفحون هذه الصفحات خارج بريطانيا.',
                para7: {
                  text: 'أقرأوا المزيد عن كيفية تخصيص الاعلانات من قبل بي بي سي وشركائها في مجال الإعلان.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'بإمكانكم اختيار تجنب استلام الإعلانات الشخصية عن طريق النقر على خيار "أرفض جمع المعلومات واستمر" أدناه.\nيرجى ملاحظة أنكم ستستمرون في مشاهدة الإعلانات، ولكنها لن تكون اعلانات موجهة لكم بشكل مخصص.',
                para9:
                  'يمكنكم تغيير هذه الإعدادات في أي وقت عن طريق النقر على "خيارات الإعلانات/ لا تبيعوا معلوماتي" الموجود في أسفل الصفحة.',
              },
            },
          },
          canonical: {
            title: 'أخبرنا عما إذا كنت توافق على تحميل الكوكيز',
            description: {
              uk: {
                first: 'نستخدم ',
                linkText: 'ملفات ارتباط',
                last: ' لمنحك أفضل خدمة رقمية. الرجاء أحطنا علما إذا كنت توافق على تحميل كل هذه الملفات cookies .',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'نستخدم ',
                linkText: 'ملفات ارتباط',
                last: ' لمنحك أفضل خدمة رقمية. الرجاء أحطنا علما إذا كنت توافق على تحميل كل هذه الملفات cookies .',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'نعم، موافق',
            reject: 'كلا، أعدني إلى الإعدادات',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'جهازك لا يدعم تشغيل الفيديو',
        contentExpired: 'هذا المحتوى لم يعد متوفراً',
        contentNotYetAvailable: 'هذا البرنامج غير متوفر للتشغيل الآن',
        audio: 'تسجيل صوتي',
        photogallery: 'ملف صور',
        video: 'فيديو',
        bbc_arabic_radio: {
          title: 'إذاعة بي بي سي العربية',
          subtitle:
            'خدمة إخبارية على مدار الساعة و برامج حوارية وتفاعلية تناقش قضايا المنطقة والعالم وباقة من البرامج المنوعة من إذاعة بي بي سي',
        },
        listen: 'استمع',
        watch: 'شاهد',
        listenLive: 'استمع للبث المباشر',
        listenNext: 'واصل الاستماع',
        liveLabel: 'مباشر',
        nextLabel: 'لاحق',
        previousRadioShow: 'البرنامج الإذاعي السابق',
        nextRadioShow: 'البرنامج الإذاعي اللاحق',
        duration: 'المدة',
        recentEpisodes: 'البرامج السابقة',
        podcastExternalLinks: 'هذا البودكاست متاح عبر',
        download: 'تحميل الحلقة',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'التعليق على الفيديو، ',
          text: 'تحذير: المحتوى من طرف ثالث قد يتضمن إعلانات',
          articleText: 'تحذير: بي بي سي غير مسؤولة عن محتوى المواقع الخارجية',
          articleAdditionalText:
            'المحتوى في موقع %provider_name% قد يتضمن إعلانات',
        },
        fallback: {
          text: 'المحتوى غير متاح',
          linkText: '%provider_name% اطلع على المزيد في',
          linkTextSuffixVisuallyHidden: '، خارجي',
          warningText: 'بي بي سي ليست مسؤولة عن محتوى المواقع الخارجية.',
        },
        skipLink: {
          text: 'أهمل %provider_name% مشاركة',
          endTextVisuallyHidden: 'نهاية %provider_name% مشاركة',
        },
        consentBanner: {
          heading: 'هل تسمح بعرض المحتوى من [social_media_site]؟',
          body: `تحتوي هذه الصفحة على محتوى من موقع [social_media_site]. موافقتكم مطلوبة قبل عرض أي مواد لأنها قد تتضمن ملفات ارتباط (كوكيز) وغيرها من الأدوات التقنية. قد تفضلون الاطلاع على [link] سياسة ملفات الارتباط [/link] الخاصة بموقع [social_media_site] [link] وسياسة الخصوصية [/link] قبل الموافقة. لعرض المحتوى، اختر "موافقة وإكمال"`,
        },
      },
      include: {
        errorMessage:
          'للأسف ليس بمقدورنا إظهار هذا الجزء من القصة على هذه الصفحة الخفيفة من الموبايل ',
        linkText: 'انظر في السخة الكاملة لترى المحتوى بأكمله',
      },
      topStoriesTitle: 'الأخبار الرئيسية',
      featuresAnalysisTitle: 'اخترنا لكم',
      ugc: {
        // No JavaScript
        noJsHeading: undefined,
        noJsDescription: undefined,

        // Optional
        optional: 'اختياري',

        // File upload
        fileUploadLiveRegionText: undefined,
        fileUploadLiveRegionUpdateText: undefined,
        fileUploadListHeading: 'هذا ما تحمّله:',
        fileUploadButton: 'اختر ملفا',
        fileUploadRemoveButton: undefined,

        // Submit button
        submitButton: 'إرسال',

        // Validation
        validationRequired: 'رجاء املأ هذه الخانة الإلزامية.',
        validationInvalidEmail:
          'هذا لا يبدو صحيحا. يرجى إدخال بريد إلكتروني صحيح.',
        validationInvalidTelephone: undefined,
        validationFilesTooMany:
          'لقد أضفت ملفات أكثر من المسموح. الحد الأقصى لعدد الملفات {{maxFiles}}.',
        validationFilesNotEnough:
          'لا توجد ملفات كافية. يرجى إضافة {{minFiles}} على الأقل.',
        validationFilesSizeExceeded:
          'عذرا، حجم هذه الملفات أكبر من المسموح. يمكنك تحميل ملفات يصل حجمها إلى 1.2 غيغابايت في المرة الواحدة.',
        validationFilesTooSmall: 'هذا الملف لا يصلح. جرب ملفا آخر.',
        validationFilesInvalidType:
          'عذرا، لا يمكننا استقبال هذا النوع من الملفات. يرجى إضافة ملفات من الأنواع التالية {{fileTypes}}.',
        submissionInfoSignedOutMessage:
          'ربما تود الاحتفاظ بنسخة من تلك البيانات للرجوع إليها وقت الحاجة.',
        validationWordLimit: 'الحد الأقصى للكلمات {{wordLimit}}',

        // Messaging
        retentionPeriodDays: undefined,
        removalGuidelineText: undefined,
        referenceNumber: 'رقم المرجع',
        emailToHtml:
          'إذا غيرت رأيك راسلنا عبر {{emailLink}}. فقط اذكر رقم المرجع وأوضح أنك لا تريد أن نستخدمه.',
        privacyInfoHtml:
          'لا تقلق، نحن نحافظ على بياناتك — لمزيد من التفاصيل اقرأ {{privacyInfoLink}}.',

        // Form Screen
        dataPolicyHeading: undefined,

        // Uploading Screen
        uploadingHeading: 'جاري تحميل الملفات...',
        uploadingDescription: 'يرجى الانتظار حتى اكتمال الإرسال.',

        // Success Screen
        successHeading: 'لقد تم الإرسال',
        successDescription: 'شكرا لاتصالك.',
        privacyPolicyLinkHref: undefined,
        privacyPolicyLinkText: undefined,

        // Error Screen
        errorHeading: 'تعذر تحميل ملفاتك ',
        errorDescription: 'جرب التحميل مرة أخرى.',

        // Closed Screen
        closedHeading: 'أغلق باب المشاركة',
        closedDescription: 'أغلق باب المشاركة يوم {{date}}.',
      },
    },
    mostRead: {
      header: 'الأكثر قراءة',
      lastUpdated: 'آخر تحديث',
      numberOfItems: 10,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: true,
      frequenciesPageUrl: '/arabic/tv-and-radio-57895092',
      frequenciesPageLabel: 'استقبال البث',
      header: 'البث الإذاعي',
      durationLabel: 'المدة %duration%',
    },
    recommendations: {
      hasStoryRecommendations: true,
      skipLink: {
        text: 'تخطى %title% وواصل القراءة',
        endTextVisuallyHidden: '%title% نهاية',
      },
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/arabic/institutional-49283069',
        text: 'لماذا يمكنك الاعتماد على أخبار بي بي سي',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
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
          text: 'ملفات الارتباط Cookies',
        },
        {
          href: 'https://www.bbc.co.uk/arabic/send/u50853203',
          text: 'اتصل بـ بي بي سي',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'بي بي سي. بي بي سي ليست مسؤولة عن محتوى المواقع الخارجية.',
    },
    timezone: 'GMT',
    navigation: [
      {
        title: 'رئيسية',
        url: '/arabic',
      },
      {
        title: 'أخبار',
        url: '/arabic/topics/cv2xyrnr8dnt',
      },
      {
        title: 'اقتصاد',
        url: '/arabic/topics/cqywj97d487t',
      },
      {
        title: 'صحة وعلوم',
        url: '/arabic/topics/clmj3d7282gt',
      },
      {
        title: 'رياضة',
        url: '/arabic/topics/cyx5kw7g1j2t',
      },
      {
        title: 'فيديو',
        url: '/arabic/topics/cz9mm6r1q5et',
      },
      {
        title: 'تحقيقات',
        url: '/arabic/topics/c51nnzdeg9zt',
      },
      {
        title: 'بودكاست',
        url: '/arabic/topics/cljddp5lw0dt',
      },
      {
        title: 'برامجنا',
        url: '/arabic/topics/crgyknwdlwnt',
      },
    ],
  },
};

export default withContext(service);
