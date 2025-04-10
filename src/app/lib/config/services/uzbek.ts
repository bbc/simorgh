import latinWithDiacritics from '../../../components/ThemeProvider/fontScripts/latinWithDiacritics';
import cyrillic from '../../../components/ThemeProvider/fontScripts/cyrillic';
import '#psammead/moment-timezone-include/tz/GMT';
import '#psammead/psammead-locales/moment/uz';
import '#psammead/psammead-locales/moment/uz-latn';
import withContext from '../../../contexts/utils/withContext';
import { UzbekConfig } from '../../../models/types/serviceConfig';
import { Direction, Services } from '../../../models/types/global';

const baseServiceConfig = {
  articleAuthor: `https://www.facebook.com/bbcnews`,
  atiAnalyticsAppName: 'news-uzbek',
  atiAnalyticsProducerId: '96',
  atiAnalyticsProducerName: 'UZBEK',
  useReverb: true,
  chartbeatDomain: 'uzbek.bbc.co.uk',
  product: 'BBC News',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/uzbek.png',
  dir: `ltr` as Direction,
  service: 'uzbek' as Services,
  languageName: 'Uzbek',
  twitterCreator: '@bbcuzbek',
  twitterSite: '@bbcuzbek',
  isTrustProjectParticipant: true,
  manifestPath: '/uzbek/manifest.json',
  swPath: '/sw.js',
  radioSchedule: {
    hasRadioSchedule: false,
  },
  recommendations: {
    hasStoryRecommendations: false,
  },
  showAdPlaceholder: true,
  showRelatedTopics: true,
  timezone: 'GMT',
};

