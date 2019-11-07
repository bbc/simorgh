import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { cyrillicAndLatin } from '@bbc/gel-foundations/scripts';
import { ukrainian as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/GMT';
import '@bbc/psammead-locales/moment/uk';
import withContext from '../../../contexts/utils/withContext';

export const service = {
  default: {
    lang: `uk`,
    articleAuthor: `http://www.facebook.com/BBC.Ukrainian`,
    articleTimestampPrefix: 'Updated',
    atiAnalyticsAppName: 'news-ukrainian',
    atiAnalyticsProducerId: '94',
    brandName: 'BBC News Україна',
    product: 'BBC News',
    serviceLocalizedName: 'Україна',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/ukrainian.png',
    defaultImageAltText: 'BBC News Україна',
    dir: `ltr`,
    externalLinkText: ', external',
    imageCaptionOffscreenText: 'Image caption, ',
    videoCaptionOffscreenText: 'Video caption, ',
    audioCaptionOffscreenText: 'Audio caption',
    defaultCaptionOffscreenText: 'Caption, ',
    imageCopyrightOffscreenText: 'Image source, ',
    locale: `uk-UA`,
    datetimeLocale: `uk`,
    service: 'ukrainian',
    serviceName: 'Україна',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@BBC_ua',
    twitterSite: '@BBC_ua',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    isTrustProjectParticipant: true,
    script: cyrillicAndLatin,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Новини',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      seeAll: 'See all',
      home: 'Головна',
      currentPage: 'Current page',
      skipLinkText: 'Перейти до змісту',
      relatedContent: 'Related content',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      error: {
        404: {
          statusCode: '404',
          title: '404 - Сторінку не знайдено',
          message:
            'Можливо, ви ввели неправильну адресу. Будь ласка, перевірте адресу і написання.',
          solutions: [
            'Double checking the url',
            'Hitting the refresh button in your browser',
            'Searching for this page using the BBC search bar',
          ],
          callToActionFirst: 'Alternatively, please visit the ',
          callToActionLinkText: 'Повернутися на головну',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/ukrainian',
        },
        500: {
          statusCode: '500',
          title: '500 - Помилка',
          message: 'Сталася помилка. Будь ласка, перезавантажте сторінку.',
          solutions: [
            'Hitting the refresh button in your browser',
            'Coming back again later',
          ],
          callToActionFirst: 'Alternatively, please visit the ',
          callToActionLinkText: 'Повернутися на головну',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/ukrainian',
        },
      },
      consentBanner: {
        privacy: {
          title: "We've updated our Privacy and Cookies Policy",
          description: {
            uk: {
              first:
                "We've made some important changes to our Privacy and Cookies Policy and we want you to know what this means for you and your data.",
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                "We've made some important changes to our Privacy and Cookies Policy and we want you to know what this means for you and your data.",
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'OK',
          reject: "Find out what's changed",
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
        },
        cookie: {
          title: 'Let us know you agree to cookies',
          description: {
            uk: {
              first: 'We use ',
              linkText: 'cookies',
              last:
                ' to give you the best online experience. Please let us know if you agree to all of these cookies.',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            international: {
              first: 'We and our partners use technologies, such as ',
              linkText: 'cookies',
              last:
                ', and collect browsing data to give you the best online experience and to personalise the content and advertising shown to you. Please let us know if you agree.',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
          },
          accept: 'Yes, I agree',
          reject: 'No, take me to settings',
          rejectUrl:
            'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
        },
      },
      media: {
        audio: 'Аудіо',
        photogallery: 'Фотогалерея',
        video: 'Відео',
        bbc_ukrainian_tv: {
          title: 'Випуск новин',
          subtitle:
            'ВВС News Україна розповідає про головні події дня на Громадському і на сайті bbc.ua',
        },
      },
    },
    brandSVG,
    mostRead: {
      header: 'Most read',
      lastUpdated: 'Last updated: ',
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/news/help-41670342',
        text: 'Why you can trust the BBC',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text: 'Read about our approach to external linking.',
      },
      links: [
        {
          href: 'https://www.bbc.com/terms',
          text: 'Terms of Use',
        },
        {
          href: 'https://www.bbc.com/privacy/',
          text: 'Privacy Policy',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.com/contact/',
          text: 'Contact the BBC',
        },
      ],
      copyrightText:
        'ВВС. ВВС не несе відповідальність за зміст зовнішніх інтернет-сайтів',
    },
    fonts: [],
    timezone: 'GMT',
    navigation: [
      {
        title: 'Головна',
        url: '/ukrainian',
      },
      {
        title: 'Новини',
        url: '/ukrainian/news',
      },
      {
        title: 'Україна',
        url: '/ukrainian/topics/ee8750ed-a7fb-453f-bfca-2aa8b3fb064c',
      },
      {
        title: 'Політика',
        url: '/ukrainian/topics/75612fa6-147c-4a43-97fa-fcf70d9cced3',
      },
      {
        title: 'Економіка',
        url: '/ukrainian/topics/ca170ae3-99c1-48db-9b67-2866f85e7342',
      },
      {
        title: 'Суспільство',
        url: '/ukrainian/topics/5307a8d9-f620-40f5-92d4-f99c919a6ffa',
      },
      {
        title: 'Наука',
        url: '/ukrainian/topics/0f469e6a-d4a6-46f2-b727-2bd039cb6b53',
      },
      {
        title: 'Технології',
        url: '/ukrainian/topics/31684f19-84d6-41f6-b033-7ae08098572a',
      },
      {
        title: 'Здоров’я',
        url: '/ukrainian/topics/c4794229-7f87-43ce-ac0a-6cfcd6d3cef2',
      },
      {
        title: 'Спорт',
        url: '/ukrainian/sport',
      },
      {
        title: 'РУС',
        url: '/ukrainian/ukraine_in_russian',
      },
      {
        title: 'BBC Журнал',
        url: '/ukrainian/magazine',
      },
      {
        title: 'Блоги',
        url: '/ukrainian/blogs',
      },
      {
        title: 'Також у новинах',
        url: '/ukrainian/other_news',
      },
      {
        title: 'Спецпроекти',
        url: '/ukrainian/in_depth',
      },
      {
        title: 'Фото',
        url: '/ukrainian/media/photogalleries',
      },
      {
        title: 'Відео',
        url: '/ukrainian/media/video',
      },
      {
        title: 'Learning English',
        url: '/ukrainian/learning_english',
      },
    ],
  },
};

export default withContext(service);
