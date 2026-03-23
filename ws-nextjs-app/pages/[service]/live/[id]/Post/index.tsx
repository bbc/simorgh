import { use } from 'react';
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
import Byline from '#app/components/Byline';
import { ServiceContext } from '#app/contexts/ServiceContext';
import isTenHoursAgo from '#app/lib/utilities/isTenHoursAgo';
import { isPortraitVideo } from '#app/components/MediaLoader/utils/isPortraitVideo';
import TimeStampContainer from '#app/legacy/psammead/psammead-timestamp-container/src';
import SocialEmbedContainer from '#app/legacy/containers/SocialEmbed';
import { MediaBlock } from '#app/components/MediaLoader/types';
import dynamic from 'next/dynamic';
import styles from './styles';
import {
  Post as PostType,
  PostHeadingBlock,
  ComponentToRenderProps,
} from './types';
import ShareButton from '../ShareButton';

const inferBlockIdentifier = ({
  headingItem,
}: {
  headingItem: PostHeadingBlock;
}) =>
  ({
    headline: block =>
      `${block.type}-${block.model?.blocks?.[0]?.model?.blocks?.[0]?.model?.text}`,
    subheadline: block =>
      `${block.type}-${block.model?.blocks?.[0]?.model?.blocks?.[0]?.model?.text}`,
    contributor: block => `${block.type}-${block.model?.name}`,
  })[headingItem.type](headingItem);

const enrichHeaderBlocksWithId = ({
  headerBlocks,
}: {
  headerBlocks: PostHeadingBlock[];
}) =>
  headerBlocks.map(headingItem => ({
    ...headingItem,
    id: inferBlockIdentifier({ headingItem }),
  }));

const OEmbed = dynamic(() => import('#app/components/Embeds/OEmbed'), {
  ssr: false,
});

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
    datetimeLocale,
    serviceDatetimeLocale,
    altCalendar,
    translations: {
      liveExperiencePage: {
        breaking = 'Breaking',
        postDateTimeFormat,
        postDateFormat,
      },
    },
  } = use(ServiceContext);
  const locale = serviceDatetimeLocale || datetimeLocale;
  const isRelative = isTenHoursAgo(new Date(curated).getTime());
  return (
    <span css={[styles.postHeaderBanner, isBreakingNews && styles.fullWidth]}>
      <TimeStampContainer
        css={styles.timeStamp}
        timestamp={curated}
        dateTimeFormat={postDateTimeFormat || 'DD MMMM YYYY'}
        format={postDateFormat || 'D MMMM YYYY'}
        locale={locale}
        timezone={timezone}
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

const PostHeading = ({
  headerBlocks,
}: {
  headerBlocks: PostHeadingBlock[];
}) => {
  const componentsToRender = {
    headline: (props: ComponentToRenderProps) => {
      const { blocks } = props;

      const headingText = blocks?.[0].model?.blocks?.[0]?.model?.text;

      return (
        <Text
          fontVariant={'sansBold'}
          size={'greatPrimer'}
          className="headingStyling"
          css={[styles.postHeadings, styles.postHeadline]}
        >
          {headingText}
        </Text>
      );
    },
    subheadline: (props: ComponentToRenderProps) => {
      const { blocks } = props;

      const headingText = blocks?.[0].model?.blocks?.[0]?.model?.text;

      return (
        <>
          <VisuallyHiddenText>{`, `}</VisuallyHiddenText>
          <Text
            fontVariant={'sansRegular'}
            size={'brevier'}
            className="headingStyling"
            css={[styles.postHeadings, styles.postSubHeadline]}
          >
            {headingText}
          </Text>
        </>
      );
    },
    contributor: (props: ComponentToRenderProps) => {
      return (
        <>
          <VisuallyHiddenText>{`, `}</VisuallyHiddenText>
          <Byline blocks={[props]} />
        </>
      );
    },
  };

  return (
    <Blocks blocks={headerBlocks} componentsToRender={componentsToRender} />
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
    video: (props: { blocks: MediaBlock[] }) => {
      const { blocks } = props;
      const isPortrait = isPortraitVideo(blocks);

      return (
        <div css={isPortrait && styles.portraitVideoPlayer}>
          <MediaLoader
            blocks={props.blocks}
            css={[styles.bodyMedia, styles.videoPost]}
          />
        </div>
      );
    },
    audio: (props: { blocks: MediaBlock[] }) => (
      <MediaLoader blocks={props.blocks} css={styles.audioPost} />
    ),
    social: SocialEmbedContainer,
    oEmbed: OEmbed,
  };
  return (
    <Blocks blocks={contentBlocks} componentsToRender={componentsToRender} />
  );
};

const Post = ({
  post,
  hasShareApi = false,
}: {
  post: PostType;
  hasShareApi?: boolean;
}) => {
  const headerBlocks = pathOr<PostHeadingBlock[]>(
    [],
    ['header', 'model', 'blocks'],
    post,
  );
  const enrichedHeaderBlocks = enrichHeaderBlocksWithId({ headerBlocks });

  const firstHeadingText =
    headerBlocks[0]?.model?.blocks?.[0]?.model?.blocks?.[0]?.model?.text;

  const contentBlocks = pathOr<OptimoBlock[]>(
    [],
    ['content', 'model', 'blocks'],
    post,
  );
  const { urn } = post;

  const isBreakingNews = pathOr(false, ['options', 'isBreakingNews'], post);
  const timestamp = post?.dates?.curated ?? '';

  return (
    <article css={styles.postContainer}>
      <Heading id={urn} tabIndex={-1} level={3} css={styles.heading}>
        {/* eslint-disable-next-line jsx-a11y/aria-role */}
        <span role="text">
          <PostHeaderBanner
            isBreakingNews={isBreakingNews}
            timestamp={timestamp}
          />
          <PostHeading headerBlocks={enrichedHeaderBlocks} />
        </span>
      </Heading>
      <div css={styles.postContent}>
        <PostContent contentBlocks={contentBlocks} />
      </div>
      {hasShareApi && (
        <ShareButton
          eventTrackingData={{
            componentName: urn,
          }}
          contentId={urn}
          headline={firstHeadingText}
        />
      )}
    </article>
  );
};

export default Post;
