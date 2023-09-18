/** @jsx jsx */
import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import pathOr from 'ramda/src/pathOr';
import { OptimoBlock } from '#models/types/optimo';
import headings from '#app/legacy/containers/Headings';
import Blocks from '#app/legacy/containers/Blocks';
import paragraph from '#app/legacy/containers/Paragraph';
import Text from '#app/components/Text';
import ImageWithCaption from '../../../../../../src/app/components/ImageWithCaption';
import { Post as PostType } from './types';
import styles from './styles';
import TimeStampContainer from '../../../../../../src/app/legacy/psammead/psammead-timestamp-container/src';
import isTenHoursAgo from '../../../../../../src/app/lib/utilities/isTenHoursAgo';
import { ServiceContext } from '../../../../../../src/app/contexts/ServiceContext';

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

const PostBreakingNewsLabel = ({
  isBreakingNews,
  breakingNewsLabelText = 'Breaking',
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
    >
      {breakingNewsLabelText}
    </Text>
  ) : null;
};

const TimeStamp = ({ curated }: { curated: string }) => {
  const {
    timezone,
    locale,
    altCalendar,
    service,
    articleTimestampPrefix,
    articleTimestampSuffix,
    script,
  } = useContext(ServiceContext);

  const isRelative = isTenHoursAgo(new Date(curated).getTime());

  return (
    <TimeStampContainer
      css={styles.timeStamp}
      timestamp={curated}
      dateTimeFormat="YYYY-MM-DD"
      locale={locale}
      timezone={timezone}
      service={service}
      prefix={articleTimestampPrefix}
      suffix={articleTimestampSuffix}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      script={script}
      {...(altCalendar && { altCalendar })}
      padding={false}
      isRelative={isRelative}
    />
  );
};

const PostHeaderBanner = ({
  isBreakingNews,
  breakingNewsLabelText,
  curated,
}: {
  isBreakingNews: boolean;
  breakingNewsLabelText?: string;
  curated: string;
}) => {
  return (
    <div css={styles.postHeaderBanner}>
      <TimeStamp curated={curated} />
      <PostBreakingNewsLabel
        isBreakingNews={isBreakingNews}
        breakingNewsLabelText={breakingNewsLabelText}
      />
    </div>
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
    image: (props: { blocks: OptimoBlock[] }) => (
      <ImageWithCaption {...props} sizes="(min-width: 1008px) 760px, 100vw" />
    ),
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

  const isBreakingNews = pathOr(false, ['options', 'isBreakingNews'], post);

  const curated = pathOr('', ['dates', 'curated'], post);

  return (
    <>
      <PostHeaderBanner isBreakingNews={isBreakingNews} curated={curated} />
      <PostHeadings headerBlocks={headerBlocks} />
      <PostContent contentBlocks={contentBlocks} />
      <hr />
    </>
  );
};

export default Post;
