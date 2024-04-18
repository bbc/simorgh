import { shape, string, bool, number, arrayOf } from 'prop-types';

export const storyItemImage = {
  path: string,
  altText: string,
  height: number,
  width: number,
};

export const block = {
  type: string,
};

export const storyItem = {
  headlines: shape({
    headline: string.isRequired,
  }),
  locators: shape({
    assetUri: string.isRequired,
  }),
  summary: string,
  timestamp: number,
  indexImage: shape(storyItemImage),
};

export const tipoLiveStoryItem = {
  headline: string,
  destinationUrl: string,
  isLive: bool,
};

export const optimoStoryItem = {
  headlines: shape({
    promoHeadline: shape({
      blocks: arrayOf(shape(block)),
    }),
  }),
  locators: shape({
    optimoUrn: string.isRequired,
    canonicalUrl: string.isRequired,
  }),
  summary: shape({
    blocks: arrayOf(shape(block)),
  }),
  images: shape({
    defaultPromoImage: shape({
      blocks: arrayOf(shape(block)),
    }),
  }),
  timestamp: number,
};

export const linkPromo = {
  name: string.isRequired,
  url: string.isRequired,
  summary: string,
  indexImage: shape(storyItemImage),
  timestamp: number,
};
