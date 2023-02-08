import {
  C_POSTBOX,
  C_WHITE,
  C_GHOST,
  C_POSTBOX_30,
} from '../../../legacy/psammead/psammead-styles/src/colours';
import devanagari from '../../../components/ThemeProvider/fontScripts/devanagari';
import '#psammead/moment-timezone-include/tz/Asia/Kolkata';
import '#psammead/psammead-locales/moment/hi';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: `hi`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'अपडेटेड',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-hindi',
    atiAnalyticsProducerId: '52',
    chartbeatDomain: 'hindi.bbc.co.uk',
    brandName: 'BBC News हिंदी',
    product: 'BBC News',
    serviceLocalizedName: 'हिंदी',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/hindi.png',
    defaultImageAltText: 'BBC News हिंदी',
    dir: `ltr`,
    externalLinkText: ', बाहरी',
    imageCaptionOffscreenText: 'इमेज कैप्शन, ',
    videoCaptionOffscreenText: 'वीडियो कैप्शन, ',
    audioCaptionOffscreenText: 'ऑडियो कैप्शन, ',
    defaultCaptionOffscreenText: 'कैप्शन, ',
    imageCopyrightOffscreenText: 'इमेज स्रोत, ',
    locale: `hi-IN`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'hi',
    datetimeLocale: `hi`,
    service: 'hindi',
    serviceName: 'Hindi',
    languageName: 'Hindi',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbchindi',
    twitterSite: '@bbchindi',
    noBylinesPolicy:
      'https://www.bbc.com/hindi/institutional-50223932#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/hindi/institutional-50223932',
    isTrustProjectParticipant: true,
    script: devanagari,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle:
      'ब्रेकिंग न्यूज़ समाचार, ताजा खबर | News, latest news, breaking news',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
      brandForegroundColour: `${C_GHOST}`,
      brandHighlightColour: `${C_WHITE}`,
      brandBorderColour: `${C_POSTBOX_30}`,
    },
    showAdPlaceholder: true,
    showRelatedTopics: true,
    podcastPromo: {
      title: 'पॉडकास्ट',
      brandTitle: 'दिनभर: पूरा दिन,पूरी ख़बर (Dinbhar)',
      brandDescription:
        'देश और दुनिया की बड़ी ख़बरें और उनका विश्लेषण करता समसामयिक विषयों का कार्यक्रम.',
      image: {
        src: 'https://ichef.bbci.co.uk/images/ic/448xn/p09ds7cb.jpg',
        alt: 'दिनभर: पूरा दिन,पूरी ख़बर',
      },
      linkLabel: {
        text: 'दिनभर: पूरा दिन,पूरी ख़बर',
        href: 'https://www.bbc.com/hindi/podcasts/p09ds7zx',
      },
      skipLink: {
        text: 'छोड़कर %title% आगे बढ़ें',
        endTextVisuallyHidden: 'समाप्त',
      },
    },
    mostRead: {
      header: 'सबसे अधिक पढ़ी गईं',
      lastUpdated: 'अंतिम अपडेट:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'सबसे ज्यादा देखे गए',
      numberOfItems: 10,
      hasMostWatched: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    recommendations: {
      hasStoryRecommendations: true,
      skipLink: {
        text: 'छोड़कर %title% आगे बढ़ें',
        endTextVisuallyHidden: 'समाप्त',
      },
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/hindi/institutional-50223932',
        text: 'आप बीबीसी पर क्यों भरोसा कर सकते हैं',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'बाहरी साइटों का लिंक देने की हमारी नीति के बारे में पढ़ें.',
      },
      links: [
        {
          href: 'https://www.bbc.com/hindi/institutional-37342293',
          text: 'इस्तेमाल की शर्तें',
        },
        {
          href: 'https://www.bbc.com/hindi/institutional-37343168',
          text: 'बीबीसी के बारे में',
        },
        {
          href: 'https://www.bbc.com/hindi/institutional-37342614',
          text: 'निजता की नीति',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'कुकीज़',
        },
        {
          href: 'https://www.bbc.co.uk/hindi/send/u50853357',
          text: 'बीबीसी से संपर्क',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'BBC. बाहरी साइटों की सामग्री के लिए बीबीसी ज़िम्मेदार नहीं है.',
    },
    timezone: 'Asia/Kolkata',
    navigation: [
      {
        title: 'होम पेज',
        url: '/hindi',
      },
      {
        title: 'भारत',
        url: '/hindi/topics/ckdxnkz7607t',
      },
      {
        title: 'विदेश',
        url: '/hindi/topics/c9wpm0en87xt',
      },
      {
        title: 'मनोरंजन',
        url: '/hindi/topics/c06gq3n0pp7t',
      },
      {
        title: 'खेल',
        url: '/hindi/topics/cwr9j8g1kj9t',
      },
      {
        title: 'विज्ञान-टेक्नॉलॉजी',
        url: '/hindi/topics/c2lej0594knt',
      },
      {
        title: 'सोशल',
        url: '/hindi/topics/c2e4q0z9qznt',
      },
      {
        title: 'वीडियो',
        url: '/hindi/media/video',
      },
      {
        title: 'पॉडकास्ट',
        url: '/hindi/institutional-61824775',
      },
    ],
  },
};

export default withContext(service);
