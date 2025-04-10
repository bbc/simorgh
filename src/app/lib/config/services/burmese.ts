import burmese from '../../../components/ThemeProvider/fontScripts/burmese';
import '#psammead/moment-timezone-include/tz/GMT';
import withContext from '../../../contexts/utils/withContext';
import 'moment/locale/my';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: `my`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'အသစ်တင်ချိန်',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-burmese',
    atiAnalyticsProducerId: '35',
    atiAnalyticsProducerName: 'BURMESE',
    useReverb: true,
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
    manifestPath: '/burmese/manifest.json',
    swPath: '/sw.js',
    homePageTitle:
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
    translations: {
      pagination: {
        page: 'စာမျက်နှာ',
        previousPage: 'နောက်သို့ပြန်သွားရန်',
        nextPage: 'ရှေ့သို့သွားရန်',
        pageXOfY: 'စာမျက်နှာ {x} ရဲ့ {y}',
      },
      ads: {
        advertisementLabel: 'ကြော်ငြာ',
      },
      seeAll: 'အားလုံးကြည့်ရန်',
      home: 'ပင်မစာမျက်နှာ',
      currentPage: 'လက်ရှိကြည့်နေသော စာမျက်နှာ',
      skipLinkText: 'အကြောင်းအရာများဆီ ကျော်သွားရန်',
      relatedContent: 'ဒီသတင်းနဲ့ ပတ်သက်သမျှ',
      relatedTopics: 'ဆက်စပ်အကြောင်းအရာများ',
      navMenuText: 'ကဏ္ဍများ',
      liteSite: {
        onboardingMessage: `ဒေတာကုန်ကျမှုလျှော့ချနိုင်ရန်အတွက် ယခုဝက်ဘ်ဆိုက်မှ စာမျက်နှာများကို ရုပ်ပုံမပါ စာသားဖြင့်သာတင်ဆက်ပေးထားပါသည်။ ရုပ်ပုံ ဗီဒီယိုများနှင့် ကြည့်လိုလျှင် မူလစာမျက်နှာတွင်ကြည့်နိုင်ပါသည်။`,
        toMainSite: 'ပင်မဝက်ဘ်ဆိုက်သို့သွားရန်။',
        informationPage:
          'ဒေတာကုန်ကျမှုသက်သာစေသည့် ဤဝက်ဘ်ဆိုက်အကြောင်းထပ်မံသိလိုလျှင်',
        informationPageLink:
          'https://www.bbc.com/burmese/articles/cwy69wyx71go',
        dataSaving: 'ဒေတာကုန်ကျမှုသက်သာစေသည့် ဝက်ဘ်စာမျက်နှာ',
        articleDataSavingLinkText: 'ဒေတာကုန်ကျမှုသက်သာအောင် စာသားသက်သက်ဖတ်ရန်',
      },
      mediaAssetPage: {
        mediaPlayer: 'မီဒီယာ ပလေယာ',
        audioPlayer: 'အသံဖိုင်ပလေယာ',
        videoPlayer: 'ဗီဒီယို ပလေယာ',
      },
      liveExperiencePage: {
        liveLabel: 'တိုက်ရိုက်',
        liveCoverage: 'တိုက်ရိုက် ထုတ်လွှင့်ချက်',
        breaking: 'သတင်းထူး',
        postedAt: 'ပို့စ် တင်တဲ့အချိန်',
        summary: 'အနှစ်ချုပ်',
        shareButtonText: 'ဝေမျှပါ',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'အနှစ်ချုပ်',
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
      byline: {
        articleInformation: 'ဆောင်းပါးအချက်အလက်',
        author: 'ရေးသားသူ',
        listItemImage: 'ရုပ်ပုံ ',
        published: 'ရေးသားခဲ့သည်။',
        reportingFrom: 'ရေးသားပေးပို့သည့်နေရာ',
        role: 'ရာထူးတာဝန်',
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
          rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
        },
        cookie: {
          amp: {
            accept: 'အချက်အလက်ကောက်ယူခြင်းကို သဘောတူပြီး ရှေ့ဆက်ကြည့်ရန်',
            reject: 'အချက်အလက်ကောက်ယူခြင်းကို သဘောမတူဘဲ ရှေ့ဆက်ကြည့်ရန်',
            initial: {
              title: 'AMP တွင် အချက်အလက်ကောက်ယူခြင်းကို သဘောတူ မတူပြောပါ။',
              description: {
                first: 'ဘီဘီစီနှင့် ပါတနာများသည် ',
                linkText: ' နှင့် ကွတ်ကီးများ ',
                last: ' သုံးသော နည်းပညာများဖြင့် ပရိသတ်များ အွန်လိုင်းတွင် အကောင်းဆုံးကြည့်နိုင်ရန်၊ မိမိတို့ ကြည့်လိုသည့် အကြောင်းအရာများကြည့်နိုင်ရန်၊ မိမိတို့နှင့် ကိုက်ညီမည့် ကြော်ငြာများကိုသာ ရရှိရန် အသုံးပြုသူ၏ သုံးစွဲပုံဒေတာများကို ကောက်ယူပါသည်။ ယင်းသို့ အသုံးပြုမှုကို သဘောတူမတူ ပြောပြပါ။',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'လိုလားချက်များကို သတ်မှတ်/ပြောင်းလဲရန်',
            },
            manage: {
              title:
                'AMP စာမျက်နှာများပေါ်တွင် သဘောတူခွင့်ပြုချက်များပြောင်းလဲရန်',
              description: {
                para1:
                  'ယခုသတ်မှတ်ချက်များမှာ AMP စာမျက်နှာများအတွက်သာဖြစ်သည်။ AMP မဟုတ်သည့် အခြား ဘီဘီစီစာမျက်နှာများ သွားကြည့်လျင် မိမိစိတ်ကြိုက်သတ်မှတ်ချက်များကို ပြန်လည်ပြောင်းလဲခိုင်းနိုင်ပါသည်။',
                para2:
                  'သင်ဝင်ကြည့်ခဲ့သော ပေါ့ပါးသည့်မိုဘိုင်းစာမျက်နှာမှာ ဂူဂဲလ်၏ AMP နည်းပညာကို သုံးထားပါသည်။',
                heading2: 'မဖြစ်မနေလိုအပ်သော အချက်အလက်ကောက်ယူခြင်း',
                para3:
                  'မိမိတို့၏စာမျက်နှာများအလုပ်လုပ်နိုင်ရန် သင်အသုံးပြုသောစက်ထဲတွင် အချက်အလက်အနည်းငယ်ကို သင့်ခွင့်ပြုချက်မပါဘဲ သိုမှီးထားပါသည်။',
                para4: {
                  text: 'မိမိတို့စာမျက်နှာများအလုပ်လုပ်ရန် မရှိမဖြစ်လိုအပ်သောအချက်များ သင့်စက်ထဲတွင် သိုမှီးထားခြင်းနှင့်ပတ်သက်၍ နောက်ထပ်သိလိုပါက ဖတ်ရှုရန်',
                  url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
                },
                para5:
                  'သင်သဘောတူထားသောနှစ်ခြိုက်သည့်ပုံစံများကို သင့်စက်ထဲတွင် သိမ်းဆည်းထားပါသည်။',
                heading3: 'နောက်ထပ် အချက်အလက်ကောက်ယူခြင်း',
                para6:
                  'AMP စာမျက်နှာများပေါ်တွင်အချက်အလက်ကောက်ယူခြင်းကို သင့်ဘက်မှသဘောတူခဲ့လျှင် သင်ယူကေအပြင်ဘက်တွင်ရှိစဉ် သင့်အတွက်သီးသန့်ပို့သော ကြော်ငြာများကို ပြသရန်လည်း မိမိတို့အား သဘောတူ ခွင့်ပြုခြင်းဖြစ်ပါသည်။',
                para7: {
                  text: 'ဘီဘီစီနှင့် မိမိတို့၏ မိတ်ဖက်ကြော်ငြာရှင်များက သီးသန့်ကြော်ငြာများမည်သို့ပြုလုပ်သည်ကို နောက်ထပ်ဖတ်ရှုရန်',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'မိမိအတွက်သီးသန့်ပေးပို့သော ကြော်ငြာများမရရှိလိုလျင် “အချက်အလက်ကောက်ခံခြင်းကို လက်မခံပဲ ဆက်ကြည့်မည်” ဆိုသောနေရာကို နှိပ်ပါ။ သင်ကြော်ငြာများကိုတော့ဆက်တွေ့နေရပါမည်၊ သို့သော်ကိုယ့်အတွက် သီးသန့်ပေးပို့မှုများရှိမည်မဟုတ်ပါ။',
                para9:
                  'ယခုစိတ်ကြိုက်သတ်မှတ်ချက်များကို ပြောင်းလဲလိုလျင် စာမျက်နှာအောက်ခြေတွင်ရှိသော “ကြော်ငြာရွေးချယ်မှု/ မိမိ၏အချက်အလက်များကို ရောင်းချခြင်းမပြုရန်” ဆိုသည်ကို အချိန်မရွေးနှိပ်၍ ပြောင်းနိုင်ပါသည်။',
              },
            },
          },
          canonical: {
            title: 'ကွတ်ကီးများအသုံးပြုမှုကို သဘောတူမတူ ပြောပါ။',
            description: {
              uk: {
                first:
                  'ပရိသတ်များ အွန်လိုင်းတွင် အကောင်းဆုံးသုံးနိုင်ရန် မိမိတို့ ',
                linkText: 'နှင့် ကွတ်ကီးများ',
                last: ' ကို အသုံးပြုပါသည်။ ယင်းကွတ်ကီးများ အားလုံးကို သဘောတူမတူ ပြောပြပါ။',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first:
                  'ပရိသတ်များ အွန်လိုင်းတွင် အကောင်းဆုံးသုံးနိုင်ရန် မိမိတို့ ',
                linkText: 'နှင့် ကွတ်ကီးများ',
                last: ' ကို အသုံးပြုပါသည်။ ယင်းကွတ်ကီးများ အားလုံးကို သဘောတူမတူ ပြောပြပါ။',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'သဘောတူပါသည်။',
            reject: 'သဘောမတူပါ၊ ဆက်တင်ကို သွားကြည့်လိုပါသည်။',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'သငျ့စကျတှငျ ဒီမီဒီယာဖိုငျကို ဖှငျ့၍ မရပါ။',
        contentExpired: 'ဒီအစီအစဉျမရှိတော့ပါဘူး။',
        contentNotYetAvailable: 'ဒီအစီအစဉ်ကြည့်ရန် အဆင်သင့် မဖြစ်သေးပါ၊',
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
        listenLive: 'တိုက်ရိုက်နားဆင်ရန်',
        listenNext: 'နောက်ထပ်နားဆင်ရန်',
        liveLabel: 'တိုက်ရိုက်ထုတ်လွှင့်မှု',
        nextLabel: 'နောက်တစ်ခုသို့',
        previousRadioShow: 'ယခင် ရေဒီယိုအစီအစဉ်',
        nextRadioShow: 'နောက် ရေဒီယိုအစီအစဉ်',
        duration: 'ကြာမြင့်ချိန်',
        recentEpisodes: 'ထုတ်လွှင့်ပြီး အစီအစဉ်မျာ',
        podcastExternalLinks: 'ဒီပေါ့ဒ်ကတ်စ်ကို နောက်ထပ်ရနိုင်သည့်နေရာ',
        download: 'ဒေါင်းလုပ်လုပ် ရယူရန်',
        closeVideo: 'ပိတ်မယ်',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'ဗီဒီယို ပုံစာ - ',
          text: 'သတိပေးချက်- ဘီဘီစီပြင်ပ ဝက်ဆိုက်များမှ ဖော်ပြချက်များတွင် ကြော်ငြာများပါနိုင်ပါသည်။',
          articleText:
            'သတိပေးချက်- ပြင်ပဝက်ဆိုက်များတွင်ပါဝင်သောအကြောင်းအရာများအတွက် ဘီဘီစီကတာဝန်မယူပါ။',
          articleAdditionalText:
            '%provider_name% တွင်ကြော်ငြာများပါဝင်နိုင်ပါသည်။',
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
        consentBanner: {
          heading: '[social_media_site] ၏အကြောင်းအရာများကို ပြခွင့်ပြုမှာလား။',
          body: `ယခုဆောင်းပါးတွင် [social_media_site] မှ အကြာင်းအရာများပါဝင်ပါသည်။ ယင်းဆိုက်မှ ကွတ်ကီးနှင့်အခြားနည်းပညာများသုံးနိုင်သဖြင့် စာမျက်နှာကို မဖွင့်ခင် သင့်ခွင့်ပြုချက်ကိုတောင်းခံပါသည်။ သင်မဆုံးဖြတ်ခင် [social_media_site] [link] ကွတ်ကီးမူဝါဒ [/link] နှင့် [link] ကိုယ်ရေးအချက်အလက်လုံခြုံမှု မူဝါဒ [/link] တို့ကို ဖတ်ရှုနိုင်ပါသည်။ သဘောတူလျင် 'လက်ခံပြီးဆက်သွားပါမည်' ဆိုသည်ကို ရွေးချယ်ပေးပါ။`,
          button: 'သဘောတူပြီးရှေ့ဆက်ကြည့်ရန်',
        },
      },
      include: {
        errorMessage:
          'Sorry, we can’t display this part of the story on this lightweight mobile page.',
        linkText: 'View the full version of the page to see all the content.',
      },
      topStoriesTitle: 'ထိပ်တန်း သတင်းများ',
      featuresAnalysisTitle: 'ဆောင်းပါး',
      latestMediaTitle: 'နောက်ဆုံးရ',
    },
    mostRead: {
      header: 'အဖတ်အများဆုံး',
      lastUpdated: 'နောက်ဆုံးအသစ်တင်ချိန်:',
      numberOfItems: 5,
      hasMostRead: true,
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
          href: 'https://www.bbc.com/ws/languages',
          text: 'အခြားဘာသာစကားနှင့် ဘီဘီစီသတင်းများ',
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
        title: 'မြန်မာငလျင်',
        url: '/burmese/topics/c793wppj0r1t',
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
        hideOnLiteSite: true,
      },
    ],
  },
};

export default withContext(service);
