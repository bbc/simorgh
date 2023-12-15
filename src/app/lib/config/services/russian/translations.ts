// Translations used in the header and footer elements of the page
export const headerFooterTranslations = {
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
      rejectUrl: 'https://www.bbc.com/usingthebbc/your-data-matters',
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
    role: 'Должность',
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
  infoBannerLabel: 'Информация',
};
