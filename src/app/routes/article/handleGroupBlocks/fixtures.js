export const defaultIds = {
  list: 'list',
  image: 'image',
  group: 'group',
  title: 'title',
  paragraph: 'paragraph',
  text: 'text',
};

export const paragraphBlock = ({ id = defaultIds.paragraph } = {}) => {
  return {
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
  };
};

export const unorderedListBlock = ({ id = defaultIds.list } = {}) => {
  return {
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
  };
};

export const textBlock = ({
  id = defaultIds.text,
  blocks = [paragraphBlock()],
} = {}) => {
  return {
    type: 'text',
    id,
    model: {
      blocks,
    },
  };
};

export const titleBlock = ({
  id = defaultIds.title,
  blocks = [textBlock()],
} = {}) => {
  return {
    type: 'headline',
    id,
    model: {
      blocks,
    },
  };
};

export const imageBlock = ({ id = defaultIds.image } = {}) => {
  return {
    type: 'image',
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
  };
};

export const groupBlock = ({
  id = defaultIds.group,
  intentType = 'overview',
  blocks = [textBlock({ blocks: unorderedListBlock() })],
} = {}) => {
  return {
    type: 'group',
    id,
    model: {
      intentType,
      relationshipType: 'optional',
      blocks,
    },
  };
};

export const buildFixture = blocks => {
  return {
    metadata: {},
    content: {
      model: {
        blocks,
      },
    },
    promo: {},
    relatedContent: {},
  };
};
