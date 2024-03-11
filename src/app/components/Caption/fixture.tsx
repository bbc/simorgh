import { blockContainingText } from '#models/blocks';
import { OptimoBlock } from '#app/models/types/optimo';

const generateUUID = () => Math.random().toString(16).slice(2);

export default blockContainingText(
  'caption',
  'Some caption text...',
  'mocked-id',
);

export const blockContainingPersianText = blockContainingText(
  'caption',
  'چیسربرگر',
  'mocked-id',
);

export const fragmentBlock = ({
  text,
  attributes = [],
}: {
  text: string;
  attributes?: string[];
}) => ({
  type: 'fragment',
  id: generateUUID(),
  model: {
    text,
    attributes,
  },
});

export const inlineLinkBlock = ({
  text,
  locator,
  blocks,
  isExternal,
}: {
  text: string;
  locator: string;
  blocks: OptimoBlock[];
  isExternal: boolean;
}) => ({
  type: 'urlLink',
  id: generateUUID(),
  model: {
    text,
    locator,
    blocks,
    isExternal,
  },
});

export const inlineSpanBlock = ({
  blocks,
  language,
  text,
}: {
  text: string;
  language: string;
  blocks: OptimoBlock[];
}) => ({
  type: 'inline',
  id: generateUUID(),
  model: {
    blocks,
    language,
    text,
  },
});

const persianText = 'چیسربرگر';
const persianLink = inlineLinkBlock({
  text: persianText,
  locator: 'https://google.com',
  blocks: [fragmentBlock({ text: persianText })],
  isExternal: true,
});

const inlinePersianBlock = inlineSpanBlock({
  blocks: [persianLink],
  language: 'fa',
  text: persianText,
});

export const blocksWithInline = {
  model: {
    blocks: [
      {
        model: {
          blocks: [
            {
              model: {
                blocks: [
                  fragmentBlock({
                    text: 'This is some text. ',
                    attributes: ['bold'],
                  }),
                  inlinePersianBlock,
                ],
              },
              type: 'text',
            },
          ],
        },
        type: 'caption',
      },
    ],
  },
  type: 'text',
};

export const captionBlock3Paragraphs = {
  model: {
    blocks: [
      {
        model: {
          blocks: [
            {
              model: {
                blocks: [
                  {
                    id: 1,
                    model: {
                      attributes: [],
                      text: 'This is paragraph 1',
                    },
                    type: 'fragment',
                  },
                ],
                text: 'This is paragraph 1',
              },
              type: 'paragraph',
            },
            {
              model: {
                blocks: [
                  {
                    id: 2,
                    model: {
                      attributes: [],
                      text: 'This is paragraph 2',
                    },
                    type: 'fragment',
                  },
                ],
                text: 'This is paragraph 2',
              },
              type: 'paragraph',
            },
            {
              model: {
                blocks: [
                  {
                    id: 3,
                    model: {
                      attributes: [],
                      text: 'Paragraph 3',
                    },
                    type: 'fragment',
                  },
                ],
                text: 'Paragraph 3',
              },
              type: 'paragraph',
            },
          ],
        },
        type: 'text',
      },
    ],
  },
  type: 'caption',
};
