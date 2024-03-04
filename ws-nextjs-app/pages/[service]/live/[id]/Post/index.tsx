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
import LegacyMediaPlayer from '#app/components/LegacyLivePageMediaPlayer';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import ImageWithCaption from '#app/components/ImageWithCaption';
import { ServiceContext } from '#app/contexts/ServiceContext';
import isTenHoursAgo from '#app/lib/utilities/isTenHoursAgo';
import TimeStampContainer from '#app/legacy/psammead/psammead-timestamp-container/src';
import SocialEmbedContainer from '#app/legacy/containers/SocialEmbed';
import isLive from '#lib/utilities/isLive';
import { getEnvConfig } from '#lib/utilities/getEnvConfig';
import styles from './styles';
import {
  Post as PostType,
  PostHeadingBlock,
  ComponentToRenderProps,
} from './types';

const imageBlock = [
  {
    id: 'fc238059',
    type: 'rawImage',
    model: {
      height: 416,
      width: 624,
      locator:
        'vivo/test/images/2023/12/7/0781b49d-0b5b-43b5-9b39-605b189c2136.jpg',
      originCode: 'cpsdevpb',
      copyrightHolder: 'AFP',
    },
  },
  {
    id: 'ccfa2c6f',
    type: 'altText',
    model: {
      blocks: [
        {
          id: 'e76f2f22',
          type: 'text',
          model: {
            blocks: [
              {
                id: '03a73508',
                type: 'paragraph',
                model: {
                  text: 'Bombing over the Gaza Strip',
                  blocks: [
                    {
                      id: 'e7f83cb4',
                      type: 'fragment',
                      model: {
                        text: 'Bombing over the Gaza Strip',
                        attributes: [],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
  {
    id: 'f5f6212a',
    type: 'caption',
    model: {
      blocks: [
        {
          id: '64aa2df7',
          type: 'text',
          model: {
            blocks: [
              {
                id: 'f407ed3b',
                type: 'paragraph',
                model: {
                  text: 'A view of Gaza shows smoke rising during Israeli shelling, taken from southern Israel',
                  blocks: [
                    {
                      id: '1af79e32',
                      type: 'fragment',
                      model: {
                        text: 'A view of Gaza shows smoke rising during Israeli shelling, taken from southern Israel',
                        attributes: [],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
];

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
        position={[9]}
      />
    ),
    video: (props: ComponentToRenderProps) =>
      isLive() ? (
        <LegacyMediaPlayer
          blocks={props.blocks}
          className="mediaStyles"
          css={styles.bodyMedia}
        />
      ) : (
        <MediaLoader
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

  const isBreakingNews = pathOr(false, ['options', 'isBreakingNews'], post);
  const timestamp = post?.dates?.curated ?? '';

  return (
    <article css={styles.postContainer}>
      {getEnvConfig().SIMORGH_APP_ENV}
      <Heading level={3}>
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
        <ImageWithCaption
          blocks={imageBlock}
          sizes="(min-width: 1008px) 760px, 100vw"
          className="mediaStyles"
          css={styles.bodyMedia}
          position={[9]}
        />
        <PostContent contentBlocks={contentBlocks} />
      </div>
    </article>
  );
};

export default Post;
