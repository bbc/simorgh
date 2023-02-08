import withContext from '../../utils/withContext';
import { Translations } from '../../../models/types/translations';
import { mainTranslations as russianMainTranslations } from './russian';

const secondaryColumnTranslations = {
  topStoriesTitle: 'Головне',
  featuresAnalysisTitle: 'Докладно',
};

const baseTranslations = {
  pagination: {
    previousPage: 'Повернутися',
    nextPage: 'Наступна',
    pageXOfY: 'Page {x} із {y}',
  },
  ads: {
    advertisementLabel: 'Реклама',
  },
  seeAll: 'Подивитись все',
  home: 'Головна',
  currentPage: 'Поточна сторінка',
  skipLinkText: 'Перейти до змісту',
  navMenuText: 'Розділи',
  mediaAssetPage: {
    mediaPlayer: 'Медіаплеєр',
    audioPlayer: 'Аудіоплеєр',
    videoPlayer: 'Відеоплеєр',
  },
  gist: 'Стисло',
  error: {
    404: {
      statusCode: '404',
      title: 'Сторінку не знайдено',
      message: 'Вибачте, ми не знайшли сторінку, яку ви шукали. Спробуйте це:',
      solutions: [
        'Перевірте ще раз адресу посилання',
        'Натисніть на кнопку "оновити" в браузері',
        'Шукати сторінку в пошуковому вікні BBC',
      ],
      callToActionFirst: 'Спробуйте зайти на головну сторінку ',
      callToActionLinkText: 'BBC News Україна',
      callToActionLast: '',
      callToActionLinkUrl: 'https://www.bbc.com/ukrainian',
    },
    500: {
      statusCode: '500',
      title: 'Помилка серверу',
      message:
        'Вибачте, ми не змогли знайти сторінку, яку ви шукали. Спробуйте:',
      solutions: [
        'Натиснути кнопку "оновити" у вашому браузері',
        'Спробуйте пізніше',
      ],
      callToActionFirst: 'Спробуйте зайти на головну сторінку ',
      callToActionLinkText: 'Повернутися на головну',
      callToActionLast: '',
      callToActionLinkUrl: 'https://www.bbc.com/ukrainian',
    },
  },
  consentBanner: {
    privacy: {
      title:
        'Ми оновили наші правила використання особистих даних і файлів cookies',
      description: {
        uk: {
          first:
            'Ми змінили правила використання особистих даних і файлів cookies та хотіли б повідомити вам, що це означає для вас і ваших особистих даних.',
          linkText: null,
          last: null,
          linkUrl: null,
        },
        international: {
          first:
            'Ми змінили правила використання особистих даних і файлів cookies та хотіли б повідомити вам, що це означає для вас і ваших особистих даних.',
          linkText: null,
          last: null,
          linkUrl: null,
        },
      },
      accept: 'ОК',
      reject: 'Подивитися, що змінилося',
      rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
    },
    cookie: {
      amp: {
        accept: 'Погодитися на збір даних та продовжити.',
        reject: 'Відмовитися від збору даних та продовжити',
        initial: {
          title: 'Повідомте, що ви погоджуєтесь на збір даних на AMP',
          description: {
            first:
              'Ми разом з нашими партнерами використовуємо технології, такі як ',
            linkText: 'cookies',
            last: ', а також збираємо дані, щоб вам було зручно користуватися сайтом і щоб контент і реклама, яку ви бачите, відповідали вашим запитам. Будь ласка, повідомте, чи ви згодні.',
            linkUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
          manage: 'Керувати налаштуваннями',
        },
        manage: {
          title: 'Керувати налаштуваннями щодо згоди на АМР-сторінках',
          description: {
            para1:
              'Ці налаштування стосуються лише сторінок AMP. Вас можуть попросити зазначити свої уподобання ще раз, якщо ви відвідуватимете інші сторінки bbc.com, які не є AMP-сторінками.',
            para2:
              'Мобільна сторінка, яку ви відвідували, створена за технологією Google AMP.',
            heading2: "Обов'язковий збір даних",
            para3:
              'Щоб забезпечити роботу наших сторінок, ми зберігаємо обмежену інформацію на вашому пристрої без вашої згоди.',
            para4: {
              text: 'Тут можна почитати докладніше про необхідну інформацію, яку ми зберігаємо на вашому пристрої, щоб забезпечити роботу наших вебсторінок.',
              url: 'https://www.bbc.co.uk/usingthebbc/strictly-necessary-cookies/',
            },
            para5:
              "Ми використовуємо локальну пам'ять, щоб зберігати ваші уподобання щодо згоди на вашому пристрої.",
            heading3: "Необов'язковий збір інформації",
            para6:
              'Коли ви даєте згоду на збір даних на сторінках AMP, ви погоджуєтеся дозволити показувати вам персоналізовану рекламу, актуальну для вас, коли ви перебуваєте за межами Великої Британії.',
            para7: {
              text: 'Докладніше про те, як ми персоналізуємо рекламу на BBC та у наших рекламних партнерів можна прочитати тут.',
              url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
            },
            para8:
              'Ви можете не отримувати персоналізовану рекламу, натиснувши "Відмовитися від збору даних та продовжити" нижче. Зверніть увагу, що реклама все одно буде показуватися, але вона не буде персоналізованою для вас.',
            para9:
              'Ви можете змінити ці налаштування, натиснувши кнопку "Вибір реклами/Не продавати мою інформацію" в нижній частині сторінки у будь-який час.',
          },
        },
      },
      canonical: {
        title: 'Повідомити, що ви погоджуєтесь з використанням файлів cookies',
        description: {
          uk: {
            first: 'Ми використовуємо ',
            linkText: 'cookies',
            last: ', щоб вам було зручно користуватися сайтом. Повідомте нам, що ви погоджуєтесь з використанням цих файлів cookies.',
            linkUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
          international: {
            first: 'Ми використовуємо ',
            linkText: 'cookies',
            last: ', щоб вам було зручно користуватися сайтом. Повідомте нам, що ви погоджуєтесь з використанням цих файлів cookies.',
            linkUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
        },
        accept: 'Так, згоден',
        reject: 'Ні, мені потрібно переглянути налаштування',
        rejectUrl:
          'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
      },
    },
  },
  media: {
    noJs: 'Ваш пристрій не підтримує відтворення мультимедійних файлів',
    contentExpired: 'Контент більше не доступний',
    contentNotYetAvailable: 'Ця програма ще не доступна.',
    audio: 'Аудіо',
    photogallery: 'Фотогалерея',
    video: 'Відео',
    bbc_ukrainian_tv: {
      title: 'Випуск новин',
      subtitle:
        'BBC News Україна розповідає про головні події дня на Громадському і на сайті bbc.ua',
    },
    listen: 'Прослухати',
    watch: 'Дивитися',
    listenLive: 'Слухати наживо',
    listenNext: 'Слухати наступний',
    liveLabel: 'LIVE',
    nextLabel: 'NEXT',
    previousRadioShow: 'Попередня радіопрограма',
    nextRadioShow: 'Наступна радіопрограма',
    duration: 'Тривалість',
    recentEpisodes: 'Більше',
    podcastExternalLinks: 'Цей подкаст доступний у',
  },
  socialEmbed: {
    caption: {
      textPrefixVisuallyHidden: 'Підпис до відео, ',
      text: 'Увага: інші сайти можуть містити рекламу',
      articleText:
        'Увага: BBC не несе відповідальності за контент зовнішніх сайтів.',
      articleAdditionalText: 'Контент %provider_name% може містити рекламу',
    },
    fallback: {
      text: 'Контент недоступний',
      linkText: 'Дивіться більше у %provider_name%',
      linkTextSuffixVisuallyHidden: ', зовнішнє посилання',
      warningText: 'BBC не несе відповідальності за контент інших сайтів.',
    },
    skipLink: {
      text: 'Пропустити %provider_name% допис',
      endTextVisuallyHidden: 'Кінець %provider_name% допису',
    },
    consentBanner: {
      heading: `Дозволити контент [social_media_site]?`,
      body: `Ця стаття містить контент, наданий [social_media_site]. Ми питаємо про ваш дозвіл перед завантаженням, тому що сайт може використовувати файли cookie та інші технології. Ви можете ознайомитися з політикою щодо файлів [link] cookie [social_media_site] [/link] i [link] політикою конфіденційності [/link], перш ніж надати дозвіл. Щоб переглянути цей контент, виберіть "Прийняти та продовжити".`,
      button: 'Прийняти та продовжити',
    },
  },
  include: {
    errorMessage:
      'Вибачте, ми не можемо відобразити цю частину сторінки у мобільній версії.',
    linkText: 'Перегляньте повну версію сторінки, щоб побачити увесь контент.',
  },
  relatedContent: 'Статті на цю ж тему',
  relatedTopics: 'Також на цю тему',
  ...secondaryColumnTranslations,
};

const ukrainian: Translations = {
  default: { ...baseTranslations },
  'ru-UA': {
    ...baseTranslations,
    ...russianMainTranslations,
    ...secondaryColumnTranslations,
    relatedTopics: 'Темы',
  },
};

export default withContext(ukrainian);
