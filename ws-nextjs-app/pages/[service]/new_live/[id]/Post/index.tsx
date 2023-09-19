/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import pathOr from 'ramda/src/pathOr';
import { OptimoBlock } from '#models/types/optimo';
import Heading from '#app/components/Heading';
import Text from '#app/components/Text';
import Blocks from '#app/legacy/containers/Blocks';
import Paragraph from '#app/legacy/containers/Paragraph';
import UnorderedList from '#app/legacy/containers/BulletedList';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import {
  Post as PostType,
  PostHeadingBlock,
  ComponentToRenderProps,
} from './types';
import ImageWithCaption from '../../../../../../src/app/components/ImageWithCaption';
import styles from './styles';

const PostBreakingNewsLabel = ({
  isBreakingNews,
  breakingNewsLabelText,
}: {
  isBreakingNews: boolean;
  breakingNewsLabelText?: string;
}) => {
  return isBreakingNews ? (
    <Text
      css={styles.breakingNewsLabel}
      size="brevier"
      fontVariant="sansBold"
      data-testid="breaking-news-label"
      aria-hidden="true"
    >
      {breakingNewsLabelText}
    </Text>
  ) : null;
};

const PostHeaderBanner = ({
  isBreakingNews,
  breakingNewsLabelText,
}: {
  isBreakingNews: boolean;
  breakingNewsLabelText?: string;
}) => {
  return (
    <div css={styles.postHeaderBanner}>
      <PostBreakingNewsLabel
        isBreakingNews={isBreakingNews}
        breakingNewsLabelText={breakingNewsLabelText}
      />
    </div>
  );
};

const PostHeadings = ({ headerBlock }: { headerBlock: PostHeadingBlock }) => {
  const isHeadline = headerBlock.type === 'headline';
  const headingText = headerBlock.model.blocks[0].model.blocks[0].model.text;

  return (
    <>
      {!isHeadline && <VisuallyHiddenText>{`, `}</VisuallyHiddenText>}
      <Text
        fontVariant={isHeadline ? 'sansBold' : 'sansRegular'}
        size={isHeadline ? 'greatPrimer' : 'brevier'}
        className="headingStyling"
        css={[
          styles.postHeadings,
          isHeadline ? styles.postHeadline : styles.postSubHeadline,
        ]}
      >
        {headingText}
      </Text>
    </>
  );
};

const PostContent = ({ contentBlocks }: { contentBlocks: OptimoBlock[] }) => {
  const componentsToRender = {
    paragraph: (props: ComponentToRenderProps) => (
      <Paragraph
        blocks={props.blocks}
        className="postStyles"
        css={styles.bodyText}
      />
    ),
    unorderedList: (props: ComponentToRenderProps) => (
      <UnorderedList
        blocks={props.blocks}
        blockGroupType={props.blockGroupType}
        blockGroupIndex={props.blockGroupIndex}
        className="postStyles"
        css={styles.bodyText}
      />
    ),
    orderedList: (props: ComponentToRenderProps) => (
      <UnorderedList
        blocks={props.blocks}
        blockGroupType={props.blockGroupType}
        blockGroupIndex={props.blockGroupIndex}
        className="postStyles"
        css={styles.bodyText}
      />
    ),
    image: (props: { blocks: OptimoBlock[] }) => (
      <ImageWithCaption {...props} sizes="(min-width: 1008px) 760px, 100vw" />
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

  const isBreakingNews = pathOr(false, ['options', 'isBreakingNews'], post);

  const breakingNewsLabelText = 'Breaking';

  return (
    <>
      <PostHeaderBanner
        isBreakingNews={isBreakingNews}
        breakingNewsLabelText={breakingNewsLabelText}
      />
      <div css={styles.postBackground}>
        <Heading level={3}>
          {/* eslint-disable-next-line jsx-a11y/aria-role */}
          <span role="text">
            {isBreakingNews && (
              <VisuallyHiddenText>{breakingNewsLabelText}, </VisuallyHiddenText>
            )}
            {headerBlocks.map(headerBlock => (
              <PostHeadings headerBlock={headerBlock} />
            ))}
          </span>
        </Heading>
        <PostContent contentBlocks={contentBlocks} />
      </div>
    </>
  );
};

export default Post;
