import cyrillic from '../../../components/ThemeProvider/fontScripts/latin';
import '#psammead/moment-timezone-include/tz/GMT';
import '#psammead/psammead-locales/moment/ru';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

// Translations used in the header and footer elements of the page
const headerFooterTranslations = {
  home: 'Главная',
  currentPage: 'Текущая страница',
  navMenuText: 'Разделы',
  consentBanner: {
    privacy: {
      title: 'Мы обновили наши правила использования личных данных и куки.',
      description: {
        uk: {
          first:
            'Мы внесли важные изменения в наши правила использования личных данных и cookies и хотели бы сообщить вам, что это значит для вас и ваших личных данных.',
          linkText: null,
          last: null,
          linkUrl: null,
        },
        international: {
          first:
            'Мы внесли важные изменения в наши правила использования личных данных и cookies и хотели бы сообщить вам, что это значит для вас и ваших личных данных.',
          linkText: null,
          last: null,
          linkUrl: null,
        },
      },
      accept: 'ОК',
      reject: 'Посмотреть, что изменилось',
      rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
    },
    cookie: {
      amp: {
        accept: 'Принять сбор данных и продолжить',
        reject: 'Отказать в сборе данных и продолжить',
        initial: {
          title: 'Сообщите нам, согласны ли вы на сбор данных на AMP-страницах',
          description: {
            first:
              'Мы вместе с нашими партнерами используем технологии, такие как ',
            linkText: 'cookies',
            last: ', а также собираем данные, чтобы вам было удобно пользоваться сайтом и чтобы содержание и реклама, которую вы видите, соответствовали вашим запросам. Пожалуйста, сообщите, согласны ли вы.',
            linkUrl:
              'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
          manage: 'Изменить мои установки',
        },
        manage: {
          title: 'Изменить установки на AMP-страницах',
          description: {
            para1:
              'Эти установки относятся только к AMP-страницам. Вам нужно будет выставить эти преференции опять, если вы посетите страницы BBC, которые не поддерживают AMP.',
            para2:
              'Облегченная мобильная страница создана с использованием AMP-технологии от Google.',
            heading2: 'Сбор самых необходимых данных',
            para3:
              'Для того чтобы наши веб-страницы работали, мы храним ограниченную информацию о вашем девайсе без вашего согласия.',
            para4: {
              text: 'Прочесть подробнее о базовой информации, которую мы храним на вашем устройстве, чтобы на нем отображались наши веб-страницы (на англ. языке).',
              url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
            },
            para5:
              'Мы используем местные серверы для хранения согласованных вами преференций для вашего девайса.',
            heading3: 'Сбор необязательной информации',
            para6:
              'Когда вы даете согласие на сбор данных на AMP-странице, вы соглашаетесь на то, чтобы мы показывали вам рекламу, специально подобранную для вас, когда вы находитесь за пределами Великобритании.',
            para7: {
              text: 'Прочесть подробнее о том, как BBC и его рекламные партнеры подбирают реламу для вас.',
              url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
            },
            para8:
              'Вы можете отказаться от персонифицированной рекламы, кликнув на "Отказаться от сбора данных и продолжить" внизу. Пожалуйста, помните, что вы все равно будете получать рекламу, но она не будет подобрана под вас.',
            para9:
              'Вы можете изменить эти установки, кликнув на "Ad Choices / Do not sell my info"  в самом низу страницы, в любое время.',
          },
        },
      },
      canonical: {
        title: 'Сообщить, что вы согласны с использованием cookies',
        description: {
          uk: {
            first: 'Мы используем ',
            linkText: 'cookies',
            last: ', чтобы вам было удобно пользоваться сайтом. Сообщите нам, что вы согласны с использованием этих cookies.',
            linkUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
          international: {
            first: 'Мы используем ',
            linkText: 'cookies',
            last: ', чтобы вам было удобно пользоваться сайтом. Сообщите нам, что вы согласны с использованием этих cookies.',
            linkUrl:
              'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
        },
        accept: 'Да',
        reject: 'Нет, мне надо посмотреть настройки',
        rejectUrl:
          'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
      },
    },
  },
};

// Translations used in the main element of the page
export const mainTranslations = {
  pagination: {
    previousPage: 'НАЗАД',
    nextPage: 'ВПЕРЕД',
    pageXOfY: 'Page {x} из {y}',
  },
  ads: {
    advertisementLabel: 'Реклама',
  },
  recommendationTitle: 'По теме',
  splitRecommendationTitle: 'Другие статьи',
  seeAll: 'Посмотреть все',
  skipLinkText: 'Перейти к содержанию',
  relatedContent: 'Читайте также',
  relatedTopics: 'Темы',
  mediaAssetPage: {
    mediaPlayer: 'Медиа плеер',
    audioPlayer: 'Аудио плеер',
    videoPlayer: 'Видео плеер',
  },
  liveExperiencePage: {
    liveLabel: 'Онлайн',
    liveCoverage: 'Онлайн-трансляция',
    breaking: 'Срочно',
    postedAt: 'Отправлено в',
    summary: 'Коротко',
    shareButtonText: 'Поделиться',
  },
  downloads: {
    instructions: 'You can download and view today’s news.',
    title: 'File Download',
  },
  gist: 'Коротко',
  error: {
    404: {
      statusCode: '404',
      title: 'Страница не найдена',
      message:
        'Извините, мы не нашли страницу, которую вы искали. Попробуйте это:',
      solutions: [
        'Проверьте еще раз адрес ссылки',
        'Нажмите на кнопку "обновить" в браузере',
        'Искать страницу в поисковом окне Би-би-си',
      ],
      callToActionFirst: 'Попробуйте зайти на ',
      callToActionLinkText: 'главную страницу Русской службы',
      callToActionLast: '',
      callToActionLinkUrl: 'https://www.bbc.com/russian',
    },
    500: {
      statusCode: '500',
      title: 'Ошибка сервера',
      message:
        'Извините, мы не смогли найти страницу, которую вы искали. Попробуйте:',
      solutions: [
        'Нажать кнопку "обновить" в вашем браузере',
        'Попытайтесь позже',
      ],
      callToActionFirst: 'Попробуйте зайти на ',
      callToActionLinkText: 'главную страницу Русской службы',
      callToActionLast: '',
      callToActionLinkUrl: 'https://www.bbc.com/russian',
    },
  },
  byline: {
    articleInformation: 'О статье',
    author: 'Автор',
    listItemImage: 'Добавить фото',
    published: 'Опубликовано',
    reportingFrom: 'Место сообщения',
    role: 'Место работы',
  },
  media: {
    noJs: 'Для просмотра этого контента вам надо включить JavaScript или использовать другой браузер',
    contentExpired: 'Контент больше не доступен.',
    contentNotYetAvailable: 'Эта передача еще не доступна для воспроизведения.',
    audio: 'Аудио',
    photogallery: 'Фотогалерея',
    video: 'Видео',
    bbc_russian_radio: {
      title: 'Русская служба Би-би-си',
      subtitle:
        'мировые новости с местным колоритом. Как видятся события в России и регионе из-за рубежа.',
    },
    bbc_russian_tv: {
      title: 'Выпуск новостей Русской службы Би-би-си',
      subtitle:
        'Смотрите лучшие репортажи Би-би-си из России и со всего мира. Каждый день - с понедельника по пятницу – в выпуске теленовостей Би-би-си наши корреспонденты помогут вам понять, что происходит и почему это важно для вас.',
    },
    listen: 'Слушать',
    watch: 'Смотреть',
    listenLive: 'Слушать LIVE',
    listenNext: 'Вперед',
    liveLabel: 'LIVE',
    nextLabel: 'Дальше',
    previousRadioShow: 'Предыдущая передача',
    nextRadioShow: 'Следующая передача',
    duration: 'Продолжительность',
    recentEpisodes: 'Прошлые передачи',
    episodes: 'передачи',
    podcastExternalLinks: 'Этот подкаст доступен на',
    download: 'Загрузить эпизод',
    closeVideo: 'Выйти',
  },
  socialEmbed: {
    caption: {
      textPrefixVisuallyHidden: 'Подпись к видео, ',
      text: 'Внимание: Контент других сайтов может содержать рекламу.',
      articleText:
        'Внимание: Би-би-си не несет ответственности за контент других сайтов.',
      articleAdditionalText: 'Контент %provider_name% может содержать рекламу.',
    },
    fallback: {
      text: 'Контент недоступен',
      linkText: 'Смотреть еще в %provider_name%',
      linkTextSuffixVisuallyHidden: ', внешняя ссылка',
      warningText:
        'Би-би-си не несёт ответственности за содержание других сайтов.',
    },
    skipLink: {
      text: 'Пропустить контент из %provider_name%',
      endTextVisuallyHidden: 'Контент из %provider_name% окончен',
    },
    consentBanner: {
      heading: `Разрешить контент [social_media_site]?`,
      body: `Этот материал содержит контент, предоставленный [social_media_site].  Мы просим вашего разрешения до загрузки, потому что он может использовать кукис и другие технологии. Вы можете ознакомиться с [link] правилами кукис [/link] и [link] политикой личных данных [/link] [social_media_site], прежде чем дать согласие. Чтобы увидеть этот контент, выберите “Согласиться и продолжить”.`,
      button: 'Согласиться и продолжить',
    },
  },
  include: {
    errorMessage:
      'К сожалению, мы не можем показать вам эту часть истории из-за малого объема мобильной страницы.',
    linkText: 'Откройте полную версию страницы, чтобы увидеть весь контент.',
  },
  topStoriesTitle: 'Главное',
  featuresAnalysisTitle: 'Не пропустите',
  latestMediaTitle: 'Актуальное',
  infoBannerLabel: 'Информация',
  ugc: {
    // No JavaScript
    noJsHeading: undefined,
    noJsDescription: undefined,

    // Optional
    optional: 'Дополнительное поле',

    // File upload
    fileUploadLiveRegionText: undefined,
    fileUploadLiveRegionUpdateText: undefined,
    fileUploadListHeading: 'Вы загружаете:',
    fileUploadButton: 'Выбрать файл',
    fileUploadRemoveButton: undefined,

    // Submit button
    submitButton: 'Отправить',

    // Validation
    validationRequired: 'Чего-то не хватает.',
    validationInvalidEmail: 'Что-то не так. Пожалуйста, впишите верный адрес.',
    validationInvalidTelephone: undefined,
    validationFilesNotEnough:
      'Файлов недостаточно. Минимальное число файлов: {{minFiles}}.',
    validationFilesTooMany:
      'Слишком много файлов. Максимальное число файлов: {{maxFiles}}.',
    validationFilesInvalidType:
      'Извините, мы не можем использовать файлы такого типа. Выберите из списка {{fileTypes}}.',
    validationFilesTooSmall: 'Файл сломан. Выберите другой файл.',
    validationFilesSizeExceeded:
      'Извините, но ваши файлы слишком большие. Файлы не должны превышать 1,2 гигабайта.',
    validationWordLimit: 'Максимум {{wordLimit}} слов',

    // Messaging
    retentionPeriodDays: undefined,
    referenceNumber: 'Запишите этот номер',
    submissionInfoSignedOutMessage: 'Запишите эти детали для вашего сведения.',
    privacyInfoHtml: undefined,
    emailToHtml:
      'Если вы передумали и не хотите, чтобы мы это использовали, просто отправьте нам сообщение на {{emailLink}}. Не забудьте регистрационный номер отправления.',
    removalGuidelineText:
      'Если вы прислали что-то для передачи или онлайн-страницы, мы не сможем удалить ваш материал после того, как он был использован.',

    // Form Screen
    dataPolicyHeading: undefined,

    // Uploading Screen
    uploadingHeading: 'Файлы загружаются...',
    uploadingDescription: 'Пожалуйста, подождите.',

    // Success Screen
    successHeading: 'Письмо отправлено',
    successDescription: 'Спасибо за контакт!',
    privacyPolicyLinkHref: undefined,
    privacyPolicyLinkText: undefined,

    // Error Screen
    errorHeading: 'Ваше сообщение не отправлено',
    errorDescription: 'Попробуйте отправить еще раз',

    // Closed Screen
    closedHeading: 'Прием закрыт',
    closedDescription: 'Прием закрылся {{date}}.',
  },
};

export const service: DefaultServiceConfig = {
  default: {
    translations: { ...mainTranslations, ...headerFooterTranslations },
    lang: `ru`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'Обновлено',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-russian',
    atiAnalyticsProducerId: '75',
    atiAnalyticsProducerName: 'RUSSIAN',
    useReverb: true,
    chartbeatDomain: 'russian.bbc.co.uk',
    brandName: 'BBC News Русская служба',
    product: 'BBC News',
    serviceLocalizedName: 'Русская служба',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/russian.png',
    defaultImageAltText: 'BBC News Русская служба',
    dir: `ltr`,
    externalLinkText: ', внешняя',
    imageCaptionOffscreenText: 'Подпись к фото, ',
    videoCaptionOffscreenText: 'Подпись к видео, ',
    audioCaptionOffscreenText: 'Подпись к аудио, ',
    defaultCaptionOffscreenText: 'Подпись, ',
    imageCopyrightOffscreenText: 'Автор фото, ',
    locale: `ru-RU`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'ru',
    datetimeLocale: `ru`,
    service: 'russian',
    serviceName: 'Russian',
    languageName: 'Russian',
    twitterCreator: '@bbcrussian',
    twitterSite: '@bbcrussian',
    noBylinesPolicy:
      'https://www.bbc.com/russian/institutional-50098149#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/russian/institutional-50098149',
    isTrustProjectParticipant: true,
    script: cyrillic,
    manifestPath: '/russian/manifest.json',
    swPath: '/sw.js',
    homePageTitle: 'Главная',
    iTunesAppId: 504278066,
    showAdPlaceholder: true,
    showRelatedTopics: true,
    googleSiteVerification: 'D-aEHUiyVaMoUJXjVRbDVkxS0dLTMUZLD3dLPTnWO4Q',
    mostRead: {
      header: 'Самое популярное',
      lastUpdated: 'Последнее обновление:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    podcastPromo: {
      title: 'WhatsApp',
      brandTitle: 'Канал Би-би-си в WhatsApp',
      brandDescription:
        'Тут мы публикуем только главные новости и самые интересные тексты. Канал доступен для нероссийских номеров.',
      image: {
        src: 'https://ichef.bbci.co.uk/images/ic/$recipe/p0jq48n8.png',
        alt: 'WhatsApp',
      },
      linkLabel: {
        text: 'Подписывайтесь',
        href: 'https://whatsapp.com/channel/0029VaZ437k4Y9li4jkzIU0G',
      },
      skipLink: {
        text: 'Пропустить Реклама WhatsApp-канала и продолжить чтение.',
        endTextVisuallyHidden: 'Конец истории Реклама WhatsApp-канала',
      },
    },
    disclaimer: {
      para1: {
        text: 'Подпишитесь на нашу рассылку «Контекст»:',
        url: 'https://www.bbc.com/russian/resources/idt-b34bb7dd-f094-4722-92eb-cf7aff8cc1bc',
        isExternal: false,
      },
      para2: ' она поможет вам разобраться в событиях.',
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    recommendations: {
      hasStoryRecommendations: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/russian/institutional-50098149',
        text: 'Почему BBC News заслуживает доверия',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'Познакомьтесь с нашими правилами внешних ссылок.',
      },
      links: [
        {
          href: 'https://www.bbc.com/russian/institutional-36515745',
          text: 'Правила использования',
        },
        {
          href: 'https://www.bbc.com/russian/institutional-36515748',
          text: 'О Би-би-си',
        },
        {
          href: 'https://www.bbc.com/russian/institutional-36517234',
          text: 'Личные данные',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Куки',
        },
        {
          href: 'https://www.bbc.co.uk/russian/send/u50853643',
          text: 'Связаться с Би-би-си',
        },
        {
          href: 'https://www.bbc.com/ws/languages',
          text: 'Би-би-си на других языках',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. Би-би-си не несет ответственности за содержание других сайтов.',
    },
    timezone: 'GMT',
    navigation: [
      {
        title: 'Главная',
        url: '/russian',
      },
      {
        title: 'Война в Украине',
        url: '/russian/topics/cez0n29ggrdt',
      },
      {
        title: 'Сводка потерь',
        url: '/russian/topics/cqx9qqylwvgt',
      },
      {
        title: 'Истории',
        url: '/russian/topics/cv27xky1pppt',
      },
      {
        title: 'Видео',
        url: '/russian/topics/c44vyp57qy4t',
      },
      {
        title: 'Фильмы',
        url: '/russian/topics/cl4x0jkk3e5t',
      },
      {
        title: 'Подкасты',
        url: '/russian/topics/c3l19z3z0p2t',
      },
    ],
  },
};

export default withContext(service);
