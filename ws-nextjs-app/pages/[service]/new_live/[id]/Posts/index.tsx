import React from 'react';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { OptimoBlock } from '#models/types/optimo';
import Text from '#app/components/Text';
import headings from '#app/legacy/containers/Headings';
import Blocks from '#app/legacy/containers/Blocks';
import paragraph from '#app/legacy/containers/Paragraph';

const PostHeadings = ({ headerBlocks }: any) => {
  const componentsToRender = {
    headline: headings,
    subheadline: headings,
  };

  return (
    <Blocks blocks={headerBlocks} componentsToRender={componentsToRender} />
  );
};

const PostContent = ({ contentBlocks }: any) => {
  // Unsure how to render UL/OL
  const nonParagraphBlocks: any = contentBlocks.filter(
    (block: any) => block.type !== 'paragraph',
  );
  const nonParagraphBlocksToString: any = nonParagraphBlocks.map((item: any) =>
    JSON.stringify(nonParagraphBlocks, null, 2),
  );

  const componentsToRender = {
    paragraph,
  };

  return (
    <div>
      <Blocks blocks={contentBlocks} componentsToRender={componentsToRender} />
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
