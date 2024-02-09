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
    liveBlogPosting: posts.map(result => {
      const headerBlock = result.header.model.blocks.find(
        block => block.type === 'headline',
      );

      const paragraphBlocks = result.content.model.blocks.filter(
        block => block.type === 'paragraph',
      );

      const imageBlock = result.content.model.blocks.find(
        block => block.type === 'image',
      );

      // @ts-ignore - deeply nested
      const imageSource = imageBlock?.model?.blocks.find(
        (block: OptimoBlock) => block.type === 'rawImage',
      );

      return {
        '@type': 'BlogPosting',
        headline:
          // @ts-ignore - deeply nested
          headerBlock?.model.blocks[0].model.blocks[0].model.text ?? null,
        publisher: {
          '@type': 'Organization',
          name: brandName,
          logo: {
            '@type': 'ImageObject',
            url: defaultImage,
          },
        },
        ...(imageBlock && {
          image: buildIChefURL({
            locator: imageSource?.model?.locator,
            originCode: imageSource?.model?.originCode,
            resolution: 640,
          }),
        }),
        datePublished: result?.dates?.firstPublished,
        dateModified: result?.dates?.lastPublished,
        mainEntityOfPage: url,
        // @ts-ignore - deeply nested
        articleBody: paragraphBlocks.map(block => block.model.text).join(' '),
      };
    }),
  };
};
