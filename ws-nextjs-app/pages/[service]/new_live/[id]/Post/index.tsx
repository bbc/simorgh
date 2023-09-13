/** @jsx jsx */
import { jsx } from '@emotion/react';
import pathOr from 'ramda/src/pathOr';
import { OptimoBlock } from '#models/types/optimo';
import Heading from '#app/components/Heading';
import Blocks from '#app/legacy/containers/Blocks';
import Paragraph from '#app/legacy/containers/Paragraph';
import UnorderedList from '#app/legacy/containers/BulletedList';
import { Post as PostType, PostHeadingBlock } from './types';
import styles from './styles';

const PostHeadings = ({ headerBlock }: { headerBlock: PostHeadingBlock }) => {
  const isHeadline = headerBlock.type === 'headline';
  const headingText = headerBlock.model.blocks[0].model.blocks[0].model.text;

  return (
    <Heading
      level={3}
      fontVariant={isHeadline ? 'sansBold' : 'sansRegular'}
      size={isHeadline ? 'greatPrimer' : 'brevier'}
      className="headingStyling"
      css={isHeadline ? styles.postHeading : styles.postSubHeading}
    >
      {headingText}
    </Heading>
  );
};

const PostContent = ({ contentBlocks }: { contentBlocks: OptimoBlock[] }) => {
  const componentsToRender = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    paragraph: (props: any) => (
      <Paragraph {...props} className="postStyles" css={styles.bodyText} />
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    unorderedList: (props: any) => (
      <UnorderedList {...props} className="postStyles" css={styles.bodyText} />
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    orderedList: (props: any) => (
      <UnorderedList {...props} className="postStyles" css={styles.bodyText} />
    ),
  };

  return (
    <div css={styles.postContent}>
      <Blocks blocks={contentBlocks} componentsToRender={componentsToRender} />
    </div>
  );
};

const Post = ({ post }: { post: PostType }) => {
  const headerBlocks = pathOr<PostHeadingBlock[]>(
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
    <div css={styles.postBackground}>
      {headerBlocks.map(headerBlock => (
        <PostHeadings headerBlock={headerBlock} />
      ))}
      <PostContent contentBlocks={contentBlocks} />
    </div>
  );
};

export default Post;
