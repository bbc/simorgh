import latin from '../../../components/ThemeProvider/fontScripts/latin';
import '#psammead/psammead-locales/moment/pcm';
import '#psammead/moment-timezone-include/tz/Africa/Lagos';
import withContext from '../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../models/types/serviceConfig';

export const service: DefaultServiceConfig = {
  default: {
    lang: 'pcm',
    articleAuthor: 'https://www.facebook.com/bbcnews',
    articleTimestampPrefix: 'New Informate',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-pidgin',
    atiAnalyticsProducerId: '70',
    atiAnalyticsProducerName: 'PIDGIN',
    useReverb: true,
    chartbeatDomain: 'pidgin.bbc.co.uk',
    brandName: 'BBC News Pidgin',
    product: 'BBC News',
    serviceLocalizedName: 'Pidgin',
    locale: 'pcm',
    // there is no valid ISO 639-1 code for Pidgin
    isoLang: null,
    datetimeLocale: 'pcm',
    service: 'pidgin',
    serviceName: 'Pidgin',
    languageName: 'Nigerian Pidgin',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/pidgin.png',
    defaultImageAltText: 'BBC News Pidgin',
    dir: 'ltr',
    externalLinkText: ', outside',
    imageCaptionOffscreenText: 'Wetin we call dis foto, ',
    videoCaptionOffscreenText: 'Wetin we call dis Video, ',
    audioCaptionOffscreenText: 'Wetin we call dis Audio, ',
    defaultCaptionOffscreenText: 'Wetin we call am, ',
    imageCopyrightOffscreenText: 'Wia dis foto come from, ',
    script: latin,
    manifestPath: '/pidgin/manifest.json',
    swPath: '/sw.js',
    homePageTitle: 'Domot',
    noBylinesPolicy:
      'https://www.bbc.com/pidgin/institutional-48528766#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/pidgin/institutional-48528766',
    isTrustProjectParticipant: true,
    twitterCreator: '@BBCNews', // to be updated
    twitterSite: '@BBCNews', // to be updated
    showAdPlaceholder: false,
    showRelatedTopics: true,
    translations: {
      pagination: {
        previousPage: 'Before',
        nextPage: 'Next',
        pageXOfY: 'Page {x} of {y}',
      },
      ads: {
        advertisementLabel: 'Tori we dem pay for',
      },
      recommendationTitle: 'Recommended articles',
      seeAll: 'See everitin',
      home: 'Home',
      currentPage: 'Page where you dey',
      skipLinkText: 'Waka go wetin de inside',
      relatedContent: 'Another thing we de for inside dis tori',
      relatedTopics: 'Topics Wey Dem Resemble',
      navMenuText: 'Plenti seshon',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      liveExperiencePage: {
        liveLabel: 'Live',
        liveCoverage: 'Live Coverage',
        breaking: 'Breaking',
        postedAt: 'Posted at',
        summary: 'Summary',
        shareButtonText: 'Share dis tori',
      },
      downloads: {
        instructions: 'You can download and view today’s news.',
        title: 'File Download',
      },
      gist: 'Summary',
      error: {
        404: {
          statusCode: '404',
          title: 'Dem no see page',
          message:
            'Sorry, we no go bring you di page you dey look for. Abeg try:',
          solutions: [
            'Check di url again',
            'Press di refresh button for your browser',
            'Search for dis page using di BBC search bar',
          ],
          callToActionFirst: 'Or, abeg visit di ',
          callToActionLinkText: 'BBC News Pidgin',
          callToActionLast: ' homepage.',
          callToActionLinkUrl: 'https://www.bbc.com/pidgin',
        },
        500: {
          statusCode: '500',
          title: 'Mistake',
          message:
            'Sorry, we no dey available for now to bring you di page you dey look for. Abeg try:',
          solutions: [
            'Press di refresh button for your browser',
            'To come back again afta now',
          ],
          callToActionFirst: 'Or, abeg visit di ',
          callToActionLinkText: 'BBC News Pidgin',
          callToActionLast: ' homepage.',
          callToActionLinkUrl: 'https://www.bbc.com/pidgin',
        },
      },
      consentBanner: {
        privacy: {
          title: 'We don update our Privacy and Cookies Policy',
          description: {
            uk: {
              first:
                'We don make some important changes to our Privacy and Cookies Policy and we wan make you know wetin dis one mean for you and your personal infomation.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                'We don make some important changes to our Privacy and Cookies Policy and we wan make you know wetin dis one mean for you and your personal infomation.',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'OK',
          reject: 'Find out wetin don change',
          rejectUrl: 'https://www.bbc.com/usingthebbc/privacy-policy/',
        },
        cookie: {
          amp: {
            accept: 'Accept data collection and continue',
            reject: 'Reject data collection and continue',
            initial: {
              title:
                'Make we know weda you agree to informate [data] collection on AMP',
              description: {
                first: 'We and our partners use technologies, like ',
                linkText: 'cookies',
                last: ', and collect browsing information to give you di best online experience and to make wetin dey inside personal and wetin pipo dey advertise appear for you. Abeg let us know if you agree.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              manage: 'Manage my settings',
            },
            manage: {
              title: 'Manage consent settings on AMP pages',
              description: {
                para1:
                  'Dis settings apply to AMP pages only. You fit see kwesion wey dey ask you to set dis preferences again if you visit non-AMP BBC pages.',
                para2:
                  'Di lightweight mobile page you don visit na Google AMP technology dem use build am.',
                heading2: 'Only for important informate alias data collection',
                para3:
                  'To make our web pages work, we store some limited information ontop your device without your permision alias consent.',
                para4: {
                  text: 'Read more about di very important alias essential information we store ontop your device to make our web page dem work.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
                },
                para5:
                  'We use local storage to store your consent preferences ontop your device.',
                heading3: 'Informate alias data collection wey dey optional.',
                para6:
                  'Wen you agree to informate alias data collection on AMP pages you dey approve to allow us to display ads wey dey special and relevant to you when you dey outside of di UK.',
                para7: {
                  text: 'Read more about how we personalise ads for di BBC and our advertising partners.',
                  url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
                },
                para8:
                  'You fit choose not to receive personalised ads by clicking “Reject data collection and continue” wey dey below. Abeg note say you go still see advertising, but e no go dey personalised to you.',
                para9:
                  'You fit change these settings by clicking “Ad Choices / Do not sell my info” inside di footer at any time.',
              },
            },
          },
          canonical: {
            title: 'Let us know say you agree to cookies',
            description: {
              uk: {
                first: 'We use ',
                linkText: 'cookies',
                last: ' to give you di best online experience. Abeg let us know if you gree to all od dif cookies dem.',
                linkUrl:
                  'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
              international: {
                first: 'We use ',
                linkText: 'cookies',
                last: ' to give you di best online experience. Abeg let us know if you gree to all od dif cookies dem.',
                linkUrl:
                  'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              },
            },
            accept: 'Yes, I agree',
            reject: 'No, cari me go settings',
            rejectUrl:
              'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
          },
        },
      },
      media: {
        noJs: 'Dem no support media player for your device',
        contentExpired: 'Dis thing no dey again',
        contentNotYetAvailable:
          'De thing wey de here never ready for you to play.',
        audio: 'Audio',
        photogallery: 'Image gallery',
        video: 'Video',
        bbc_pidgin_radio: {
          title: 'Placeholder title',
          subtitle: 'Placeholder subtitle',
        },
        listen: 'Make you listen',
        watch: 'Look',
        liveLabel: 'As E Dey Happen',
        nextLabel: 'NEXT',
        previousRadioShow: 'Previous radio show',
        nextRadioShow: 'Next radio show',
        duration: 'Duration',
        closeVideo: 'Exit',
      },
      socialEmbed: {
        caption: {
          textPrefixVisuallyHidden: 'Wetin we call dis Video, ',
          text: 'Warning: Third party content may contain adverts',
          articleText:
            'Warning: Di BBC no dey responsible for di content of external sites.',
          articleAdditionalText: '%provider_name% content fit contain adverts.',
        },
        fallback: {
          text: 'Content is not available',
          linkText: 'View content on %provider_name%',
          linkTextSuffixVisuallyHidden: ', outside',
          warningText: 'De external site no concern BBC.',
        },
        skipLink: {
          text: 'Skip %provider_name% post',
          endTextVisuallyHidden: 'End of %provider_name% post',
        },
        consentBanner: {
          heading: `Allow [social_media_site] content?`,
          body: `Dis article contain content wey [social_media_site] provide. We ask for una permission before anytin dey loaded, as dem fit dey use cookies and oda technologies. You fit wan read di [social_media_site] [link] cookie policy [/link] and [link] privacy policy [/link] before accepting. To view dis content choose 'accept and continue'.`,
          button: 'Accept and kontinu',
        },
      },
      include: {
        errorMessage:
          'Sorry, we can’t display this part of the story on this lightweight mobile page.',
        linkText: 'View the full version of the page to see all the content.',
      },
      topStoriesTitle: 'Top Tori',
      featuresAnalysisTitle: 'Informate me',
      latestMediaTitle: 'New things',
    },
    mostRead: {
      header: 'Di one wey oda users dey read well well',
      lastUpdated: 'De one we dem update for:',
      numberOfItems: 5,
      hasMostRead: true,
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
    navigation: [
      {
        title: 'Home',
        url: '/pidgin',
      },
      {
        title: 'Nigeria',
        url: '/pidgin/topics/c2dwqd1zr92t',
      },
      {
        title: 'Africa',
        url: '/pidgin/topics/c404v061z85t',
      },
      {
        title: 'World',
        url: '/pidgin/topics/c0823e52dd0t',
      },
      {
        title: 'Video',
        url: '/pidgin/topics/c3l19z3k1ert',
      },
      {
        title: 'Sport',
        url: '/pidgin/topics/cjgn7gv77vrt',
      },
      {
        title: 'Entertainment',
        url: '/pidgin/topics/cqywjyzk2vyt',
      },
      {
        title: 'Most popular',
        url: '/pidgin/popular/read',
      },
    ],
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/pidgin/institutional-48528766',
        text: 'Why you fit trust BBC News',
      },
      externalLink: {
        href: 'https://www.bbc.com/editorialguidelines/guidance/feeds-and-links',
        text: 'De way wey we de take go external link.',
      },
      links: [
        {
          href: 'https://www.bbc.com/usingthebbc/terms/',
          text: 'How dem dey take use am',
        },
        {
          href: 'https://www.bbc.com/aboutthebbc',
          text: 'As e concern BBC',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/privacy/',
          text: 'Privacy Policy',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.co.uk/pidgin/send/u50853577',
          text: 'Call BBC',
        },
        {
          href: 'https://www.bbc.com/ws/languages',
          text: 'BBC News for oda languages',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText: 'BBC. De external site no concern BBC.',
    },
    timezone: 'Africa/Lagos',
  },
};

export default withContext(service);
