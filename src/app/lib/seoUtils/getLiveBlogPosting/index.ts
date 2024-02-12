/* eslint-disable @typescript-eslint/ban-ts-comment */
import buildIChefURL from '#app/lib/utilities/ichefURL';
import { OptimoBlock } from '#app/models/types/optimo';
import { Post } from '../../../../../ws-nextjs-app/pages/[service]/live/[id]/Post/types';

export default ({
  posts,
  brandName,
  defaultImage,
  url,
}: {
  posts?: Post[];
  brandName: string;
  defaultImage: string;
  url: string;
}) => {
  if (!posts) return null;

  return {
    liveBlogPosting: posts
      .map(result => {
        const headerBlocks = result?.header?.model?.blocks;
        const contentBlocks = result?.content?.model?.blocks;

        if (!headerBlocks || !contentBlocks) return null;

        const headlineBlock = headerBlocks.find(
          block => block.type === 'headline',
        );

        const paragraphBlocks = contentBlocks.filter(
          block => block.type === 'paragraph',
        );

        const imageBlock = contentBlocks.find(block => block.type === 'image');

        // @ts-ignore - deeply nested
        const imageSource = imageBlock?.model?.blocks.find(
          (block: OptimoBlock) => block.type === 'rawImage',
        );

        return {
          '@type': 'BlogPosting',
          headline:
            // @ts-ignore - deeply nested
            headlineBlock?.model.blocks[0].model.blocks[0].model.text ?? null,
          publisher: {
            '@type': 'Organization',
            name: brandName,
            logo: {
              '@type': 'ImageObject',
              url: defaultImage,
            },
          },
          mainEntityOfPage: url,
          // @ts-ignore - deeply nested
          articleBody: paragraphBlocks.map(block => block.model.text).join(' '),
          ...(imageBlock && {
            image: buildIChefURL({
              locator: imageSource?.model?.locator,
              originCode: imageSource?.model?.originCode,
              resolution: 640,
            }),
          }),
          ...(result?.dates?.firstPublished && {
            datePublished: result?.dates?.firstPublished,
          }),
          ...(result?.dates?.lastPublished && {
            dateModified: result?.dates?.lastPublished,
          }),
        };
      })
      .filter(Boolean),
  };
};
