import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';

const getLivePageBlock = (blocks: TopStoryItem[] = []) =>
  blocks.find(block => block?.type === 'tipo-live' && block?.isLive);

export default getLivePageBlock;
