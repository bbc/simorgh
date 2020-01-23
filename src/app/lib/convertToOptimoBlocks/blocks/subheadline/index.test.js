import convertToSubheadline from '.';
import { optimoSubheadline } from '../../utils/helpers';

describe('convertToSubheadline', () => {
  ['crosshead', 'heading', 'subheading'].forEach(type => {
    it(`should convert a plain_text ${type} to Optimo format`, async () => {
      const input = {
        text: 'A plain text block',
        markupType: 'plain_text',
        type,
      };

      const expected = optimoSubheadline([
        {
          fragments: [
            {
              fragment: 'A plain text block',
              attributes: [],
            },
          ],
          text: 'A plain text block',
        },
      ]);

      expect(await convertToSubheadline(input)).toEqual(expected);
    });

    it(`should convert a candy_xml ${type} to Optimo format`, async () => {
      const input = {
        text: 'A block with <bold>bold text</bold>',
        markupType: 'candy_xml',
        type,
      };

      const expected = optimoSubheadline([
        {
          fragments: [
            {
              fragment: 'A block with ',
              attributes: [],
            },
            {
              fragment: 'bold text',
              attributes: ['bold'],
            },
          ],
          text: 'A block with bold text',
        },
      ]);

      expect(await convertToSubheadline(input)).toEqual(expected);
    });
  });
});
