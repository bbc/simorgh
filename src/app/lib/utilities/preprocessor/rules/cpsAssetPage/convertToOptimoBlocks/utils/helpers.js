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

export const escapeDoubleQuotes = text => text.replace(/&quot;/g, '"');
