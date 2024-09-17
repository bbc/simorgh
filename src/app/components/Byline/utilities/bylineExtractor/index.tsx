import pathOr from 'ramda/src/pathOr';
import buildIChefURL from '#lib/utilities/ichefURL';

type BylineBlock = {
  type: 'name' | 'role' | 'link' | 'location' | 'images';
  model: {
    blocks: object[];
  };
};

const pathOrZeroIndexModelBlocks = (
  noModelBlocks: number,
  endModelType: string,
  block: BylineBlock | undefined,
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

const bylineExtractor = (blocks: object[]) => {
  const bylineBlocks = pathOr<BylineBlock[]>(
    [],
    [0, 'model', 'blocks'],
    blocks,
  );
  const authorBlock = bylineBlocks.find(block => block.type === 'name');
  const jobRoleBlock = bylineBlocks.find(block => block.type === 'role');
  const twitterBlock = bylineBlocks.find(block => block.type === 'link');
  const locationBlock = bylineBlocks.find(block => block.type === 'location');
  const imagesBlock = bylineBlocks.find(block => block.type === 'images');

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
  });

  if (!authorImage.endsWith('.png.webp')) authorImage = '';

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
