import convertParagraph from './convertParagraph';
import { optimoText } from './helpers';

describe('convertParagraph', () => {
  it('should convert a plain_text paragraph to Optimo format', () => {
    const input = {
      text: 'A plain text paragraph',
      markupType: 'plain_text',
      type: 'paragraph',
    };
    const expected = optimoText([
      {
        fragments: [
          {
            fragment: 'A plain text paragraph',
            attributes: [],
          },
        ],
        text: 'A plain text paragraph',
      },
    ]);

    expect(convertParagraph(input)).toEqual(expected);
  });

  it('should convert a candy_xml paragraph to Optimo format', () => {
    const input = {
      text: 'A paragraph with <bold>bold text</bold>',
      markupType: 'candy_xml',
      type: 'paragraph',
    };
    const expected = optimoText([
      {
        fragments: [
          {
            fragment: 'A paragraph with ',
            attributes: [],
          },
          {
            fragment: 'bold text',
            attributes: ['bold'],
          },
        ],
        text: 'A paragraph with bold text',
      },
    ]);

    expect(convertParagraph(input)).toEqual(expected);
  });
});
