import bengali from '../../../components/ThemeProvider/fontScripts/bengali';
import '#psammead/moment-timezone-include/tz/Asia/Dhaka';
import '#psammead/psammead-locales/moment/bn';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: `bn`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'আপডেট হয়েছে',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-bengali',
    atiAnalyticsProducerId: '31',
    atiAnalyticsProducerName: 'BENGALI',
    useReverb: true,
    chartbeatDomain: 'bengali.bbc.co.uk',
    brandName: 'BBC News বাংলা',
    product: 'BBC News',
    serviceLocalizedName: 'বাংলা',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/bengali.png',
    defaultImageAltText: 'BBC News বাংলা',
    dir: `ltr`,
    externalLinkText: ', বাইরের',
    imageCaptionOffscreenText: 'ছবির ক্যাপশান, ',
    videoCaptionOffscreenText: 'ভিডিওর ক্যাপশান, ',
    audioCaptionOffscreenText: 'অডিওর ক্যাপশান, ',
    defaultCaptionOffscreenText: 'ক্যাপশান, ',
    imageCopyrightOffscreenText: 'ছবির উৎস, ',
    locale: `bn-BD`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'bn',
    datetimeLocale: `bn`,
    service: 'bengali',
    serviceName: 'Bengali',
    languageName: 'Bengali',
    twitterCreator: '@bbcbangla',
    twitterSite: '@bbcbangla',
    noBylinesPolicy:
      'https://www.bbc.com/bengali/institutional-50409861#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/bengali/institutional-50409861',
    isTrustProjectParticipant: true,
    script: bengali,
    manifestPath: '/bengali/manifest.json',
    swPath: '/sw.js',
    homePageTitle:
      'খবর, সর্বশেষ খবর, ব্রেকিং নিউজ | News, latest news, breaking news',
    showAdPlaceholder: true,
    showRelatedTopics: true,
    googleSiteVerification: 'D-aEHUiyVaMoUJXjVRbDVkxS0dLTMUZLD3dLPTnWO4Q',
    translations: {
      pagination: {
        page: 'পৃষ্ঠা',
        previousPage: 'ফিরে যাব',
        nextPage: 'পরবর্তী',
        pageXOfY: 'পৃষ্ঠা {x} এর মধ্যে {y}',
      },
      ads: {
        advertisementLabel: 'বিজ্ঞাপন',
      },
      recommendationTitle: 'Recommended articles',
      seeAll: 'সবগুলো খবর দেখুন',
      home: 'মূলপাতা',
      currentPage: 'বর্তমান পেজ',
      skipLinkText: 'সরাসরি কনটেন্টে যান',
      relatedContent: 'এই খবর নিয়ে আরো তথ্য',
      relatedTopics: 'সম্পর্কিত বিষয়',
      navMenuText: 'সেকশন',
      mediaAssetPage: {
        mediaPlayer: 'মিডিয়া প্লেয়ার',
        audioPlayer: 'অডিও প্লেয়ার',
        videoPlayer: 'ভিডিও প্লেয়ার',
      },
      liveExperiencePage: {
        liveLabel: 'লাইভ',
        liveCoverage: 'সরাসরি কভারেজ',
        breaking: 'ব্রেকিং',
        postedAt: 'পোস্ট করা হয়েছে',
        summary: 'সার সংক্ষেপ',
        shareButtonText: 'শেয়ার করুন',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'সার সংক্ষেপ',
      error: {
        404: {
          statusCode: '৪০৪',
          title: 'পেজ খুঁজে পাওয়া যায়নি।',
          message:
            'দু:খিত, যে পেজটি আপনি খুঁজছেন সেটি আমরা দেখাতে পারছি না। দয়া করে আবার চেষ্টা করুন।',
          solutions: [
            'ইউআরএল-টি আবার যাচাই করা হচ্ছে।',
            "আপনার ব্রাউজারে 'রিফ্রেশ' বাটনটিতে চাপ দেয়া হয়েছে।",
            'বিবিসি সার্চ বার ব্যবহার করে পেজটি খোঁজা হচ্ছে।',
          ],
          callToActionFirst: 'বিকল্প হিসাবে ',
          callToActionLinkText: 'BBC News বাংলা',
          callToActionLast: ' র হোমপেজ-এ যান।',
          callToActionLinkUrl: 'https://www.bbc.com/bengali',
        },
        500: {
          statusCode: '৫০০',
          title: 'ইন্টারনাল সার্ভারে ক্রুটি আছে।',
          message:
            'দুু:খিত, আপনি যে পেজটি খুঁজছেন, সেটি এই মুহূর্তে আমরা দেখাতে পারছি না। আবার চেষ্টা করুন।',
          solutions: [
            "আপনার ব্রাউজারে 'রিফ্রেশ' বাটনে চাপ দেয়া হয়েছে।",
            'পরে আবার ফেরত আসছি।',
          ],
          callToActionFirst: 'বিকল্প হিসাবে ',
          callToActionLinkText: 'BBC News বাংলা',
          callToActionLast: ' র হোমপেজ-এ যান।',
          callToActionLinkUrl: 'https://www.bbc.com/bengali',
        },
      },
      consentBanner: {
        privacy: {
          title: 'আমরা আমাদের প্রিভেসি এবং কুকি বিষয়ক নীতিমালা আপডেট করেছি।',
          description: {
            uk: {
              first:
                'আমাদের প্রিভেসি এবং কুকি নীতিমালায় আমরা কিছু গুরুত্বপূর্ণ পরিবর্তন এনেছি।  আপনার এবং আপনার ব্যবহৃত ডেটার জন্য এই পরিবর্তনের অর্থ কী সেটা আমরা আপনাকে জানাতে চাই।',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'আমাদের প্রিভেসি এবং কুকি নীতিমালায় আমরা কিছু গুরুত্বপূর্ণ পরিবর্তন এনেছি।  আপনার এবং আপনার ব্যবহৃত ডেটার জন্য এই পরিবর্তনের অর্থ কী সেটা আমরা আপনাকে জানাতে চাই।',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'ঠিক আছে।',
          reject: 'কী পরিবর্তন হয়েছে দেখুন।',
          rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
        },
        cookie: {
          amp: {
            accept: 'ডেটা সংগ্রহের বিষয়ে সম্মতি দেবার ও এগিয়ে যাবার বোতাম',
            reject: 'ডেটা সংগ্র্রহ প্রত্যাখান করা ও এগিয়ে যাবার বোতাম',
            initial: {
              title:
                'আমাদের জানান যে এএমপি (AMP) যেসব তথ্য সংগ্রহ করছে তাতে আপনার সম্মতি আছে।',
              description: {
                first:
                  'আমরা এবং আমাদের পার্টনাররা যে প্রযুক্তি ব্যবহার করি যেমন এই ',
                linkText: 'কুকিগুলো',
                last: ' তাতে অনলাইনে আপনার বিচরণ স্বচ্ছন্দ হয় এবং শুধু আপনার পছন্দমত বিষয় ও বিজ্ঞাপন যাতে আপনি দেখেন তার জন্য আপনার ব্রাউজিং ডেটা সংগ্রহ করা হয়। আপনি এতে সম্মতি দিচ্ছেন কিনা জানান।',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'আমার সেটিং ম্যানেজ করার বোতাম',
            },
            manage: {
              title: 'এএমপি পেজে সম্মতিদান বিষয়ে সেটিং ম্যানেজ',
              description: {
                para1:
                  'এই সেটিং শুধু এএমপি পেজের ক্ষেত্রে প্রযোজ্য। এএমপি নয় বিবিসির এমন পেজ দেখার সময় আপনাকে আবার আপনার পছন্দ সেট করার জন্য অনুরোধ করা হতে পারে।',
                para2:
                  'মোবাইলে যে হালকা পেজ আপনি দেখছেন তা গুগলের এএমপি প্রযুক্তি ব্যবহার করে তৈরি করা হয়েছে।',
                heading2: 'এই তথ্যগুলো সংগ্রহ করা একেবারে জরুরি',
                para3:
                  'আমাদেের ওয়েবপেজ যাতে ঠিকমত কাজ করে তার জন্য আপনার সম্মতি ছাড়াই আপনার ডিভাইসে সীমিত কিছু তথ্য আমরা সংগ্রহ করে রেখেছি।',
                para4: {
                  text: 'আমাদের ওয়েবপেজ যাতে কাজ করে তার জন্য আপনার ডিভাইসে জরুরি যেসব তথ্য আমরা মজুত রেখেছি সেগুলো এখানে পড়তে পারবেন',
                  url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
                },
                para5:
                  'আপনার ডিভাইসে আপনার পছন্দ সংক্রান্ত সম্মতিগুলো আমরা স্থানীয়ভাবে মজুত করে রেখেছি।',
                heading3: 'ঐচ্ছিক ডেটা সংগ্রহ',
                para6:
                  'এএমপি পেজে ডেটা সংগ্রহের সম্মতি দেবার মাধ্যমে আপনি ব্যক্তিগতভাবে বাছাই করা প্রাসঙ্গিক বিজ্ঞাপনগুলো আপনাকে দেখানোর অনুমতি আমাদের দিচ্ছেন। এগুলো প্রযোজ্য হবে আপনি যুক্তরাজ্যের বাইরে থাকলে।',
                para7: {
                  text: 'বিবিসি এবং আমাদের পার্টনার বিজ্ঞাপনদাতারা কীভাবে আপনার জন্য প্রাসঙ্গিক বিজ্ঞাপন বাছাই করে সে বিষয়ে এখানে বিস্তারিত পড়তে পারেন।',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  "আপনি যদি আপনার জন্য প্রাসঙ্গিক বিজ্ঞাপনগুলো দেখতে না চান তাহলে নিচে \"ডেটা সংগ্রহ প্রত্যাখান ও এগুনো''র জন্য  ক্লিক করুন। মনে রাখবেন এর পরেও আপনি বিজ্ঞাপন দেখতে পাবেন, কিন্তু সেই বিজ্ঞাপনগুলো আপনার বাছাই করা বা প্রাসঙ্গিক বিষয়ের হবে না।",
                para9:
                  "নিচের ''অ্যাড চয়েস / ডু নট সেল ইনফো''তে ক্লিক করে আপনি যে কোন সময়ে বিজ্ঞাপন বেছে নিতে আপনার সেটিং বদল করতে পারেন।",
              },
            },
          },
          canonical: {
            title: 'আপনি কুকিগুলো ব্যবহারের সম্মতি দিচ্ছেন সেটা আমাদের জানান।',
            description: {
              uk: {
                first: 'আমরা ',
                linkText: 'কুকি',
                last: ' ব্যবহার করি যাতে অনলাইনে আপনার বিচরণ স্বচ্ছন্দ হয়।সবগুলো কুকি ব্যবহারের জন্য আপনি সম্মতি দিচ্ছেন কিনা জানান।',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'আমরা ',
                linkText: 'কুকি',
                last: ' ব্যবহার করি যাতে অনলাইনে আপনার বিচরণ স্বচ্ছন্দ হয়।সবগুলো কুকি ব্যবহারের জন্য আপনি সম্মতি দিচ্ছেন কিনা জানান।',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'হ্যাঁ, আমি সম্মতি দিচ্ছি।',
            reject: 'না, আমাকে সেটিং-এ ফেরত নিয়ে যান।',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'আপনার ডিভাইস মিডিয়া প্লেব্যাক সমর্থন করে না',
        contentExpired: 'এই ফাইলটি আর পাওয়া যাবে না',
        contentNotYetAvailable: 'এই ফাইলটি এখনও বাজানোর জন্য তৈরি নয়',
        audio: 'অডিও',
        photogallery: 'ফটো গ্যালারি',
        video: 'ভিডিও',
        bbc_bangla_radio: {
          title: 'বিবিসি বাংলা',
          subtitle:
            'বাংলাদেশ, তার প্রতিবেশী এবং গোটা বিশ্বের সংবাদ পরিবেশন করে। সংবাদদাতার প্রতিবেদন ছাড়াও আছে সাক্ষাৎকার, সংবাদপত্র পর্যালোচনা এবং সরাসরি ফোন-ইন।',
        },
        listen: 'শুনুন',
        watch: 'দেখুন',
        liveLabel: 'লাইভ',
        nextLabel: 'পরবর্তী',
        previousRadioShow: 'পূর্ববর্তী রেডিও অনুষ্ঠান',
        nextRadioShow: 'পরবর্তী রেডিও অনুষ্ঠান',
        duration: 'স্থিতিকাল',
        recentEpisodes: 'পুরনো অনুষ্ঠান',
        closeVideo: 'বন্ধ করুন',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'ভিডিওর ক্যাপশান: ',
          text: 'সতর্কবাণী: তৃতীয়পক্ষের কন্টেন্টে বিজ্ঞাপন থাকতে পারে',
          articleText:
            'সতর্কবাণী: বিবিসির নয় এমন ওয়েবসাইটের কনটেন্টের জন্য বিবিসি দায়ী না',
          articleAdditionalText: '%provider_name% কনটেন্টে বিজ্ঞাপন থাকতে পারে',
        },
        fallback: {
          text: 'ছবির কপিরাইট',
          linkText: '%provider_name% -এ আরো দেখুন',
          linkTextSuffixVisuallyHidden: ', বিবিসির বাইরের খবর',
          warningText:
            'বিবিসি। বাইরের কোন সাইটের তথ্যের জন্য বিবিসি দায়বদ্ধ নয়।',
        },
        skipLink: {
          text: 'Skip %provider_name% post',
          endTextVisuallyHidden: 'End of %provider_name% post',
        },
        consentBanner: {
          heading: '[social_media_site] কনটেন্টের জন্য কি অনুমতি দেবেন?',
          body: `এই নিবন্ধে [social_media_site]এর কনটেন্ট রয়েছে। কোন কিছু লোড করার আগে আমরা আপনার অনুমতি চাইছি, কারণ তারা হয়ত কুকি এবং অন্যান্য প্রযুক্তি ব্যবহার করে থাকতে পারে।  আপনি সম্মতি দেবার আগে হয়ত [social_media_site] [link] কুকি সম্পর্কিত নীতি [/link] এবং [link] ব্যক্তিগত বিষয়ক নীতি[/link] প়ড়ে নিতে চাইতে পারেন। এই কনটেন্ট দেখতে হলে 'সম্মতি দিচ্ছি এবং এগোন' বেছে নিন।`,
          button: 'সম্মতি দিচ্ছি এবং এগোন',
        },
      },
      include: {
        errorMessage:
          'Sorry, we can’t display this part of the story on this lightweight mobile page.',
        linkText: 'View the full version of the page to see all the content.',
      },
      topStoriesTitle: 'প্রধান খবর',
      featuresAnalysisTitle: 'নির্বাচিত খবর',
      latestMediaTitle: 'সর্বশেষ',
    },
    mostRead: {
      header: 'সর্বাধিক পঠিত',
      lastUpdated: 'সর্বশেষ আপডেট হয়েছে:',
      numberOfItems: 5,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: true,
      header: 'রেডিও অনুষ্ঠান',
      durationLabel: 'স্থিতিকাল %duration%',
    },
    recommendations: {
      hasStoryRecommendations: true,
      skipLink: {
        text: 'Skip %title% and continue reading',
        endTextVisuallyHidden: 'End of %title%',
      },
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/bengali/institutional-50409861',
        text: 'বিবিসির ওপর কেন আপনি আস্থা রাখতে পারেন',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'বাইরের লিংক সম্পর্কে বিবিসির দৃষ্টিভঙ্গি সম্বন্ধে পড়ুন।',
      },
      links: [
        {
          href: 'https://www.bbc.com/bengali/institutional-37289190',
          text: 'ব্যবহারের শর্তাবলী',
        },
        {
          href: 'https://www.bbc.com/bengali/institutional-37289764',
          text: 'বিবিসি সম্পর্কে',
        },
        {
          href: 'https://www.bbc.com/bengali/institutional-37289766',
          text: 'প্রিভেসি নীতি',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'কুকিজ',
        },
        {
          href: 'https://www.bbc.co.uk/bengali/send/u50853247',
          text: 'বিবিসির সাথে যোগাযোগ করুন',
        },
        {
          href: 'https://www.bbc.com/ws/languages',
          text: 'অন্যান্য ভাষায় বিবিসির সংবাদ',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'বিবিসি। বাইরের কোন সাইটের তথ্যের জন্য বিবিসি দায়বদ্ধ নয়।',
    },
    timezone: 'Asia/Dhaka',
    navigation: [
      {
        title: 'মূলপাতা',
        url: '/bengali',
      },
      {
        title: 'রাজনীতি',
        url: '/bengali/topics/cqywj91rkg6t',
      },
      {
        title: 'সর্বাধিক পঠিত',
        url: '/bengali/popular/read',
      },
      {
        title: 'বিশ্ব',
        url: '/bengali/topics/c907347rezkt',
      },
      {
        title: 'অর্থনীতি',
        url: '/bengali/topics/cjgn7233zk5t',
      },
      {
        title: 'স্বাস্থ্য',
        url: '/bengali/topics/cg7265yyxn1t',
      },
      {
        title: 'খেলা',
        url: '/bengali/topics/cdr56g57y01t',
      },
      {
        title: 'প্রযুক্তি',
        url: '/bengali/topics/c8y94k95v52t',
      },
      {
        title: 'ভিডিও',
        url: '/bengali/topics/cxy7jg418e7t',
      },
    ],
  },
};

export default withContext(service);
