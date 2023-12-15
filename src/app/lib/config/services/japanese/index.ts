import noAscendersOrDescenders from '../../../../components/ThemeProvider/fontScripts/noAscOrDesc';
import '#psammead/moment-timezone-include/tz/Asia/Tokyo';
import 'moment/locale/ja';
import withContext from '../../../../contexts/utils/withContext';
import { DefaultServiceConfig } from '../../../../models/types/serviceConfig';
import translations from './translations';

export const service: DefaultServiceConfig = {
  default: {
    lang: `ja`,
    articleAuthor: `https://www.facebook.com/bbcnews/`,
    articleTimestampPrefix: '更新',
    articleTimestampSuffix: '',
    atiAnalyticsAppName: 'news-japanese',
    atiAnalyticsProducerId: '56',
    chartbeatDomain: 'japanese.bbc.co.uk',
    brandName: 'BBCニュース',
    product: 'BBC News',
    serviceLocalizedName: 'ニュース',
    defaultImage:
      'https://news.files.bbci.co.uk/include/articles/public/japanese/images/metadata/poster-1024x576.png',
    defaultImageAltText: 'BBCニュース',
    dir: `ltr`,
    externalLinkText: ' は外部ページです',
    imageCaptionOffscreenText: '画像説明, ',
    videoCaptionOffscreenText: '動画説明, ',
    audioCaptionOffscreenText: '音声説明, ',
    defaultCaptionOffscreenText: 'キャプション, ',
    imageCopyrightOffscreenText: '画像提供, ',
    locale: `ja-JP`,
    // valid ISO 639-1 code - this is not the same as lang! see explanation in #3405
    isoLang: 'ja',
    datetimeLocale: `ja`,
    service: 'japanese',
    serviceName: 'Japan',
    languageName: 'Japanese',
    twitterCreator: '@bbcnewsjapan',
    twitterSite: '@bbcnewsjapan',
    noBylinesPolicy:
      'https://www.bbc.com/japanese/help-49677253#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/japanese/help-49677253',
    isTrustProjectParticipant: true,
    script: noAscendersOrDescenders,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: '最新ニュース',
    showAdPlaceholder: true,
    showRelatedTopics: true,
    translations,
    mostRead: {
      header: '読まれた記事ランキング',
      lastUpdated: '最終更新:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    mostWatched: {
      header: 'よく見られています',
      numberOfItems: 10,
      hasMostWatched: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    recommendations: {
      hasStoryRecommendations: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/japanese/help-49677253',
        text: 'BBCニュースが信頼できる理由',
      },
      externalLink: {
        href: 'https://www.bbc.com/japanese/help-33991539',
        text: '本サイトの外部リンク方針はこちら',
      },
      links: [
        {
          href: 'https://www.bbc.com/japanese/help-33991540',
          text: '利用条件',
        },
        {
          href: 'https://www.bbcworldnews-japan.com/about_us/',
          text: 'BBCについて',
        },
        {
          href: 'https://www.bbc.com/japanese/help-33991542',
          text: '個人情報取り扱い方針',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'クッキー',
        },
        {
          href: 'https://www.bbc.co.uk/contact',
          text: 'BBC に連絡する',
        },
        {
          id: 'COOKIE_SETTINGS',
          href: '#',
          text: 'Do not share or sell my info',
          lang: 'en-GB',
        },
      ],
      copyrightText: 'BBC.　BBCは外部サイトの内容に責任を負いません。',
    },
    timezone: 'Asia/Tokyo',
    navigation: [
      {
        title: 'ホーム',
        url: '/japanese',
      },
      {
        title: 'イスラエル・ガザ戦争',
        url: '/japanese/topics/cw5wn2e9rpnt',
      },
      {
        title: 'ウクライナ侵攻',
        url: '/japanese/60631515',
      },
      {
        title: '気候変動',
        url: '/japanese/58771282',
      },
      {
        title: '日本',
        url: '/japanese/topics/cyx5k201n3qt',
      },
      {
        title: 'アジア',
        url: '/japanese/topics/cyx5k20kvd2t',
      },
      {
        title: 'イギリス',
        url: '/japanese/topics/c95y3gk44nyt',
      },
      {
        title: 'アメリカ',
        url: '/japanese/topics/cdr56kqdr70t',
      },
      {
        title: '解説・読み物',
        url: '/japanese/features-and-analysis-54539120',
      },
      {
        title: 'ビデオ',
        url: '/japanese/topics/c132079wln0t',
      },
      {
        title: 'ワールドニュースTV',
        url: 'https://www.bbcworldnews-japan.com/',
      },
    ],
  },
};

export default withContext(service);
