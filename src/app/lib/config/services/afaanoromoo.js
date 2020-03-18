import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { cyrillicAndLatin } from '@bbc/gel-foundations/scripts';
import { afaanoromoo as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/Africa/Addis_Ababa';
import '@bbc/psammead-locales/moment/om';
import withContext from '../../../contexts/utils/withContext';

export const service = {
  default: {
    ads: {
      hasAds: false,
    },
    lang: `om`,
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'Haaromsameera',
    atiAnalyticsAppName: 'news-afaanoromoo',
    atiAnalyticsProducerId: '2',
    chartbeatDomain: 'afaanoromoo.bbc.co.uk',
    brandName: 'BBC News Afaan Oromoo',
    product: 'BBC News',
    serviceLocalizedName: 'Afaan Oromoo',
    defaultImage:
      'https://news.files.bbci.co.uk/ws/img/logos/og/afaanoromoo.png',
    defaultImageAltText: 'BBC News Afaan Oromoo',
    dir: `ltr`,
    externalLinkText: ' alaan',
    imageCaptionOffscreenText: "Ibsa waa'ee suuraa, ",
    videoCaptionOffscreenText: "Ibsa waa'ee viidiyoo, ",
    audioCaptionOffscreenText: "Ibsa wa'ee raadiyoo, ",
    defaultCaptionOffscreenText: 'Ibsa suuraa/viidiyoo, ',
    imageCopyrightOffscreenText: 'Madda suuraa, ',
    locale: `om-ET`,
    datetimeLocale: `om`,
    service: 'afaanoromoo',
    serviceName: 'Afaan Oromoo',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@BBCNews',
    twitterSite: '@BBCNews',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    isTrustProjectParticipant: true,
    script: cyrillicAndLatin,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Oduu',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      seeAll: 'Hunda ilaali',
      home: 'Oduu',
      currentPage: 'Fuula kan ammaa',
      skipLinkText: 'Qabiyyeetti darbi',
      relatedContent: 'Odeessa kana irratti dabalata',
      navMenuText: 'Kutaawwan',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      error: {
        404: {
          statusCode: '404',
          title: 'Fuulli argamuu hin dandeenye',
          message:
            'Dhiifama, fuula ati barbaaddaa jirtu siif fiduu hin dandeenye. maaloo yaali.',
          solutions: [
            'url sna dabalii ilaali',
            'Barbaadduu kee keessaan furtuu haaromsituu cuqaasuu',
            "Bo'aa barbaacha kan BBC fayyadamuun fuula kana barbaaduu",
          ],
          callToActionFirst: 'Akka filannootti, maaloo fuula duraa ',
          callToActionLinkText: 'BBC News Afaan Oromoo',
          callToActionLast: ' daawwadhu',
          callToActionLinkUrl: 'https://www.bbc.com/afaanoromoo',
        },
        500: {
          statusCode: '500',
          title: 'Dogogora keessoo haadhoo',
          message:
            'Dhiifama, fuula ati barbaaddaa jirtu siif fiduu hin dandeenye. maaloo yaali.',
          solutions: [
            'Barbaadduu kee keessaan furtuu haaromsituu cuqaasuu',
            'Ammas gara boodaarra ni deebiya',
          ],
          callToActionFirst: 'Akka filannootti, maaloo fuula duraa ',
          callToActionLinkText: 'BBC News Afaan Oromoo',
          callToActionLast: ' daawwadhu',
          callToActionLinkUrl: 'https://www.bbc.com/afaanoromoo',
        },
      },
      consentBanner: {
        privacy: {
          title: 'Imaammata mateenyaafi kuus-yadannoo keenyaa haaromsiineera.',
          description: {
            uk: {
              first:
                "Imaammata mateenyaafi kuus-yaadannoo keenyaarratti jijjirama barbaachisaa muraasa kan taasifne yoo ta'u, kunis siifi daataa keetiif maal jechu akka ta'e akka bartu barbaadna.",
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                "Imaammata mateenyaafi kuus-yaadannoo keenyaarratti jijjirama barbaachisaa muraasa kan taasifne yoo ta'u, kunis siifi daataa keetiif maal jechu akka ta'e akka bartu barbaadna.",
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'TOLE',
          reject: 'Maaltu akka jijjirame bari',
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
        },
        cookie: {
          title: 'Kuus-yaadannoo waliin waliigalu kee haa beeknu',
          description: {
            uk: {
              first: 'Kan nuti ',
              linkText: 'kuus-yaadannoo fayyadamnu',
              last:
                ' muuxannoo hunda caaluu toora internetaarratti isiniif kennuuf. Kuus-yaadannoo kan hunda waliin walii galuu kee mee haa barru.',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            international: {
              first: 'Nutiifi michuuwwan keenya tekinikoota kan akka ',
              linkText: 'kuus-yaadannoo',
              last:
                ", akkasumas muuxannoo toora interneetaa hunda caaluufi qabiyyee isaa akka fedha dhuunfaatti ta'u gochuu akkasumallee beekssisni sitti akka mul'atuuf daataa  ittiin barbaadan walitti qaba. Yoo itti walii galta ta'e nu beeksisi maaloo.",
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
          },
          accept: 'Eyyee, walii nan gala.',
          reject: 'Lakki, gara bakka itti argamuutti na geessi',
          rejectUrl:
            'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
        },
      },
      media: {
        noJs: "Meeshaan kee Miidiyaa taphachiisuu hin danda'u",
        contentExpired: 'This content is no longer available',
        audio: 'Sagalee',
        photogallery: 'Kuusaa suuraa',
        video: 'Viidiyoo',
        listen: 'Dhaggeeffadhaa',
        watch: 'Daawwadhu',
        liveLabel: 'KALLATTIIN',
        previousRadioShow: 'Previous radio show',
        nextRadioShow: 'Next radio show',
        duration: 'Duration',
      },
    },
    brandSVG,
    mostRead: {
      header: "Baay'ee kan dubbifame",
      lastUpdated: 'Yeroo dhuma kan haaromfame:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/afaanoromoo/institutional-49281861',
        text: 'BBC News maaliif amanuu dandeessa',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text: 'Gara geessituu alaatti akkaataa itti hojjennu dubbisi.',
      },
      links: [
        {
          href: 'https://www.bbc.co.uk/usingthebbc/terms/',
          text: 'Haala itti fayyadamaa',
        },
        {
          href: 'https://www.bbc.com/aboutthebbc',
          text: "Waa'ee BBC",
        },
        {
          href: 'https://www.bbc.co.uk/usingthebbc/privacy/',
          text: 'Imaammata mateenyaa',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Kuus-yaadannoo',
        },
        {
          href: 'https://www.bbc.com/afaanoromoo/institutional-42228538',
          text: 'BBC qunnami',
        },
        {
          href:
            'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          text: 'AdChoices / Do Not Sell My Info',
          lang: 'en-GB',
        },
      ],
      copyrightText:
        "BBC. Qabiyyeewwan maddawwan alaa irraa ta'aniif BBCn itti gaafatamaa miti.",
    },
    fonts: [],
    navigation: [
      {
        title: 'Oduu',
        url: '/afaanoromoo',
      },
      {
        title: 'Itoophiyaa',
        url: '/afaanoromoo/topics/e986aff5-6b26-4638-b468-371d1d9617b4',
      },
      {
        title: 'Viidiyoo',
        url: '/afaanoromoo/media/video',
      },
      {
        title: 'Jajjaboo',
        url: '/afaanoromoo/popular/read',
      },
    ],
    timezone: 'Africa/Addis_Ababa',
    liveRadio: {
      externalIdOverrides: { bbc_oromo_radio: 'bbc_afaanoromoo_radio' },
    },
  },
};

export default withContext(service);
