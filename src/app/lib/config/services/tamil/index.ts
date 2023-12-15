import tamil from '../../../../components/ThemeProvider/fontScripts/tamil';
import '#psammead/moment-timezone-include/tz/GMT';
import '#psammead/psammead-locales/moment/ta';
import withContext from '../../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../../models/types/serviceConfig';
import translations from './translations';

export const service: DefaultServiceConfig = {
  default: {
    lang: `ta`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'புதுப்பிக்கப்பட்டது',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-tamil',
    atiAnalyticsProducerId: '87',
    chartbeatDomain: 'tamil.bbc.co.uk',
    brandName: 'BBC News தமிழ்',
    product: 'BBC News',
    serviceLocalizedName: 'தமிழ்',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/tamil.png',
    defaultImageAltText: 'BBC News தமிழ்',
    dir: `ltr`,
    externalLinkText: ', வெளி',
    imageCaptionOffscreenText: 'படக்குறிப்பு, ',
    videoCaptionOffscreenText: 'காணொளிக் குறிப்பு, ',
    audioCaptionOffscreenText: 'கேட்பொலிக் குறிப்பு, ',
    defaultCaptionOffscreenText: 'குறிப்பு, ',
    imageCopyrightOffscreenText: 'பட மூலாதாரம், ',
    locale: `ta-IN`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'ta',
    datetimeLocale: `ta`,
    service: 'tamil',
    serviceName: 'Tamil',
    languageName: 'Tamil',
    twitterCreator: '@bbctamil',
    twitterSite: '@bbctamil',
    noBylinesPolicy:
      'https://www.bbc.com/tamil/institutional-50288575#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/tamil/institutional-50288575',
    isTrustProjectParticipant: true,
    script: tamil,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'முகப்பு',
    showAdPlaceholder: true,
    showRelatedTopics: true,
    translations,
    mostRead: {
      header: 'அதிகம் படிக்கப்பட்டது',
      lastUpdated: 'கடைசியாக புதுப்பிக்கப்பட்டது:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'அதிகம் பார்க்கப்பட்டது',
      numberOfItems: 10,
      hasMostWatched: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
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
        href: 'https://www.bbc.com/tamil/institutional-50288575',
        text: 'நீங்கள் ஏன் பிபிசி மீது நம்பிக்கை வைக்க முடியும்?',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
        text: 'வெளியார் இணைப்புகள் தொடர்பான எங்கள் அணுகுமுறையைப் பற்றி படிக்கவும்.',
      },
      links: [
        {
          href: 'https://www.bbc.com/tamil/institutional-37286680',
          text: 'பயன்பாட்டு விதி',
        },
        {
          href: 'https://www.bbc.com/tamil/institutional-37286682',
          text: 'பிபிசி பற்றி',
        },
        {
          href: 'https://www.bbc.com/tamil/institutional-37286684',
          text: 'தனியுரிமை கொள்கை',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'குக்கிகள்',
        },
        {
          href: 'https://www.bbc.co.uk/tamil/send/u50853753',
          text: 'பிபிசியுடன் தொடர்பு கொள்ள',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        'பிபிசி. வெளியார் இணைய தளங்களின் உள்ளடக்கத்துக்கு பிபிசி பொறுப்பாகாது.',
    },
    timezone: 'GMT',
    navigation: [
      {
        title: 'முகப்பு',
        url: '/tamil',
      },
      {
        title: 'உலகம்',
        url: '/tamil/topics/c40379e2n2zt',
      },
      {
        title: 'இந்தியா',
        url: '/tamil/topics/c2dwqdn01v5t',
      },
      {
        title: 'இலங்கை',
        url: '/tamil/topics/cz74k7p3qw7t',
      },
      {
        title: 'விளையாட்டு',
        url: '/tamil/topics/cdr56rv4qwdt',
      },
      {
        title: 'அறிவியல்',
        url: '/tamil/topics/c9wpm0exkdpt',
      },
      {
        title: 'சினிமா',
        url: '/tamil/topics/cyx5kxz4wkgt',
      },
      {
        title: 'வீடியோ',
        url: '/tamil/topics/c1320722p81t',
      },
    ],
  },
};

export default withContext(service);
