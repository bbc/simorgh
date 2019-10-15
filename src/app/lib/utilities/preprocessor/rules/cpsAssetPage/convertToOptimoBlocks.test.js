import convertToOptimoBlocks from './convertToOptimoBlocks';
import { optimoText } from './helpers';

describe('convertToOptimoBlocks', () => {
  it('should convert CPS data into Optimo format', () => {
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
          ],
        },
      },
    };

    expect(convertToOptimoBlocks(input)).toEqual(expected);
  });

  it('should return an empty array if blocks is an empty array', () => {
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

    expect(convertToOptimoBlocks(input)).toEqual(expected);
  });

  it('should return an empty array if block does not have a type', () => {
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

    expect(convertToOptimoBlocks(input)).toEqual(expected);
  });
});
