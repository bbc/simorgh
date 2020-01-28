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
    lang: `ti`,
    articleAuthor: `https://www.facebook.com/bbcnews`,
    articleTimestampPrefix: 'ዝተመሓየሸ',
    atiAnalyticsAppName: 'news-tigrinya',
    atiAnalyticsProducerId: '91',
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
    hasRadioSchedule: false,
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      seeAll: 'ኩሉ ረኣይ',
      home: 'ዜና',
      currentPage: 'ህሉው ገጽ',
      skipLinkText: 'ናብቲ ትሕዝቶ ቀጽል',
      relatedContent: 'ተዛማዲ ትሕዝቶ',
      sections: 'ክፍልታት',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      error: {
        404: {
          statusCode: '404',
          title: 'እቲ ገጽ ኣይኽፈትን',
          message: 'ይቕረታ! እቲ እትእልሾ ዘለኻ ገጽ፡ ክንረኽቦ ኣይከኣልናን። በጃኻ ነዚ ዝስዕብ ፈትን፡',
          solutions: [
            'እቲ ዩኣርኤል ትኽክል ምዃኑ ኣረጋግጽ',
            'ኣብ መአለሺኻ ንዘሎ ደጊምካ መፈተኒ መልጎም ጠውቕ',
            'ነቲ ናይ ቢቢሲ መአለሺ ስፍራ ተጠቒምካ ነዚ ገጽ ክትረኽቦ ፈትን',
          ],
          callToActionFirst: 'ከም ኣማራጺ ከኣ ',
          callToActionLinkText: 'BBC News ትግርኛ',
          callToActionLast: ' ረኣይ።',
          callToActionLinkUrl: 'https://www.bbc.com/tigrinya',
        },
        500: {
          statusCode: '500',
          title: 'ውሽጣዊ ጸገም ሰርቨር',
          message: 'ይቕረታ፡ ነቲ ዝደለኻዮ ገጽ ክነቕርበልካ ኣይከኣልናን። በጃኻ፡ ነዚ ዝስዕብ ፈትን፡',
          solutions: ['ኣብ መአለሺኻ ንዘሎ ደጊምካ መፈተኒ መልጎም ጠውቕ', 'ጸኒሕካ ደጊምካ ፈትን'],
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
          title: 'ኩኪታት ክትጥቀሙ ከምዝተሰማማዕኩም ኣፍልጡና',
          description: {
            uk: {
              first: 'ኣብ መርበብ ሓበሬታና ዝሓሸ ኣገልግሎት መታን ክትረኽቡ ኢና ',
              linkText: 'ኩኪታት',
              last: ' እንጥቀም። በዞም ኩኪታት እዚኦም ከምእተሰማማዕኩም ኣፍሉጡና።',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            international: {
              first: 'ንሕና ኾነ መሻርኽትና ከም ',
              linkText: 'ኩኪታት',
              last:
                ' ዝኣመሰሉ ቴክኖሎጂ ተጠቒምና፡ ነቲ ናትኩም ናይ ኣለሻ ዴታ ብምውህላል ንዓኹም ኣገዳሲ ክኸውን ዝኽእል ትሕዝቶ ወይ መወዓውዒ ንክነርእየኩም ንጥቀመሉ። እንተድኣተሰማሚዕኩም ኣፍልጡና።',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
          },
          accept: 'እወ! እስማማዕ እየ።',
          reject: 'ኣይፋል፡ ናብ መተዓራረዪ (ሴቲንግ) ውሰደኒ።',
          rejectUrl:
            'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
        },
      },
      media: {
        audio: 'ድምፂ',
        photogallery: 'ስእልታት',
        video: 'ቪድዮ',
        listen: 'ናይ መወዳእታ ፍጻመታት',
        watch: 'ተመልከት',
        liveLabel: 'ቀጥታ ስርጭት',
        previousRadioShow: 'Previous radio show',
        nextRadioShow: 'Next radio show',
        duration: 'Duration',
      },
    },
    brandSVG,
    mostRead: {
      header: 'ብበዝሒ ዝተነበበ',
      lastUpdated: 'ንመወዳእታ እዋን ዝተመሓየሸሉ: ',
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/tigrinya/institutional-49283259',
        text: 'ን BBC News ንምንታይ ክትኣምንዎ ከምዘለኩም',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text: 'ንናይ ደገ ርከብ ብዝምልከት፡ ናትና ኣረኣእያ እንታይ ከምዝመስል ኣንብቡ።',
      },
      links: [
        {
          href: 'https://www.bbc.co.uk/usingthebbc/terms/',
          text: 'ውዕሊ ኣጠቓቕማ',
        },
        {
          href: 'https://www.bbc.co.uk/aboutthebbc',
          text: 'ብዛዕባ ቢቢሲ',
        },
        {
          href: 'https://www.bbc.co.uk/usingthebbc/privacy/',
          text: 'ናይ ምሽጥራውነት ፖሊሲ',
        },
        {
          href: 'https://www.bbc.co.uk/usingthebbc/cookies/',
          text: 'ኩኪታት',
        },
        {
          href: 'https://www.bbc.com/tigrinya/institutional-42228875',
          text: 'ንቢቢሲ የዛርቡ',
        },
      ],
      copyrightText: 'BBC. ቢቢሲ ንናይ ደገ መርበብ ሓበሬታታት ሓላፍነት ኣይወስድን.',
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
