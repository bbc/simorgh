import React from 'react';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { OptimoBlock } from '#models/types/optimo';
import Heading from '#app/components/Heading';
import Text from '#app/components/Text';
import headings from '#app/legacy/containers/Headings';
import Blocks from '#app/legacy/containers/Blocks';
import text from '#app/legacy/containers/Text';
import unorderedList from '#app/legacy/containers/BulletedList';

/* Helpers */

const getContent = path(['model', 'text']);

const getHeadlineOrSubheadline = path([
  'model',
  'blocks',
  0,
  'model',
  'blocks',
  0,
  'model',
  'text',
]);

/* End Helpers */

const PostHeadings = ({ headerBlocks }) => {
  // const headline: string = headerBlocks
  //   .filter((block: any) => block.type === 'headline')
  //   .map((item: any) => getHeadlineOrSubheadline(item));

  // const subheadline: string = headerBlocks
  //   .filter((block: any) => block.type === 'subheadline')
  //   .map((item: any) => getHeadlineOrSubheadline(item));

  const componentsToRender = {
    headline: headings,
    subheadline: headings,
  };

  return (
    <div>
      {/* <Heading level={2}>{headline}</Heading>
      <Heading level={3}>{subheadline}</Heading> */}
      <Blocks blocks={headerBlocks} componentsToRender={componentsToRender} />
    </div>
  );
};

const PostContent = ({ contentBlocks }) => {
  const extractParagraphContent: any = contentBlocks
    .filter(block => block.type === 'paragraph')
    .map((item: any) => getContent(item));

  const nonParagraphBlocks: any = contentBlocks.filter(
    block => block.type !== 'paragraph',
  );

  const nonParagraphBlocksToString: any = nonParagraphBlocks.map((item: any) =>
    JSON.stringify(nonParagraphBlocks, null, 2),
  );

  return (
    <div>
      <Text as="p">{extractParagraphContent}</Text>
      <Text as="p">{nonParagraphBlocksToString}</Text>
    </div>
  );
};

const PostItem = ({ postItem }: any) => {
  const headerBlocks = pathOr<OptimoBlock[]>(
    [],
    ['header', 'model', 'blocks'],
    postItem,
  );

  const contentBlocks = pathOr<OptimoBlock[]>(
    [],
    ['content', 'model', 'blocks'],
    postItem,
  );

  return (
    <div>
      <PostHeadings headerBlocks={headerBlocks} />
      <PostContent contentBlocks={contentBlocks} />
      <hr />
    </div>
  );
};

const PostsList = ({ postsData }: any) => {
  const postResults: any = path(['data', 'results'], postsData);

  if (!postResults) return null;

  return (
    <div>
      {postResults.map((item: []) => (
        <PostItem postItem={item} />
      ))}
    </div>
  );
};

export default PostsList;
