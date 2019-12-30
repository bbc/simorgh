import {
  optimoTextWithOrderedList,
  optimoTextWithUnorderedList,
} from '../../utils/helpers';

export const CPSUnorderedListBlock = {
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

export const CPSOrderedListBlock = {
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

export const optimoUnorderedListBlock = optimoTextWithUnorderedList([
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

export const optimoOrderedListBlock = optimoTextWithOrderedList([
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
