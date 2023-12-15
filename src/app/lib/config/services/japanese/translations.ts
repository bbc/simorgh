export default {
  pagination: {
    page: 'ページ',
    previousPage: '前に戻る',
    nextPage: '次へ',
    pageXOfY: 'ページ {x} ／ {y}',
  },
  ads: {
    advertisementLabel: '広告',
  },
  seeAll: '全ての記事を見る',
  home: 'ホーム',
  currentPage: '現在のページ',
  skipLinkText: 'コンテンツへ移動',
  relatedContent: '関連コンテンツ',
  relatedTopics: '関連トピックス',
  navMenuText: 'ジャンル',
  mediaAssetPage: {
    mediaPlayer: 'メディアプレイヤー',
    audioPlayer: '音声プレイヤー',
    videoPlayer: '動画プレイヤー',
  },
  liveExperiencePage: {
    liveLabel: '実況中',
    liveCoverage: '関連実況',
    breaking: '速報',
    postedAt: '投稿時間',
    summary: '要点',
  },
  gist: '要点',
  error: {
    404: {
      statusCode: '404',
      title: 'ページが見つかりません',
      message: 'お探しのページが見つかりません。こちらを開いてみてください:',
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
      rejectUrl: 'https://www.bbc.com/usingthebbc/your-data-matters',
    },
    cookie: {
      amp: {
        accept: 'データ取得に同意して続ける',
        reject: 'データ取得を拒否して続ける',
        initial: {
          title: 'AMPのデータ取得に同意するか教えてください。',
          description: {
            first: '本サイトおよび提携サイトは ',
            linkText: 'クッキー',
            last: ' などの技術を使用し、あなたに最高のオンライン体験をご提供するためネット閲覧データを集め、あなたにあつらえてパーソナライズしたコンテンツや広告を表示します。これに同意するかお知らせください。',
            linkUrl:
              'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
          manage: '設定を管理する',
        },
        manage: {
          title: 'AMPの同意設定を管理する',
          description: {
            para1:
              'こちらの設定はAMPのページにのみ使われます。AMPではないBBC.com上のページを開いた際には再度、環境設定を要求される場合があります。',
            para2:
              '閲覧いただいた軽量化モバイルページはGoogle AMP技術を使って構築されています。',
            heading2: '必要不可欠なデータ取得',
            para3:
              'サイト上ページの機能維持のため、読者の方の同意なしでご使用端末について限定的な情報を保存しています。',
            para4: {
              text: 'サイト上のページを機能させるため保存する、読者の使用端末に関する必要不可欠な情報について、さらに読む。',
              url: 'https://www.bbc.com/usingthebbc/cookies/strictly-necessary-cookies/',
            },
            para5:
              '読者の使用端末の同意設定をローカル･ストレージに保存しています。',
            heading3: 'データ取得オプション',
            para6:
              'AMPページ上のデータ取得に同意した場合、イギリス国外において、読者の関心に関連するパーソナライズ広告の表示に同意したことになります。',
            para7: {
              text: 'BBCのパーソナライズ広告と広告パートナーについてもっと読む。',
              url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
            },
            para8:
              'パーソナライズ広告を拒否する場合はこの下の「データ取得を拒否して続ける」をクリックしてください。この場合、広告の表示は続きますが、パーソナライズはされません。',
            para9:
              '広告の設定は、ページ最下部のフッターにある「広告について選ぶ／私の情報を第三者に提供しない」をいつでも選んで変更することができます。',
          },
        },
      },
      canonical: {
        title: 'クッキー使用に同意するか教えてください',
        description: {
          uk: {
            first: '本サイトでは最高のオンライン体験をご提供するため ',
            linkText: 'クッキー',
            last: ' を使用しています。すべてのクッキー使用に同意するか教えてください。',
            linkUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
          international: {
            first: '本サイトでは最高のオンライン体験をご提供するため ',
            linkText: 'クッキー',
            last: ' を使用しています。すべてのクッキー使用に同意するか教えてください。',
            linkUrl:
              'https://www.bbc.com/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
        },
        accept: 'はい、同意します',
        reject: 'いいえ、設定ページを開いてください',
        rejectUrl:
          'https://www.bbc.com/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
      },
    },
  },
  media: {
    noJs: 'お使いの端末ではメディアプレイバックはご利用になれません',
    contentExpired: 'このコンテンツはもうご利用いただけません。',
    contentNotYetAvailable: 'このコンテンツはまだ再生できません。',
    audio: '音声',
    photogallery: '写真ギャラリー',
    video: 'ビデオ',
    listen: '聴く',
    watch: '観る',
    liveLabel: '生放送',
    nextLabel: '次の番組へ',
    previousRadioShow: '前のラジオ番組',
    nextRadioShow: '次のラジオ番組',
    duration: '所要時間',
    recentEpisodes: 'さらに',
  },
  socialEmbed: {
    caption: {
      textPrefixVisuallyHidden: '動画説明, ',
      text: 'ご注意：外部コンテンツには広告が含まれるかもしれません',
      articleText: 'ご注意: BBCは外部サイトの内容に責任を負いません。.',
      articleAdditionalText:
        '%provider_name%には広告が含まれる場合があります。',
    },
    fallback: {
      text: 'このコンテンツは開けません',
      linkText: '%provider_name%でさらに見る',
      linkTextSuffixVisuallyHidden: ', は外部ページです',
      warningText: 'BBCは外部サイトの内容に責任を負いません。',
    },
    skipLink: {
      text: '%provider_name% の投稿を飛ばす',
      endTextVisuallyHidden: '%provider_name% の投稿の終わり',
    },
    consentBanner: {
      heading: `[social_media_site] のコンテンツを表示しますか？`,
      body: `この記事には[social_media_site] 提供の内容が含まれます。クッキーや他の技術が使われている可能性があるため、あらゆる外部コンテンツ読み込みの前に、読者の方の同意をおたずねしています。同意する前に、 [social_media_site] の[link] クッキー方針[/link] および[link] プライバシー方針 [/link] を確認することも可能です。このコンテンツを見るには「同意して続ける」を選んでください。`,
      button: '同意して続ける',
    },
  },
  include: {
    errorMessage:
      'Sorry, we can’t display this part of the story on this lightweight mobile page.',
    linkText: 'View the full version of the page to see all the content.',
  },
  topStoriesTitle: 'トップ記事',
  featuresAnalysisTitle: '読み物・解説',
};
