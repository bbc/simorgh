import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { latin } from '@bbc/gel-foundations/scripts';
import { azeri as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/Asia/Baku';

const service = {
  lang: `az`,
  articleAuthor: `https://www.facebook.com/pages/bbc-azeri/347501767628`,
  articleTimestampPrefix: 'Yeniləndi',
  atiAnalyticsAppName: 'news-azeri',
  atiAnalyticsProducerId: '6',
  serviceLocalizedName: 'Azərbaycanca',
  brandName: 'BBC News Azərbaycanca',
  product: 'BBC News Azərbaycanca',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/azeri.png',
  defaultImageAltText: 'BBC News Azərbaycanca',
  dir: `ltr`,
  externalLinkText: ', BBC-dən kənar',
  imageCaptionOffscreenText: 'Şəklin alt yazısı, ',
  videoCaptionOffscreenText: 'Videonun alt yazısı, ',
  audioCaptionOffscreenText: 'Audionun alt yazısı, ',
  defaultCaptionOffscreenText: 'Altyazı, ',
  imageCopyrightOffscreenText: 'Şəklin mənbəyi, ',
  locale: `az-AZ`,
  datetimeLocale: `az-az`,
  service: 'azeri',
  serviceName: 'News Azərbaycanca',
  themeColor: `${C_POSTBOX}`,
  twitterCreator: '@bbcazeri',
  twitterSite: '@bbcazeri',
  noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
  publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
  script: latin,
  manifestPath: '/manifest.json',
  swPath: '/sw.js',
  frontPageTitle: 'Xəbərlər',
  translations: {
    seeAll: 'Hamısına baxın',
    home: 'Xəbərlər',
    currentPage: 'Hazırda olduğunuz səhifə',
    skipLinkText: 'Mətnə keçid',
    relatedContent: 'Related content',
    error: {
      404: {
        statusCode: '404',
        title: '404 - Səhifəni tapmaq mümkün deyil',
        message:
          'Bağışlayın, axtardığınız səhifəni sizə çatdırmaq imkanında deyilik. Lütfən, cəhd edin:',
        solutions: [
          'URL ünvanının təkrar yoxlanması',
          'Brauzerinizdə yeniləmə düyməsinin basılması',
          'BBC-nin axtarış alətindən istifadə edərək bu səhifənin axtarılması',
        ],
        callToActionFirst: 'Əks halda, lütfən, ',
        callToActionLinkText: 'BBC News Azərbaycanca baş səhifəsinə keçin',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/azeri',
      },
      500: {
        statusCode: '500',
        title: '500 - Daxili server səhvi',
        message:
          'Bağışlayın, hazırda axtardığınız səhifəni sizə çatdırmaq imkanında deyilik. Lütfən, cəhd edin:',
        solutions: [
          'Brauzerinizdə yeniləmə düyməsinin basılması',
          'Sonra təkrar qayıtma',
        ],
        callToActionFirst: 'Əks halda, lütfən, ',
        callToActionLinkText: 'BBC News Azərbaycanca baş səhifəsinə keçin',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/azeri',
      },
    },
    consentBanner: {
      privacy: {
        title: 'Biz Məxfilik və Kukilər (Cookies) Siyasətimizi yeniləmişik',
        description: {
          uk: {
            first:
              'Biz Məxfilik və Kukilər Siyasətimizə bəzi mühüm dəyişiklər etmişik və bunun siz və sizə aid məlumatlar üçün nə demək olduğunu bilməyinizi istəyirik.',
            linkText: null,
            last: null,
            linkUrl: null,
          },
          international: {
            first:
              'Biz Məxfilik və Kukilər Siyasətimizə bəzi mühüm dəyişiklər etmişik və bunun siz və sizə aid məlumatlar üçün nə demək olduğunu bilməyinizi istəyirik.',
            linkText: null,
            last: null,
            linkUrl: null,
          },
        },
        accept: 'OK',
        reject: 'Nəyin dəyişdiyini öyrənin',
        rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
      },
      cookie: {
        title: 'Kukilərlə razı olduğunuzu bizə bildirin',
        description: {
          uk: {
            first: 'Biz ',
            linkText: 'kukilərdən',
            last:
              ' sizə ən yaxşı onlayn təcrübəni vermək üçün istifadə edirik. Lütfən, bütün bu kukilərlə razı olduğunuzu bizə bildirin.',
            linkUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
          international: {
            first: 'Biz və partnyorlarımız ',
            linkText: 'kukilər',
            last:
              ' kimi texnologiyalardan istifadə edərək sizə ən yaxşı onlayn təcrübəni vermək, məzmunu və reklamları sizə uyğunlaşdırmaq üçün brauzerinizdən axtarış məlumatlarını toplayırıq. Buna razı olduğunuzu, lütfən, bizə bildirin.',
            linkUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
        },
        accept: 'Bəli, razıyam',
        reject: 'Xeyr, kökləmələrə keçin',
        rejectUrl:
          'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
      },
    },
    media: {
      audio: 'Audio',
      photogallery: 'Foto-qalereya',
      video: 'Video',
    },
  },
  brandSVG,
  mostRead: {
    header: 'Ən çox oxunan',
    lastUpdated: 'Ən son yeniləmə: ',
  },
  footer: {
    links: [
      {
        href: 'https://www.bbc.com/news/help-41670342',
        text: 'BBC News-a niyə etibar etməlisiniz',
      },
      {
        href: 'https://www.bbc.com/terms',
        text: 'İstifadə qaydaları',
      },
      {
        href: 'https://www.bbc.com/privacy/',
        text: 'Məxfilik siyasəti',
      },
      {
        href: 'https://www.bbc.com/usingthebbc/cookies/',
        text: 'Cookies',
      },
      {
        href: 'https://www.bbc.com/contact/',
        text: 'BBC ilə Əlaqə',
      },
    ],
    copyrightText: 'BBC. BBC kənar saytların məzmununa məsul deyil.',
    externalLink: {
      href: 'https://www.bbc.co.uk/help/web/links/',
      text: 'Bizim kənar keçidlərə dair yanaşmamız barədə oxuyun.',
    },
  },
  fonts: [],
  timezone: 'Asia/baku',
};

export default service;
