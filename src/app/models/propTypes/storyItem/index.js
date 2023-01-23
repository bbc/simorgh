import { shape, string, number, object } from 'prop-types';

export const storyItemImage = {
  path: string,
  altText: string,
  height: number,
  width: number,
};

export const storyItem = {
  headlines: shape({
    promoHeadline: object.isRequired,
  }),
  locators: shape({
    optimoUrn: string.isRequired,
    canonicalUrl: string.isRequired
  }),
  summary: object,
  timestamp: number,
  images: object,
};

export const linkPromo = {
  name: string.isRequired,
  url: string.isRequired,
  summary: string,
  indexImage: shape(storyItemImage),
  timestamp: number,
};
