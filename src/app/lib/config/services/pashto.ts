import arabic from '../../../components/ThemeProvider/fontScripts/arabic';
import '#psammead/psammead-locales/moment/ps';
import '#psammead/moment-timezone-include/tz/GMT';
import jalaali from '../../../legacy/psammead/psammead-calendars/src';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: 'ps',
    product: 'BBC News',
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'تازه',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-pashto',
    atiAnalyticsProducerId: '68',
    atiAnalyticsProducerName: 'PASHTO',
    useReverb: true,
    brandName: 'BBC News پښتو',
    chartbeatDomain: 'pashto.bbc.co.uk',
    serviceLocalizedName: 'پښتو',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/pashto.png',
    defaultImageAltText: 'BBC News پښتو',
    dir: 'rtl',
    externalLinkText: '، بهرنی',
    imageCaptionOffscreenText: 'د عکس تشریح، ',
    videoCaptionOffscreenText: 'د ویډیو تشریح، ',
    audioCaptionOffscreenText: 'د غږ تشریح، ',
    defaultCaptionOffscreenText: 'تشریح، ',
    imageCopyrightOffscreenText: 'د عکس سرچینه، ',
    locale: 'ps',
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'ps',
    datetimeLocale: 'ps',
    service: 'pashto',
    serviceName: 'Pashto',
    languageName: 'Pashto',
    altCalendar: jalaali,
    twitterCreator: '@bbcpashto',
    twitterSite: '@bbcpashto',
    noBylinesPolicy:
      'https://www.bbc.com/pashto/institutional-49283007#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/pashto/institutional-49283007',
    isTrustProjectParticipant: true,
    script: arabic,
    manifestPath: '/pashto/manifest.json',
    swPath: '/sw.js',
    homePageTitle: 'کور پاڼه',
    showAdPlaceholder: true,
    showRelatedTopics: true,
    translations: {
      pagination: {
        page: 'پاڼه',
        previousPage: 'مخکينۍ پاڼه',
        nextPage: 'بله پاڼه',
        pageXOfY: 'پاڼه {x} د {y}',
      },
      ads: {
        advertisementLabel: 'اعلان',
      },
      seeAll: 'ټول وګورئ',
      home: 'کور پاڼه',
      currentPage: 'اوسنۍ پاڼه',
      skipLinkText: 'مطلب ته ورشئ',
      relatedContent: 'ورته مطالب',
      relatedTopics: 'اړونده مطالب',
      navMenuText: 'برخې',
      mediaAssetPage: {
        mediaPlayer: 'میډیا پلیئر',
        audioPlayer: 'اډیو پلیئر',
        videoPlayer: 'ویډیو پلیئر',
      },
      liveExperiencePage: {
        liveLabel: 'ژوندی',
        liveCoverage: 'ژوندی پوښښ',
        breaking: 'وروستی',
        postedAt: 'د خپرېدو نیټه',
        summary: 'لنډیز',
        shareButtonText: 'شریک یې کړئ',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'لنډیز',
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
          callToActionLinkText: 'BBC News پښتو پاڼې',
          callToActionLast: ' ته ورشئ',
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
      byline: {
        articleInformation: 'د مطلب په اړه جزییات',
        listItemImage: 'د توکو نوملړ، انځور',
        published: 'د خپرېدو وخت',
        reportingFrom: 'رپوټ له:',
        role: 'دنده',
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
          rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
        },
        cookie: {
          amp: {
            accept:
              'تاسې د انټرنټ کارېدنې په اړه د مالوماتو ټولېدو سره هوکړه وکړئ او مخکې لاړ شئ',
            reject:
              'ستاسې د انټرنټ کارېدنې په اړه د مالوماتو ټولېدل رد کړئ‌ او مخکې لاړ شئ',
            initial: {
              title:
                'راته ووایاست چې ایا پر موبایل پاڼو د مالوماتو له راټولولو سره موافق یاست که نه.',
              description: {
                first: 'زموږ ملګري د ',
                linkText: 'کوکیز',
                last: ' په څېر تکنالوژي کاروي او د براوزر ډېټا راټولوي. دا هر څه ستاسې د اسانۍ لپآره کېږي. که ورسره موافق یاست نو راته ولیکئ',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'خپل سېټنګز مدیریت کړئ',
            },
            manage: {
              title: 'پر موبایلي پاڼو د اجازې اخیستنې برخه تنظیم کړئ',
              description: {
                para1:
                  'دا سېټنګز یوازې د موبایلي پاڼو لپاره دي. که چېرې د بي بي سي پاڼې له موبایل پرته بل ځای ګورئ نو ښایي‌ هلته درنه دا پوښتنې بیا وشي.‌',
                para2:
                  'دا پاڼه چې تاسې ولیده، د ګوګل موبایلي پاڼو تکنالوژۍ په کارولو سره جوړه شوې',
                heading2: 'د مالوماتو اړینه راټولېدنه',
                para3:
                  'د دې لپاره چې زموږ پاڼه سم کار وکړي، موږ محدود مالومات ستاسې له اجازې پرته ستاسې پر موبایل خوندي کوو',
                para4: {
                  text: 'دلته لوستلی شئ چې موږ کوم محدود مالومات ستاسې له اجازې پرته ستاسې پر موبایل خوندي کوو',
                  url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
                },
                para5:
                  'ستاسې د اجازې په اړه مالومات موږ ستاسې پر موبایل خوندي کوو',
                heading3: 'د مالوماتو غیر لازمي راټولېدنه',
                para6:
                  'کله چې تاسې د مالوماتو ټولونې اجازه راکوئ، ورسره دا هم منئ چې کله له بریتانیا بهر زموږ پاڼه ګورئ نو موږ به اړوند اعلانونه درته ښکاره کوو',
                para7: {
                  text: 'دلته ولولئ چې موږ بي بي سي کې او زموږ شریکان څه ډول تاسې ته اړوند اعلانونه ښکاره کوي.‌',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'که نه غواړئ چې اړوند اعلانونه درته وښودل شي نو لاندې برخه کې د مالوماتو راټولېدو اجازه مه ورکوئ. خو پام مو وي چې اعلانونه به بیا هم در ښودل کېږي،‌ البته اړوند یا ستاسې په خوښه به نه وي.‌',
                para9:
                  'هر وخت کولی شئ چې دا سېټنګز بدل کړئ. د دې چارې لپاره لاندې برخه کې Ad Choices / Do not sell my info” باندې کلېک وکړئ',
              },
            },
          },
          canonical: {
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
                first: 'موږ ستاسې د اسانۍ لپاره ',
                linkText: 'کوکیز',
                last: ' کاروو. راته ووایاست چې ایا ډېټا در لېږلی شو',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'هو، موافق یم',
            reject: 'نه، غواړم سېټنګز ته ولاړ شم',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'په دې وسیله کې د غږ اوريدل او ویډیو لیدنه شونې نه ده.',
        contentExpired: 'دغه فایل نور د لاسرسي وړ نه دی.',
        contentNotYetAvailable: 'دغه پروګرام د خپرولو لپاره چمتو نه دی.',
        audio: 'غږ',
        photogallery: 'دعکسونو ګالري',
        video: 'ویډیو',
        recentEpisodes: 'پخواني پروګرامونه',
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
        listen: 'واورئ',
        watch: 'و یې ګورئ',
        listenLive: 'ژوندۍ خپرونه واورئ',
        listenNext: 'راتلونکې برخه واورئ ',
        liveLabel: 'ژوندۍ پاڼه',
        nextLabel: 'بل',
        previousRadioShow: 'تېره راډیویي‌ خپرونه',
        nextRadioShow: 'راتلونکې راډیویي خپرونه',
        duration: 'موده',
        closeVideo: 'وتل',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'د ویډیو تشریح، ',
          text: 'خبرداری:‌ ښايي درېیمګړي ته اړوند منځپانګه کې اعلانونه وي',
          articleText:
            'خبرداری: بي بي سي د بهرنیو وېبپاڼو د منځپانګې مسؤله نه ده',
          articleAdditionalText:
            'په %provider_name%  کې منځپانګه ښايي خبرتیاوې ولري.',
        },
        fallback: {
          text: 'منځپانګه نه شته',
          linkText: 'په %provider_name% کې نور وګورئ',
          linkTextSuffixVisuallyHidden: '، بهرنی',
          warningText:
            ' بي بي سي. بي بي‌ سي‌ د نورو ویبپاڼو د محتوا مسوله نه ده.',
        },
        skipLink: {
          text: 'دې %provider_name% پوسټ نه تېرشئ',
          endTextVisuallyHidden: 'د ‍پوسټ %provider_name% پای',
        },
        consentBanner: {
          heading: `ایا له [social_media_site] نه د منځپانګې اجازه شته؟`,
          body: `دې لیکنه کې له social media راخیستل شوي مواد شته.‌ له ښودلو وړاندې یې ستاسې اجازه پکار ده، ځکه ښایي‌کوکیز یا بله تکنالوژي پکې کارول شوې وي. کولی شئ له اجازې مخکې د social media site  پالیسي ولولئ. د دې لپاره غوښتنه ومنئ او مخکې لاړ شئ`,
        },
      },
      include: {
        errorMessage:
          'وبښئ، په لایټ وېټ موبایل صفحې موږ د کیسې دا برخه نه شو ښودلی.',
        linkText: 'د پاڼې بشپړه بڼه وښایاست چې ټوله منځپانګه یې ولیدله شي.',
      },
      topStoriesTitle: 'مهم خبرونه',
      featuresAnalysisTitle: 'ځانګړي مطالب',
    },
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
      durationLabel: '%duration% موده',
    },
    recommendations: {
      hasStoryRecommendations: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/pashto/institutional-49283007',
        text: 'ولې تاسې پر بي بي سي خبرونو باور کولی شئ',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
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
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.co.uk/pashto/send/u50853533',
          text: 'زموږ سره اړیکي',
        },
        {
          href: 'https://www.bbc.com/ws/languages',
          text: 'نورې ژبې',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText: 'بي بي سي. بي بي‌ سي‌ د نورو ویبپاڼو د محتوا مسوله نه ده.',
    },
    timezone: 'GMT',
    navigation: [
      {
        title: 'کور پاڼه',
        url: '/pashto',
      },
      {
        title: 'افغانستان',
        url: '/pashto/topics/cr50y57xj52t',
      },
      {
        title: 'پښتونخوا',
        url: '/pashto/topics/cz74k7wy49jt',
      },
      {
        title: 'نړۍ',
        url: '/pashto/topics/cxe2wdp2dv3t',
      },
      {
        title: 'ښځې',
        url: '/pashto/topics/cr50y5rq23gt',
      },
      {
        title: 'لوبې',
        url: '/pashto/topics/cr50y59q860t',
      },
      {
        title: 'اقتصاد او سوداګري',
        url: '/pashto/topics/cy087kqvl1yt',
      },
      {
        title: 'ساینس او ټکنالوژي',
        url: '/pashto/topics/ckgrvled11kt',
      },
      {
        title: 'هنر او ادب',
        url: '/pashto/topics/c8xqkd91knnt',
      },
      {
        title: 'راډیویي خپرونې',
        url: '/pashto/topics/c9xz1ekw79nt',
      },
    ],
  },
};

export default withContext(service);
