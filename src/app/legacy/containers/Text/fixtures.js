export const fragmentBlock = (id, text, attributes = []) => ({
  id,
  type: 'fragment',
  model: {
    text,
    attributes,
  },
});

export const paragraphBlock = (id, blocks) => ({
  id,
  type: 'paragraph',
  model: {
    id,
    blocks,
  },
});
