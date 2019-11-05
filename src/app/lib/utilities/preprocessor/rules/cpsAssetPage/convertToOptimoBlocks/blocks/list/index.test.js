import convertList from '.';
import {
  optimoTextWithOrderedList,
  optimoTextWithUnorderedList,
} from '../../utils/helpers';

describe('convertList', () => {
  it('should convert a mixed type unordered list to Optimo format', async () => {
    const input = {
      numbered: false,
      items: [
        {
          text: 'I am a list item',
          markupType: 'plain_text',
          type: 'listItem',
        },
        {
          text: 'I am a list item with <bold>bold</bold> text',
          markupType: 'candy_xml',
          type: 'listItem',
        },
      ],
      type: 'list',
    };

    const expected = optimoTextWithUnorderedList([
      [
        {
          text: 'I am a list item',
          fragments: [
            {
              fragment: 'I am a list item',
              attributes: [],
            },
          ],
        },
      ],
      [
        {
          text: 'I am a list item with bold text',
          fragments: [
            {
              fragment: 'I am a list item with ',
              attributes: [],
            },
            {
              fragment: 'bold',
              attributes: ['bold'],
            },
            {
              fragment: ' text',
              attributes: [],
            },
          ],
        },
      ],
    ]);

    expect(await convertList(input)).toEqual(expected);
  });

  it('should convert an ordered list to Optimo format', async () => {
    const input = {
      numbered: true,
      items: [
        {
          text: 'I am a list item',
          markupType: 'plain_text',
          type: 'listItem',
        },
      ],
      type: 'list',
    };

    const expected = optimoTextWithOrderedList([
      [
        {
          text: 'I am a list item',
          fragments: [
            {
              fragment: 'I am a list item',
              attributes: [],
            },
          ],
        },
      ],
    ]);

    expect(await convertList(input)).toEqual(expected);
  });
});
