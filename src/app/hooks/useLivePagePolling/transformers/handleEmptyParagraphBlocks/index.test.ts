import type { OptimoBlock } from '#app/models/types/optimo';
import removeEmptyParagraphBlocks from '.';

describe('handleEmptyParagraphBlocks', () => {
  it('removes empty paragraph blocks while keeping nested content with text', () => {
    const emptyParagraph = {
      type: 'paragraph',
      model: {
        text: '',
        blocks: [],
      },
    } as OptimoBlock;

    const paragraphWithText = {
      type: 'paragraph',
      model: {
        text: 'Top level content',
        blocks: [],
      },
    } as OptimoBlock;

    const nestedParagraphWithText = {
      type: 'paragraph',
      model: {
        text: 'Nested content',
        blocks: [],
      },
    } as OptimoBlock;

    const nestedParagraphWithoutText = {
      type: 'paragraph',
      model: {
        text: '',
        blocks: [],
      },
    } as OptimoBlock;

    const nestedBlock = {
      type: 'unorderedList',
      model: {
        blocks: [
          {
            type: 'listItem',
            model: {
              blocks: [nestedParagraphWithoutText, nestedParagraphWithText],
            },
          },
        ],
      },
    } as OptimoBlock;

    const result = removeEmptyParagraphBlocks([
      emptyParagraph,
      paragraphWithText,
      nestedBlock,
    ]);

    expect(result).toMatchObject([
      paragraphWithText,
      {
        model: {
          blocks: [
            {
              model: {
                blocks: [nestedParagraphWithText],
              },
            },
          ],
        },
      },
    ]);
  });
});
