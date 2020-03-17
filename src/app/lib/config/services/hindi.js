import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { devanagariAndGurmukhi } from '@bbc/gel-foundations/scripts';
import { hindi as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/Asia/Kolkata';
import '@bbc/psammead-locales/moment/hi';
import withContext from '../../../contexts/utils/withContext';

export const service = {
  default: {
    ads: {
      hasAds: false,
    },
    lang: `hi`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'अपडेटेड',
    atiAnalyticsAppName: 'news-hindi',
    atiAnalyticsProducerId: '52',
    chartbeatDomain: 'hindi.bbc.co.uk',
    brandName: 'BBC News हिंदी',
    product: 'BBC News',
    serviceLocalizedName: 'हिंदी',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/hindi.png',
    defaultImageAltText: 'BBC News हिंदी',
    dir: `ltr`,
    externalLinkText: ', बाहरी सामग्री',
    imageCaptionOffscreenText: 'इमेज कैप्शन, ',
    videoCaptionOffscreenText: 'वीडियो कैप्शन, ',
    audioCaptionOffscreenText: 'ऑडियो कैप्शन, ',
    defaultCaptionOffscreenText: 'कैप्शन, ',
    imageCopyrightOffscreenText: 'इमेज स्रोत, ',
    locale: `hi-IN`,
    datetimeLocale: `hi`,
    service: 'hindi',
    serviceName: 'Hindi',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbchindi',
    twitterSite: '@bbchindi',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    isTrustProjectParticipant: true,
    script: devanagariAndGurmukhi,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle:
      'ब्रेकिंग न्यूज़ समाचार, ताजा खबर | News, latest news, breaking news',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      seeAll: 'सब देखें',
      home: 'होम पेज',
      currentPage: 'मौजूदा पन्ना',
      skipLinkText: 'सामग्री को स्किप करें',
      relatedContent: 'संबंधित समाचार',
      navMenuText: 'सेक्शन',
      mediaAssetPage: {
        mediaPlayer: 'मीडिया प्लेयर',
        audioPlayer: 'ऑडिया प्लेयर',
        videoPlayer: 'वीडियो प्लेयर',
      },
      error: {
        404: {
          statusCode: '404',
          title: 'पेज नहीं मिला',
          message:
            'माफ़ी चाहते हैं, जो वह पन्ना नहीं दिखा पा रहे हैं जिसे आप ढूँढ रहे हैं. कृपया कोशिश करें:',
          solutions: [
            'URL को दोबारा जांचने की',
            'ब्राउज़र का रिफ़्रेश बटन दबाएं',
            'इस पेज को बीबीसी सर्च बार खोलकर खोजने की कोशिश करें',
          ],
          callToActionFirst: 'विकल्प के तौर पर हमारे ',
          callToActionLinkText: 'होमपेज',
          callToActionLast: 'पर जाएं',
          callToActionLinkUrl: 'https://www.bbc.com/hindi',
        },
        500: {
          statusCode: '500',
          title: 'इंटरनल सर्वर एरर',
          message:
            'माफ़ी चाहते हैं, जो वह पन्ना नहीं दिखा पा रहे हैं जिसे आप ढूँढ रहे हैं. कृपया कोशिश करें:',
          solutions: [
            'ब्राउज़र का रिफ़्रेश बटन दबाएं',
            'कुछ समय बाद कोशिश करें',
          ],
          callToActionFirst: 'विकल्प के तौर पर हमारे ',
          callToActionLinkText: 'होमपेज',
          callToActionLast: 'पर जाएं',
          callToActionLinkUrl: 'https://www.bbc.com/hindi',
        },
      },
      consentBanner: {
        privacy: {
          title: 'हमने अपनी गोपनीयता और कुकीज़ की नीति को अपडेट किया है',
          description: {
            uk: {
              first:
                'हमने अपनी कुकीज़ और गोपनीयता की नीति में अहम बदलाव किए हैं, आपको जानना चाहिए कि इसका आप पर और आपके डेटा पर क्या असर होगा.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'हमने अपनी कुकीज़ और गोपनीयता की नीति में अहम बदलाव किए हैं, आपको जानना चाहिए कि इसका आप पर और आपके डेटा पर क्या असर होगा.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'ओके',
          reject: 'जानें कि क्या बदला है',
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
        },
        cookie: {
          title: 'हमें बताएं कि आप कुकीज़ को लेकर सहमत हैं',
          description: {
            uk: {
              first: 'हम ',
              linkText: 'कुकीज़',
              last:
                'का इस्तेमाल आपको बेहतर ऑनलाइन सेवाएं देने के लिए करते हैं. हमें बताएं कि आप इन सभी कुकीज़ से सहमत हैं.',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            international: {
              first:
                'हम और हमारे पार्टनर इस तरह की कुछ तकनीकों का इस्तेमाल करते हैं ',
              linkText: 'कुकीज़',
              last:
                ' का इस्तेमाल करके हम आपके ब्राउज़िंग डेटा की ज़रिए आपको बेहतर और ख़ास तौर पर आपके लिए सेवाएं देेते हैं. इससे हमें आपको सही कंटेंट और उपयुक्त विज्ञापन दिखाने में मदद मिलती है. हमें बताएं कि क्या आप इस पर राज़ी हैं.',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
          },
          accept: 'हां, मैं राज़ी हूं',
          reject: 'नहीं, मुझे सेटिंग्स पर ले चलें',
          rejectUrl:
            'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
        },
      },
      media: {
        noJs: 'प्लेबैक आपके उपकरण पर नहीं हो पा रहा',
        contentExpired: 'यह सामग्री अब उपलब्ध नहीं है.',
        audio: 'ऑडियो',
        photogallery: 'फ़ोटो गैलरी',
        video: 'वीडियो',
        bbc_hindi_radio: {
          title: 'बीबीसी हिंदी',
          subtitle:
            'दुनिया और भारत की ख़बरें, विश्लेषण और फ़ीचर. हिंदी में संवाद के सूत्रधार',
        },
        bbc_hindi_tv: {
          title: 'दुनिया',
          subtitle:
            'बीबीसी दुनिया में देखिए ताज़ा अंतरराष्ट्रीय और क्षेत्रीय ख़बरें, उनका विश्लेषण और सोशल मीडिया की हलचल. साथ ही होंगी कई रोचक ख़बरें भी.',
        },
        listen: 'Listen',
        watch: 'देखिए',
        liveLabel: 'लाइव',
        previousRadioShow: 'Previous radio show',
        nextRadioShow: 'Next radio show',
        duration: 'Duration',
      },
    },
    brandSVG,
    mostRead: {
      header: 'सबसे अधिक पढ़ी गईं',
      lastUpdated: 'अंतिम अपडेट:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/hindi/institutional-50223932',
        text: 'आप बीबीसी पर क्यों भरोसा कर सकते हैं',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text: 'बाहरी साइटों का लिंक देने की हमारी नीति के बारे में पढ़ें.',
      },
      links: [
        {
          href: 'https://www.bbc.com/terms',
          text: 'इस्तेमाल की शर्तें',
        },
        {
          href: 'https://www.bbc.com/hindi/institutional-37343168',
          text: 'बीबीसी के बारे में',
        },
        {
          href: 'https://www.bbc.com/privacy/',
          text: 'निजता की नीति',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'कुकीज़',
        },
        {
          href: 'https://www.bbc.com/contact/',
          text: 'बीबीसी से संपर्क करें',
        },
        {
          href:
            'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. बाहरी साइटों की सामग्री के लिए बीबीसी ज़िम्मेदार नहीं है.',
    },
    fonts: [],
    timezone: 'Asia/Kolkata',
    navigation: [
      {
        title: 'होम पेज',
        url: '/hindi',
      },
      {
        title: 'भारत',
        url: '/hindi/india',
      },
      {
        title: 'विदेश',
        url: '/hindi/international',
      },
      {
        title: 'मनोरंजन',
        url: '/hindi/entertainment',
      },
      {
        title: 'खेल',
        url: '/hindi/sport',
      },
      {
        title: 'विज्ञान-टेक्नॉलॉजी',
        url: '/hindi/science',
      },
      {
        title: 'सोशल',
        url: '/hindi/social',
      },
      {
        title: 'वीडियो',
        url: '/hindi/media/video',
      },
      {
        title: 'बीबीसी स्पेशल',
        url: '/hindi/in_depth',
      },
      {
        title: '#ISWOTY',
        url: '/hindi/resources/idt-a6da5349-3698-4f42-9e5b-35513c8c0537',
      },
    ],
  },
};

export default withContext(service);
