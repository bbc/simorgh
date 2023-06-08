import React from 'react';

import pathOr from 'ramda/src/pathOr';
import { OptimoBlock } from '#models/types/optimo';
import headings from '#app/legacy/containers/Headings';
import Blocks from '#app/legacy/containers/Blocks';
import paragraph from '#app/legacy/containers/Paragraph';
import Text from '#app/components/Text';
import { Post, StreamResponse } from './types';

// temporary solution to render LI/ OL blocks.
const unorderedList = ({ blocks }: { blocks: OptimoBlock[] }) => {
  const listItems: (string | null)[] = blocks
    .map(item =>
      pathOr<string | null>(
        null,
        ['model', 'blocks', 0, 'model', 'text'],
        item,
      ),
    )
    .filter(text => typeof text === 'string');

  if (listItems.length === 0) return null;

  return (
    <Text>
      <ul>
        {listItems.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>{item}</li>
        ))}
      </ul>
    </Text>
  );
};

const PostHeadings = ({ headerBlocks }: { headerBlocks: OptimoBlock[] }) => {
  const componentsToRender = {
    headline: headings,
    subheadline: headings,
  };

  return (
    <Blocks blocks={headerBlocks} componentsToRender={componentsToRender} />
  );
};

const PostContent = ({ contentBlocks }: { contentBlocks: OptimoBlock[] }) => {
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

const PostItem = ({ postItem }: { postItem: Post }) => {
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

const PostsList = ({ postData }: { postData: StreamResponse }) => {
  const { results: postResults } = postData?.data;

  if (postResults.length === 0) return null;

  return (
    <div>
      {postResults.map(item => (
        <PostItem key={item.urn} postItem={item} />
      ))}
    </div>
  );
};

export default PostsList;
