import { shape, string, number, arrayOf } from 'prop-types';

export const storyItemImage = {
  path: string,
  altText: string,
  height: number,
  width: number,
};

export const block = arrayOf({
  type: string,
});

export const storyItem = {
  headlines: shape({
    promoHeadline: {
      blocks: shape(block),
    },
  }),
  locators: shape({
    optimoUrn: string.isRequired,
    canonicalUrl: string.isRequired,
  }),
  summary: {
    blocks: shape(block),
  },
  timestamp: number,
  images: shape({
    defaultPromoImage: {
      blocks: shape(block),
    },
  }),
};

export const linkPromo = {
  name: string.isRequired,
  url: string.isRequired,
  summary: string,
  indexImage: shape(storyItemImage),
  timestamp: number,
};
