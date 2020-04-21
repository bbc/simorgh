import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { devanagariAndGurmukhi } from '@bbc/gel-foundations/scripts';
import { punjabi as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/psammead-locales/moment/pa-in';
import '@bbc/moment-timezone-include/tz/Asia/Kolkata';
import withContext from '../../../contexts/utils/withContext';

export const service = {
  default: {
    ads: {
      hasAds: false,
    },
    lang: `pa`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'ਅਪਡੇਟ',
    atiAnalyticsAppName: 'news-punjabi',
    atiAnalyticsProducerId: '73',
    chartbeatDomain: 'punjabi.bbc.co.uk',
    brandName: 'BBC News ਪੰਜਾਬੀ',
    product: 'BBC News',
    serviceLocalizedName: 'ਪੰਜਾਬੀ',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/punjabi.png',
    defaultImageAltText: 'BBC News ਪੰਜਾਬੀ',
    dir: `ltr`,
    externalLinkText: ', ਬਾਹਰੀ',
    imageCaptionOffscreenText: 'ਤਸਵੀਰ ਕੈਪਸ਼ਨ, ',
    videoCaptionOffscreenText: 'ਵੀਡੀਓ ਕੈਪਸ਼ਨ, ',
    audioCaptionOffscreenText: 'ਆਡੀਓ ਕੈਪਸ਼ਨ, ',
    defaultCaptionOffscreenText: 'ਕੈਪਸ਼ਨ, ',
    imageCopyrightOffscreenText: 'ਤਸਵੀਰ ਸਰੋਤ, ',
    locale: `pa-IN`,
    datetimeLocale: `pa-in`,
    service: 'punjabi',
    serviceName: 'Punjabi',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcnewspunjabi',
    twitterSite: '@bbcnewspunjabi',
    noBylinesPolicy:
      'https://www.bbc.com/punjabi/institutional-49282853#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/punjabi/institutional-49282853',
    isTrustProjectParticipant: true,
    script: devanagariAndGurmukhi,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'ਨਿਊਜ਼',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      seeAll: 'ਸਭ ਦੋਖੇ',
      home: 'ਹੋਮ ਪੇਜ',
      currentPage: 'ਮੌਜੂਦਾ ਪੇਜ',
      skipLinkText: `ਸਮੱਗਰੀ 'ਤੇ ਜਾਓ`,
      relatedContent: 'ਇਸ ਖ਼ਬਰ ਬਾਰੇ ਹੋਰ',
      navMenuText: 'ਸੈਕਸ਼ਨਜ਼',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      error: {
        404: {
          statusCode: '404',
          title: 'ਪੇਜ ਨਹੀਂ ਮਿਲ ਰਿਹਾ',
          message:
            'ਮੁਆਫ਼ ਕਰੋ, ਅਸੀਂ ਤੁਹਾਨੂੰ ਉਸ ਪੇਜ ਤੱਕ ਨਹੀਂ ਲੈ ਕੇ ਜਾ ਸਕਦੇ, ਜੋ ਤੁਸੀਂ ਲੱਭ ਰਹੇ ਹੋ। ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ',
          solutions: [
            'url ਨੂੰ ਦੁਬਾਰਾ ਚੈੱਕ ਕਰੋ',
            'ਆਪਣੇ ਬ੍ਰਾਊਜ਼ਰ ਦੇ ਰਿਫਰੈਸ਼ ਬਟਨ ਨੂੰ ਦਬਾਓ',
            'ਇਸ ਪੇਜ ਨੂੰ ਬੀਬੀਸੀ ਸਰਚ ਬਾਰ ਰਾਹੀਂ ਲੱਭਣ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰੋ',
          ],
          callToActionFirst: 'ਬਦਲ ਵਜੋਂ, ',
          callToActionLinkText: 'BBC News ਪੰਜਾਬੀ',
          callToActionLast: ` ਦੇ ਹੋਮ ਪੇਜ 'ਤੇ ਜਾਓ`,
          callToActionLinkUrl: 'https://www.bbc.com/punjabi',
        },
        500: {
          statusCode: '500',
          title: 'ਅੰਦਰੂਨੀ ਸਰਵਰ ਐਰਰ',
          message:
            'ਮੁਆਫ਼ ਕਰੋ, ਅਸੀਂ ਤੁਹਾਨੂੰ ਉਸ ਪੇਜ ਤੱਕ ਨਹੀਂ ਲੈ ਕੇ ਜਾ ਸਕਦੇ, ਜੋ ਤੁਸੀਂ ਲੱਭ ਰਹੇ ਹੋ। ਇਹ ਕਰੋ:',
          solutions: ['ਆਪਣੇ ਬ੍ਰਾਊਜ਼ਰ ਦੇ ਰਿਫਰੈਸ਼ ਬਟਨ ਨੂੰ ਦਬਾਓ', 'ਬਾਅਦ ਵਿੱਚ ਆਓ'],
          callToActionFirst: 'ਬਦਲ ਵਜੋਂ,  ',
          callToActionLinkText: 'BBC News ਪੰਜਾਬੀ',
          callToActionLast: ` ਦੇ ਹੋਮ ਪੇਜ 'ਤੇ ਜਾਓ`,
          callToActionLinkUrl: 'https://www.bbc.com/punjabi',
        },
      },
      consentBanner: {
        privacy: {
          title: 'ਅਸੀਂ ਆਪਣੀ ਨਿੱਜਤਾ ਤੇ ਕੁਕੀਜ਼ ਪਾਲਿਸੀ ਨੂੰ ਅਪਡੇਟ ਕਰ ਦਿੱਤਾ ਹੈ',
          description: {
            uk: {
              first:
                'ਅਸੀਂ ਆਪਣੀ ਨਿੱਜਤਾ ਤੇ ਕੁਕੀਜ਼ ਪਾਲਿਸੀ ਵਿੱਚ ਕੁਝ ਮਹੱਤਵਪੂਰਨ ਬਦਲਾਅ ਕੀਤੇ ਹਨ ਅਤੇ ਅਸੀਂ ਜਾਣਨਾ ਚਾਹੁੰਦੇ ਹਾਂ, ਤੁਹਾਡੇ ਤੇ ਤੁਹਾਡੇ ਡਾਟਾ ਲਈ ਇਸ ਦੇ ਕੀ ਮਾਅਨੇ ਹਨ।',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'ਅਸੀਂ ਆਪਣੀ ਨਿੱਜਤਾ ਤੇ ਕੁਕੀਜ਼ ਪਾਲਿਸੀ ਵਿੱਚ ਕੁਝ ਮਹੱਤਵਪੂਰਨ ਬਦਲਾਅ ਕੀਤੇ ਹਨ ਅਤੇ ਅਸੀਂ ਜਾਣਨਾ ਚਾਹੁੰਦੇ ਹਾਂ, ਤੁਹਾਡੇ ਤੇ ਤੁਹਾਡੇ ਡਾਟਾ ਲਈ ਇਸ ਦੇ ਕੀ ਮਾਅਨੇ ਹਨ।',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'ਓਕੇ',
          reject: 'ਜਾਣੋ ਕੀ ਬਦਲਿਆ ਹੈ',
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
        },
        cookie: {
          title: 'ਸਾਨੂੰ ਦੱਸੋ ਜੇ ਤੁਸੀਂ ਕੁਕੀਜ਼ ਲਈ ਸਹਿਮਤ ਹੋ',
          description: {
            uk: {
              first: 'ਅਸੀਂ ਤੁੁਹਾਨੂੰ ਸਭ ਤੋਂ ਵਧੀਆ ਤਜਰਬਾ ਦੇਣ ਲਈ ',
              linkText: 'ਕੁਕੀਜ਼',
              last:
                ' ਦੀ ਵਰਤੋਂ ਕਰ ਰਹੇ ਹਾਂ। ਕ੍ਰਿਪਾ ਕਰਕੇ ਸਾਨੂੰ ਦੱਸੋ ਕਿ ਤੁਸੀਂ ਇਨ੍ਹਾਂ ਸਾਰੀਆਂ ਕੁਕੀਜ਼ ਨਾਲ ਸਹਿਮਤ ਹੋ',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            international: {
              first: 'ਅਸੀਂ ਅਤੇ ਸਾਡੇ ਭਾਈਵਾਲ ਤਕਨੀਕ ਦੀ ਵਰਤੋਂ ਕਰਦੇ ਹਾਂ, ਜਿਵੇਂ ਕਿ ',
              linkText: 'ਕੁਕੀਜ਼',
              last:
                ' ਅਤੇ ਤੁਹਾਨੂੰ ਸਭ ਤੋਂ ਵਧੀਆ ਆਨਲਾਈਨ ਤਜਰਬਾ ਦੇਣ ਲਈ ਤੇ ਤੁਹਾਨੂੰ ਦਿਖਾਈ ਗਈ ਸਾਮਗਰੀ ਅਤੇ ਇਸ਼ਤਿਹਾਰਾਂ ਨੂੰ ਨਿੱਜੀ ਕਰਨ ਲਈ ਬ੍ਰਾਊਜ਼ਰ ਡਾਟਾ ਨੂੰ ਇਕੱਠਾ ਕਰਦੇ ਹਾਂ। ਜੇਕਰ ਤੁਸੀਂ ਸਹਿਮਤ ਹੋ ਤਾਂ ਸਾਨੂੰ ਦੱਸੋ।',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
          },
          accept: 'ਹਾਂ, ਮੈਂ ਸਹਿਮਤ ਹਾਂ',
          reject: "ਨਹੀਂ, ਸੈਟਿੰਗ 'ਚ ਜਾਓ ",
          rejectUrl:
            'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
        },
      },
      media: {
        noJs: "ਮੀਡੀਆ ਪਲੇਬੈਕ ਤੁਹਾਡੀ ਡਿਵਾਈਸ 'ਤੇ ਸਪੋਰਟ ਨਹੀਂ ਕਰਦਾ",
        contentExpired: 'ਇਹ ਸਮੱਗਰੀ ਹੁਣ ਉਪਲਬਧ ਨਹੀਂ ਹੈ।',
        audio: 'ਔਡੀਓ',
        photogallery: 'ਫੋਟੋ ਗੈਲਰੀ',
        video: 'ਵੀਡੀਓ',
        listen: 'ਸੁਣੋ',
        watch: 'ਦੇਖੋ',
        liveLabel: 'ਸਿੱਧਾ ਪ੍ਰਸਾਰਣ',
        nextLabel: 'NEXT',
        previousRadioShow: 'Previous radio show',
        nextRadioShow: 'Next radio show',
        duration: 'Duration',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'Video caption, ',
          text: 'Warning: Third party content may contain adverts',
        },
        fallback: {
          text: 'Content is not available',
          linkText: 'View content on %provider_name%',
          linkTextSuffixVisuallyHidden: ', external',
          warningText: 'ਬਾਹਰੀ ਸਾਈਟਾਂ ਦੀ ਸਮਗਰੀ ਲਈ ਬੀਬੀਸੀ ਜ਼ਿੰਮੇਵਾਰ ਨਹੀਂ ਹੈ',
        },
        skipLink: {
          text: 'Skip %provider_name% post',
          endTextVisuallyHidden: 'End of %provider_name% post',
        },
      },
    },
    brandSVG,
    mostRead: {
      header: 'ਸਭ ਤੋਂ ਵੱਧ ਪੜ੍ਹਿਆ ਗਿਆ',
      lastUpdated: 'ਆਖ਼ਰੀ ਅਪਡੇਟ:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    recommendations: {
      hasStoryRecommendations: false,
    },
    navigation: [
      {
        title: 'ਖ਼ਬਰਾਂ',
        url: '/punjabi',
      },
      {
        title: 'ਵੀਡੀਓ',
        url: '/punjabi/media/video',
      },
      {
        title: 'ਪਾਠਕਾਂ ਦੀ ਪਸੰਦ',
        url: '/punjabi/popular/read',
      },
      {
        title: 'ਭਾਰਤ',
        url: '/punjabi/topics/5a08f030-710f-4168-acee-67294a90fc75',
      },
      {
        title: 'ਕੌਮਾਂਤਰੀ',
        url: '/punjabi/international',
      },
      {
        title: '#ISWOTY',
        url: '/punjabi/resources/idt-681afed0-03f5-4d5f-a640-3011a722d1c8',
      },
    ],
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/punjabi/institutional-49282853',
        text: "ਤੁਸੀਂ ਬੀਬੀਸੀ 'ਤੇ ਕਿਉਂ ਵਿਸ਼ਵਾਸ਼ ਕਰ ਸਕਦੇ ਹੋ",
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text: 'ਬਾਹਰੀ ਲਿੰਕਿੰਗ ਲਈ ਸਾਡੇ ਤਰੀਕੇ ਬਾਰੇ ਪੜ੍ਹੋ',
      },
      links: [
        {
          href: 'https://www.bbc.com/terms',
          text: 'ਵਰਤੋ ਦੀਆਂ ਸ਼ਰਤਾਂ',
        },
        {
          href: 'https://www.bbc.co.uk/aboutthebbc',
          text: 'BBC ਬਾਰੇ',
        },
        {
          href: 'https://www.bbc.com/privacy/',
          text: 'ਨਿੱਜਤਾ ਪਾਲਿਸੀ',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'ਕੁਕੀਜ਼',
        },
        {
          href: 'https://www.bbc.com/punjabi/institutional-42227903',
          text: 'ਬੀਬੀਸੀ ਨਾਲ ਸੰਪਰਕ ਕਰੋ',
        },
        {
          href:
            'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText: 'BBC. ਬਾਹਰੀ ਸਾਈਟਾਂ ਦੀ ਸਮਗਰੀ ਲਈ ਬੀਬੀਸੀ ਜ਼ਿੰਮੇਵਾਰ ਨਹੀਂ ਹੈ',
    },
    fonts: [],
    timezone: 'Asia/Kolkata',
  },
};

export default withContext(service);
