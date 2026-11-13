import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';

export const getPromoTitle = (block: TopStoryItem) =>
  block?.headlines?.overtyped ||
  block?.headlines?.headline ||
  block?.headlines?.promoHeadline?.blocks?.[0]?.model?.blocks?.[0]?.model
    ?.text ||
  block?.name ||
  block?.headline ||
  '';

export const getPromoHref = (block: TopStoryItem) =>
  block?.locators?.canonicalUrl ||
  block?.locators?.assetUri ||
  block?.uri ||
  (block?.destinationUrl ? `https://www.bbc.com${block.destinationUrl}` : '');

export const getLivePageBlock = (blocks: TopStoryItem[] = []) =>
  blocks.find(block => block?.type === 'tipo-live' && block?.isLive);
