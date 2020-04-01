import { singleTextBlock } from '#app/models/blocks';

export const getHeadlineBlock = (headlineText) => ({
  model: {
    blocks: [singleTextBlock(headlineText)],
  },
  type: 'headline',
});

export const getFauxHeadlineBlock = (headlineText) => ({
  model: {
    blocks: [singleTextBlock(headlineText)],
  },
  type: 'fauxHeadline',
});

export const getVisuallyHiddenHeadlineBlock = (headlineText) => ({
  model: {
    blocks: [singleTextBlock(headlineText)],
  },
  type: 'visuallyHiddenHeadline',
});
