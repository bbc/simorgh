const serviceConfig = {
  news: {
    service: 'news',
    articleAuthor: `https://www.facebook.com/bbcnews`,
    defaultImage:
      'https://www.bbc.co.uk/news/special/2015/newsspec_10857/bbc_news_logo.png?cb=1',
    defaultImageAltText: 'BBC News',
    locale: 'en_GB',
    opengraphSiteName: 'BBC News',
    twitterCreator: '@BBCNews',
    twitterSite: '@BBCNews',
  },
  persian: {
    service: 'persian',
    articleAuthor: 'https://www.facebook.com/bbcnews',
    defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/persian.png',
    defaultImageAltText: 'BBC News فارسی',
    locale: 'fa',
    opengraphSiteName: 'BBC News فارسی',
    twitterCreator: '@bbcpersian',
    twitterSite: '@bbcpersian',
  },
};

export default serviceConfig;
