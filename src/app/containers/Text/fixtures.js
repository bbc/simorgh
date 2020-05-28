export const fragmentBlock = (id = null, text, attributes = []) => ({
  id,
  type: 'fragment',
  model: {
    text,
    attributes,
  },
});

export const paragraphBlock = (id = null, blocks) => ({
  id,
  type: 'paragraph',
  model: {
    id,
    blocks,
  },
});

export const unorderedListBlock = (id = null, blocks) => ({
  id,
  type: 'unorderedList',
  model: {
    blocks,
  },
});

export const listItemBlock = (id = null, blocks) => ({
  id,
  type: 'listItem',
  model: {
    blocks,
  },
});
