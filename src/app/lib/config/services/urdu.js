import {
  C_POSTBOX,
  C_WHITE,
  C_GHOST,
  C_POSTBOX_30,
} from '@bbc/psammead-styles/colours';
import { arabic } from '@bbc/gel-foundations/scripts';
import { urdu as brandSVG } from '@bbc/psammead-assets/svgs';
import {
  F_REITH_QALAM_REGULAR,
  F_REITH_QALAM_BOLD,
} from '@bbc/psammead-styles/fonts';
import '@bbc/moment-timezone-include/tz/Asia/Karachi';
import '@bbc/psammead-locales/moment/ur';
import withContext from '../../../contexts/utils/withContext';

export const service = {
  default: {
    lang: 'ur',
    product: 'BBC News',
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'اپ ڈیٹ کی گئی',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-urdu',
    atiAnalyticsProducerId: '95',
    chartbeatDomain: 'urdu.bbc.co.uk',
    brandName: 'BBC News اردو',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/urdu.png',
    defaultImageAltText: 'BBC News اردو',
    dir: 'rtl',
    externalLinkText: '، بیرونی مواد',
    imageCaptionOffscreenText: '،تصویر کا کیپشن',
    videoCaptionOffscreenText: '،ویڈیو کیپشن',
    audioCaptionOffscreenText: '،آڈیو کیپشن',
    defaultCaptionOffscreenText: '،کیپشن',
    imageCopyrightOffscreenText: '،تصویر کا ذریعہ',
    locale: 'ur',
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'ur',
    datetimeLocale: 'ur',
    service: 'urdu',
    serviceName: 'Urdu',
    languageName: 'Urdu',
    serviceLocalizedName: 'اردو',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcurdu',
    twitterSite: '@bbcurdu',
    noBylinesPolicy:
      'https://www.bbc.com/urdu/institutional-49282935#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/urdu/institutional-49282935',
    isTrustProjectParticipant: true,
    script: arabic,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle:
      'خبریں، تازہ خبریں، بریکنگ نیو | News, latest news, breaking news',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
      brandForegroundColour: `${C_GHOST}`,
      brandHighlightColour: `${C_WHITE}`,
      brandBorderColour: `${C_POSTBOX_30}`,
    },
    translations: {
      ads: {
        advertisementLabel: 'اشتہار',
      },
      seeAll: 'سب دیکھیں',
      home: 'صفحۂ اول',
      currentPage: 'موجودہ صفحہ',
      skipLinkText: 'مواد پر جائیں',
      relatedContent: 'اسی بارے میں',
      navMenuText: 'سیکشن',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      error: {
        404: {
          statusCode: '404',
          title: 'صفحہ دستیاب نہیں',
          message:
            'ہم معذرت خواہ ہیں کہ آپ جو صفحہ تلاش کر رہے ہیں وہ دستیاب نہیں۔ یہ کوشش کر کے دیکھیں:',
          solutions: [
            'یو آر ایل دوبارہ چیک کریں',
            'اپنے براؤزر کو ریفریش کریں',
            'بی بی سی کی سرچ بار کی مدد سے اس صفحے کی تلاش جاری',
          ],
          callToActionFirst: 'متبادل کے طور پر بی بی سی نیوز ',
          callToActionLinkText: 'اردو',
          callToActionLast: ' کے ہوم پیچ پر جائیں.',
          callToActionLinkUrl: 'https://www.bbc.com/urdu',
        },
        500: {
          statusCode: '500',
          title: 'اندرونی سرور کی خرابی',
          message:
            'ہم معذرت خواہ ہیں کہ آپ جو صفحہ تلاش کر رہے ہیں وہ دستیاب نہیں۔ یہ کوشش کر کے دیکھیں:',
          solutions: ['اپنے براؤزر کو ریفریش کریں', 'کچھ دیر بعد کوشش کیجیے'],
          callToActionFirst: 'متبادل کے طور پر بی بی سی نیوز ',
          callToActionLinkText: 'اردو',
          callToActionLast: ' کے ہوم پیچ پر جائیں.',
          callToActionLinkUrl: 'https://www.bbc.com/urdu',
        },
      },
      consentBanner: {
        privacy: {
          title: 'ہم نے اپنی پرائیویسی اور کوکیز پالیسی اپ ڈیٹ کر دی ہے',
          description: {
            uk: {
              first:
                '.ہم نے اپنی پرائیویسی اور کوکیز پالیسیوں میں کچھ اہم تبدیلیاں کی ہیں اور ہم چاہتے ہیں کہ ان کا آپ اور آپ کے ڈیٹا کے لیے کیا مطلب ہے',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                '.ہم نے اپنی پرائیویسی اور کوکیز پالیسیوں میں کچھ اہم تبدیلیاں کی ہیں اور ہم چاہتے ہیں کہ ان کا آپ اور آپ کے ڈیٹا کے لیے کیا مطلب ہے',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'اوکے',
          reject: 'جانیے کہ تبدیلیاں کیا ہیں',
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
        },
        cookie: {
          amp: {
            accept: 'ڈیٹا کلیکشن کو قبول کیجیے اور جاری رکھیے',
            reject: 'ڈیٹا کلیکشن کی درخواست نامنظور کیجیے اور جاری رکھیے',
            initial: {
              title:
                'ہمیں بتائیں کہ آپ اے این پی پر ڈیٹا اکٹھا کرنے پر رضامند ہیں',
              description: {
                first: 'ہم اور ہمارے پارٹنر ٹیکنالوجی جیسے کہ ',
                linkText: 'کوکیز',
                last:
                  ' استعمال کرتے ہوئے براؤزنگ ڈیٹا جمع کرتے ہیں تاکہ آپ کو بہترین آن لائن تجربہ دے سکیں اور مواد اور اشتہارات کو آپ کے لیے مخصوص بنا سکیں۔ ہمیں بتائیے کہ آپ کو اس پر کوئی اعتراض تو نہیں۔',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'اپنی سیٹنگز کو ترتیب دیجیے',
            },
            manage: {
              title:
                'اے ایم پی پیجز پر اجازت دینے سے متعلق سیٹنگز کو ترتیب دیجیے',
              description: {
                para1:
                  'ان سیٹنگز کا اطلاق صرف اے ایم پی پیجز پر ہوتا ہے۔ اگر آپ نان اے ایم پی بی بی بی سی ڈاٹ کام صفحات پر جاتے ہیں تو شاید آپ کو یہ ترجیحات دوبارہ ترتیب دینے کے لیے کہا جا سکتا ہے۔',
                para2:
                  'وہ لائٹ ویٹ موبائل پیج جو آپ نے ملاحظہ کیا وہ گوگل اے ایم پی ٹیکنالوجی کی مدد سے تیار کیا گیا ہے۔',
                heading2: 'انتہائی ضروری ڈیٹا کلیکشن',
                para3:
                  'اپنے ویب صفحات کو جاری رکھنے کے لیے ہم آپ کی رضامندی کے بغیر آپ کے ڈیوائس پر موجود کچھ محدود معلومات محفوظ کرتے ہیں۔',
                para4: {
                  text:
                    'ان محدود معلومات کے بارے میں پڑھیے جو ہم اپنے ویب صفحات کو جاری رکھنے کے لیے محفوظ کرتے ہیں۔',
                  url:
                    'https://www.bbc.co.uk/usingthebbc/strictly-necessary-cookies/',
                },
                para5:
                  'ہم آپ کے ڈیوائس  پر آپ کی رضامندی کی ترجیحات کو محفوظ کرنے کے لیے مقامی سٹوریج کا استعمال کرتے ہیں۔',
                heading3: 'آپشنل (اختیاری) ڈیٹا کلیکشن',
                para6:
                  'جب آپ اے ایم پی پیجز پر ڈیٹا اکھٹا کرنے کی منظوری دیتے ہیں تو آپ ہمیں ان پرسنلائیزڈ اشتہارت کو ڈسپلے کرنے کی اجازت دیتے ہیں، جب آپ یو کے سے باہر ہوں، جو آپ سے متعلقہ ہوں۔',
                para7: {
                  text:
                    'پڑھیے کہ بی بی سی اور ہمارے ایڈورٹائزنگ شراکت دار اشتہارات کو کیسے پرسنلائیز کرتے ہیں۔',
                  url:
                    'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'آپ پرسنلائیزڈ اشتہارات کی درخواست مسترد کر سکتے ہیں اس کے لیے آپ کو ذیل میں موجود ’ڈیٹا کلیکشن نامنظور اور جاری رکھیے‘ کو کلک کرنا ہو گا۔',
                para9:
                  'فوسٹر میں موجود ’ایڈ چوائس، میری معلومات فروخت مت کیجیے‘ کو کلک کر کے آپ سیٹنگز کو تبدیل کر سکتے ہیں۔',
              },
            },
          },
          canonical: {
            title: 'بتائیے کہ آپ کوکیز کے بارے میں متفق ہیں',
            description: {
              uk: {
                first: 'ہم آپ کو بہترین آن لائن تجربہ دینے کے لیے ',
                linkText: 'کوکیز',
                last:
                  ' استعمال کرتے ہیں۔ برائے مہربانی ہمیں بتائیں کہ آپ ان تمام کوکیز کے استعمال سے متفق ہیں',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'ہم اور ہمارے پارٹنر ٹیکنالوجی جیسے کہ ',
                linkText: 'کوکیز',
                last:
                  ' استعمال کرتے ہوئے براؤزنگ ڈیٹا جمع کرتے ہیں تاکہ آپ کو بہترین آن لائن تجربہ دے سکیں اور مواد اور اشتہارات کو آپ کے لیے مخصوص بنا سکیں۔ ہمیں بتائیے کہ آپ کو اس پر کوئی اعتراض تو نہیں۔',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'میں متفق ہوں',
            reject: 'نہیں، مجھے سیٹنگز میں لے جائیں',
            rejectUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'اپ کی ڈیوائس پر پلے بیک سپورٹ دستیاب نہیں',
        contentExpired: 'یہ مواد اب دستیاب نہیں',
        contentNotYetAvailable: 'یہ پروگرام فی الحال دستیاب نہیں۔',
        audio: 'آڈیو',
        photogallery: 'تصاویر',
        video: 'ویڈیو',
        listen: 'سنیں',
        watch: 'دیکھیں',
        liveLabel: 'لائیو',
        nextLabel: 'آگے جائیں',
        previousRadioShow: 'گذشتہ ریڈیو پروگرام',
        nextRadioShow: 'اگلا ریڈیو پروگرام',
        duration: 'دورانیہ',
        recentEpisodes: 'سابق پروگرام',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'ویڈیو کیپشن, ',
          text: 'تنبیہ: دیگر مواد میں اشتہار موجود ہو سکتے ہیں',
        },
        fallback: {
          text: 'مواد دستیاب نہیں ہے',
          linkText: '%provider_name% مزید دیکھنے کے لیے',
          linkTextSuffixVisuallyHidden: ', بیرونی مواد',
          warningText:
            'بی بی سی. بی بی سی بیرونی سائٹس پر شائع شدہ مواد کی ذمہ دار نہیں ہے.',
        },
        skipLink: {
          text: '%provider_name% پوسٹ نظرانداز کریں',
          endTextVisuallyHidden: '%provider_name% پوسٹ کا اختتام',
        },
      },
      include: {
        errorMessage:
          'ہم معذرت خواہ ہیں کہ ہم کہانی کے اس حصے کو اس لائٹ ویٹ موبائل صفحے پر نہیں دکھا سکتے',
        linkText: 'تمام مواد دیکھنے کے لیے اس صفحے کا مکمل ورژن دیکھیں',
      },
      topStoriesTitle: 'اہم خبریں',
      featuresAnalysisTitle: 'فیچر اور تجزیے',
    },
    brandSVG,
    mostRead: {
      header: 'سب سے زیادہ پڑھی جانے والی',
      lastUpdated: 'آخری اپ ڈیٹ',
      numberOfItems: 10,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'سب سے زیادہ دیکھی گئی',
      numberOfItems: 10,
      hasMostWatched: true,
    },
    radioSchedule: {
      hasRadioSchedule: true,
      header: 'ایف ایم بلیٹن',
      durationLabel: '%duration% دورانیہ',
    },
    recommendations: {
      hasStoryRecommendations: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/urdu/institutional-49282935',
        text: 'جانیے کہ آپ بی بی سی پر کیوں اعتماد کر سکتے ہیں',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text: 'بیرونی لنکس کے بارے میں ہماری پالیسی.',
      },
      links: [
        {
          href: 'https://www.bbc.com/urdu/institutional-37588278',
          text: 'استعمال کے ضوابط',
        },
        {
          href: 'https://www.bbc.com/urdu/institutional-37588280',
          text: 'بی بی سی کے بارے میں',
        },
        {
          href: 'https://www.bbc.com/urdu/institutional-37588282',
          text: 'پرائیویسی پالیسی',
        },
        {
          href:
            'https://www.bbc.co.uk/privacy/cookies/managing/cookie-settings.html',
          text: 'کوکیز',
        },
        {
          href: 'https://www.bbc.co.uk/send/u50853907',
          text: 'بی بی سی سے رابطہ کریں',
        },
        {
          href:
            'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'بی بی سی. بی بی سی بیرونی ویب سائٹس کے مواد کا ذمہ دار نہیں',
    },
    fonts: [F_REITH_QALAM_REGULAR, F_REITH_QALAM_BOLD],
    timezone: 'Asia/Karachi',
    navigation: [
      {
        title: 'صفحۂ اول',
        url: '/urdu',
      },
      {
        title: 'پاکستان',
        url: '/urdu/topics/cjgn7n9zzq7t',
      },
      {
        title: 'آس پاس',
        url: '/urdu/topics/cl8l9mveql2t',
      },
      {
        title: 'ورلڈ',
        url: '/urdu/topics/cw57v2pmll9t',
      },
      {
        title: 'کھیل',
        url: '/urdu/topics/c340q0p2585t',
      },
      {
        title: 'فن فنکار',
        url: '/urdu/topics/ckdxnx900n5t',
      },
      {
        title: 'سائنس',
        url: '/urdu/topics/c40379e2ymxt',
      },
      {
        title: 'ویڈیو',
        url: '/urdu/media/video',
      },
    ],
  },
};

export default withContext(service);
