import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { burmese } from '@bbc/gel-foundations/scripts';
import { burmese as brandSVG } from '@bbc/psammead-assets/svgs';
import { F_PADAUK_BOLD, F_PADAUK_REGULAR } from '@bbc/psammead-styles/fonts';
import '@bbc/moment-timezone-include/tz/GMT';
import withContext from '../../../contexts/utils/withContext';
import 'moment/locale/my';

export const service = {
  default: {
    lang: `my`,
    articleAuthor: `https://www.facebook.com/bbcburmese`,
    articleTimestampPrefix: 'Updated',
    atiAnalyticsAppName: 'news-burmese',
    atiAnalyticsProducerId: '35',
    brandName: 'BBC News မြန်မာ',
    product: 'BBC News',
    serviceLocalizedName: 'မြန်မာ',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/burmese.png',
    defaultImageAltText: 'BBC News မြန်မာ',
    dir: `ltr`,
    externalLinkText: ', external',
    imageCaptionOffscreenText: 'Image caption, ',
    videoCaptionOffscreenText: 'Video caption, ',
    audioCaptionOffscreenText: 'Audio caption',
    defaultCaptionOffscreenText: 'Caption, ',
    imageCopyrightOffscreenText: 'Image source, ',
    locale: `my-MM`,
    datetimeLocale: `my`,
    service: 'burmese',
    serviceName: 'မြန်မာ',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcburmese',
    twitterSite: '@bbcburmese',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    isTrustProjectParticipant: true,
    script: burmese,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle:
      'ဘီဘီစီ မြန်မာ | အထူးသတင်း | နောက်ဆုံးရ သတင်း | နောက်ဆုံးရခေါင်းစဉ် သတင်း |မြန်မာသတင်း',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      seeAll: 'See all',
      home: 'ပင်မစာမျက်နှာ',
      currentPage: 'Current page',
      skipLinkText: 'အကြောင်းအရာများဆီ ကျော်သွားပါ',
      relatedContent: 'Related content',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      error: {
        404: {
          statusCode: '404',
          title: '404 - စာမျက်နှာ ရှာမတွေ့ပါ',
          message:
            'ဤသို့ဖြစ်ရခြင်းမှာ ဝက်ဘ်ဆိုက်လိပ်စာ မှားရိုက်မိခြင်းကြောင့် ဖြစ်နိုင်ပါသည်။ လိပ်စာနဲ့ စာလုံးပေါင်းကို ကျေးဇူးပြုပြီး ပြန်ကြည့်ပေးပါ။',
          solutions: [
            'Double checking the url',
            'Hitting the refresh button in your browser',
            'Searching for this page using the BBC search bar',
          ],
          callToActionFirst: 'Alternatively, please visit the ',
          callToActionLinkText: 'ဘီဘီစီ ပင်မ စာမျက်နှာ',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/burmese',
        },
        500: {
          statusCode: '500',
          title: '500 - အမှားနံပါတ်',
          message:
            'မှားယွင်းမှု တစ်ခု ဖြစ်နေပါသည်။ ကျေးဇူးပြု၍ စာမျက်နှာကို နောက်တခေါက် ပြန်ဝင်ပါ။',
          solutions: [
            'Hitting the refresh button in your browser',
            'Coming back again later',
          ],
          callToActionFirst: 'Alternatively, please visit the ',
          callToActionLinkText: 'ဘီဘီစီ ပင်မ စာမျက်နှာ',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/burmese',
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
        audio: 'အသံ',
        photogallery: 'ဓာတ်ပုံများ',
        video: 'ဗီဒီယို',
        bbc_burmese_radio: {
          title: 'ဘီဘီစီ မြန်မာပိုင်း ရေဒီယို',
          subtitle:
            'နေ့စဉ် ပြည်တွင်း ပြည်ပ သတင်းနဲ့ သုံးသပ်ချက်များ၊ ပညာရေး၊ ကျန်းမာရေး၊ အားကစား၊ နည်းပညာ အစီအစဉ်များ နဲ့ မျက်မှောက်ရေးရာ ဆွေးနွေးခန်းမျာ',
        },
        bbc_burmese_tv: {
          title: 'ဘီဘီစီ မြန်မာတီဗီ အစီအစဉ်',
          subtitle:
            'မြန်မာတီဗီ အစီအစဉ်မှာ နောက်ဆုံးရ ထိပ်တန်းရောက် ကမ္ဘာ့သတင်း နဲ့ အားကစား သတင်းတွေကို ကြည့်ရှုနိုင်ပါတယ်။',
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
        'ပြဘီဘီစီ။ င်ပ ဝက်ဘ်ဆိုက်ပါ အကြောင်းအရာများအပေါ် ဘီဘီစီက တာဝန်မယူပါ။',
    },
    fonts: [F_PADAUK_BOLD, F_PADAUK_REGULAR],
    timezone: 'GMT',
    navigation: [
      {
        title: 'ပင်မစာမျက်နှာ',
        url: '/burmese',
      },
      {
        title: 'မြန်မာ့ရေးရာ',
        url: '/burmese/burma',
      },
      {
        title: 'နိုင်ငံတကာ',
        url: '/burmese/world',
      },
      {
        title: 'ဆောင်းပါး',
        url: '/burmese/in_depth',
      },
      {
        title: 'အားကစား',
        url: '/burmese/sport',
      },
      {
        title: 'ကုန်သွယ်စီးပွား',
        url: '/burmese/economy',
      },
      {
        title: 'အသံဖိုင်များ',
        url: '/burmese/media/audio',
      },
      {
        title: 'ဗီဒီယိုများ',
        url: '/burmese/media/video',
      },
      {
        title: 'ဓာတ်ပုံများ',
        url: '/burmese/media/photogalleries',
      },
    ],
  },
};

export default withContext(service);
