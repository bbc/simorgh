import { OptimoBlock } from '#app/models/types/optimo';

export const fragmentBlock = (text: string, attributes = []) => ({
  id: '113144',
  type: 'fragment',
  model: {
    text,
    attributes,
  },
});

const inlineLinkBlock = (
  text: string,
  locator: string,
  blocks: OptimoBlock[],
  isExternal: boolean,
) => ({
  id: '123124',
  type: 'urlLink',
  model: {
    text,
    locator,
    blocks,
    isExternal,
  },
});

const persianText = 'چیسربرگر';
export const persianLink = inlineLinkBlock(
  persianText,
  'https://google.com',
  [fragmentBlock(persianText)],
  true,
);
