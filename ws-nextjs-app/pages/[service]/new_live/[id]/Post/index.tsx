/** @jsx jsx */
import { jsx } from '@emotion/react';
import pathOr from 'ramda/src/pathOr';
import { OptimoBlock } from '#models/types/optimo';
import Heading from '#app/legacy/containers/Headings';
import Blocks from '#app/legacy/containers/Blocks';
import Paragraph from '#app/legacy/containers/Paragraph';
import UnorderedList from '#app/legacy/containers/BulletedList';
import { Post as PostType } from './types';
import styles from './styles';

const PostHeadings = ({ headerBlocks }: { headerBlocks: OptimoBlock[] }) => {
  const componentsToRender = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    headline: (props: any) => (
      <Heading
        {...props}
        headingLevel={3}
        fontVariant="sansBold"
        size="greatPrimer"
        className="headingStyling"
        css={styles.postHeading}
      />
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subheadline: (props: any) => (
      <Heading
        {...props}
        headingLevel={3}
        fontVariant="sansRegular"
        size="brevier"
        className="headingStyling"
        css={styles.postSubHeading}
      />
    ),
  };
  return (
    <Blocks blocks={headerBlocks} componentsToRender={componentsToRender} />
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
    <div css={styles.postBackground}>
      <PostHeadings headerBlocks={headerBlocks} />
      <PostContent contentBlocks={contentBlocks} />
    </div>
  );
};

export default Post;
