import pathOr from 'ramda/src/pathOr';
import buildIChefURL from '../../../../lib/utilities/ichefURL';

const pathOrZeroIndexModelBlocks = (
  noModelBlocks: number,
  endModelType: string,
  block: any,
) => {
  const zeroIndexModelBlock = ['model', 'blocks', '0'];
  const endModel = ['model', endModelType];
  let givenPath: string[] = [];

  for (let i = 0; i < noModelBlocks; i += 1) {
    givenPath = givenPath.concat(zeroIndexModelBlock);
  }

  givenPath = givenPath.concat(endModel);

  return pathOr('', givenPath, block);
};

const bylineExtractor = (blocks: any[]) => {
  const bylineBlocks = pathOr([], [0, 'model', 'blocks'], blocks);
  const authorBlock = bylineBlocks.find((block: any) => block.type === 'name');
  const jobRoleBlock = bylineBlocks.find((block: any) => block.type === 'role');
  const twitterBlock = bylineBlocks.find((block: any) => block.type === 'link');
  const locationBlock = bylineBlocks.find(
    (block: any) => block.type === 'location',
  );
  const imagesBlock = bylineBlocks.find(
    (block: any) => block.type === 'images',
  );

  const authorName = pathOrZeroIndexModelBlocks(2, 'text', authorBlock);
  const jobRole = pathOrZeroIndexModelBlocks(2, 'text', jobRoleBlock);

  if (!authorName || !jobRole) {
    return null;
  }

  const twitterText = pathOrZeroIndexModelBlocks(2, 'text', twitterBlock);
  const twitterLink = pathOrZeroIndexModelBlocks(3, 'locator', twitterBlock);
  const location = pathOrZeroIndexModelBlocks(2, 'text', locationBlock);
  const locator = pathOrZeroIndexModelBlocks(2, 'locator', imagesBlock);
  const originCode = pathOrZeroIndexModelBlocks(2, 'originCode', imagesBlock);

  let authorImage = buildIChefURL({
    originCode,
    locator,
    resolution: 160,
    isPng: true,
  });

  if (!authorImage.endsWith('.png')) authorImage = '';

  const contributorBlock = pathOr([], [0], blocks);
  const authorTopicUrl = pathOr('', ['model', 'topicUrl'], contributorBlock);

  return {
    authorName,
    jobRole,
    twitterText,
    twitterLink,
    authorImage,
    location,
    authorTopicUrl,
  };
};

export default bylineExtractor;
