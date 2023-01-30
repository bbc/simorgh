const sport = {
  default: {
    ads: {
      advertisementLabel: 'Advertisement',
    },
    home: 'Home',
    currentPage: 'Current page',
    skipLinkText: 'Skip to content',
    relatedContent: 'Related content',
    navMenuText: 'Sections',
    mediaAssetPage: {
      mediaPlayer: 'Media player',
      audioPlayer: 'Audio player',
      videoPlayer: 'Video player',
    },
    gist: 'At a glance',
    error: {
      404: {
        statusCode: '404',
        title: 'Page cannot be found',
        message:
          "Sorry, we're unable to bring you the page you're looking for. Please try:",
        solutions: [
          'Double checking the url',
          'Hitting the refresh button in your browser',
          'Searching for this page using the BBC search bar',
        ],
        callToActionFirst: 'Alternatively, please visit the ',
        callToActionLinkText: 'BBC Sport homepage.',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/sport',
      },
      500: {
        statusCode: '500',
        title: 'Internal server error',
        message:
          "Sorry, we're currently unable to bring you the page you're looking for. Please try:",
        solutions: [
          'Hitting the refresh button in your browser',
          'Coming back again later',
        ],
        callToActionFirst: 'Alternatively, please visit the ',
        callToActionLinkText: 'BBC Sport homepage.',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/sport',
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
        amp: {
          accept: 'Accept data collection and continue',
          reject: 'Reject data collection and continue',
          initial: {
            title: 'Let us know you agree to data collection on AMP',
            description: {
              first: 'We and our partners use technologies, such as ',
              linkText: 'cookies',
              last: ', and collect browsing data to give you the best online experience and to personalise the content and advertising shown to you. Please let us know if you agree.',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            manage: 'Manage my settings',
          },
          manage: {
            title: 'Manage consent settings on AMP pages',
            description: {
              para1:
                'These settings apply to AMP pages only. You may be asked to set these preferences again when you visit non-AMP BBC pages.',
              para2:
                'The lightweight mobile page you have visited has been built using Google AMP technology.',
              heading2: 'Strictly necessary data collection',
              para3:
                'To make our web pages work, we store some limited information on your device without your consent.',
              para4: {
                text: 'Read more about the essential information we store on your device to make our web pages work.',
                url: 'https://www.bbc.co.uk/usingthebbc/strictly-necessary-cookies/',
              },
              para5:
                'We use local storage to store your consent preferences on your device.',
              heading3: 'Optional data collection',
              para6:
                'When you consent to data collection on AMP pages you are consenting to allow us to display personalised ads that are relevant to you when you are outside of the UK.',
              para7: {
                text: 'Read more about how we personalise ads in the BBC and our advertising partners.',
                url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
              },
              para8:
                'You can choose not to receive personalised ads by clicking “Reject data collection and continue” below. Please note that you will still see advertising, but it will not be personalised to you.',
              para9:
                'You can change these settings by clicking “Ad Choices / Do not sell my info” in the footer at any time.',
            },
          },
        },
        canonical: {
          title: 'Let us know you agree to cookies',
          description: {
            uk: {
              first: 'We use ',
              linkText: 'cookies',
              last: ' to give you the best online experience. Please let us know if you agree to all of these cookies.',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            international: {
              first: 'We use ',
              linkText: 'cookies',
              last: ' to give you the best online experience. Please let us know if you agree to all of these cookies.',
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
    },
    media: {
      noJs: 'To play this content, please enable JavaScript, or try a different browser',
      contentExpired: 'This content is no longer available',
      audio: 'Audio',
      photogallery: 'Image gallery',
      video: 'Video',
      listen: 'Listen',
      watch: 'Watch',
      liveLabel: 'LIVE',
      nextLabel: 'NEXT',
      previousRadioShow: 'Previous radio show',
      nextRadioShow: 'Next radio show',
      duration: 'Duration',
    },
    socialEmbed: {},
  },
};

export default sport;
