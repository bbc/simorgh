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

export const optimoText = paragraphs => ({
  type: 'text',
  model: {
    blocks: paragraphs.map(optimoParagraph),
  },
});

export const optimoSubheadline = paragraphs => ({
  type: 'subheadline',
  model: {
    blocks: [optimoText(paragraphs)],
  },
});

export const listItem = paragraphs => ({
  type: 'listItem',
  model: {
    blocks: paragraphs.map(optimoParagraph),
  },
});

export const unorderedList = paragraphs => ({
  type: 'unorderedList',
  model: {
    blocks: paragraphs.map(listItem),
  },
});

export const orderedList = paragraphs => ({
  type: 'orderedList',
  model: {
    blocks: paragraphs.map(listItem),
  },
});

export const optimoTextWithOrderedList = paragraphs => ({
  type: 'text',
  model: {
    blocks: [orderedList(paragraphs)],
  },
});

export const optimoTextWithUnorderedList = paragraphs => ({
  type: 'text',
  model: {
    blocks: [unorderedList(paragraphs)],
  },
});
