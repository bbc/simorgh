import scrapedPortraitVideos from './hausa.json';
import { PortraitVideoArticle, PortraitVideoPageData } from './types';

const topicTitles = {
  cwr9j8g1kj9t: 'खेल',
  ckdxnkzpz37t: 'क्रिकेट',
  c5qvpx55rykt: 'ऑस्ट्रेलिया',
} as const;

const topicIds = Object.keys(topicTitles) as (keyof typeof topicTitles)[];

const toPortraitVideoArticle = (
  article: PortraitVideoArticle,
): PortraitVideoArticle => ({
  ...article,
  title: article.title
    .replace(/^Bidiyo,\s*/, '')
    .replace(/,\s*Tsawon lokaci \d+,\d+$/, ''),
});

const hausaPortraitVideoPageData: PortraitVideoPageData = {
  pageTitle: 'शॉर्ट-फॉर्म वीडियो',
  slices: topicIds.map(topicId => ({
    topicId,
    title: topicTitles[topicId],
    articles: scrapedPortraitVideos[topicId].map(toPortraitVideoArticle),
  })),
};

export default hausaPortraitVideoPageData;
