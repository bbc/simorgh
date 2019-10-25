import { CPSMediaBlock, optimoVideoBlock } from './blocks/media/fixtures';
import convertToOptimoBlocks from '.';
import { optimoText } from './utils/helpers';

describe('convertToOptimoBlocks', () => {
  it('should convert CPS data into Optimo format', async () => {
    const input = {
      content: {
        blocks: [
          {
            text: 'Paragraph containing <bold>bold text</bold>',
            markupType: 'candy_xml',
            type: 'paragraph',
          },
          {
            text: 'A plain text paragraph',
            markupType: 'plain_text',
            type: 'paragraph',
          },
          CPSMediaBlock,
        ],
      },
    };

    const expected = {
      content: {
        model: {
          blocks: [
            optimoText([
              {
                fragments: [
                  {
                    fragment: 'Paragraph containing ',
                    attributes: [],
                  },
                  {
                    fragment: 'bold text',
                    attributes: ['bold'],
                  },
                ],
                text: 'Paragraph containing bold text',
              },
            ]),
            optimoText([
              {
                fragments: [
                  {
                    fragment: 'A plain text paragraph',
                    attributes: [],
                  },
                ],
                text: 'A plain text paragraph',
              },
            ]),
            optimoVideoBlock,
          ],
        },
      },
    };

    expect(await convertToOptimoBlocks(input)).toEqual(expected);
  });

  it('should handle escaped quotes in a plain_text block', async () => {
    const input = {
      content: {
        blocks: [
          {
            text: 'Paragraph containing &quot;quote marks&quot;',
            markupType: 'plain_text',
            type: 'paragraph',
          },
        ],
      },
    };
    const expected = {
      content: {
        model: {
          blocks: [
            optimoText([
              {
                fragments: [
                  {
                    fragment: 'Paragraph containing "quote marks"',
                    attributes: [],
                  },
                ],
                text: 'Paragraph containing "quote marks"',
              },
            ]),
          ],
        },
      },
    };

    expect(await convertToOptimoBlocks(input)).toEqual(expected);
  });

  it('should handle escaped quotes in a candy_xml block', async () => {
    const input = {
      content: {
        blocks: [
          {
            text: 'Paragraph containing <bold>&quot;quote marks&quot;</bold>',
            markupType: 'candy_xml',
            type: 'paragraph',
          },
        ],
      },
    };
    const expected = {
      content: {
        model: {
          blocks: [
            optimoText([
              {
                fragments: [
                  {
                    fragment: 'Paragraph containing ',
                    attributes: [],
                  },
                  {
                    fragment: '"quote marks"',
                    attributes: ['bold'],
                  },
                ],
                text: 'Paragraph containing "quote marks"',
              },
            ]),
          ],
        },
      },
    };

    expect(await convertToOptimoBlocks(input)).toEqual(expected);
  });

  it('should return an empty array if blocks is an empty array', async () => {
    const input = {
      content: {
        blocks: [],
      },
    };
    const expected = {
      content: {
        model: {
          blocks: [],
        },
      },
    };

    expect(await convertToOptimoBlocks(input)).toEqual(expected);
  });

  it('should return an empty array if block does not have a type', async () => {
    const input = {
      content: {
        blocks: [
          {
            text: 'Paragraph containing <bold>bold text</bold>',
            markupType: 'candy_xml',
          },
        ],
      },
    };
    const expected = {
      content: {
        model: {
          blocks: [],
        },
      },
    };

    expect(await convertToOptimoBlocks(input)).toEqual(expected);
  });

  it('should make the introduction paragraph bold', async () => {
    const input = {
      content: {
        blocks: [
          {
            text: 'paragraph two',
            markupType: 'candy_xml',
            type: 'paragraph',
          },
          {
            text: 'paragraph one',
            role: 'introduction',
            markupType: 'plain_text',
            type: 'paragraph',
          },
        ],
      },
    };

    const output = await convertToOptimoBlocks(input);

    expect(
      output.content.model.blocks[1].model.blocks[0].model.blocks[0].model
        .attributes,
    ).toEqual(['bold']);
  });
});
