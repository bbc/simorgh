import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { latinDiacritics } from '@bbc/gel-foundations/scripts';
import { azeri as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/Asia/Baku';
import '@bbc/psammead-locales/moment/az';
import withContext from '../../../contexts/utils/withContext';

export const service = {
  default: {
    lang: `az`,
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'Yeniləndi',
    atiAnalyticsAppName: 'news-azeri',
    atiAnalyticsProducerId: '6',
    chartbeatDomain: 'azeri.bbc.co.uk',
    brandName: 'BBC News Azərbaycanca',
    product: 'BBC News',
    serviceLocalizedName: 'Azərbaycanca',
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
    datetimeLocale: `az`,
    service: 'azeri',
    serviceName: 'Azərbaycanca',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcazeri',
    twitterSite: '@bbcazeri',
    noBylinesPolicy:
      'https://www.bbc.com/azeri/institutional-49283479#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/azeri/institutional-49283479',
    isTrustProjectParticipant: true,
    script: latinDiacritics,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Xəbərlər, Qaynar Xəbərlər, Analiz, Video',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      seeAll: 'Hamısına baxın',
      home: 'Xəbərlər',
      currentPage: 'Hazırda olduğunuz səhifə',
      skipLinkText: 'Mətnə keçid',
      relatedContent: 'Bu barədə daha geniş',
      navMenuText: 'Bölümlər',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      error: {
        404: {
          statusCode: '404',
          title: 'Səhifəni tapmaq mümkün deyil',
          message:
            'Bağışlayın, axtardığınız səhifəni sizə çatdırmaq imkanında deyilik. Lütfən, cəhd edin:',
          solutions: [
            'URL ünvanının təkrar yoxlanması',
            'Brauzerinizdə yeniləmə düyməsinin basılması',
            'BBC-nin axtarış alətindən istifadə edərək bu səhifənin axtarılması',
          ],
          callToActionFirst: 'Əks halda, lütfən, ',
          callToActionLinkText: 'BBC News Azərbaycanca baş səhifəsinə',
          callToActionLast: ' keçin',
          callToActionLinkUrl: 'https://www.bbc.com/azeri',
        },
        500: {
          statusCode: '500',
          title: 'Daxili server səhvi',
          message:
            'Bağışlayın, hazırda axtardığınız səhifəni sizə çatdırmaq imkanında deyilik. Lütfən, cəhd edin:',
          solutions: [
            'Brauzerinizdə yeniləmə düyməsinin basılması',
            'Sonra təkrar qayıtma',
          ],
          callToActionFirst: 'Əks halda, lütfən, ',
          callToActionLinkText: 'BBC News Azərbaycanca baş səhifəsinə',
          callToActionLast: ' keçin',
          callToActionLinkUrl: 'https://www.bbc.com/azeri',
        },
      },
      consentBanner: {
        privacy: {
          title: 'Biz Məxfilik və Kukilər (Cookies) Siyasətimizi yeniləmişik.',
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
        noJs: 'Sizin qurğunuzda yenidən səsləndirmə mümkün deyil',
        contentExpired: 'Bu proqramı izləmək/dinləmək artıq mümkün deyil.',
        audio: 'Audio',
        photogallery: 'Foto-qalereya',
        video: 'Video',
        listen: 'Listen',
        watch: 'İzləyin',
        liveLabel: 'CANLI',
        previousRadioShow: 'Previous radio show',
        nextRadioShow: 'Next radio show',
        duration: 'Duration',
      },
    },
    brandSVG,
    mostRead: {
      header: 'Ən çox oxunan',
      lastUpdated: 'Ən son yeniləmə:',
      numberOfItems: 5,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/azeri/institutional-49283479',
        text: 'BBC News-a niyə etibar etməlisiniz',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text: 'Bizim kənar keçidlərə dair yanaşmamız barədə oxuyun.',
      },
      links: [
        {
          href: 'https://www.bbc.com/azeri/institutional-37131047',
          text: 'İstifadə qaydaları',
        },
        {
          href: 'https://www.bbc.com/azeri/institutional-37131049',
          text: 'BBC haqqında',
        },
        {
          href: 'https://www.bbc.com/azeri/institutional-37131051',
          text: 'Məxfilik siyasəti',
        },
        {
          href:
            'https://www.bbc.co.uk/privacy/cookies/managing/cookie-settings.html',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.com/azeri/institutional-37131054',
          text: 'BBC ilə Əlaqə',
        },
        {
          href:
            'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText: 'BBC. BBC kənar saytların məzmununa məsul deyil.',
    },
    fonts: [],
    timezone: 'Asia/baku',
    navigation: [
      {
        title: 'Xəbərlər',
        url: '/azeri',
      },
      {
        title: 'Azərbaycan',
        url: '/azeri/azerbaijan',
      },
      {
        title: 'Region',
        url: '/azeri/region',
      },
      {
        title: 'Beynəlxalq',
        url: '/azeri/international',
      },
      {
        title: 'Dərgi',
        url: '/azeri/magazine',
      },
      {
        title: 'Fotoqalereya',
        url: '/azeri/media/photogalleries',
      },
      {
        title: 'Video',
        url: '/azeri/media/video',
      },
    ],
  },
};

export default withContext(service);
