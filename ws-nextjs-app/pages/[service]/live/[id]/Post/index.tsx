/** @jsx jsx */
import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import pathOr from 'ramda/src/pathOr';
import Link from 'next/link';
import { OptimoBlock } from '#models/types/optimo';
import Heading from '#app/components/Heading';
import Text from '#app/components/Text';
import Blocks from '#app/legacy/containers/Blocks';
import Paragraph from '#app/legacy/containers/Paragraph';
import UnorderedList from '#app/legacy/containers/BulletedList';
import LivePageMediaPlayer from '#app/legacy/containers/LivePageMediaPlayer';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import ImageWithCaption from '#app/components/ImageWithCaption';
import { ServiceContext } from '#app/contexts/ServiceContext';
import isTenHoursAgo from '#app/lib/utilities/isTenHoursAgo';
import TimeStampContainer from '#app/legacy/psammead/psammead-timestamp-container/src';
import SocialEmbedContainer from '#app/legacy/containers/SocialEmbed';
import useLocation from '#hooks/useLocation';
import makeRelativeUrlPath from '#lib/utilities/makeRelativeUrlPath';
import styles from './styles';
import {
  Post as PostType,
  PostHeadingBlock,
  ComponentToRenderProps,
} from './types';
import BackToLatestPost from '../Stream/BackToLatest/back-to-latest-post';

const CopyToClipboard = (toCopy: string) => {
  const el = document.createElement(`textarea`);
  el.value = toCopy;
  el.setAttribute(`readonly`, ``);
  el.style.position = `absolute`;
  el.style.left = `-9999px`;
  document.body.appendChild(el);
  el.select();
  document.execCommand(`copy`);
  document.body.removeChild(el);
};

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
    <div css={[styles.postHeaderBanner, isBreakingNews && styles.fullWidth]}>
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
      <VisuallyHiddenText>, </VisuallyHiddenText>
      <PostBreakingNewsLabel
        isBreakingNews={isBreakingNews}
        breakingNewsLabelText={breaking}
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
      <ImageWithCaption
        {...props}
        sizes="(min-width: 1008px) 760px, 100vw"
        className="mediaStyles"
        css={styles.bodyMedia}
      />
    ),
    video: (props: ComponentToRenderProps) => (
      <LivePageMediaPlayer
        blocks={props.blocks}
        className="mediaStyles"
        css={styles.bodyMedia}
      />
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

  const postURN = pathOr<string>('', ['urn'], post);

  const isBreakingNews = pathOr(false, ['options', 'isBreakingNews'], post);
  const timestamp = post?.dates?.curated ?? '';

  // could this logic sit in the BFF and be passed through?
  // is there a chance the POST asset ID will change? Ask the live team.
  const getShareURL = ({ urn, scroll }: { urn: string; scroll: boolean }) => {
    const myURL = `http://localhost:7081/pidgin/live/c07zr0zwjnnt`;
    // replace this with URL builder like those in src/app/lib/utilities/getUrlHelpers
    const cleanedURN = urn.split(':').pop();
    const shareURL = scroll
      ? `${myURL}?post=asset%3A${cleanedURN}`
      : `${myURL}?post=asset%3A${cleanedURN}#post`;

    return shareURL;
  };

  return (
    <article css={styles.postContainer} id={postURN}>
      <BackToLatestPost urn={postURN} />
      <Heading level={3}>
        {/* eslint-disable-next-line jsx-a11y/aria-role */}
        <span role="text">
          <PostHeaderBanner
            isBreakingNews={isBreakingNews}
            timestamp={timestamp}
          />
          {headerBlocks.map(headerBlock => (
            <PostHeadings headerBlock={headerBlock} />
          ))}
        </span>
      </Heading>
      <div css={styles.postContent}>
        <PostContent contentBlocks={contentBlocks} />
      </div>
      <button
        type="button"
        onClick={() => {
          CopyToClipboard(getShareURL({ urn: postURN, scroll: true }));
        }}
      >
        Copy Share Link to Clipboard (Scroll)
      </button>
      <button
        type="button"
        onClick={() => {
          CopyToClipboard(getShareURL({ urn: postURN, scroll: false }));
        }}
      >
        Copy Share Link to Clipboard (No Scroll)
      </button>
    </article>
  );
};

export default Post;
