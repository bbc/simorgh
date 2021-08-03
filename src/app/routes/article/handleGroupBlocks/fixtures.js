export const defaultIds = {
  list: 'list',
  media: 'media',
  group: 'group',
  headline: 'headline',
  paragraph: 'paragraph',
  text: 'text',
};

export const paragraphBlock = ({ id = defaultIds.paragraph } = {}) => ({
  type: 'paragraph',
  id,
  model: {
    text: 'Example Paragraph',
    blocks: [
      {
        type: 'fragment',
        model: {
          text: 'Example Paragraph',
          attributes: [],
        },
      },
    ],
  },
});

export const unorderedListBlock = ({ id = defaultIds.list } = {}) => ({
  type: 'unorderedList',
  id,
  model: {
    blocks: [
      {
        type: 'listItem',
        model: {
          blocks: [paragraphBlock()],
        },
      },
    ],
  },
});

export const textBlock = ({
  id = defaultIds.text,
  blocks = [paragraphBlock()],
} = {}) => ({
  type: 'text',
  id,
  model: {
    blocks,
  },
});

export const headlineBlock = ({
  id = defaultIds.headline,
  blocks = [textBlock()],
} = {}) => ({
  type: 'headline',
  id,
  model: {
    blocks,
  },
});

export const mediaBlock = ({ id = defaultIds.media, type = 'image' } = {}) => ({
  type,
  id,
  model: {
    blocks: [
      {
        type: 'caption',
        model: {
          blocks: [textBlock()],
        },
      },
      {
        type: 'altText',
        model: {
          blocks: [textBlock()],
        },
      },
      {
        type: 'rawImage',
        model: {
          width: 800,
          height: 450,
          locator: '40a8/live/8d1da7c0-f046-11eb-a30b-49309ad24755.jpg',
          originCode: 'cpsprodpb',
          copyrightHolder: 'BBC',
          suitableForSyndication: true,
        },
      },
    ],
  },
});

export const groupBlock = ({
  id = defaultIds.group,
  intentType = 'overview',
  blocks = [textBlock({ blocks: unorderedListBlock() })],
} = {}) => ({
  type: 'group',
  id,
  model: {
    intentType,
    relationshipType: 'optional',
    blocks,
  },
});

export const buildFixture = blocks => ({
  metadata: {},
  content: {
    model: {
      blocks,
    },
  },
  promo: {},
  relatedContent: {},
});
