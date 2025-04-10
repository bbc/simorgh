import gurmukhi from '../../../components/ThemeProvider/fontScripts/gurmukhi';
import '#psammead/psammead-locales/moment/pa-in';
import '#psammead/moment-timezone-include/tz/Asia/Kolkata';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: `pa`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'ਅਪਡੇਟ',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-punjabi',
    atiAnalyticsProducerId: '73',
    atiAnalyticsProducerName: 'PUNJABI',
    useReverb: true,
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
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'pa',
    datetimeLocale: `pa-in`,
    service: 'punjabi',
    serviceName: 'Punjabi',
    languageName: 'Punjabi',
    twitterCreator: '@bbcnewspunjabi',
    twitterSite: '@bbcnewspunjabi',
    noBylinesPolicy:
      'https://www.bbc.com/punjabi/institutional-49282853#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/punjabi/institutional-49282853',
    isTrustProjectParticipant: true,
    script: gurmukhi,
    manifestPath: '/punjabi/manifest.json',
    swPath: '/sw.js',
    homePageTitle: 'ਨਿਊਜ਼',
    showAdPlaceholder: false,
    showRelatedTopics: true,
    translations: {
      pagination: {
        previousPage: 'ਪਿੱਛੇ',
        nextPage: 'ਅੱਗੇ',
        pageXOfY: 'Page {x} ਦਾ {y}',
      },
      ads: {
        advertisementLabel: 'ਇਸ਼ਤਿਹਾਰ',
      },
      seeAll: 'ਸਭ ਦੋਖੇ',
      home: 'ਹੋਮ ਪੇਜ',
      currentPage: 'ਮੌਜੂਦਾ ਪੇਜ',
      skipLinkText: `ਸਮੱਗਰੀ 'ਤੇ ਜਾਓ`,
      relatedContent: 'ਇਸ ਖ਼ਬਰ ਬਾਰੇ ਹੋਰ',
      relatedTopics: 'ਸਬੰਧਿਤ ਵਿਸ਼ੇ',
      navMenuText: 'ਸੈਕਸ਼ਨਜ਼',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      liveExperiencePage: {
        liveLabel: 'ਲਾਈਵ',
        liveCoverage: 'ਲਾਈਵ ਕਵਰੇਜ',
        breaking: 'ਤਾਜ਼ਾ',
        postedAt: 'ਇਸ ‘ਤੇ ਪੋਸਟ ਕੀਤਾ',
        summary: 'ਸਾਰ',
        shareButtonText: 'ਸਾਂਝਾ ਕਰੋ',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'ਸਾਰ',
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
      byline: {
        articleInformation: '...ਵਿੱਚ',
        author: 'ਲੇਖਕ',
        listItemImage: 'ਤਸਵੀਰ',
        published: 'ਪ੍ਰਕਾਸ਼ਿਤ',
        reportingFrom: '...ਤੋਂ',
        role: 'ਰੋਲ',
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
          rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
        },
        cookie: {
          amp: {
            accept: 'ਡਾਟਾ ਕਲੈਕਸ਼ਨ ਦੀ ਮਨਜ਼ੂਰੀ ਦੋ ਤੇ ਅੱਗੇ ਵਧੋ',
            reject: 'ਡਾਟਾ ਕਲੈਕਸ਼ਨ ਨੂੰ ਨਾਮਨਜ਼ੂਰ ਕਰੋ ਤੇ ਅੱਗੇ ਵਧੋ',
            initial: {
              title:
                'ਸਾਨੂੰ ਦੱਸੋ ਕਿ ਤੁਸੀਂ ਏਐਮਪੀ ’ਤੇ ਡਾਟਾ ਕਲੈਕਸ਼ਨ ਦੀ ਸਹਿਮਤੀ ਦੇ ਰਹੇ ਹੋ',
              description: {
                first:
                  'ਅਸੀਂ ਅਤੇ ਸਾਡੇ ਭਾਈਵਾਲ ਤਕਨੀਕ ਦੀ ਵਰਤੋਂ ਕਰਦੇ ਹਾਂ, ਜਿਵੇਂ ਕਿ ',
                linkText: 'ਕੁਕੀਜ਼',
                last: ' ਅਤੇ ਤੁਹਾਨੂੰ ਸਭ ਤੋਂ ਵਧੀਆ ਆਨਲਾਈਨ ਤਜਰਬਾ ਦੇਣ ਲਈ ਤੇ ਤੁਹਾਨੂੰ ਦਿਖਾਈ ਗਈ ਸਾਮਗਰੀ ਅਤੇ ਇਸ਼ਤਿਹਾਰਾਂ ਨੂੰ ਨਿੱਜੀ ਕਰਨ ਲਈ ਬ੍ਰਾਊਜ਼ਰ ਡਾਟਾ ਨੂੰ ਇਕੱਠਾ ਕਰਦੇ ਹਾਂ। ਜੇਕਰ ਤੁਸੀਂ ਸਹਿਮਤ ਹੋ ਤਾਂ ਸਾਨੂੰ ਦੱਸੋ।',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'ਸੈਟਿੰਗਸ ਮੈਨੇਜ ਕਰੋ',
            },
            manage: {
              title:
                "ਏਐਮਪੀ ਪੇਜ ਦੀ ਸੈਟਿੰਗਸ 'ਤੇ ਜਾ ਕੇ ਆਪਣੀ ਮਨਜ਼ੂਰੀ ਨੂੰ ਮੈਨੇਜ ਕਰੋ",
              description: {
                para1:
                  'ਇਹ ਸੈਟਿੰਗਸ ਸਿਰਫ਼ ਏਐਮਪੀ ਪੰਨਿਆਂ ਲਈ ਹੀ ਹਨ, ਤੁਹਾਡੇ ਤੋਂ ਤੁਹਾਡੀ ਪਸੰਦ ਦੁਬਾਰਾ ਪੁੱਛੀ ਜਾ ਸਕਦੀ ਹੈ। ਜੇ ਤੁਸੀਂ ਬਿਨਾਂ ਏਐਮਪੀ ਵਾਲੇ ਬੀਬੀਸੀ ਪੰਨੇ ’ਤੇ ਜਾਂਦੇ ਹੋ।',
                para2:
                  'ਜੋ ਹਲਕਾ ਮੋਬਾਇਲ ਪੰਨਾ ਤੁਸੀਂ ਦੇਖ ਰਹੇ ਹੋ ਉਸ ਨੂੰ ਗੂਗਲ ਦੀ ਏਐਮਪੀ ਤਕਨੀਕ ਦੇ ਜ਼ਰੀਏ ਬਣਾਇਆ ਗਿਆ ਹੈ।',
                heading2: 'ਮੁਕੰਮਲ ਤੌਰ ’ਤੇ ਜ਼ਰੂਰੀ ਡਾਟਾ ਕਲੈਕਸ਼ਨ',
                para3:
                  "ਆਪਣੀ ਵੈੱਬਸਾਈਟ ਦੇ ਠੀਕ ਕੰਮ ਕਰਨ ਲਈ ਸਾਨੂੰ ਸੀਮਤ ਪੱਧਰ 'ਤੇ ਤੁਹਾਡੇ ਡਿਵਾਈਸ 'ਤੇ ਕੁਝ ਜਾਣਕਾਰੀਆਂ ਸੇਵ ਕਰਨੀਆਂ ਪੈਂਦੀਆਂ ਹਨ ਜਿਸ ਲਈ ਅਸੀਂ ਤੁਹਾਡੇ ਤੋਂ ਮਨਜ਼ੂਰੀ ਨਹੀਂ ਮੰਗਦੇ।",
                para4: {
                  text: 'ਉਨ੍ਹਾਂ ਜ਼ਰੂਰੀ ਜਾਣਕਾਰੀਆਂ ਬਾਰੇ ਹੋਰ ਪੜ੍ਹੋ ਜੋ ਅਸੀਂ ਤੁਹਾਡੇ ਡਿਵਾਈਸ ’ਤੇ ਸਟੋਰ ਕੀਤੀਆਂ ਹਨ ਤਾਂ ਕਿ ਪੇਜ ਠੀਕ ਦਿਖਾਈ ਦੇ ਸਕੇ।',
                  url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
                },
                para5:
                  'ਅਸੀਂ ਤੁਹਾਡੀ ਮਨਜ਼ੂਰੀ ਅਤੇ ਪਸੰਦ ਨੂੰ ਤੁਹਾਡੇ ਡਿਵਾਈਸ ਦੇ ਲੋਕਲ ਸਟੋਰੇਜ ਵਿੱਚ ਸਟੋਰ ਕਰਦੇ ਹਾਂ।',
                heading3: 'ਵਿਕਲਪਿਕ ਡਾਟਾ ਕਲੈਕਸ਼ਨ',
                para6:
                  'ਜਦੋਂ ਤੁਸੀਂ ਸਾਡੇ ਏਐਮਪੀ ਡਾਟਾ ਨੂੰ ਮਨਜ਼ੂਰੀ ਦਿੰਦੇ ਹੋ ਤਾਂ ਇਸਦਾ ਅਰਥ ਹੁੰਦਾ ਹੈ ਕਿ ਤੁਸੀਂ ਸਾਨੂੰ ਆਪਣੀ ਰੁਚੀ ਦੇ ਇਸ਼ਤਿਹਾਰ ਦਿਖਾਉਣ ਦੀ ਮਨਜ਼ੂਰੀ ਦੇ ਰਹੇ ਹੋ। ਅਜਿਹਾ ਉਸ ਸਮੇਂ ਹੁੰਦਾ ਹੈ ਜਦੋਂ ਤੁਸੀਂ ਬ੍ਰਿਟੇਨ ਤੋਂ ਬਾਹਰ ਹੋਵੋਂ।',
                para7: {
                  text: 'ਅਸੀਂ ਤੁਹਾਡੀ ਰੁਚੀ ਦੇ ਮੁਤਾਬਕ ਇਸ਼ਤਿਹਾਰ ਦੇਣ ਵਾਲਿਆਂ ਦੀ ਚੋਣ ਕਿਸ ਤਰ੍ਹਾਂ ਕਰਦੇ ਹਾਂ, ਇਹ ਜਾਣਨ ਲਈ ਹੋਰ ਪੜ੍ਹੋ।',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'ਤੁਸੀਂ ਡਾਟਾ ਕਲੈਕਸ਼ਨ ਨੂੰ ਨਾਮਨਜ਼ੂਰ ਕਰਕੇ ਅੱਗੇ ਵੱਧਣ ਦਾ ਵਿਕਪਲ ਚੁਣਦੇ ਹੋ ਤਾਂ ਤੁਹਾਡੀ ਰੁਚੀ ਦੇ ਮੁਤਾਬਕ ਇਸ਼ਤਿਹਾਰ ਨਹੀਂ ਦਿਖਾਏ ਜਾਣਗੇ, ਪਰ ਇਸ਼ਤਿਹਾਰ ਤੁਹਾਨੂੰ ਫ਼ਿਰ ਵੀ ਦਿਖਾਏ ਜਾਣਗੇ ਪਰ ਉਹ ਪਰਸਨੇਲਾਈਜ਼ਡ ਨਹੀਂ ਹੋਣਗੇ।',
                para9:
                  "ਤੁਸੀਂ 'ਐਡ ਚੁਆਇਸੇਸ' ਵਾਲੇ ਬਟਨ ’ਤੇ ਕਲਿੱਕ ਕਰਕੇ ਆਪਣੀ ਪਸੰਦ ਬਦਲ ਸਕਦੇ ਹੋ। ਤੁਸੀਂ 'ਡੂ ਨਾਟ ਸੇਲ ਮਾਈ ਇੰਨਫ਼ੋ' ਵਾਲੇ ਬਟਨ ’ਤੇ ਵੀ ਕਲਿੱਕ ਕਰ ਸਕਦੇ ਹੋ।",
              },
            },
          },
          canonical: {
            title: 'ਸਾਨੂੰ ਦੱਸੋ ਜੇ ਤੁਸੀਂ ਕੁਕੀਜ਼ ਲਈ ਸਹਿਮਤ ਹੋ',
            description: {
              uk: {
                first: 'ਅਸੀਂ ਤੁੁਹਾਨੂੰ ਸਭ ਤੋਂ ਵਧੀਆ ਤਜਰਬਾ ਦੇਣ ਲਈ ',
                linkText: 'ਕੁਕੀਜ਼',
                last: ' ਦੀ ਵਰਤੋਂ ਕਰ ਰਹੇ ਹਾਂ। ਕ੍ਰਿਪਾ ਕਰਕੇ ਸਾਨੂੰ ਦੱਸੋ ਕਿ ਤੁਸੀਂ ਇਨ੍ਹਾਂ ਸਾਰੀਆਂ ਕੁਕੀਜ਼ ਨਾਲ ਸਹਿਮਤ ਹੋ',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'ਅਸੀਂ ਤੁੁਹਾਨੂੰ ਸਭ ਤੋਂ ਵਧੀਆ ਤਜਰਬਾ ਦੇਣ ਲਈ ',
                linkText: 'ਕੁਕੀਜ਼',
                last: ' ਦੀ ਵਰਤੋਂ ਕਰ ਰਹੇ ਹਾਂ। ਕ੍ਰਿਪਾ ਕਰਕੇ ਸਾਨੂੰ ਦੱਸੋ ਕਿ ਤੁਸੀਂ ਇਨ੍ਹਾਂ ਸਾਰੀਆਂ ਕੁਕੀਜ਼ ਨਾਲ ਸਹਿਮਤ ਹੋ',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'ਹਾਂ, ਮੈਂ ਸਹਿਮਤ ਹਾਂ',
            reject: "ਨਹੀਂ, ਸੈਟਿੰਗ 'ਚ ਜਾਓ ",
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: "ਮੀਡੀਆ ਪਲੇਬੈਕ ਤੁਹਾਡੀ ਡਿਵਾਈਸ 'ਤੇ ਸਪੋਰਟ ਨਹੀਂ ਕਰਦਾ",
        contentExpired: 'ਇਹ ਸਮੱਗਰੀ ਹੁਣ ਉਪਲਬਧ ਨਹੀਂ ਹੈ।',
        contentNotYetAvailable: 'ਇਹ ਸਮੱਗਰੀ ਹਾਲੇ ਚਲਾਏ ਜਾਣ ਲਈ ਉਪਲਬਧ ਨਹੀਂ ਹੈ।',
        audio: 'ਔਡੀਓ',
        photogallery: 'ਫੋਟੋ ਗੈਲਰੀ',
        video: 'ਵੀਡੀਓ',
        listen: 'ਸੁਣੋ',
        watch: 'ਦੇਖੋ',
        watchMoments: 'ਸ਼ਾਰਟ ਵੀਡੀਓ ਦੇਖੋ',
        listenLive: 'live ਸੁਣੋ',
        liveLabel: 'LIVE',
        nextLabel: 'NEXT',
        previousRadioShow: 'Previous radio show',
        nextRadioShow: 'Next radio show',
        duration: 'Duration',
        recentEpisodes: 'ਤਾਜ਼ਾ ਐਪੀਸੋਡ',
        closeVideo: 'ਬਾਹਰ ਜਾਓ',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'ਵੀਡੀਓ ਕੈਪਸ਼ਨ, ',
          text: "ਚਿਤਾਵਨੀ: ਬਾਹਰੀ ਸਾਈਟਾਂ ਦੀ ਸਮਗਰੀ 'ਚ ਇਸ਼ਤਿਹਾਰ ਹੋ ਸਕਦੇ ਹਨ",
          articleText:
            'ਚਿਤਾਵਨੀ: ਬੀਬੀਸੀ ਦੂਜੀਆਂ ਵੈਬਸਾਈਟਸ ਦੀ ਸਮੱਗਰੀ ਲਈ ਜ਼ਿੰਮੇਵਾਰ ਨਹੀਂ ਹੈ।',
          articleAdditionalText:
            '%provider_name% ਦੀ ਸਮੱਗਰੀ ਵਿੱਚ ਵਿਗਿਆਪਨ ਹੋ ਸਕਦਾ ਹੈ',
        },
        fallback: {
          text: 'ਸਮੱਗਰੀ ਉਪਲਬਧ ਨਹੀਂ ਹੈ',
          linkText: 'ਹੋਰ ਦੇਖਣ ਲਈ %provider_name%',
          linkTextSuffixVisuallyHidden: ', ਬਾਹਰੀ',
          warningText: 'ਬਾਹਰੀ ਸਾਈਟਾਂ ਦੀ ਸਮਗਰੀ ਲਈ ਬੀਬੀਸੀ ਜ਼ਿੰਮੇਵਾਰ ਨਹੀਂ ਹੈ',
        },
        skipLink: {
          text: 'Skip %provider_name% post',
          endTextVisuallyHidden: 'End of %provider_name% post',
        },
        consentBanner: {
          heading: `[social_media_site] ਸਮੱਗਰੀ ਦੀ ਇਜਾਜ਼ਤ?`,
          body: `ਇਸ ਲੇਖ ਵਿੱਚ [social_media_site] ਤੋਂ ਮਿਲੀ ਸਮੱਗਰੀ ਸ਼ਾਮਲ ਹੈ। ਕੁਝ ਵੀ ਡਾਊਨਲੋਡ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ ਅਸੀਂ ਤੁਹਾਡੀ ਇਜਾਜ਼ਤ ਮੰਗਦੇ ਹਾਂ ਕਿਉਂਕਿ ਇਸ ਵਿੱਚ ਕੁਕੀਜ਼ ਅਤੇ ਦੂਜੀਆਂ ਤਕਨੀਕਾਂ ਦਾ ਇਸਤੇਮਾਲ ਕੀਤਾ ਹੋ ਸਕਦਾ ਹੈ। ਤੁਸੀਂ ਸਵੀਕਾਰ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ [social_media_site] [link] ਕੁਕੀ ਪਾਲਿਸੀ [/link] ਤੇ ਨੂੰ ਪੜ੍ਹਨਾ ਚਾਹੋਗੇ। ਇਸ ਸਮੱਗਰੀ ਨੂੰ ਦੇਖਣ ਲਈ ਇਜਾਜ਼ਤ ਦੇਵੋ ਤੇ ਜਾਰੀ ਰੱਖੋ ਨੂੰ ਚੁਣੋ।`,
          button: 'ਸਵੀਕਾਰ ਕਰੋ ਤੇ ਜਾਰੀ ਰੱਖੋ',
        },
      },
      include: {
        errorMessage:
          'Sorry, we can’t display this part of the story on this lightweight mobile page.',
        linkText: 'View the full version of the page to see all the content.',
      },
      topStoriesTitle: 'ਤਾਜ਼ਾ ਘਟਨਾਕ੍ਰਮ',
      featuresAnalysisTitle: 'ਦ੍ਰਿਸ਼ਟੀਕੋਣ',
      latestMediaTitle: 'ਬਿਲਕੁਲ ਨਵਾਂ',
    },
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
        url: '/punjabi/topics/cx12qmz6jm4t',
      },
      {
        title: 'ਪਾਠਕਾਂ ਦੀ ਪਸੰਦ',
        url: '/punjabi/popular/read',
      },
      {
        title: 'ਭਾਰਤ',
        url: '/punjabi/topics/cz74k76gjqxt',
      },
      {
        title: 'ਕੌਮਾਂਤਰੀ',
        url: '/punjabi/topics/c2lej05e43lt',
      },
    ],
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/punjabi/institutional-49282853',
        text: "ਤੁਸੀਂ ਬੀਬੀਸੀ 'ਤੇ ਕਿਉਂ ਵਿਸ਼ਵਾਸ਼ ਕਰ ਸਕਦੇ ਹੋ",
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
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
          href: 'https://www.bbc.co.uk/punjabi/send/u50853621',
          text: 'ਬੀਬੀਸੀ ਨਾਲ ਸੰਪਰਕ ਕਰੋ',
        },
        {
          href: 'https://www.bbc.com/ws/languages',
          text: 'ਬੀਬੀਸੀ ’ਤੇ ਹੋਰ ਭਾਸ਼ਾਵਾਂ ਵਿੱਚ ਖ਼ਬਰਾਂ',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText: 'BBC. ਬਾਹਰੀ ਸਾਈਟਾਂ ਦੀ ਸਮਗਰੀ ਲਈ ਬੀਬੀਸੀ ਜ਼ਿੰਮੇਵਾਰ ਨਹੀਂ ਹੈ',
      collectiveNewsroomText: 'ਬੀਬੀਸੀ ਲਈ ਕਲੈਕਟਿਵ ਨਿਊਜ਼ਰੂਮ ਪ੍ਰਕਾਸ਼ਨ',
    },
    timezone: 'Asia/Kolkata',
  },
};

export default withContext(service);
