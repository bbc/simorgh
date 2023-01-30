const ukchina = {
  default: {
    pagination: {
      previousPage: '前页',
      nextPage: '后页',
      pageXOfY: 'Page {x} 的 {y}',
    },
    ads: {
      advertisementLabel: '广告',
    },
    seeAll: '浏览全部',
    home: '主页',
    currentPage: '目前页面',
    skipLinkText: '跳过此内容',
    relatedContent: '更多相关内容',
    relatedTopics: '相关主题内容',
    navMenuText: '分类',
    mediaAssetPage: {
      mediaPlayer: '多媒体播放器',
      audioPlayer: '音频播放器',
      videoPlayer: '视频播放器',
    },
    gist: '概要',
    error: {
      404: {
        statusCode: '404',
        title: '页面无法找到',
        message: '对不起，我们无法找到您所需页面。请尝试：',
        solutions: [
          '双次点击这个链接',
          '点击浏览器上的更新钮',
          '使用BBC搜索栏搜寻此页面',
        ],
        callToActionFirst: '或者，请访问',
        callToActionLinkText: 'BBC 英伦网',
        callToActionLast: '官网主页',
        callToActionLinkUrl: 'https://www.bbc.com/ukchina/simp',
      },
      500: {
        statusCode: '500',
        title: '内部伺服器错误',
        message: '对不起，我们无法找到您所需页面。请尝试：',
        solutions: ['点击浏览器上的更新钮', '请稍候再试'],
        callToActionFirst: '或者，请访问',
        callToActionLinkText: 'BBC 英伦网',
        callToActionLast: '官网主页',
        callToActionLinkUrl: 'https://www.bbc.com/ukchina/simp',
      },
    },
    consentBanner: {
      privacy: {
        title: '我们更新了隐私和Cookies条款',
        description: {
          uk: {
            first:
              '我们在隐私和Cookies条款上有重要更新，希望告知这对您和您的数据意味着什么。',
            linkText: null,
            last: null,
            linkUrl: null,
          },
          international: {
            first:
              '我们在隐私和Cookies条款上有重要更新，希望告知这对您和您的数据意味着什么。',
            linkText: null,
            last: null,
            linkUrl: null,
          },
        },
        accept: '可以',
        reject: '了解更新内容',
        rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
      },
      cookie: {
        amp: {
          accept: '接受数据收集并继续',
          reject: '拒绝数据收集并继续',
          initial: {
            title: '请告知是否允许我们在AMP收集数据',
            description: {
              first: '我们及合作伙伴使用例如',
              linkText: 'cookies',
              last: '的科技，收集浏览数据以便给您带来最佳上网体验，以及个人化内容和广告配置。请告知是否可以。',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            manage: '管理我的设置',
          },
          manage: {
            title: '管理AMP页面认可授权设置',
            description: {
              para1:
                '上述设置仅用于AMP页面。如果您再度访问沒有AMP技术的BBC.com网页，也可能会被要求设定个人选项。',
              para2: '您刚刚浏览的上述轻载移动页面，建立时使用了谷歌AMP技术。',
              heading2: '仅限于必需数据收集',
              para3: '为使网页运作正常，我们或在未争得许可时收集有限必要资讯。',
              para4: {
                text: '阅读更多我们在您的浏览器上存储必需数据，以便页面正常运作的相关资讯',
                url: 'https://www.bbc.co.uk/usingthebbc/strictly-necessary-cookies/',
              },
              para5: '我们使用本地存储，将选项存储于您的浏览工具上。',
              heading3: '可选项数据收集',
              para6:
                '认可AMP页面收集数据，也就是认可您在英国之外区域浏览页面时我们可以显示个人化的广告。',
              para7: {
                text: '阅读更多有关BBC及合作伙伴如何实现广告个人化的资讯',
                url: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
              },
              para8:
                '您可以选择点击“拒绝数据收集并继续”，选择不接受个人化广告。请注意，这一选项并不意味着您将不再看到广告，只是您看到的广告将不具备个人化设置。',
              para9:
                '您可以点击页面下边“Ad Choices / Do not sell my info”选项，更改这些设置。',
            },
          },
        },
        canonical: {
          title: '请告知您认可接受Cookies',
          description: {
            uk: {
              first: '我们使用',
              linkText: 'cookies',
              last: '以便给您最好的网上体验。请告知您是否认同使cookies。',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            international: {
              first: '我们使用',
              linkText: 'cookies',
              last: '以便给您最好的网上体验。请告知您是否认同使cookies。',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
          },
          accept: '可以，我同意',
          reject: '不可，带我去设置页面',
          rejectUrl:
            'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
        },
      },
    },
    media: {
      noJs: '你的器材不支持播放多媒体材料',
      contentExpired: '此内容已不存在',
      contentNotYetAvailable: '有关内容暂时尚未可以为你提供。',
      audio: '音频',
      photogallery: '图辑专页',
      video: '视频',
      listen: '收听',
      watch: '观看',
      liveLabel: '直播',
      nextLabel: 'NEXT',
      previousRadioShow: '上期广播节目',
      nextRadioShow: '下期广播节目',
      duration: '节目全长',
      recentEpisodes: '存档节目',
    },
    socialEmbed: {
      caption: {
        textPrefixVisuallyHidden: '视频加注文字，',
        text: '告知：第三方内容可能包含广告',
      },
      fallback: {
        text: '无内容',
        linkText: '继续浏览 %provider_name%',
        linkTextSuffixVisuallyHidden: ', 外部链接',
        warningText: 'BBC对外部网站内容不负责任。',
      },
      skipLink: {
        text: '"跳过 %provider_name% 帖子',
        endTextVisuallyHidden: '结尾 %provider_name% 帖子 ',
      },
    },
    include: {
      errorMessage:
        'Sorry, we can’t display this part of the story on this lightweight mobile page.',
      linkText: 'View the full version of the page to see all the content.',
    },
    topStoriesTitle: '头条内容',
    featuresAnalysisTitle: '特别推荐',
  },
};

export default ukchina;
