import burmese from '../../../../components/ThemeProvider/fontScripts/burmese';
import '#psammead/moment-timezone-include/tz/GMT';
import withContext from '../../../../contexts/utils/withContext';
import 'moment/locale/my';
import { DefaultServiceConfig } from '../../../../models/types/serviceConfig';
import translations from './translations';

export const service: DefaultServiceConfig = {
  default: {
    lang: `my`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'အသစ်တင်ချိန်',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-burmese',
    atiAnalyticsProducerId: '35',
    chartbeatDomain: 'burmese.bbc.co.uk',
    brandName: 'BBC News မြန်မာ',
    product: 'BBC News',
    serviceLocalizedName: 'မြန်မာ',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/burmese.png',
    defaultImageAltText: 'BBC News မြန်မာ',
    dir: `ltr`,
    externalLinkText: ', ပြင်ပစာမျက်နှာ',
    imageCaptionOffscreenText: 'ဓာတ်ပုံ ပုံစာ, ',
    videoCaptionOffscreenText: 'ဗီဒီယို ပုံစာ, ',
    audioCaptionOffscreenText: 'အသံဖိုင် ပုံစာ, ',
    defaultCaptionOffscreenText: 'ပုံစာ, ',
    imageCopyrightOffscreenText: 'ဓာတ်ပုံ ရင်းမြစ်, ',
    locale: `my-MM`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'my',
    datetimeLocale: `my`,
    service: 'burmese',
    serviceName: 'Burmese',
    languageName: 'Burmese',
    twitterCreator: '@bbcburmese',
    twitterSite: '@bbcburmese',
    noBylinesPolicy:
      'https://www.bbc.com/burmese/institutional-51387206#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/burmese/institutional-51387206',
    isTrustProjectParticipant: true,
    script: burmese,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle:
      'ဘီဘီစီ မြန်မာ | အထူးသတင်း | နောက်ဆုံးရ သတင်း | နောက်ဆုံးရခေါင်းစဉ် သတင်း |မြန်မာသတင်း',
    showAdPlaceholder: false,
    showRelatedTopics: true,
    podcastPromo: {
      title: 'ပေါ့ဒ်ကတ်စ်',
      brandTitle: 'ဘီဘီစီမြန်မာပိုင်း ညနေခင်းသတင်းအစီအစဉ်',
      brandDescription: 'နောက်ဆုံးရ သတင်းနဲ့ မျက်မှောက်ရေးရာအစီအစဉ်များ',
      image: {
        src: 'https://ichef.bbci.co.uk/images/ic/$recipe/p02h1lyd.jpg',
        alt: 'ဘီဘီစီမြန်မာပိုင်း ညနေခင်းသတင်းအစီအစဉ်',
      },
      linkLabel: {
        text: 'ပေါ့ဒ်ကတ်စ်အစီအစဉ်များ',
        href: 'https://www.bbc.com/burmese/podcasts/p02pc9lh',
      },
    },
    translations,
    mostRead: {
      header: 'အဖတ်အများဆုံး',
      lastUpdated: 'နောက်ဆုံးအသစ်တင်ချိန်:',
      numberOfItems: 5,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'လူကြည့်အများဆုံး',
      numberOfItems: 5,
      hasMostWatched: true,
    },
    radioSchedule: {
      hasRadioSchedule: true,
      header: 'နောက်ဆုံးလွှင့် အစီအစဉ်များ',
      durationLabel: 'ကြာမြင့်ချိန် %duration%',
    },
    recommendations: {
      hasStoryRecommendations: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/burmese/institutional-51387206',
        text: 'ဘီဘီစီကို ဘာကြောင့် ယုံကြည်နိုင်သလဲ။',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'ပြင်ပဝက်ဆိုက်များကို လင့် ထည့်ပေးခြင်းနှင့် ပတ်သက်သော ဘီဘီစီလုပ်ထုံးလုပ်နည်းကို ဖတ်ရန်။',
      },
      links: [
        {
          href: 'https://www.bbc.com/burmese/institutional-37574842',
          text: 'အသုံးပြုရန်စည်းမျဉ်း',
        },
        {
          href: 'https://www.bbc.com/burmese/institutional-37577521',
          text: 'ကိုယ်ရေးအချက်အလက်လုံခြုံမှု မူဝါဒ',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'ကွတ်ကီး',
        },
        {
          href: 'https://www.bbc.co.uk/burmese/send/u50853269',
          text: 'ဘီဘီစီကို ဆက်သွယ်ရန်',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. ပြင်ပဝက်ဆိုက်များတွင် ပါဝင်သော အကြောင်းအရာများအတွက် ဘီဘီစီက တာဝန်မယူပါ။',
    },
    timezone: 'GMT',
    navigation: [
      {
        title: 'ပင်မစာမျက်နှာ',
        url: '/burmese',
      },
      {
        title: 'မြန်မာ့ရေးရာ',
        url: '/burmese/topics/c404v08p1wxt',
      },
      {
        title: 'နိုင်ငံတကာ',
        url: '/burmese/topics/cnlv9j1z93wt',
      },
      {
        title: 'ဆောင်းပါး',
        url: '/burmese/topics/cl3rq8rkqgxt',
      },
      {
        title: 'အင်တာဗျူး',
        url: '/burmese/topics/cdg42x4kek0t',
      },
      {
        title: 'ကုန်သွယ်စီးပွား',
        url: '/burmese/topics/c9wpm0en9jdt',
      },
      {
        title: 'ဗီဒီယိုများ',
        url: '/burmese/topics/cj7v92le02qt',
      },
    ],
  },
};

export default withContext(service);
