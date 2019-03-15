import { C_POSTBOX } from '@bbc/psammead-styles/colours';

const news = {
  articleAuthor: `https://www.facebook.com/bbcnews`,
  brandName: 'BBC News',
  defaultImage:
    'https://www.bbc.co.uk/news/special/2015/newsspec_10857/bbc_news_logo.png?cb=1',
  defaultImageAltText: 'BBC News',
  externalLinkText: ', external',
  imageCaptionOffscreenText: 'Image caption, ',
  imageCopyrightOffscreenText: 'Image source, ',
  locale: 'en_GB',
  service: 'news',
  serviceName: 'News',
  themeColor: `${C_POSTBOX}`,
  twitterCreator: '@BBCNews',
  twitterSite: '@BBCNews',
  noBylinesPolicy: 'http://www.bbc.com/news/help-41670342#authorexpertise',
  publishingPrinciples: 'http://www.bbc.com/news/help-41670342',
  translations: {
    error: {
      404: {
        statusCode: '404',
        title: 'Page cannot be found',
        message:
          "Sorry, we're unable to bring you the page you’re looking for. Please try:",
        solutions: [
          'Double checking the url',
          'Hitting the refresh button in your browser',
          'Searching for this page using the BBC search bar',
        ],
        callToActionFirst: 'Alternatively, please visit the ',
        callToActionLinkText: 'BBC News homepage.',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/news',
      },
      500: {
        statusCode: '500',
        title: 'Internal server error',
        message:
          "Sorry, we’re currently unable to bring you the page you're looking for. Please try:",
        solutions: [
          'Hitting the refresh button in your browser',
          'Coming back again later',
        ],
        callToActionFirst: 'Alternatively, please visit the ',
        callToActionLinkText: 'BBC News homepage.',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/news',
      },
    },
  },
};

export default news;
