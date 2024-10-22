import latinWithDiacritics from '../../../components/ThemeProvider/fontScripts/latinWithDiacritics';
import cyrillic from '../../../components/ThemeProvider/fontScripts/cyrillic';
import '#psammead/moment-timezone-include/tz/GMT';
import '#psammead/psammead-locales/moment/uz';
import withContext from '../../../contexts/utils/withContext';
import { UzbekConfig } from '../../../models/types/serviceConfig';
import { Direction, Services } from '../../../models/types/global';

const baseServiceConfig = {
  articleAuthor: `https://www.facebook.com/bbcnews`,
  atiAnalyticsAppName: 'news-uzbek',
  atiAnalyticsProducerId: '96',
  chartbeatDomain: 'uzbek.bbc.co.uk',
  product: 'BBC News',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/uzbek.png',
  dir: `ltr` as Direction,
  service: 'uzbek' as Services,
  languageName: 'Uzbek',
  twitterCreator: '@bbcuzbek',
  twitterSite: '@bbcuzbek',
  isTrustProjectParticipant: true,
  manifestPath: '/manifest.json',
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
  frontPageTitle: 'Бош саҳифа',
  lang: `uz-Cyrl`,
  locale: `uz-UZ`,
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
    relatedContent: 'Бу мавзуда батафсилроқ',
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
        rejectUrl: 'https://www.bbc.com/usingthebbc/your-data-matters',
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
      url: '/uzbek/topics/c8y949r98pgt',
    },
    {
      title: 'Минтақа',
      url: '/uzbek/topics/cwr9j9dz4gpt',
    },
    {
      title: 'Дунё',
      url: '/uzbek/topics/cl8l9mved19t',
    },
    {
      title: 'Спорт',
      url: '/uzbek/topics/cxnykykk1zkt',
    },
    {
      title: 'Илм-Фан',
      url: '/uzbek/topics/cg7262681krt',
    },
    {
      title: 'Технология',
      url: '/uzbek/topics/cjgn7n7v3yjt',
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
    articleTimestampPrefix: 'Янгиланди',
    articleTimestampSuffix: '',
    brandName: "BBC News O'zbek",
    datetimeLocale: `uz`,
    externalLinkText: ', ташқи',
    frontPageTitle: 'Бош саҳифа',
    lang: `uz-Cyrl`,
    locale: `uz-UZ`,
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
      relatedContent: 'Бу мавзуда батафсилроқ',
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
          rejectUrl: 'https://www.bbc.com/usingthebbc/your-data-matters',
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
        url: '/uzbek/topics/c8y949r98pgt',
      },
      {
        title: 'Минтақа',
        url: '/uzbek/topics/cwr9j9dz4gpt',
      },
      {
        title: 'Дунё',
        url: '/uzbek/topics/cl8l9mved19t',
      },
      {
        title: 'Спорт',
        url: '/uzbek/topics/cxnykykk1zkt',
      },
      {
        title: 'Илм-Фан',
        url: '/uzbek/topics/cg7262681krt',
      },
      {
        title: 'Технология',
        url: '/uzbek/topics/cjgn7n7v3yjt',
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
