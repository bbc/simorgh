import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { devanagariAndGurmukhi } from '@bbc/gel-foundations/scripts';
import { nepali as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/Asia/Kathmandu';
import '@bbc/psammead-locales/moment/ne';
import withContext from '../../../contexts/utils/withContext';

export const service = {
  default: {
    lang: `ne`,
    articleAuthor: `http://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'Updated',
    atiAnalyticsAppName: 'news-nepali',
    atiAnalyticsProducerId: '63',
    brandName: 'BBC News नेपाली',
    product: 'BBC News',
    serviceLocalizedName: 'नेपाली',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/nepali.png',
    defaultImageAltText: 'BBC News नेपाली',
    dir: `ltr`,
    externalLinkText: ', external',
    imageCaptionOffscreenText: 'Image caption, ',
    videoCaptionOffscreenText: 'Video caption, ',
    audioCaptionOffscreenText: 'Audio caption',
    defaultCaptionOffscreenText: 'Caption, ',
    imageCopyrightOffscreenText: 'Image source, ',
    locale: `ne-NP`,
    datetimeLocale: `ne`,
    service: 'nepali',
    serviceName: 'Nepali',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcnepali',
    twitterSite: '@bbcnepali',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    isTrustProjectParticipant: true,
    script: devanagariAndGurmukhi,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'मुख पृष्ठ',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      seeAll: 'See all',
      home: 'मुख पृष्ठ',
      currentPage: 'Current page',
      skipLinkText: 'यो सामग्री स्कीप गर्नुहोस्',
      relatedContent: 'Related content',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      error: {
        404: {
          statusCode: '404',
          title: '४०४: पेज फेला परेन',
          message:
            'गल्ती वेब एड्रेस टाइप भएर यस्तो भएको हुनसक्छ। कृपया वेब एड्रेस र हिज्जे जाँच गर्नुहोस्।',
          solutions: [
            'Double checking the url',
            'Hitting the refresh button in your browser',
            'Searching for this page using the BBC search bar',
          ],
          callToActionFirst: 'Alternatively, please visit the ',
          callToActionLinkText: 'बीबीसी मुख पृष्ठ',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/nepali',
        },
        500: {
          statusCode: '500',
          title: '५०० - एरर',
          message: 'त्रु्टी देखियो। कृपया पेज रिफ्रेस गर्नुहोस्।',
          solutions: [
            'Hitting the refresh button in your browser',
            'Coming back again later',
          ],
          callToActionFirst: 'Alternatively, please visit the ',
          callToActionLinkText: 'बीबीसी मुख पृष्ठ',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/nepali',
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
        audio: 'अडियो',
        photogallery: 'तस्वीर ग्यालरी',
        video: 'भिडियो',
        bbc_nepali_radio: {
          title: 'बीबीसी नेपाली रेडियो',
          subtitle:
            'नेपाली भाषामा बीबीसी विश्व सेवाको राष्ट्रिय तथा अन्तर्राष्ट्रिय समाचार तथा समसामयिक चर्चा, राष्ट्रिय तथा अन्तर्राष्ट्रिय समाचार विश्लेषण, समाचारमा रहेका व्यक्तित्वहरुसंगको अन्तर्वार्ता, साप्ताहिक बहस तथा छलफल, विज्ञान, स्वास्थ्य.',
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
        'बीबीसी। बाहिरी वेबसाइटहरुको सामग्रीका लागि बीबीसी जिम्मेवार छैन।',
    },
    fonts: [],
    timezone: 'Asia/Kathmandu',
    navigation: [
      {
        title: 'मुख पृष्ठ',
        url: '/nepali',
      },
      {
        title: 'समाचार',
        url: '/nepali/news',
      },
      {
        title: 'पछिल्लो कार्यक्रम',
        url: '/nepali/multimedia/radio_programmes',
      },
      {
        title: 'तस्वीरहरु',
        url: '/nepali/media/photogalleries',
      },
      {
        title: 'भिडियो',
        url: '/nepali/media/video',
      },
    ],
  },
};

export default withContext(service);