const defaultCyrillicConfig = {
  ...baseServiceConfig,

  script: cyrillic,
  articleTimestampPrefix: 'Янгиланди',
  articleTimestampSuffix: '',
  brandName: "BBC News O'zbek",
  datetimeLocale: `uz`,
  externalLinkText: ', ташқи',
  homePageTitle: 'Бош саҳифа',
  lang: 'uz-cyrl',
  locale: 'uz-UZ',
  // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
  isoLang: 'uz',
  noBylinesPolicy:
    'https://www.bbc.com/uzbek/institutional-50220995#authorexpertise',
  publishingPrinciples: 'https://www.bbc.com/uzbek/institutional-50220995',
  serviceLocalizedName: "O'zbek",
  serviceName: 'Uzbek',
  defaultImageAltText: "BBC News O'zbek",
  defaultCaptionOffscreenText: 'Тагсўз, ',
  audioCaptionOffscreenText: 'Аудио тагсўзи, ',
  videoCaptionOffscreenText: 'Видео тагсўзи, ',
  imageCaptionOffscreenText: 'Сурат тагсўзи, ',
  imageCopyrightOffscreenText: 'Сурат манбаси, ',
  translations: {
    pagination: {
      previousPage: 'Олдингиси',
      nextPage: 'Кейингиси',
      pageXOfY: 'саҳифа {x} ...нинг {y}',
      page: 'саҳифа',
    },
    ads: {
      advertisementLabel: 'Реклама',
    },
    seeAll: 'Ҳаммасини кўринг',
    home: 'Бош саҳифа',
    currentPage: 'Жорий саҳифа',
    skipLinkText: 'Саҳифага ўтиш',
    relatedContent: 'Мавзуга алоқадор',
    relatedTopics: 'Алоқадор мавзулар',
    navMenuText: 'Бўлимлар',
    mediaAssetPage: {
      mediaPlayer: 'Медиа плейер',
      audioPlayer: 'Аудио плейер',
      videoPlayer: 'Видео плейер',
    },
    liveExperiencePage: {
      liveLabel: 'Жонли',
      liveCoverage: 'Жонли ёритиш',
      breaking: 'Шошилинч',
      postedAt: '...да чоп этилган',
      summary: 'Қисқача',
      shareButtonText: 'Баҳам кўринг',
    },
    downloads: {
      instructions: 'You can download and view today’s news.',
      title: 'File Download',
    },
    gist: 'Хулоса',
    error: {
      404: {
        statusCode: '404',
        title: 'Саҳифа топилмади',
        message:
          'Узр, сизни қидираётган саҳифангизга олиб боролмаяпмиз. Марҳамат қилиб мана бу йўлларини кўринг:',
        solutions: [
          'url манзилини яна бир бор текшириб кўринг',
          'Браузерингиздаги "янгилаш" тугмасини босинг',
          'Ушбу саҳифани Би-би-сининг қидирув панелидан излаб кўринг',
        ],
        callToActionFirst: 'Бунга муқобил ',
        callToActionLinkText: "BBC News O'zbek",
        callToActionLast: 'бош саҳифасига киринг',
        callToActionLinkUrl: 'https://www.bbc.com/uzbek',
      },
      500: {
        statusCode: '500',
        title: 'Ички сервердаги хатолик',
        message:
          'Узр, ҳозирги пайтда сизни қидираётган саҳифангизга олиб боролмаяпмиз. Марҳамат қилиб мана бу йўлларини кўринг:',
        solutions: [
          'Браузерингиздаги "янгилаш" тугмасини босинг',
          'Яна бироз фурсатдан кейин ҳаракат қилиб кўринг',
        ],
        callToActionFirst: 'Бунга муқобил ',
        callToActionLinkText: "BBC News O'zbek",
        callToActionLast: 'бош саҳифасига киринг',
        callToActionLinkUrl: 'https://www.bbc.com/uzbek',
      },
    },
    consentBanner: {
      privacy: {
        title:
          'Биз шахсий ҳаёт махфийлиги ва Куки(Cookies)га оид сиёсатимизни янгиладик',
        description: {
          uk: {
            first:
              'Биз шахсий ҳаёт махфийлиги ва Куки(Cookie)га оид сиёсатимизга айрим муҳим ўзгаришларни киритдик. Ва бу нарса сиз ва сизнинг маълумотингиз учун нимани англатиши ҳақида сизни бохабар этиш истагидамиз.',
            linkText: null,
            last: null,
            linkUrl: null,
          },
          international: {
            first:
              'Биз шахсий ҳаёт махфийлиги ва Куки(Cookie)га оид сиёсатимизга айрим муҳим ўзгаришларни киритдик. Ва бу нарса сиз ва сизнинг маълумотингиз учун нимани англатиши ҳақида сизни бохабар этиш истагидамиз.',
            linkText: null,
            last: null,
            linkUrl: null,
          },
        },
        accept: 'Маъқул',
        reject: 'Нималар ўзгарди?',
        rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
      },
      cookie: {
        amp: {
          accept: 'Дата тўплаш учун рухсат беринг ва давом этинг',
          reject: 'Дата тўплашни рад этинг ва давом этинг',
          initial: {
            title: 'AMP учун дата йиғишга рухсат берасизми?',
            description: {
              first: 'Биз ва бизнинг ҳамкорларимиз ',
              linkText: 'кукисга',
              last: ', сингари технологиядан фойдаланамиз ва уларни сизга янада яхшироқ онлайн маҳсулот тақдим этиш, контентни ва ҳамда сизга кўрсатилаётган рекламани айнан сизга мослаш мақсадида тўплаймиз. Агар рози бўлсангиз, марҳамат қилиб буни бизга маълум қилинг!',
              linkUrl:
                'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            manage: 'Танловларимни бошқаринг',
          },
          manage: {
            title: 'AMP саҳифаларида розилик танловларини ўзгартириш',
            description: {
              para1:
                'Бу танловлар фақат AMP саҳифалари учун. AMP бўлмаган бошқа BBC саҳифиларига кирсангиз, сиз бу танловларни қайта ўрнатишингиз керак бўлади.',
              para2:
                'Енгил очиладиган бу саҳифа Google AMP технологияси билан яратилган',
              heading2: 'Шарт бўлган дата тўплаш',
              para3:
                'Веб саҳифамиз ишлаши учун биз сиз ҳақингизда чекланган маълумотларни сизнинг розилигингиз сақлаб қоламиз.',
              para4: {
                text: 'Сизнинг қурилмангизда веб саҳифамиз яхши ишлаши учун қандай муҳим маълумотлар сақланиши ҳақида кўпроқ маълумот',
                url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
              },
              para5:
                'Биз сизнинг розилигингиз ва танловингиз маълумотларини ички хотирада сақлаймиз',
              heading3: 'Қўшимча, мажбурий бўлмаган дата тўплаш',
              para6:
                'Сиз AMP саҳифаларда дата тўплашга рози ва айни дамда Буюк Британия ташқарисида бўлсангиз биз рекламаларни сизга қанчалар алоқаси бор ёки йўқлигига қараб танлаб, тақдим қиламиз.',
              para7: {
                text: 'BBC ва реклама ҳамкорларимиз рекламаларни шахсийлаштиришга доир кўпроқ маълумот',
                url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
              },
              para8:
                'Сизга мосланган рекламаларни қабул қилишни истамасангиз, марҳамат қилиб пастдаги "Дата тўплашни рад қилинг ва давом этинг" деган танловни босинг. Унутманг, сиз барибир рекламани кўрасиз, аммо у сиз учун мослаштирилмаган бўлади.',
              para9:
                'Сиз бу шартларни "Реклама танловлари/менинг маълумотларимни сотманг" деган бўлимда исталган вақтда ўзгартиришингиз мумкин.',
            },
          },
        },
        canonical: {
          title: 'Кукис(Cookies)га рози эканингизни билдиринг',
          description: {
            uk: {
              first: 'Биз ',
              linkText: 'кукидан',
              last: ' сизга янада яхшироқ онлайн имконият бериш мақсадида фойдаланамиз. Марҳамат қилиб ушбу барча кукиларга розилигингизни билдиринг.',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            international: {
              first: 'Биз ',
              linkText: 'кукидан',
              last: ' сизга янада яхшироқ онлайн имконият бериш мақсадида фойдаланамиз. Марҳамат қилиб ушбу барча кукиларга розилигингизни билдиринг.',
              linkUrl:
                'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
          },
          accept: 'Ҳа, мен розиман',
          reject: 'Йўқ, мени ўзгартириш саҳифасига етакланг',
          rejectUrl:
            'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
        },
      },
    },
    media: {
      noJs: 'Мултимедиа ўйнаш бу қурилмада дастакланмайди',
      contentExpired: 'Бу контентни ортиқ тинглаб/томоша қилиб бўлмайди.',
      contentNotYetAvailable:
        'Бу контент ҳали тинглаш/томоша қилишга тайёр эмас.',
      audio: 'Аудио',
      photogallery: 'Фото галерея',
      video: 'Видео',
      bbc_uzbek_radio: {
        title: 'BBC Uzbek Radio Dasturi',
        subtitle: 'O’zbekiston, mintaqa va dunyo yangiliklari O’zbek tilida',
      },
      bbc_uzbek_tv: {
        title: 'Bi-bi-si O‘zbek - Afg‘oniston uchun TV dastur',
        subtitle:
          'Dastur haftada 5 kun - dushanbadan juma kuniga qadar Toshkent vaqti bilan soat 18.30 -18.40 da efirga uzatiladi',
      },
      listen: 'Тингланг',
      watch: 'Кўринг',
      listenLive: 'Жонли эфирда тингланг',
      liveLabel: 'ЖОНЛИ ЭФИР',
      nextLabel: 'NEXT',
      previousRadioShow: 'Аввалги радио дастур',
      nextRadioShow: 'Кейинги радио дастур',
      duration: 'Давомийлиги',
      recentEpisodes: 'Олдинги дастурлар',
      closeVideo: 'Чиқиш',
    },
    socialEmbed: {
      caption: {
        textPrefixVisuallyHidden: 'Видео тагсўзи, ',
        text: 'Огоҳлантириш:Учинчи манба материалида реклама бўлиши мумкин',
        articleText:
          'Огоҳлантириш: Би-би-си ташқи саҳифалардаги контент учун масъул эмас',
        articleAdditionalText:
          '%provider_name% бу контентда реклама бўлиши мумкин',
      },
      fallback: {
        text: 'Бу материалга кириш имконсиз',
        linkText: 'Кўпроқ кўринг %provider_name%',
        linkTextSuffixVisuallyHidden: ', ташқи',
        warningText: 'Би-би-си ташқи сайтлар мазмуни учун масъул эмас.',
      },
      skipLink: {
        text: 'Ўтказиб юборинг %provider_name% пост ',
        endTextVisuallyHidden: 'Охири %provider_name% пост',
      },
      consentBanner: {
        heading: `[social_media_site] контентига рухсат бериш`,
        body: `Айни мақолада [social_media_site] томонидан тақдим қилинган контент мавжуд. Биз бу контент юкланмасидан аввал сизнинг розилигингизни сўраймиз, чунки улар куки ва бошқа технологиялардан фойдаланган бўлиши мумкин. Сиз   [social_media_site] [link] ҳаволасида кукиларга доир  [/link] ва шахсий маълумотларга  оид қоидалар ҳақида аввал ўқиб,  кейин қабул қилишга рози бўлишингиз  мумкин. Кўриш учун “қабул қилиш ва давом этиш”ни танланг.`,
        button: 'Қабул қилинг ва давом этинг',
      },
    },
    include: {
      errorMessage:
        'Sorry, we can’t display this part of the story on this lightweight mobile page.',
      linkText: 'View the full version of the page to see all the content.',
    },
    topStoriesTitle: 'Бош мақола',
    featuresAnalysisTitle: 'Муҳаррир танлови',
    latestMediaTitle: 'Сўнгги',
  },
  mostRead: {
    header: 'Энг кўп ўқилган',
    lastUpdated: 'Сўнгги янгиланиш:',
    numberOfItems: 5,
    hasMostRead: true,
  },
  footer: {
    trustProjectLink: {
      href: 'https://www.bbc.com/uzbek/institutional-50220995',
      text: 'Нега сиз Би-би-сига ишонишингиз мумкин?',
    },
    externalLink: {
      href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
      text: 'Ташқи линкларга бизнинг ёндашувимиз қандайлиги ҳақида маълумотга эга бўлинг',
    },
    links: [
      {
        href: 'https://www.bbc.com/uzbek/institutional-36824297',
        text: 'Фойдаланиш шартлари',
      },
      {
        href: 'https://www.bbc.com/uzbek/institutional-36824300',
        text: 'Шахсий ҳаёт махфийлиги сиёсати',
      },
      {
        href: 'https://www.bbc.com/usingthebbc/cookies/',
        text: 'Куки(Cookies)',
      },
      {
        href: 'https://www.bbc.co.uk/uzbek/send/u50853929',
        text: "'Bi-bi-si bilan bog’laning'",
      },
      {
        href: 'https://www.bbc.com/ws/languages',
        text: 'BBC News бошқа тилларда',
      },
      {
        id: 'COOKIE_SETTINGS',
        href: '#',
        text: 'Do not share or sell my info',
        lang: 'en-GB',
      },
    ],
    copyrightText: 'BBC. Би-би-си ташқи сайтлар мазмуни учун масъул эмас.',
  },
  navigation: [
    {
      title: 'Бош саҳифа',
      url: '/uzbek',
    },
    {
      title: 'Ўзбекистон',
      url: '/uzbek/topics/c8y949r98pgt/cyr',
    },
    {
      title: 'Минтақа',
      url: '/uzbek/topics/cwr9j9dz4gpt/cyr',
    },
    {
      title: 'Дунё',
      url: '/uzbek/topics/cl8l9mved19t/cyr',
    },
    {
      title: 'Спорт',
      url: '/uzbek/topics/cxnykykk1zkt/cyr',
    },
    {
      title: 'Илм-Фан',
      url: '/uzbek/topics/cg7262681krt/cyr',
    },
    {
      title: 'Технология',
      url: '/uzbek/topics/cjgn7n7v3yjt/cyr',
    },
    {
      title: 'BBC News O‘zbek TV dasturi',
      url: '/uzbek/bbc_uzbek_tv/tv_programmes/w13xttqv?limit=4',
    },
  ],
};

export const service: UzbekConfig = {
  default: defaultCyrillicConfig,
  cyr: {
    ...defaultCyrillicConfig,
    scriptLink: {
      text: 'O‘zb',
      variant: 'lat',
    },
  },
  lat: {
    ...baseServiceConfig,
    script: latinWithDiacritics,
    articleTimestampPrefix: 'Yangilandi',
    articleTimestampSuffix: '',
    brandName: "BBC News O'zbek",
    datetimeLocale: `uz-latn`,
    externalLinkText: ', tashqi',
    homePageTitle: 'Bosh sahifa',
    lang: 'uz-latn',
    locale: 'uz-UZ',
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'uz',
    noBylinesPolicy:
      'https://www.bbc.com/uzbek/institutional-50220995#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/uzbek/institutional-50220995',
    serviceLocalizedName: "O'zbek",
    serviceName: 'Uzbek',
    defaultImageAltText: "BBC News O'zbek",
    defaultCaptionOffscreenText: 'Tagso‘z, ',
    audioCaptionOffscreenText: 'Audio tagso‘zi, ',
    videoCaptionOffscreenText: 'Video tagso‘zi, ',
    imageCaptionOffscreenText: 'Surat tagso‘zi, ',
    imageCopyrightOffscreenText: 'Surat manbasi, ',
    translations: {
      pagination: {
        previousPage: 'Oldingisi',
        nextPage: 'Keyingisi',
        pageXOfY: 'sahifa {x} ...ning {y}',
        page: 'sahifa',
      },
      ads: {
        advertisementLabel: 'Reklama',
      },
      seeAll: 'Hammasini ko‘ring',
      home: 'Bosh sahifa',
      currentPage: 'Joriy sahifa',
      skipLinkText: 'Sahifaga o‘tish',
      relatedContent: 'Mavzuga aloqador',
      relatedTopics: 'Aloqador mavzular',
      navMenuText: 'Bo‘limlar',
      mediaAssetPage: {
        mediaPlayer: 'Media pleyer',
        audioPlayer: 'Audio pleyer',
        videoPlayer: 'Video pleyer',
      },
      liveExperiencePage: {
        liveLabel: 'Jonli',
        liveCoverage: 'Jonli yoritish',
        breaking: 'Shoshilinch',
        postedAt: '...da chop etilgan',
        summary: 'Qisqacha',
        shareButtonText: 'Baham ko‘rinг',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'Xulosa',
      error: {
        404: {
          statusCode: '404',
          title: 'Sahifa topilmadi',
          message:
            'Uzr, sizni qidirayotgan sahifangizga olib borolmayapmiz. Marhamat qilib mana bu yo‘llarini ko‘ring:',
          solutions: [
            'url manzilini yana bir bor tekshirib ko‘ring',
            'Brauzeringizdagi "yangilash" tugmasini bosing',
            'Ushbu sahifani Bi-bi-sining qidiruv panelidan izlab ko‘ring',
          ],
          callToActionFirst: 'Bunga muqobil ',
          callToActionLinkText: "BBC News O'zbek",
          callToActionLast: 'bosh sahifasiga kiring',
          callToActionLinkUrl: 'https://www.bbc.com/uzbek',
        },
        500: {
          statusCode: '500',
          title: 'Ichki serverdagi xatolik',
          message:
            'Uzr, hozirgi paytda sizni qidirayotgan sahifangizga olib borolmayapmiz. Marhamat qilib mana bu yo‘llarini ko‘ring:',
          solutions: [
            'Brauzeringizdagi "yangilash" tugmasini bosing',
            'Yana biroz fursatdan keyin harakat qilib ko‘ring',
          ],
          callToActionFirst: 'Bunga muqobil ',
          callToActionLinkText: "BBC News O'zbek",
          callToActionLast: 'bosh sahifasiga kiring',
          callToActionLinkUrl: 'https://www.bbc.com/uzbek',
        },
      },
      consentBanner: {
        privacy: {
          title:
            'Biz shaxsiy hayot maxfiyligi va Kuki(Cookies)ga oid siyosatimizni yangiladik',
          description: {
            uk: {
              first:
                'Biz shaxsiy hayot maxfiyligi va Kuki(Cookie)ga oid siyosatimizga ayrim muhim o‘zgarishlarni kiritdik. Va bu narsa siz va sizning ma’lumotingiz uchun nimani anglatishi haqida sizni boxabar etish istagidamiz.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'Biz shaxsiy hayot maxfiyligi va Kuki(Cookie)ga oid siyosatimizga ayrim muhim o‘zgarishlarni kiritdik. Va bu narsa siz va sizning ma’lumotingiz uchun nimani anglatishi haqida sizni boxabar etish istagidamiz.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'Ma’qul',
          reject: 'Nimalar o‘zgardi?',
          rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
        },
        cookie: {
          amp: {
            accept: 'Data to‘plash uchun ruxsat bering va davom eting',
            reject: 'Data to‘plashni rad eting va davom eting',
            initial: {
              title: 'AMP uchun data yig‘ishga ruxsat berasizmi?',
              description: {
                first: 'Biz va bizning hamkorlarimiz ',
                linkText: 'kukisga',
                last: ', singari texnologiyadan foydalanamiz va ularni sizga yanada yaxshiroq onlayn mahsulot taqdim etish, kontentni va hamda sizga ko‘rsatilayotgan reklamani aynan sizga moslash maqsadida to‘playmiz. Agar rozi bo‘lsangiz, marhamat qilib buni bizga ma’lum qiling!',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'Tanlovlarimni boshqaring',
            },
            manage: {
              title: 'AMP sahifalarida rozilik tanlovlarini o‘zgartirish',
              description: {
                para1:
                  'Bu tanlovlar faqat AMP sahifalari uchun. AMP bo‘lmagan boshqa BBC sahifilariga kirsangiz, siz bu tanlovlarni qayta o‘rnatishingiz kerak bo‘ladi.',
                para2:
                  'Engil ochiladigan bu sahifa Google AMP texnologiyasi bilan yaratilgan',
                heading2: 'Shart bo‘lgan data to‘plash',
                para3:
                  'Veb sahifamiz ishlashi uchun biz siz haqingizda cheklangan ma’lumotlarni sizning roziligingiz saqlab qolamiz.',
                para4: {
                  text: 'Sizning qurilmangizda veb sahifamiz yaxshi ishlashi uchun qanday muhim ma’lumotlar saqlanishi haqida ko‘proq ma’lumot',
                  url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
                },
                para5:
                  'Biz sizning roziligingiz va tanlovingiz ma’lumotlarini ichki xotirada saqlaymiz',
                heading3: 'Qo‘shimcha, majburiy bo‘lmagan data to‘plash',
                para6:
                  'Siz AMP sahifalarda data to‘plashga rozi va ayni damda Buyuk Britaniya tashqarisida bo‘lsangiz biz reklamalarni sizga qanchalar aloqasi bor yoki yo‘qligiga qarab tanlab, taqdim qilamiz.',
                para7: {
                  text: 'BBC va reklama hamkorlarimiz reklamalarni shaxsiylashtirishga doir ko‘proq ma’lumot',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'Sizga moslangan reklamalarni qabul qilishni istamasangiz, marhamat qilib pastdagi "Data to‘plashni rad qiling va davom eting" degan tanlovni bosing. Unutmang, siz baribir reklamani ko‘rasiz, ammo u siz uchun moslashtirilmagan bo‘ladi.',
                para9:
                  'Siz bu shartlarni "Reklama tanlovlari/mening ma’lumotlarimni sotmang" degan bo‘limda istalgan vaqtda o‘zgartirishingiz mumkin.',
              },
            },
          },
          canonical: {
            title: 'Kukis(Cookies)ga rozi ekaningizni bildiring',
            description: {
              uk: {
                first: 'Biz ',
                linkText: 'kukidan',
                last: ' sizga yanada yaxshiroq onlayn imkoniyat berish maqsadida foydalanamiz. Marhamat qilib ushbu barcha kukilarga roziligingizni bildiring.',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'Biz ',
                linkText: 'kukidan',
                last: ' sizga yanada yaxshiroq onlayn imkoniyat berish maqsadida foydalanamiz. Marhamat qilib ushbu barcha kukilarga roziligingizni bildiring.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'Ҳа, мен розиман',
            reject: 'Yo‘q, meni o‘zgartirish sahifasiga etaklang',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'Multimedia o‘ynash bu qurilmada dastaklanmaydi',
        contentExpired: 'Bu kontentni ortiq tinglab/tomosha qilib bo‘lmaydi.',
        contentNotYetAvailable:
          'Bu kontent hali tinglash/tomosha qilishga tayyor emas.',
        audio: 'Audio',
        photogallery: 'Foto galereya',
        video: 'Video',
        bbc_uzbek_radio: {
          title: 'BBC Uzbek Radio Dasturi',
          subtitle: 'O’zbekiston, mintaqa va dunyo yangiliklari O’zbek tilida',
        },
        bbc_uzbek_tv: {
          title: 'Bi-bi-si O‘zbek - Afg‘oniston uchun TV dastur',
          subtitle:
            'Dastur haftada 5 kun - dushanbadan juma kuniga qadar Toshkent vaqti bilan soat 18.30 -18.40 da efirga uzatiladi',
        },
        listen: 'Tinglang',
        watch: 'Ko‘ring',
        listenLive: 'Jonli efirda tinglang',
        liveLabel: 'JONLI EFIR',
        nextLabel: 'NEXT',
        previousRadioShow: 'Avvalgi radio dastur',
        nextRadioShow: 'Keyingi radio dastur',
        duration: 'Davomiyligi',
        recentEpisodes: 'Oldingi dasturlar',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'Video tagso‘zi, ',
          text: 'Ogohlantirish:Uchinchi manba materialida reklama bo‘lishi mumkin',
          articleText:
            'Ogohlantirish: Bi-bi-si tashqi sahifalardagi kontent uchun mas’ul emas',
          articleAdditionalText:
            '%provider_name% bu kontentda reklama bo‘lishi mumkin',
        },
        fallback: {
          text: 'Bu materialga kirish imkonsiz',
          linkText: 'Ko‘proq ko‘ring %provider_name%',
          linkTextSuffixVisuallyHidden: ', tashqi',
          warningText: 'Bi-bi-si tashqi saytlar mazmuni uchun mas’ul emas.',
        },
        skipLink: {
          text: 'O‘tkazib yuboring %provider_name% post ',
          endTextVisuallyHidden: 'Oxiri %provider_name% post',
        },
        consentBanner: {
          heading: `[social_media_site] контентига рухсат бериш`,
          body: `Ayni maqolada [social_media_site] tomonidan taqdim qilingan kontent mavjud. Biz bu kontent yuklanmasidan avval sizning roziligingizni so‘raymiz, chunki ular kuki va boshqa texnologiyalardan foydalangan bo‘lishi mumkin. Siz   [social_media_site] [link] havolasida kukilarga doir  [/link] va shaxsiy ma’lumotlarga  oid qoidalar haqida avval o‘qib,  keyin qabul qilishga rozi bo‘lishingiz  mumkin. Ko‘rish uchun “qabul qilish va davom etish”ni tanlang.`,
          button: 'Qabul qiling va davom eting',
        },
      },
      include: {
        errorMessage:
          'Sorry, we can’t display this part of the story on this lightweight mobile page.',
        linkText: 'View the full version of the page to see all the content.',
      },
      topStoriesTitle: 'Bosh maqola',
      featuresAnalysisTitle: 'Muharrir tanlovi',
      latestMediaTitle: 'So‘nggi',
    },
    mostRead: {
      header: 'Eng ko‘p o‘qilgan',
      lastUpdated: 'So‘nggi yangilanish:',
      numberOfItems: 5,
      hasMostRead: true,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/uzbek/institutional-50220995',
        text: 'Нега сиз Би-би-сига ишонишингиз мумкин?',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'Ташқи линкларга бизнинг ёндашувимиз қандайлиги ҳақида маълумотга эга бўлинг',
      },
      links: [
        {
          href: 'https://www.bbc.com/uzbek/institutional-36824297',
          text: 'Фойдаланиш шартлари',
        },
        {
          href: 'https://www.bbc.com/uzbek/institutional-36824300',
          text: 'Шахсий ҳаёт махфийлиги сиёсати',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Куки(Cookies)',
        },
        {
          href: 'https://www.bbc.co.uk/uzbek/send/u50853929',
          text: "'Bi-bi-si bilan bog’laning'",
        },
        {
          href: 'https://www.bbc.com/ws/languages',
          text: 'BBC News бошқа тилларда',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText: 'BBC. Bi-bi-si tashqi saytlar mazmuni uchun mas’ul emas.',
    },
    navigation: [
      {
        title: 'Bosh sahifa',
        url: '/uzbek',
      },
      {
        title: 'O‘zbekiston',
        url: '/uzbek/topics/c8y949r98pgt/lat',
      },
      {
        title: 'Mintaqa',
        url: '/uzbek/topics/cwr9j9dz4gpt/lat',
      },
      {
        title: 'Dunyo',
        url: '/uzbek/topics/cl8l9mved19t/lat',
      },
      {
        title: 'Sport',
        url: '/uzbek/topics/cxnykykk1zkt/lat',
      },
      {
        title: 'Ilm-Fan',
        url: '/uzbek/topics/cg7262681krt/lat',
      },
      {
        title: 'Texnologiya',
        url: '/uzbek/topics/cjgn7n7v3yjt/lat',
      },
      {
        title: 'BBC News O‘zbek TV dasturi',
        url: '/uzbek/bbc_uzbek_tv/tv_programmes/w13xttqv?limit=4',
      },
    ],
    scriptLink: {
      text: 'Ўзб',
      variant: 'cyr',
    },
  },
};

export default withContext(service);
