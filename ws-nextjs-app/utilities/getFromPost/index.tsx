import { OptimoBlock } from '#models/types/optimo';
import { Post } from '../../pages/[service]/live/[id]/Post/types';

export const getImageFromPost = (post: Post) => {
  const imageBlock = post?.content?.model?.blocks?.find(
    (block: OptimoBlock) => block.type === 'image',
  ) as OptimoBlock | undefined;

  if (
    !imageBlock ||
    !('model' in imageBlock) ||
    !Array.isArray((imageBlock.model as any).blocks)
  ) {
    return null;
  }

  const rawImageBlock = (
    imageBlock.model as { blocks: OptimoBlock[] }
  ).blocks.find((block: OptimoBlock) => block.type === 'rawImage') as
    | OptimoBlock
    | undefined;

  if (!rawImageBlock || !('model' in rawImageBlock)) {
    return null;
  }

  const { locator, width, height, copyrightHolder } = rawImageBlock.model as {
    locator?: string;
    width?: number;
    height?: number;
    copyrightHolder?: string;
  };

  const altTextBlock = (
    imageBlock.model as { blocks: OptimoBlock[] }
  ).blocks.find((block: OptimoBlock) => block.type === 'altText') as
    | OptimoBlock
    | undefined;

  let altText = '';
  if (
    altTextBlock &&
    'model' in altTextBlock &&
    Array.isArray((altTextBlock.model as any).blocks)
  ) {
    const textBlock = (altTextBlock.model as { blocks: OptimoBlock[] })
      .blocks[0];
    if (
      textBlock &&
      'model' in textBlock &&
      Array.isArray((textBlock.model as any).blocks)
    ) {
      const paragraphBlock = (textBlock.model as { blocks: OptimoBlock[] })
        .blocks[0];
      if (
        paragraphBlock &&
        'model' in paragraphBlock &&
        typeof (paragraphBlock.model as any).text === 'string'
      ) {
        altText = (paragraphBlock.model as { text: string }).text;
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
  ) as OptimoBlock | undefined;

  if (!headlineBlock || !('model' in headlineBlock)) return null;

  const textBlock = (
    headlineBlock.model as { blocks?: OptimoBlock[] }
  ).blocks?.find(block => block.type === 'text') as OptimoBlock | undefined;

  if (!textBlock || !('model' in textBlock)) return null;

  const paragraphBlock = (
    textBlock.model as { blocks?: OptimoBlock[] }
  ).blocks?.find(block => block.type === 'paragraph') as
    | OptimoBlock
    | undefined;

  return paragraphBlock &&
    'model' in paragraphBlock &&
    typeof (paragraphBlock.model as any).text === 'string'
    ? (paragraphBlock.model as { text: string }).text
    : null;
};
