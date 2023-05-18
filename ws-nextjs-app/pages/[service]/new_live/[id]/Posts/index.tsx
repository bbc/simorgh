import React from 'react';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { OptimoBlock } from '#models/types/optimo';
import headings from '#app/legacy/containers/Headings';
import Blocks from '#app/legacy/containers/Blocks';
import paragraph from '#app/legacy/containers/Paragraph';
import Text from '#app/components/Text';

// temporary solution to render LI/ OL blocks.
const unorderedList = ({ blocks }: any) => {
  const listItems: any = blocks.map((item: any) =>
    path(['model', 'blocks', 0, 'model', 'text'], item),
  );

  return (
    <Text>
      <ul>
        {listItems.map((item: any) => (
          <li>{item}</li>
        ))}
      </ul>
    </Text>
  );
};

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
  const componentsToRender = {
    paragraph,
    unorderedList,
    orderedList: unorderedList,
  };

  return (
    <div>
      <Blocks blocks={contentBlocks} componentsToRender={componentsToRender} />
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
