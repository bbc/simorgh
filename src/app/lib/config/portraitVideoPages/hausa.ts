import scrapedPortraitVideos from './hausa.json';
import { PortraitVideoArticle, PortraitVideoPageData } from './types';

const topicTitles = {
  cnq68kdjkxdt: 'Mata',
  c2dwqj031y7t: 'Kano',
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
  pageTitle: 'Bidiyoyin tsaye',
  slices: topicIds.map(topicId => ({
    topicId,
    title: topicTitles[topicId],
    articles: scrapedPortraitVideos[topicId].map(toPortraitVideoArticle),
  })),
};

export default hausaPortraitVideoPageData;
