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
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'အသစ္တင္ခ်ိန္',
    atiAnalyticsAppName: 'news-burmese',
    atiAnalyticsProducerId: '35',
    brandName: 'BBC News မြန်မာ',
    product: 'BBC News',
    serviceLocalizedName: 'မြန်မာ',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/burmese.png',
    defaultImageAltText: 'BBC News မြန်မာ',
    dir: `ltr`,
    externalLinkText: ', ျပင္ပစာမ်က္ႏွာ',
    imageCaptionOffscreenText: 'ဓာတ္ပုံ ပုံစာ,',
    videoCaptionOffscreenText: 'ဗီဒီယို ပုံစာ, ',
    audioCaptionOffscreenText: 'အသံဖိုင္ ပုံစာ, ',
    defaultCaptionOffscreenText: 'ပုံစာ, ',
    imageCopyrightOffscreenText: 'ဓာတ္ပုံ ရင္းျမစ္,',
    locale: `my-MM`,
    datetimeLocale: `my`,
    service: 'burmese',
    serviceName: 'Burmese',
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
      seeAll: 'အားလုံးၾကည့္ရန္',
      home: 'ပင်မစာမျက်နှာ',
      currentPage: 'လက္ရွိၾကည့္ေနေသာ စာမ်က္ႏွာ',
      skipLinkText: 'အကြောင်းအရာများဆီ ကျော်သွားပါ',
      relatedContent: 'ဒီသတင္းနဲ႔ ပတ္သက္သမွ်',
      mediaAssetPage: {
        mediaPlayer: 'မီဒီယာ ပေလယာ',
        audioPlayer: 'အသံဖိုင္ပေလယာ',
        videoPlayer: 'ဗီဒီယို ပေလယာ',
      },
      error: {
        404: {
          statusCode: '404',
          title: '404 - စာမျက်နှာ ရှာမတွေ့ပါ',
          message:
            'ဤသို့ဖြစ်ရခြင်းမှာ ဝက်ဘ်ဆိုက်လိပ်စာ မှားရိုက်မိခြင်းကြောင့် ဖြစ်နိုင်ပါသည်။ လိပ်စာနဲ့ စာလုံးပေါင်းကို ကျေးဇူးပြုပြီး ပြန်ကြည့်ပေးပါ။',
          solutions: [
            'စာမ််က္ႏွာ လင့္ လိပ္စာကို ထပ္စစ္ၾကည့္ေနပါသည္။',
            'အသစ္ဖြင့္ရန္ ဘေရာင္ဆာမွ refresh ခလုတ္ကို ႏွိပ္ပါ။',
            'ဘီဘီစီမွ ရွာေဖြေသာ ဘားကို သုံးၿပီး ယင္းစာမ်က္ႏွာကို ရွာရန္။',
          ],
          callToActionFirst: 'သုိ႔မဟုတ္ပါက',
          callToActionLinkText: 'ပင္မစာမ်က္ႏွာသို႔ သြားပါ။',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/burmese',
        },
        500: {
          statusCode: '500',
          title: '500 - အမှားနံပါတ်',
          message:
            'မှားယွင်းမှု တစ်ခု ဖြစ်နေပါသည်။ ကျေးဇူးပြု၍ စာမျက်နှာကို နောက်တခေါက် ပြန်ဝင်ပါ။',
          solutions: [
            'အသစ္ဖြင့္ရန္ ဘေရာင္ဆာမွ refresh ခလုတ္ကို ႏွိပ္ပါ။',
            'ခဏေနလ်င္ ျပန္လာၾကည့္ပါ။',
          ],
          callToActionFirst: 'Alternatively, please visit the  ',
          callToActionLinkText: 'ဘီဘီစီ ပင်မ စာမျက်နှာ',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/burmese',
        },
      },
      consentBanner: {
        privacy: {
          title:
            'ကုိယ္ေရးအခ်က္အလက္လုံၿခဳံမႈႏွင့္ ကြတ္ကီးအသုံးျပဳမႈ မူဝါဒမ်ား အသစ္ျပင္ဆင္ထားပါသည္။',
          description: {
            uk: {
              first:
                'ကုိယ္ေရးအခ်က္အလက္လုံၿခဳံမႈႏွင့္ ကြတ္ကီးအသုံးျပဳမႈ မူဝါဒမ်ားတြင္ အေရးႀကီးေသာ အေျပာင္းအလဲအခ်ိဳ႕ျပဳလုပ္ထားသျဖင့္ သုံးစြဲသူမ်ားအေပၚ သက္ေရာက္မႈကို အသိေပးလိုပါသည္။',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'ကုိယ္ေရးအခ်က္အလက္လုံၿခဳံမႈႏွင့္ ကြတ္ကီးအသုံးျပဳမႈ မူဝါဒမ်ားတြင္ အေရးႀကီးေသာ အေျပာင္းအလဲအခ်ိဳ႕ျပဳလုပ္ထားသျဖင့္ သုံးစြဲသူမ်ားအေပၚ သက္ေရာက္မႈကို အသိေပးလိုပါသည္။',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'ေကာင္းပါၿပီ။',
          reject: 'ဘာေတြေျပာင္းလဲသြားသလဲ ၾကည့္ရန္',
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
        },
        cookie: {
          title: 'ကြတ္ကီးမ်ားအသုံးျပဳမႈကို သေဘာတူမတူ ေျပာပါ။',
          description: {
            uk: {
              first:
                'ပရိသတ္မ်ား အြန္လိုင္းတြင္ အေကာင္းဆုံးသုံးႏိုင္ရန္ မိမိတို့',
              linkText: ' ႏွင့္ ကြတ္ကီးမ်ား',
              last:
                'ကို အသုံးျပဳပါသည္။ ယင္းကြတ္ကီးမ်ား အားလုံးကို သေဘာတူမတူ ေျပာျပပါ။',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            international: {
              first: 'ဘီဘီစီႏွင့္ ပါတနာမ်ားသည္ ',
              linkText: ' ႏွင့္ ကြတ္ကီးမ်ား ',
              last:
                ', သုံးေသာ နည္းပညာမ်ားျဖင့္ ပရိသတ္မ်ား အြန္လိုင္းတြင္ အေကာင္းဆုံးၾကည့္ႏိုင္ရန္၊ မိမိတို့ ၾကည့္လိုသည့္ အေၾကာင္းအရာမ်ားၾကည့္ႏိုင္ရန္၊ မိမိတို႔ႏွင့္ ကိုက္ညီမည့္ ေၾကာ္ျငာမ်ားကိုသာ ရရွိရန္ အသုံးျပဳသူ၏ သုံးစြဲပုံေဒတာမ်ားကို ေကာက္ယူပါသည္။ ယင္းသုိ႔ အသုံးျပဳမႈကို သေဘာတူမတူ ေျပာျပပါ။ ',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
          },
          accept: 'သေဘာတူပါသည္။',
          reject: 'သေဘာမတူပါ၊ ဆက္တင္ကို သြားၾကည့္လိုပါသည္။ ',
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
        listen: 'Listen',
        watch: 'Watch',
        liveLabel: 'တိုက်ရိုက်ထုတ်လွှင့်မှု',
        previousRadioShow: 'Previous radio show',
        nextRadioShow: 'Next radio show',
        duration: 'Duration',
      },
    },
    brandSVG,
    mostRead: {
      header: 'အဖတ္အမ်ားဆုံး',
      lastUpdated: 'ေနာက္ဆုံးအသစ္တင္ခ်ိန္: ',
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/news/help-41670342',
        text: 'ဘီဘီစီကို ဘာေၾကာင့္ ယုံၾကည္ႏိုင္သလဲ။',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text:
          'ျပင္ပဝက္ဆိုက္မ်ားကို လင့္ ထည့္ေပးျခင္းႏွင့္ ပတ္သက္ေသာ ဘီဘီစီလုပ္ထုံးလုပ္နည္းကို ဖတ္ရန္။',
      },
      links: [
        {
          href: 'https://www.bbc.com/burmese/institutional-37574842',
          text: 'အသုံးျပဳရန္စည္းမ်ဥ္း',
        },
        {
          href: 'https://www.bbc.com/burmese/institutional-37577521',
          text: 'ကိုယ္ေရးအခ်က္အလက္လုံၿခဳံမႈ မူဝါဒ',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'ကြတ္ကီး',
        },
        {
          href: 'https://www.bbc.com/burmese/institutional-37577525',
          text: 'ဘီီဘီစီကို ဆက္သြယ္ရန္',
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
    navigationSection: 'ကဏ္ဍများ',
  },
};

export default withContext(service);
