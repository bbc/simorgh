import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { burmese } from '@bbc/gel-foundations/scripts';
import { burmese as brandSVG } from '@bbc/psammead-assets/svgs';
import { F_PADAUK_BOLD, F_PADAUK_REGULAR } from '@bbc/psammead-styles/fonts';
import '@bbc/moment-timezone-include/tz/GMT';
import withContext from '../../../contexts/utils/withContext';
import 'moment/locale/my';

export const service = {
  default: {
    ads: {
      hasAds: false,
    },
    lang: `my`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'အသစ်တင်ချိန်',
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
    datetimeLocale: `my`,
    service: 'burmese',
    serviceName: 'Burmese',
    themeColor: `${C_POSTBOX}`,
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
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      seeAll: 'အားလုံးကြည့်ရန်',
      home: 'ပင်မစာမျက်နှာ',
      currentPage: 'လက်ရှိကြည့်နေသော စာမျက်နှာ',
      skipLinkText: 'အကြောင်းအရာများဆီ ကျော်သွားရန်',
      relatedContent: 'ဒီသတင်းနဲ့ ပတ်သက်သမျှ',
      navMenuText: 'ကဏ္ဍများ',
      mediaAssetPage: {
        mediaPlayer: 'မီဒီယာ ပလေယာ',
        audioPlayer: 'အသံဖိုင်ပလေယာ',
        videoPlayer: 'ဗီဒီယို ပလေယာ',
      },
      error: {
        404: {
          statusCode: '၄၀၄',
          title: 'စာမျက်နှာကို မတွေ့ပါ။',
          message: 'သင်ရှာနေသော စာမျက်နှာကို မတွေ့ရပါ။ ဒီမှာ ကြိုးစားကြည့်ပါ။',
          solutions: [
            'စာမျျက်နှာ လင့် လိပ်စာကို ထပ်စစ်ကြည့်နေပါသည်။',
            'အသစ်ဖွင့်ရန် ဘရောင်ဆာမှ refresh ခလုတ်ကို နှိပ်ပါ။',
            'ဘီဘီစီမှ ရှာဖွေသော ဘားကို သုံးပြီး ယင်းစာမျက်နှာကို ရှာရန်။',
          ],
          callToActionFirst: 'သို့မဟုတ်ပါက ',
          callToActionLinkText: 'BBC News မြန်မာ',
          callToActionLast: ' ပင်မစာမျက်နှာသို့ သွားပါ။',
          callToActionLinkUrl: 'https://www.bbc.com/burmese',
        },
        500: {
          statusCode: '၅၀၀',
          title: 'ဘီဘီစီဆာဗာ၏ အမှား',
          message:
            'သင်ရှာနေသော စာမျက်နှာကို လောလောဆယ် ရှာမတွေ့ပါ။ ဒီမှာ ကြိုးစားကြည့်ပါ။',
          solutions: [
            'အသစ်ဖွင့်ရန် ဘရောင်ဆာမှ refresh ခလုတ်ကို နှိပ်ပါ။',
            'ခဏနေလျင် ပြန်လာကြည့်ပါ။',
          ],
          callToActionFirst: 'သို့မဟုတ်ပါက ',
          callToActionLinkText: 'BBC News မြန်မာ',
          callToActionLast: ' ပင်မစာမျက်နှာသို့ သွားပါ။',
          callToActionLinkUrl: 'https://www.bbc.com/burmese',
        },
      },
      consentBanner: {
        privacy: {
          title:
            'ကိုယ်ရေးအချက်အလက်လုံခြုံမှုနှင့် ကွတ်ကီးအသုံးပြုမှု မူဝါဒများ အသစ်ပြင်ဆင်ထားပါသည်။',
          description: {
            uk: {
              first:
                'ကိုယ်ရေးအချက်အလက်လုံခြုံမှုနှင့် ကွတ်ကီးအသုံးပြုမှု မူဝါဒများတွင် အရေးကြီးသော အပြောင်းအလဲအချို့ပြုလုပ်ထားသဖြင့် သုံးစွဲသူများအပေါ် သက်ရောက်မှုကို အသိပေးလိုပါသည်။',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'ကိုယ်ရေးအချက်အလက်လုံခြုံမှုနှင့် ကွတ်ကီးအသုံးပြုမှု မူဝါဒများတွင် အရေးကြီးသော အပြောင်းအလဲအချို့ပြုလုပ်ထားသဖြင့် သုံးစွဲသူများအပေါ် သက်ရောက်မှုကို အသိပေးလိုပါသည်။',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'ကောင်းပါပြီ။',
          reject: 'ဘာတွေပြောင်းလဲသွားသလဲ ကြည့်ရန်',
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
        },
        cookie: {
          title: 'ကွတ်ကီးများအသုံးပြုမှုကို သဘောတူမတူ ပြောပါ။',
          description: {
            uk: {
              first:
                'ပရိသတ်များ အွန်လိုင်းတွင် အကောင်းဆုံးသုံးနိုင်ရန် မိမိတို့ ',
              linkText: 'နှင့် ကွတ်ကီးများ',
              last:
                ' ကို အသုံးပြုပါသည်။ ယင်းကွတ်ကီးများ အားလုံးကို သဘောတူမတူ ပြောပြပါ။',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            international: {
              first: 'ဘီဘီစီနှင့် ပါတနာများသည် ',
              linkText: ' နှင့် ကွတ်ကီးများ ',
              last:
                ' သုံးသော နည်းပညာများဖြင့် ပရိသတ်များ အွန်လိုင်းတွင် အကောင်းဆုံးကြည့်နိုင်ရန်၊ မိမိတို့ ကြည့်လိုသည့် အကြောင်းအရာများကြည့်နိုင်ရန်၊ မိမိတို့နှင့် ကိုက်ညီမည့် ကြော်ငြာများကိုသာ ရရှိရန် အသုံးပြုသူ၏ သုံးစွဲပုံဒေတာများကို ကောက်ယူပါသည်။ ယင်းသို့ အသုံးပြုမှုကို သဘောတူမတူ ပြောပြပါ။',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
          },
          accept: 'သဘောတူပါသည်။',
          reject: 'သဘောမတူပါ၊ ဆက်တင်ကို သွားကြည့်လိုပါသည်။',
          rejectUrl:
            'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
        },
      },
      media: {
        noJs: 'သငျ့စကျတှငျ ဒီမီဒီယာဖိုငျကို ဖှငျ့၍ မရပါ။',
        contentExpired: 'ဒီအစီအစဉျမရှိတော့ပါဘူး။',
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
        listen: 'နားဆငျရနျ',
        watch: 'ကြည့်ရှုရန်',
        liveLabel: 'တိုက်ရိုက်ထုတ်လွှင့်မှု',
        nextLabel: 'NEXT',
        previousRadioShow: 'ယခင် ရေဒီယိုအစီအစဉ်',
        nextRadioShow: 'နောက် ရေဒီယိုအစီအစဉ်',
        duration: 'ကြာမြင့်ချိန်',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'ဗီဒီယို ပုံစာ - ',
          text:
            'သတိပေးချက်- ဘီဘီစီပြင်ပ ဝက်ဆိုက်များမှ ဖော်ပြချက်များတွင် ကြော်ငြာများပါနိုင်ပါသည်။',
        },
        fallback: {
          text: 'ကြည့်ရန် မရနိုင်သေးပါ။',
          linkText: '%provider_name% တွင် နောက်ထပ်ကြည့်နိုင်ပါသည်။',
          linkTextSuffixVisuallyHidden: ' ပြင်ပစာမျက်နှာ',
          warningText:
            'ပြင်ပဝက်ဆိုက်များတွင် ပါဝင်သော အကြောင်းအရာများအတွက် ဘီဘီစီက တာဝန်မယူပါ။',
        },
        skipLink: {
          text: 'Skip %provider_name% post',
          endTextVisuallyHidden: 'End of %provider_name% post',
        },
      },
      topStoriesTitle: 'ထိပ်တန်း သတင်းများ',
      featuresAnalysisTitle: 'ဆောင်းပါး',
    },
    brandSVG,
    mostRead: {
      header: 'အဖတ်အများဆုံး',
      lastUpdated: 'နောက်ဆုံးအသစ်တင်ချိန်:',
      numberOfItems: 5,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: true,
      onFrontPage: false,
      durationLabel: 'Duration %duration%',
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
        href: 'https://www.bbc.co.uk/help/web/links/',
        text:
          'ပြင်ပဝက်ဆိုက်များကို လင့် ထည့်ပေးခြင်းနှင့် ပတ်သက်သော ဘီဘီစီလုပ်ထုံးလုပ်နည်းကို ဖတ်ရန်။',
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
          href: 'https://www.bbc.com/burmese/institutional-37577525',
          text: 'ဘီဘီစီကို ဆက်သွယ်ရန်',
        },
        {
          href:
            'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. ပြင်ပဝက်ဆိုက်များတွင် ပါဝင်သော အကြောင်းအရာများအတွက် ဘီဘီစီက တာဝန်မယူပါ။',
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
        title: 'ဗီဒီယိုများ',
        url: '/burmese/media/video',
      },
    ],
  },
};

export default withContext(service);
