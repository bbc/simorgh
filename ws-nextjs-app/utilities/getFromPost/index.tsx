import { OptimoBlock } from '#models/types/optimo';
import { Post } from '../../pages/[service]/live/[id]/Post/types';

type OptimoBlockWithBlocks = OptimoBlock & { model: { blocks: OptimoBlock[] } };
type OptimoBlockWithText = OptimoBlock & { model: { text: string } };

const isBlockWithBlocks = (
  block: OptimoBlock,
): block is OptimoBlockWithBlocks =>
  block &&
  typeof block.model === 'object' &&
  Array.isArray((block.model as { blocks?: unknown }).blocks);

const isBlockWithText = (block: OptimoBlock): block is OptimoBlockWithText =>
  block &&
  typeof block.model === 'object' &&
  typeof (block.model as { text?: unknown }).text === 'string';

export const getImageFromPost = (post: Post) => {
  const imageBlock = post?.content?.model?.blocks?.find(
    (block: OptimoBlock) => block.type === 'image',
  );

  if (!imageBlock || !isBlockWithBlocks(imageBlock)) {
    return null;
  }

  const rawImageBlock = imageBlock.model.blocks.find(
    (block: OptimoBlock) => block.type === 'rawImage',
  );

  if (!rawImageBlock || typeof rawImageBlock.model !== 'object') {
    return null;
  }

  const { locator, width, height, copyrightHolder } = rawImageBlock.model as {
    locator?: string;
    width?: number;
    height?: number;
    copyrightHolder?: string;
  };

  const altTextBlock = imageBlock.model.blocks.find(
    (block: OptimoBlock) => block.type === 'altText',
  );

  let altText = '';
  if (altTextBlock && isBlockWithBlocks(altTextBlock)) {
    const textBlock = altTextBlock.model.blocks.find(
      block => block.type === 'text',
    );
    if (textBlock && isBlockWithBlocks(textBlock)) {
      const paragraphBlock = textBlock.model.blocks.find(
        block => block.type === 'paragraph',
      );
      if (paragraphBlock && isBlockWithText(paragraphBlock)) {
        altText = paragraphBlock.model.text;
      }
    }
  }

  return locator
    ? {
        url: `https://ichef.bbci.co.uk/news/${width}/cpsprodpb/${locator.replace(/^.*\//, '')}`,
        altText,
        width,
        height,
        copyright: copyrightHolder,
      }
    : null;
};

export const getHeadlineFromPost = (post: Post) => {
  const headlineBlock = post?.header?.model?.blocks?.find(
    block => block.type === 'headline',
  );

  if (!headlineBlock || !isBlockWithBlocks(headlineBlock)) return null;

  const textBlock = headlineBlock.model.blocks?.find(
    block => block.type === 'text',
  );

  if (!textBlock || !isBlockWithBlocks(textBlock)) return null;

  const paragraphBlock = textBlock.model.blocks?.find(
    block => block.type === 'paragraph',
  );

  return paragraphBlock && isBlockWithText(paragraphBlock)
    ? paragraphBlock.model.text
    : null;
};
