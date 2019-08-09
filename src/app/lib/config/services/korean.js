const service = {
  lang: `ko-KO`,
  articleAuthor: `https://www.facebook.com/bbcnewskorean`,
  articleTimestampPrefix: 'Updated',
  atiAnalyticsAppName: 'news-korean',
  brandName: 'BBC News 코리아',
  product: 'BBC News 코리아',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/korean.png',
  defaultImageAltText: 'BBC News 코리아',
  dir: `ltr`,
  externalLinkText: ', external',
  imageCaptionOffscreenText: 'Image caption, ',
  videoCaptionOffscreenText: 'Video caption, ',
  audioCaptionOffscreenText: 'Audio caption',
  defaultCaptionOffscreenText: 'Caption, ',
  imageCopyrightOffscreenText: 'Image source, ',
  locale: `ko-KO`,
  datetimeLocale: `ko-KO`.toLowerCase(),
  service: 'korean',
  serviceName: 'News 코리아',
  themeColor: `#B80000`,
  twitterCreator: '@bbcworld',
  twitterSite: '@bbcworld',
  noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
  publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
  script: {
    atlas: {
      groupA: {
        fontSize: '78',
        lineHeight: '84',
      },
      groupB: {
        fontSize: '96',
        lineHeight: '104',
      },
      groupD: {
        fontSize: '140',
        lineHeight: '148',
      },
    },
    elephant: {
      groupA: {
        fontSize: '60',
        lineHeight: '64',
      },
      groupB: {
        fontSize: '78',
        lineHeight: '84',
      },
      groupD: {
        fontSize: '116',
        lineHeight: '124',
      },
    },
    imperial: {
      groupA: {
        fontSize: '50',
        lineHeight: '54',
      },
      groupB: {
        fontSize: '64',
        lineHeight: '72',
      },
      groupD: {
        fontSize: '96',
        lineHeight: '104',
      },
    },
    royal: {
      groupA: {
        fontSize: '40',
        lineHeight: '44',
      },
      groupB: {
        fontSize: '52',
        lineHeight: '60',
      },
      groupD: {
        fontSize: '76',
        lineHeight: '84',
      },
    },
    foolscap: {
      groupA: {
        fontSize: '32',
        lineHeight: '36',
      },
      groupB: {
        fontSize: '40',
        lineHeight: '44',
      },
      groupD: {
        fontSize: '56',
        lineHeight: '60',
      },
    },
    canon: {
      groupA: {
        fontSize: '28',
        lineHeight: '32',
      },
      groupB: {
        fontSize: '32',
        lineHeight: '36',
      },
      groupD: {
        fontSize: '44',
        lineHeight: '48',
      },
    },
    trafalgar: {
      groupA: {
        fontSize: '20',
        lineHeight: '24',
      },
      groupB: {
        fontSize: '24',
        lineHeight: '28',
      },
      groupD: {
        fontSize: '32',
        lineHeight: '36',
      },
    },
    paragon: {
      groupA: {
        fontSize: '20',
        lineHeight: '24',
      },
      groupB: {
        fontSize: '22',
        lineHeight: '26',
      },
      groupD: {
        fontSize: '28',
        lineHeight: '32',
      },
    },
    doublePica: {
      groupA: {
        fontSize: '18',
        lineHeight: '22',
      },
      groupB: {
        fontSize: '20',
        lineHeight: '24',
      },
      groupD: {
        fontSize: '24',
        lineHeight: '28',
      },
    },
    greatPrimer: {
      groupA: {
        fontSize: '18',
        lineHeight: '22',
      },
      groupB: {
        fontSize: '18',
        lineHeight: '22',
      },
      groupD: {
        fontSize: '20',
        lineHeight: '24',
      },
    },
    bodyCopy: {
      groupA: {
        fontSize: '15',
        lineHeight: '20',
      },
      groupB: {
        fontSize: '16',
        lineHeight: '22',
      },
      groupD: {
        fontSize: '16',
        lineHeight: '22',
      },
    },
    pica: {
      groupA: {
        fontSize: '15',
        lineHeight: '20',
      },
      groupB: {
        fontSize: '16',
        lineHeight: '20',
      },
      groupD: {
        fontSize: '16',
        lineHeight: '20',
      },
    },
    longPrimer: {
      groupA: {
        fontSize: '15',
        lineHeight: '18',
      },
      groupB: {
        fontSize: '15',
        lineHeight: '18',
      },
      groupD: {
        fontSize: '14',
        lineHeight: '18',
      },
    },
    brevier: {
      groupA: {
        fontSize: '14',
        lineHeight: '18',
      },
      groupB: {
        fontSize: '14',
        lineHeight: '18',
      },
      groupD: {
        fontSize: '13',
        lineHeight: '16',
      },
    },
    minion: {
      groupA: {
        fontSize: '12',
        lineHeight: '16',
      },
      groupB: {
        fontSize: '12',
        lineHeight: '16',
      },
      groupD: {
        fontSize: '12',
        lineHeight: '16',
      },
    },
  },
  manifestPath: '/articles/manifest.json',
  swPath: '/articles/sw.js',
  translations: {
    error: {
      404: {
        statusCode: '404',
        title: '404 - 페이지를 찾을 수 없습니다',
        message:
          '웹사이트 주소를 잘못 입력하셨을 수 있습니다. 주소와 철자를 확인해 주십시오.',
        solutions: [
          'Double checking the url',
          'Hitting the refresh button in your browser',
          'Searching for this page using the BBC search bar',
        ],
        callToActionFirst: 'Alternatively, please visit the ',
        callToActionLinkText: 'BBC 뉴스 홈 페이지',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/korean',
      },
      500: {
        statusCode: '500',
        title: '500 - 오류',
        message: '오류가 발생했습니다. 페이지를 새로 고쳐 주십시오.',
        solutions: [
          'Hitting the refresh button in your browser',
          'Coming back again later',
        ],
        callToActionFirst: 'Alternatively, please visit the ',
        callToActionLinkText: 'BBC 뉴스 홈 페이지',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/korean',
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
      audio: '오디오',
      photogallery: '이미지 갤러리',
      video: '비디오',
      bbc_korean_radio: {
        title: 'BBC 코리아 라디오',
        subtitle: '세계와 한반도 뉴스를 공정하고 객관적으로 전달해 드립니다',
      },
    },
  },
  brandSVG: 'brandSVG',
  footer: {
    externalLink: {
      href: 'https://www.bbc.co.uk/help/web/links/',
      text: 'Read about our approach to external linking.',
    },
    links: [
      {
        href: 'https://www.bbc.com/news/help-41670342',
        text: 'Why you can trust the BBC',
      },
      {
        href: 'https://www.bbc.com/terms',
        text: 'Terms of Use',
      },
      {
        href: 'https://www.bbc.co.uk/aboutthebbc/',
        text: 'About the BBC',
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
        href: 'https://www.bbc.com/accessibility/',
        text: 'Accessibility Help',
      },
      {
        href: 'https://www.bbc.com/contact/',
        text: 'Contact the BBC',
      },
    ],
    copyrightText:
      'BBC. BBC는 외부 인터넷 사이트의 내용에 대한 책임이 없습니다.',
  },
  fonts: [],
};

export default service;
