export const optimoFragment = ({ fragment, attributes }) => ({
  type: 'fragment',
  model: {
    text: fragment,
    attributes,
  },
});

export const optimoParagraph = ({ fragments, text }) => ({
  type: 'paragraph',
  model: {
    text,
    blocks: fragments.map(optimoFragment),
  },
});

export const optimoTextWithParagraph = (paragraphs) => ({
  type: 'text',
  model: {
    blocks: paragraphs.map(optimoParagraph),
  },
});

export const optimoSubheadline = (paragraphs) => ({
  type: 'subheadline',
  model: {
    blocks: [optimoTextWithParagraph(paragraphs)],
  },
});

export const listItem = (paragraphs) => ({
  type: 'listItem',
  model: {
    blocks: paragraphs.map(optimoParagraph),
  },
});

export const unorderedList = (listItems) => ({
  type: 'unorderedList',
  model: {
    blocks: listItems.map(listItem),
  },
});

export const orderedList = (listItems) => ({
  type: 'orderedList',
  model: {
    blocks: listItems.map(listItem),
  },
});

export const optimoTextWithOrderedList = (listItems) => ({
  type: 'text',
  model: {
    blocks: [orderedList(listItems)],
  },
});

export const optimoTextWithUnorderedList = (listItems) => ({
  type: 'text',
  model: {
    blocks: [unorderedList(listItems)],
  },
});
