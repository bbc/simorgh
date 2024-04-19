/** @jsx jsx */
import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import pathOr from 'ramda/src/pathOr';
import { OptimoBlock } from '#models/types/optimo';
import Heading from '#app/components/Heading';
import Text from '#app/components/Text';
import Blocks from '#app/legacy/containers/Blocks';
import Paragraph from '#app/legacy/containers/Paragraph';
import UnorderedList from '#app/legacy/containers/BulletedList';
import MediaLoader from '#app/components/MediaLoader';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import ImageWithCaption from '#app/components/ImageWithCaption';
import { ServiceContext } from '#app/contexts/ServiceContext';
import isTenHoursAgo from '#app/lib/utilities/isTenHoursAgo';
import TimeStampContainer from '#app/legacy/psammead/psammead-timestamp-container/src';
import SocialEmbedContainer from '#app/legacy/containers/SocialEmbed';
import { MediaBlock } from '#app/components/MediaLoader/types';
import isLive from '#app/lib/utilities/isLive';
import LegacyMediaPlayer from '#app/components/LegacyLivePageMediaPlayer';
import styles from './styles';
import {
  Post as PostType,
  PostHeadingBlock,
  ComponentToRenderProps,
} from './types';

const PostBreakingNewsLabel = ({
  isBreakingNews,
  breakingNewsLabelText,
}: {
  isBreakingNews: boolean;
  breakingNewsLabelText?: string;
}) => {
  return isBreakingNews ? (
    <>
      <Text
        css={styles.breakingNewsLabel}
        size="brevier"
        fontVariant="sansBold"
        data-testid="breaking-news-label"
      >
        {breakingNewsLabelText}
      </Text>
      <VisuallyHiddenText>, </VisuallyHiddenText>
    </>
  ) : null;
};

const PostHeaderBanner = ({
  isBreakingNews,
  timestamp: curated,
}: {
  isBreakingNews: boolean;
  breakingNewsLabelText?: string;
  timestamp: string;
}) => {
  const {
    timezone,
    locale,
    altCalendar,
    service,
    script,
    translations: {
      liveExperiencePage: { breaking = 'Breaking' },
    },
  } = useContext(ServiceContext);
  const isRelative = isTenHoursAgo(new Date(curated).getTime());

  return (
    <span css={[styles.postHeaderBanner, isBreakingNews && styles.fullWidth]}>
      <TimeStampContainer
        css={styles.timeStamp}
        timestamp={curated}
        dateTimeFormat="DD MMMM YYYY"
        format="D MMMM YYYY"
        locale={locale}
        timezone={timezone}
        service={service}
        // @ts-expect-error: type differences: script is outlined as a generic object in the service context, but as a more specific shape in TimeStampContainer.
        script={script}
        altCalendar={altCalendar}
        padding={false}
        isRelative={isRelative}
      />
      <PostBreakingNewsLabel
        isBreakingNews={isBreakingNews}
        breakingNewsLabelText={breaking}
      />
    </span>
  );
};

const PostHeadings = ({ headerBlock }: { headerBlock: PostHeadingBlock }) => {
  const isHeadline = headerBlock.type === 'headline';
  const headingText =
    headerBlock?.model?.blocks?.[0]?.model?.blocks?.[0]?.model?.text;

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
      <ImageWithCaption
        {...props}
        sizes="(min-width: 1008px) 760px, 100vw"
        className="mediaStyles"
        css={styles.bodyMedia}
        position={[9]}
      />
    ),
    video: (props: { blocks: MediaBlock[] }) => (
      <MediaLoader blocks={props.blocks} css={styles.bodyMedia} />
    ),
    social: SocialEmbedContainer,
  };

  return (
    <Blocks blocks={contentBlocks} componentsToRender={componentsToRender} />
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
  const timestamp = post?.dates?.curated ?? '';

  return (
    <article css={styles.postContainer}>
      <Heading level={3} css={styles.heading}>
        {/* eslint-disable-next-line jsx-a11y/aria-role */}
        <span role="text">
          <PostHeaderBanner
            isBreakingNews={isBreakingNews}
            timestamp={timestamp}
          />
          {headerBlocks.map(headerBlock => (
            <PostHeadings key={headerBlock.id} headerBlock={headerBlock} />
          ))}
        </span>
      </Heading>
      <div css={styles.postContent}>
        <PostContent contentBlocks={contentBlocks} />
      </div>
    </article>
  );
};

export default Post;
