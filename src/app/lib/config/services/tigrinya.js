import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { noAscendersOrDescenders } from '@bbc/gel-foundations/scripts';
import { tigrinya as brandSVG } from '@bbc/psammead-assets/svgs';
import {
  F_NOTO_SANS_ETHIOPIC_BOLD,
  F_NOTO_SANS_ETHIOPIC_REGULAR,
} from '@bbc/psammead-styles/fonts';
import '@bbc/moment-timezone-include/tz/Africa/Addis_Ababa';
import '@bbc/psammead-locales/moment/ti';
import withContext from '../../../contexts/utils/withContext';

export const service = {
  default: {
    ads: false,
    lang: `ti`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'ዝተመሓየሸ',
    atiAnalyticsAppName: 'news-tigrinya',
    atiAnalyticsProducerId: '91',
    chartbeatDomain: 'tigrinya.bbc.co.uk',
    brandName: 'BBC News ትግርኛ',
    product: 'BBC News',
    serviceLocalizedName: 'ትግርኛ',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/tigrinya.png',
    defaultImageAltText: 'BBC News ትግርኛ',
    dir: `ltr`,
    externalLinkText: ', ደጋዊ',
    imageCaptionOffscreenText: 'መግለጺ ስእሊ, ',
    videoCaptionOffscreenText: 'መግለጺ ቪድዮ, ',
    audioCaptionOffscreenText: 'መግለጺ ድምጺ, ',
    defaultCaptionOffscreenText: 'መግለጺ, ',
    imageCopyrightOffscreenText: 'ምንጪ ስእሊ, ',
    locale: `ti-ET`,
    datetimeLocale: `ti`,
    service: 'tigrinya',
    serviceName: 'Tigrinya',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcnews',
    twitterSite: '@bbcnews',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    isTrustProjectParticipant: true,
    script: noAscendersOrDescenders,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'ዜና',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      seeAll: 'ንኹሉ ርኣዩ',
      home: 'መእተዊ ገጽ',
      currentPage: 'ዘለኹሞ ገጽ',
      skipLinkText: 'ናብቲ ትሕዝቶ ቀጽሉ',
      relatedContent: 'ተዛማዲ ትሕዝቶ',
      navMenuText: 'ክፍልታት',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      error: {
        404: {
          statusCode: '404',
          title: 'እቲ ገጽ ክርከብ ኣይከኣለን',
          message: 'ይቕረታ! እቲ እትደልዩዎ ዘለኹም ገጽ ከነቕርበልኩም ኣይከኣልናን። በዚ ፈትኑ፡',
          solutions: [
            'ዝተጠቐምኩምሉ መእተዊ (URL) ቅኑዕ ምዃኑ ኣረጋግጹ',
            'ኣብ መእተዊኹም (ብራውዘር) ዘሎ መድገሚ ጠውቑ',
            "ነዚ'ዚ ንምርካብ ናይ ቢቢሲ መእተዊ ክትጥቀሙ ትኽእሉ",
          ],
          callToActionFirst: 'ከም ኣማራጺ ኣብ ናይ ',
          callToActionLinkText: 'BBC News ትግርኛ ገጽ',
          callToActionLast: ' ተወከሱ።',
          callToActionLinkUrl: 'https://www.bbc.com/tigrinya',
        },
        500: {
          statusCode: '500',
          title: 'ውሽጣዊ ጸገም ሰርቨር',
          message: 'ይቕሬታ፡ ነቲ ዝደለኹሞ ገጽ ክነቕርበልኩም ኣይከኣልናን። በዚ ፈትኑ፡',
          solutions: ['ኣብ መእተዊኹም (ብራውዘር) ዘሎ መድገሚ ጠውቑ', 'ጸኒሕኩም ክትምለሱ ምስ እትደልዩ'],
          callToActionFirst: 'ከም ኣማራጺ ከኣ ',
          callToActionLinkText: 'BBC News ትግርኛ',
          callToActionLast: ' ረኣይ።',
          callToActionLinkUrl: 'https://www.bbc.com/tigrinya',
        },
      },
      consentBanner: {
        privacy: {
          title: 'ኣብ ፖሊሲ ብሕትውናናን ኩኪታትን ምምሕያሻት ገይርና ኣለና።',
          description: {
            uk: {
              first:
                'ኣብ ፖሊሲ ብሕትውናናን ኩኪታትን ብዙሓት ኣገደስቲ ለውጥታት ገይርና ኣለና። እዚ ንዓኹምን ንዴታኹምን እንታይ ማለት ከምዝኾነ ክነፍልጠኩም ንደሊ።',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'ኣብ ፖሊሲ ብሕትውናናን ኩኪታትን ብዙሓት ኣገደስቲ ለውጥታት ገይርና ኣለና። እዚ ንዓኹምን ንዴታኹምን እንታይ ማለት ከምዝኾነ ክነፍልጠኩም ንደሊ።',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'ሕራይ',
          reject: 'እንታይ ከምዝተለወጠ ረኣዩ',
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
        },
        cookie: {
          title: "ኩኪስ' ንምጥቃም ከም ዝተሰማማዕኩም ኣፍልጡና",
          description: {
            uk: {
              first: 'ኣብ መርበብ ሓበሬታና ዝበለጸ ኣገልግሎት መታን ክትረኽቡ ኢና ',
              linkText: "'ኩኪስ'",
              last: " እንጥቀም። ንኹሎም እዞም 'ኩኪስ'  ከም እተሰማማዕኩምሎም ኣፍልጡና።",
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            international: {
              first: 'ንሕናን መሻርኽትናን ከም ',
              linkText: 'ኩኪስ',
              last:
                "  ዝኣመሰሉ ቴክኖሎጂ ክንጥቀም ዘድልየና፡ ብዛዕባ ናይ ኢንተርነት ኣጠቓቕማኹም ሓበሬታ ብምውህላል ንዓኹም ውልቃዊ ኣገዳስነት ዘለዎ ትሕዝቶ ወይ መወዓውዒ ብዝበለጸ ኣገባብ ንምቕራብ'ዩ። ትሰማምዑ እንተ ዄንኩም ኣፍልጡና።",
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
          },
          accept: 'እወ፡ እሰማማዕ እየ።',
          reject: 'ኣይፋል፡ ናብ መተዓራረዪ (ሴቲንግ) ውሰዱኒ።',
          rejectUrl:
            'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
        },
      },
      media: {
        noJs: 'ትጥቀምሉ ዘለኹም መሳርሒ ኣይተቐበሎን።',
        contentExpired: 'እዚ እትደልይዎ ዘለኹም ትሕዝቶ የለን',
        audio: 'ድምጺ',
        photogallery: 'ስእልታት',
        video: 'ቪድዮ',
        listen: 'ስምዑ',
        watch: 'ተዓዘቡ',
        liveLabel: 'ቀጥታ',
        previousRadioShow: 'ኣቐዲሙ ዝነበረ ፈነወ ራድዮ',
        nextRadioShow: 'ዝቕጽል ፈነወ ራድዮ',
        duration: 'ዕምሪ ፈነወ',
      },
    },
    brandSVG,
    mostRead: {
      header: 'ብብዝሒ ዝተነበ',
      lastUpdated: 'ንመወዳእታ እዋን ዝተመሓየሸሉ:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/tigrinya/institutional-49283259',
        text: 'ስለምንታይ ንቢቢሲ ክትኣምንዎ ከም እትኽእሉ',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text: 'ብዛዕባ ምስ ናይ ደገ መርበባት እንገብሮ መላግቦታት ዘለና ኣረኣእያ ንምርዳእ ኣንብቡ።',
      },
      links: [
        {
          href: 'https://www.bbc.co.uk/usingthebbc/terms/',
          text: 'ውዕል ተጠቃምነት',
        },
        {
          href: 'https://www.bbc.co.uk/aboutthebbc',
          text: 'ብዛዕባ ቢቢሲ',
        },
        {
          href: 'https://www.bbc.co.uk/usingthebbc/privacy/',
          text: 'ናይ ስቱርነት ፖሊሲ',
        },
        {
          href: 'https://www.bbc.co.uk/usingthebbc/cookies/',
          text: 'ኩኪስ',
        },
        {
          href: 'https://www.bbc.com/tigrinya/institutional-42228875',
          text: 'ንቢቢሲ ንምርካብ',
        },
      ],
      copyrightText: 'BBC. ቢቢሲ፡ ንትሕዝቶ ካልኦት መርበባት ሓበሬታ ሓላፍነት ኣይወስድን።',
    },
    fonts: [F_NOTO_SANS_ETHIOPIC_BOLD, F_NOTO_SANS_ETHIOPIC_REGULAR],
    navigation: [
      {
        title: 'ዜና',
        url: '/tigrinya',
      },
      {
        title: 'ቪድዮ',
        url: '/tigrinya/media/video',
      },
      {
        title: 'ኣመና ፍቱዋት',
        url: '/tigrinya/popular/read',
      },
    ],
    timezone: 'Africa/Addis_Ababa',
  },
};

export default withContext(service);
