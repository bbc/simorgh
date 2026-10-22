import scrapedPortraitVideos from './thai.json';
import { PortraitVideoArticle, PortraitVideoPageData } from './types';

const topicTitles = {
  cjgn73g98rqt: 'ประเทศไทย',
  cyx5kzxv6jgt: 'สหรัฐอเมริกา',
  cnq68nky4k2t: 'อิหร่าน',
  cxnykv3y1y6t: 'ประเทศจีน',
} as const;

const topicIds = Object.keys(topicTitles) as (keyof typeof topicTitles)[];

const toPortraitVideoArticle = (
  article: PortraitVideoArticle,
): PortraitVideoArticle => ({
  ...article,
  title: article.title
    .replace(/^वीडियो,\s*/, '')
    .replace(/,\s*अवधि \d+,\d+$/, ''),
});

const hindiPortraitVideoPageData: PortraitVideoPageData = {
  pageTitle: 'วิดีโอรูปแบบสั้น',
  slices: topicIds.map(topicId => ({
    topicId,
    title: topicTitles[topicId],
    articles: scrapedPortraitVideos[topicId].map(toPortraitVideoArticle),
  })),
};

export default hindiPortraitVideoPageData;
