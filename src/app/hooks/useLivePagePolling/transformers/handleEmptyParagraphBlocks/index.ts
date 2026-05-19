import type { OptimoBlock } from '#app/models/types/optimo';

type BlockModel = {
  text?: string | null;
  blocks?: unknown;
  [key: string]: unknown;
};

const getModel = (block: OptimoBlock): BlockModel | undefined =>
  (block as { model?: BlockModel }).model;

const hasText = (block: OptimoBlock): boolean => {
  const model = getModel(block);
  if (!model) {
    return false;
  }

  const { text, blocks } = model;

  if (typeof text === 'string' && text.trim().length > 0) {
    return true;
  }

  if (Array.isArray(blocks)) {
    return (blocks as OptimoBlock[]).some(hasText);
  }

  return false;
};

const removeEmptyParagraphBlocks = (blocks: OptimoBlock[]): OptimoBlock[] => {
  const cleanedBlocks = blocks.map(block => {
    const model = getModel(block);
    if (!model) {
      return block;
    }

    const childBlocks = model.blocks;
    if (!Array.isArray(childBlocks)) {
      return block;
    }

    return {
      ...block,
      model: {
        ...model,
        blocks: removeEmptyParagraphBlocks(childBlocks as OptimoBlock[]),
      },
    } as OptimoBlock;
  });

  return cleanedBlocks.filter(
    block => block.type !== 'paragraph' || hasText(block),
  ) as OptimoBlock[];
};

export default removeEmptyParagraphBlocks;
