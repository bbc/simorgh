import React from 'react';

import pathOr from 'ramda/src/pathOr';
import { OptimoBlock } from '#models/types/optimo';
import headings from '#app/legacy/containers/Headings';
import Blocks from '#app/legacy/containers/Blocks';
import paragraph from '#app/legacy/containers/Paragraph';
import Text from '#app/components/Text';
import Image from '#app/components/Image';
import { Post as PostType } from './types';

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
    headline: headings,
    subheadline: headings,
    paragraph,
    unorderedList,
    orderedList: unorderedList,
    image: (props: { blocks: OptimoBlock[] }) => {
      const { locator, width, originCode } = props.blocks.find(
        block => block.type === 'rawImage',
      )?.model;

      const imageSrc = `${process.env.SIMORGH_ICHEF_BASE_URL}/ace/standard/${width}/${originCode}/${locator}.webp`;

      return (
        <Image sizes="(min-width: 1008px) 760px, 100vw" src={imageSrc} alt="" />
      );
    },
  };

  return (
    <div>
      <Blocks blocks={contentBlocks} componentsToRender={componentsToRender} />
    </div>
  );
};

const Post = ({ post }: { post: PostType }) => {
  const headerBlocks = pathOr<OptimoBlock[]>(
    [],
    ['header', 'model', 'blocks'],
    post,
  );

  const contentBlocks = pathOr<OptimoBlock[]>(
    [],
    ['content', 'model', 'blocks'],
    post,
  );

  return (
    <>
      {/* <PostHeadings headerBlocks={headerBlocks} /> */}
      <PostContent contentBlocks={[...headerBlocks, ...contentBlocks]} />
      <hr />
    </>
  );
};

export default Post;
