import { shape, string, number } from 'prop-types';

export const storyItemImage = {
  path: string.isRequired,
  altText: string.isRequired,
  height: number.isRequired,
  width: number.isRequired,
};

export const storyItem = {
  headlines: shape({
    headline: string.isRequired,
  }),
  locators: shape({
    assetUri: string.isRequired,
  }).isRequired,
  summary: string.isRequired,
  timestamp: number.isRequired,
  indexImage: shape(storyItemImage).isRequired,
};
