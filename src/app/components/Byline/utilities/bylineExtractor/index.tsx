import {
  OptimoBylineContributorBlock,
  OptimoBylineContributorMetadataBlock,
} from '#app/models/types/optimo';
import { PageTypes } from '#app/models/types/global';
import {
  ARTICLE_PAGE,
  LIVE_PAGE,
  MEDIA_ARTICLE_PAGE,
} from '#app/routes/utils/pageTypes';
import {
  PostContributor,
  PostContributorImage,
} from 'simorgh-nextjs/pages/[service]/live/[id]/Post/types';
import pathOr from 'ramda/src/pathOr';
import buildIChefURL from '../../../../lib/utilities/ichefURL';

const pathOrZeroIndexModelBlocks = (
  noModelBlocks: number,
  endModelType: string,
  block:
    | OptimoBylineContributorMetadataBlock
    | PostContributorImage
    | undefined,
) => {
  if (!block) return '';

  const zeroIndexModelBlock = ['model', 'blocks', '0'];
  const endModel = ['model', endModelType];
  let givenPath: string[] = [];

  for (let i = 0; i < noModelBlocks; i += 1) {
    givenPath = givenPath.concat(zeroIndexModelBlock);
  }

  givenPath = givenPath.concat(endModel);

  return pathOr('', givenPath, block);
};

const livePageBylineExtractor = (blocks: PostContributor['model'][]) => {
  return blocks
    .map(contribBlock => {
      const {
        blocks: imagesBlock,
        name: authorName,
        subtitle: jobRole,
      } = contribBlock;

      if (!authorName) {
        return null;
      }

      const locator = pathOrZeroIndexModelBlocks(
        1,
        'locator',
        imagesBlock[0],
      ).replace(/^\/+/g, '');
      const originCode = pathOrZeroIndexModelBlocks(
        1,
        'originCode',
        imagesBlock[0],
      );
      let authorImage =
        locator && originCode
          ? buildIChefURL({
              originCode,
              locator,
              resolution: 160,
            })
          : '';

      if (!authorImage.endsWith('.webp')) authorImage = '';

      return {
        authorName,
        jobRole,
        authorImage,
      };
    })
    .filter(Boolean);
};

const articlePageBylineExtractor = (blocks: OptimoBylineContributorBlock[]) => {
  return blocks
    .map(contribBlock => {
      const bylineBlocks = contribBlock?.model?.blocks || [];

      const authorBlock = bylineBlocks.find(block => block.type === 'name');
      const jobRoleBlock = bylineBlocks.find(block => block.type === 'role');
      const twitterBlock = bylineBlocks.find(block => block.type === 'link');
      const locationBlock = bylineBlocks.find(
        block => block.type === 'location',
      );
      const imagesBlock = bylineBlocks.find(block => block.type === 'images');

      const authorName = pathOrZeroIndexModelBlocks(2, 'text', authorBlock);
      const jobRole = pathOrZeroIndexModelBlocks(2, 'text', jobRoleBlock);
      if (!authorName) {
        return null;
      }

      const twitterText = pathOrZeroIndexModelBlocks(2, 'text', twitterBlock);
      const twitterLink = pathOrZeroIndexModelBlocks(
        3,
        'locator',
        twitterBlock,
      );
      const location = pathOrZeroIndexModelBlocks(2, 'text', locationBlock);
      const locator = pathOrZeroIndexModelBlocks(2, 'locator', imagesBlock);
      const originCode = pathOrZeroIndexModelBlocks(
        2,
        'originCode',
        imagesBlock,
      );

      let authorImage = buildIChefURL({
        originCode,
        locator,
        resolution: 160,
      });

      if (!authorImage.endsWith('.png.webp')) authorImage = '';

      const authorTopicUrl = contribBlock?.model?.topicUrl ?? '';

      return {
        authorName,
        jobRole,
        twitterText,
        twitterLink,
        authorImage,
        location,
        authorTopicUrl,
      };
    })
    .filter(Boolean);
};

const bylineExtractor = ({
  blocks,
  pageType,
}: {
  blocks: OptimoBylineContributorBlock[] | PostContributor['model'][];
  pageType: PageTypes;
}) => {
  if (!blocks || !pageType) return [];

  return (
    {
      [LIVE_PAGE]: livePageBylineExtractor,
      [ARTICLE_PAGE]: articlePageBylineExtractor,
      [MEDIA_ARTICLE_PAGE]: articlePageBylineExtractor,
    }[pageType](blocks) || []
  );
};

export default bylineExtractor;
