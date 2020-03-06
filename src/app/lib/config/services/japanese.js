import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { noAscendersOrDescenders } from '@bbc/gel-foundations/scripts';
import { japanese as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/Asia/Tokyo';
import 'moment/locale/ja';
import withContext from '../../../contexts/utils/withContext';

export const service = {
  default: {
    lang: `ja`,
    articleAuthor: `https://www.facebook.com/bbcnews/`,
    articleTimestampPrefix: '更新',
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
    imageCaptionOffscreenText: '画像説明 ',
    videoCaptionOffscreenText: '動画説明 ',
    audioCaptionOffscreenText: '音声説明 ',
    defaultCaptionOffscreenText: 'キャプション ',
    imageCopyrightOffscreenText: '画像提供 ',
    locale: `ja-JP`,
    datetimeLocale: `ja`,
    service: 'japanese',
    serviceName: 'Japan',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcnewsjapan',
    twitterSite: '@bbcnewsjapan',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    isTrustProjectParticipant: true,
    script: noAscendersOrDescenders,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: '最新ニュース',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      seeAll: '全ての記事を見る',
      home: 'ホーム',
      currentPage: '現在のページ',
      skipLinkText: 'コンテンツへ移動',
      relatedContent: '関連コンテンツ',
      navMenuText: 'ジャンル',
      mediaAssetPage: {
        mediaPlayer: 'Media player',
        audioPlayer: 'Audio player',
        videoPlayer: 'Video player',
      },
      error: {
        404: {
          statusCode: '404',
          title: 'ページが見つかりません',
          message:
            'お探しのページが見つかりません。こちらを開いてみてください:',
          solutions: [
            'URLを確認',
            'ブラウザのページ更新ボタンを押す',
            'BBC検索バーを使ってこのページを探す',
          ],
          callToActionFirst: 'あるいは ',
          callToActionLinkText: 'BBCニュース　ホームページ',
          callToActionLast: ' をご覧ください',
          callToActionLinkUrl: 'https://www.bbc.com/japanese',
        },
        500: {
          statusCode: '500',
          title: '"内部サーバーエラー"',
          message:
            '申し訳ありません。お探しのページは現在開くことができません。こちらをお試しください:',
          solutions: ['ブラウザのページ更新ボタンを押す', '後でまた開く'],
          callToActionFirst: 'あるいは ',
          callToActionLinkText: 'BBCニュース　ホームページ',
          callToActionLast: 'をご覧ください',
          callToActionLinkUrl: 'https://www.bbc.com/japanese',
        },
      },
      consentBanner: {
        privacy: {
          title: '個人情報とクッキーの方針を更新しました',
          description: {
            uk: {
              first:
                '本サイトの個人情報とクッキーに関する方針に重要な変更を加えました。これがあなたとあなたの情報にどう関わるか、こちらで説明します。',
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                '本サイトの個人情報とクッキーに関する方針に重要な変更を加えました。これがあなたとあなたの情報にどう関わるか、こちらで説明します。',
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'OK',
          reject: '変更点を見る',
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
        },
        cookie: {
          title: 'クッキー使用に同意するか教えてください',
          description: {
            uk: {
              first: '本サイトでは最高のオンライン体験をご提供するため ',
              linkText: 'クッキー',
              last:
                ' を使用しています。すべてのクッキー使用に同意するか教えてください。',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            international: {
              first: '本サイトおよび提携サイトは ',
              linkText: 'クッキー',
              last:
                ' などの技術を使用し、あなたに最高のオンライン体験をご提供するためネット閲覧データを集め、あなたにあつらえてパーソナライズしたコンテンツや広告を表示します。これに同意するかお知らせください。',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
          },
          accept: 'はい、同意します',
          reject: 'いいえ、設定ページを開いてください',
          rejectUrl:
            'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
        },
      },
      media: {
        noJs: 'お使いの端末ではメディアプレイバックはご利用になれません',
        contentExpired: 'このコンテンツはもうご利用いただけません。',
        audio: '音声',
        photogallery: '写真ギャラリー',
        video: 'ビデオ',
        listen: 'Listen',
        watch: 'Watch',
        liveLabel: 'LIVE',
        previousRadioShow: 'Previous radio show',
        nextRadioShow: 'Next radio show',
        duration: 'Duration',
      },
    },
    brandSVG,
    mostRead: {
      header: '一番人気',
      lastUpdated: 'Last updated:',
      numberOfItems: 10,
      hasMostRead: true,
    },
    radioSchedule: {
      hasRadioSchedule: false,
    },
    footer: {
      trustProjectLink: {
        href: 'https://www.bbc.com/japanese/help-49677253',
        text: 'BBCニュースが信頼できる理由',
      },
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text: '本サイトの外部リンク方針はこちら',
      },
      links: [
        {
          href: 'https://www.bbc.com/japanese/help/terms',
          text: '利用条件',
        },
        {
          href: 'https://www.bbcworldnews-japan.com/about_us/',
          text: 'BBCについて',
        },
        {
          href: 'https://www.bbc.com/japanese/help/privacy',
          text: '個人情報取り扱い方針',
        },
        {
          href: 'https://www.bbc.co.uk/usingthebbc/cookies/',
          text: 'クッキー',
        },
        {
          href: 'https://www.bbc.co.uk/contact',
          text: 'BBCに連絡する',
        },
      ],
      copyrightText: 'BBC. BBCは外部サイトの内容に責任を負いません。',
    },
    fonts: [],
    timezone: 'Asia/Tokyo',
    navigation: [
      {
        title: 'ホーム',
        url: '/japanese',
      },
      {
        title: '日本',
        url:
          'https://www.bbc.com/japanese/topics/3f53c272-5b8f-4a4f-99de-a857d6726c5b',
      },
      {
        title: 'アジア',
        url:
          'https://www.bbc.com/japanese/topics/ba90754a-9033-4e9c-990b-d1139e5070a3',
      },
      {
        title: 'イギリス',
        url:
          'https://www.bbc.com/japanese/topics/2e91364c-5c77-4660-b76e-d76202785e64',
      },
      {
        title: 'アメリカ',
        url:
          'https://www.bbc.com/japanese/topics/82857f8e-8134-462a-bb32-b7b14f4eab75',
      },
      {
        title: '解説・読み物',
        url: 'https://www.bbc.com/japanese/features_and_analysis',
      },
      {
        title: 'ビデオ',
        url: 'https://www.bbc.com/japanese/video',
      },
      {
        title: 'ワールドニュースTV',
        url: 'https://www.bbcworldnews-japan.com/',
      },
    ],
  },
};

export default withContext(service);
